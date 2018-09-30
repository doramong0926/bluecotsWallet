import React, { Component } from 'react';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import { Text, View, StyleSheet, Clipboard, TouchableOpacity, Platform } from 'react-native';
import Modal from 'react-native-simple-modal';
import ActionCreator from '../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletUtils from '../utils/wallet';
import { Permissions } from 'expo';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import { 
	DEFAULT_TOKEN_SYMBOL,
	DEFAULT_TOKEN_CONTRACT_ADDRESS,
	DEFAULT_TOKEN_DECIMALS,
 } from '../config/constants';

class ModalPayment extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tokenSymbol: null,
            addressToSend: null,
            amountToSend: null,
            totalPrice: null,
            gasForSend: null,
            isEnoughGas: null,
        }
    };
    
    static propTypes = {
        defaultWallet: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,
    };

    componentDidMount() {
        this.setPaymentInfomation();
    }

    render() {
        return (
            <Modal 
                offset={0}
                open={this.props.visibleModalPayment}
                animationDuration={200}
                animationTension={40}
                closeOnTouchOutside={true}
                disableOnBackPress={false}
                modalDidClose={() => {this.closeModal()}}
                modalDidOpen={() => {this.openModal()}}
                modalProps={undefined}
                containerProps={undefined}
                modalStyle={{
                    borderRadius: 10,
                    marginHorizontal: 20,
                    backgroundColor: "white"
                }}
                overlayStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                    flex: 1
                }}
            >
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Payment {this.state.tokenSymbol} </Text>
                    <View style={{alignSelf:"flex-end", paddingRight:20, position:"absolute"}}>
                        <TouchableOpacity onPress={() => this.closeModal()} value={'0.5'}>
                            <Ionicons name="ios-close-circle-outline" size={20}/>
                        </TouchableOpacity>
                    </View>                      
                </View>
                
                <View style={styles.bodyContainer}>                   
                    <View style={styles.containerBalance}>
                        <Text style={styles.subTitleText}>Available balance</Text>
                        <Text style={styles.descriptionText}>{this.props.defaultWallet.walletAddress}</Text>
                        {this.renderBalance()}                        
                    </View>
                    <View style={styles.containerPaymentInfomation}>
                        <Text style={styles.subTitleText}>Reserve infomation</Text>
                        <Text style={styles.descriptionText}>{this.props.paymentInfomation.hotelInfo.name}</Text>
                        {/* <Text style={styles.descriptionText}>Room type : {this.props.paymentInfomation.roomType.string()}</Text> */}
                        <Text style={styles.descriptionText}>Adult : {this.props.paymentInfomation.numOfPeople.adult} / Kid : {this.props.paymentInfomation.numOfPeople.kid} / Baby : {this.props.paymentInfomation.numOfPeople.baby}</Text>
                    </View>
                    <View style={styles.containerTotalPrice}>
                        <Text style={styles.subTitleText}>Total price</Text>
                        {this.renderTotalPrice()}                        
                    </View>
                </View> 
                <View style={styles.buttonContainer}>  
                    <Button
                        disabled={
                            !this.addressIsValid(this.state.addressToSend) || 
                            !this.amountIsValid(this.state.amountToSend) || 
                            !this.amountIsEnough(this.state.amountToSend) ||
                            this.isSameAddressWithTxAddress(this.state.addressToSend) ||
                            (this.state.isEnoughGas === null ||  this.state.isEnoughGas === false)
                        }
                        onPress={this.handelPressSend}
                        title="Send"
                        buttonStyle={{
                            backgroundColor: "#BD3D3A",
                            borderColor: "transparent", 
                            borderRadius: 5
                        }}
                        containerViewStyle={{
                            // alignSelf: 'stretch',
                            // margin: 20,
                        }}
                    /> 
                </View>
            </Modal>
        );
    }  

    renderBalance = () => {
        if (this.state.tokenSymbol === 'BLC') {
            return <Text style={styles.balanceText}> {this.props.blcBalance} BLC</Text>
        } else if (this.state.tokenSymbol === 'ETH') {
            return <Text style={styles.balanceText}> {this.props.ethBalance} ETH</Text>
        }
    }

    renderTotalPrice = () => {
        return (
            <Text style={styles.balanceText}>{this.state.amountToSend} BLC ({this.state.totalPrice} $)</Text>
        )
    }

    

    openModal = () => {
        this.setPaymentInfomation();
    }

    closeModal = () => {
        this.props.hideModalPayment();
    }

    setPaymentInfomation = () => {
        const totalPrice = (
            this.props.paymentInfomation.numOfPeople.adult * this.props.paymentInfomation.roomType.price.adult +
            this.props.paymentInfomation.numOfPeople.kid * this.props.paymentInfomation.roomType.price.kid +
            this.props.paymentInfomation.numOfPeople.baby * this.props.paymentInfomation.roomType.price.baby
        );
        this.updateWalletBalance(this.props.defaultWallet.walletAddress);
        this.setState({
            addressToSend: this.props.paymentInfomation.hotelInfo.addressToSend,
            tokenSymbol: this.props.paymentInfomation.tokenSymbolForPayment,
            totalPrice: totalPrice,
            amountToSend: (totalPrice / this.props.paymentInfomation.tokenPrice),
        })
        setTimeout(() => {
            this.calculateGasPrice(
                this.state.tokenSymbol,
                this.state.addressToSend,
                this.state.amountToSend,
            );
        }, );
    }

    handelPressSend = async () => {      
        this.closeModal();  
        if (this.props.useFingerPrint === true){
            this.scanFingerPrint();
        } else {
            this.usePinCode();
        }
    }

    usePinCode = () => {
        this.props.setModalPincodeFinishProcess(this.modalPincodeFinishProcess.bind(this));
        this.props.showModalPincode();
    }

    scanFingerPrint = () => {
        this.props.setModalFingerPrintScanerFinishProcess(this.modalFingerPrintScanerFinishProcess.bind(this));
            if (Platform.OS === 'android') {
                this.props.showModalFingerPrintScaner();
            } else {
                //ios는 우찌하나?
                this.props.showModalFingerPrintScaner();
        }
    }

    modalFingerPrintScanerFinishProcess(result) {
        if (result.status == true) {
            this.sendTransaction();
            this.props.showModalSpinner('sending');
        } else {
            if (result.message === 'usePinCode') {                
                this.props.hideModalPayment();
                this.usePinCode();
            } else {
                this.props.showModalPayment();
            }
        }
    }

    modalPincodeFinishProcess(result) {
        if (result.status === true) {
            this.sendTransaction();
            this.props.showModalSpinner('sending');
        } else {
            this.props.showModalPayment();
        }
    }

    calculateGasPrice = async (tokenSymbol, addressToSend, amount) => {
        try {
            const gasLimit = await WalletUtils.getEstimateGas(
                    tokenSymbol,
                    DEFAULT_TOKEN_CONTRACT_ADDRESS,
                    DEFAULT_TOKEN_DECIMALS, 
                    this.props.defaultWallet.walletAddress,
                    addressToSend,
                    amount,
            )
            const gasPriceData = await WalletUtils.getGasPrice();
            if (gasLimit === undefined || gasPriceData === undefined) {
                this.setState({isEnoughGas: false});
            } else {
                const txFee = gasLimit.wei * gasPriceData;
                this.setState({gasForSend: txFee});
                
                if (tokenSymbol === 'BLC' && (txFee) <= this.props.ethBalance) {
                    this.setState({isEnoughGas: true});
                } else if (tokenSymbol === 'ETH' && amount <= this.props.ethBalance - txFee) { 
                    this.setState({isEnoughGas: true});
                } else {
                    this.setState({isEnoughGas: false});
                }   
            } 
        } catch (error) {
            this.setState({isEnoughGas: false});
        }
    }

    sendTransaction = async () => {
        try {  
            const txid = await WalletUtils.sendTransaction (
                { 
                    contractAddress: (this.state.tokenSymbol === 'BLC') ? (DEFAULT_TOKEN_CONTRACT_ADDRESS) : (''),
                    symbol: this.state.tokenSymbol, 
                    decimals: (this.state.tokenSymbol === 'BLC') ? (DEFAULT_TOKEN_DECIMALS) : (0),
                },
                this.props.defaultWallet,
                this.state.addressToSend,
                this.state.amountToSend,
            );
            setTimeout(() => {
                this.props.hideModalSpinner();
                const infomation = {
                    title: 'SUCCESS', 
                    message1: 'Success to send ' + this.state.tokenSymbol, 
                    transactionId: txid,
                };
                this.props.setModalInfomation(infomation);
                this.props.showModalInfomation();
            }, );            
        } catch (error) {
            console.log('sendTransaction error : ' + error);
            this.props.hideModalSpinner();
            const infomation = {
                title: 'FAIL', 
                message1: 'Fail to send BLC', 
                message2: 'Please check your transaction',
                transactionId: txid,
            };
            this.props.setModalInfomation(infomation);
            this.props.showModalInfomation();
        }
    };

    updateWalletBalance = async () => {        
        if (this.props.defaultWallet.walletAddress) {
            const currentETHBalance = await WalletUtils.getBalance({
                walletAddress: this.props.defaultWallet.walletAddress,
                contractAddress:'', 
                symbol:'ETH', 
                decimals:0
            });
            const currentBLCBalance = await WalletUtils.getBalance({
                walletAddress: this.props.defaultWallet.walletAddress,
                contractAddress: DEFAULT_TOKEN_CONTRACT_ADDRESS,
                symbol: DEFAULT_TOKEN_SYMBOL, 
                decimals: DEFAULT_TOKEN_DECIMALS, 
            });
            if (currentETHBalance !== undefined) {
                if (this.props.ethBalance !== currentETHBalance)
                {
                    this.props.setEthBalance(currentETHBalance); 
                }
            }
            if (currentBLCBalance !== undefined) {
                if (this.props.blcBalance !== currentBLCBalance)
                {
                    this.props.setBlcBalance(currentBLCBalance);
                }
            }
        }
    }

    addressValidationMsg = () => {
        if (this.state.addressToSend === '' || this.state.addressToSend === null) {
            return <FormValidationMessage>{'This field is required.'}</FormValidationMessage>
        } else if (!this.addressIsValid(this.state.addressToSend)) {
            return <FormValidationMessage>{'Address is wrong.'}</FormValidationMessage>
        } else if (this.isSameAddressWithTxAddress(this.state.addressToSend)) {
            return <FormValidationMessage>{'You can not send ' + this.state.tokenSymbol + ' to same address.'}</FormValidationMessage>
        } else {
            return  <FormValidationMessage labelStyle={{color:'#79C753'}}> {'Address is valid.'} </FormValidationMessage>
        }
    }

    amountValidationMsg = () => {
        if (this.state.amountToSend === '' || this.state.amountToSend === null) {
            return <FormValidationMessage>{'This field is required.'}</FormValidationMessage>
        } else if (!this.amountIsValid(this.state.amountToSend)) {
            return <FormValidationMessage>{'Amount is wrong.'}</FormValidationMessage>
        } else if (!this.amountIsEnough(this.state.amountToSend)) {
            return <FormValidationMessage>{'Balance is not enough.'}</FormValidationMessage>
        } else if (this.state.isEnoughGas === null) {
            return <FormValidationMessage>{'Calculating gas'}</FormValidationMessage>
        } else if (!this.state.isEnoughGas) {
            return <FormValidationMessage>{'Gas is not enough.'}</FormValidationMessage>
        } else {
            return <FormValidationMessage labelStyle={{color:'#79C753'}}>{'Amount is valid.'}</FormValidationMessage>
        }
    }

    isSameAddressWithTxAddress = (walletAddress) => {
        if (walletAddress === this.props.defaultWallet.walletAddress) {        
            return true;
        } else {
            return false;
        }
    }

    addressIsValid = (walletAddress) => {
        return WalletUtils.addressIsValid(walletAddress);
    }

    amountIsValid = (amount) => {
        return parseFloat(amount, 10) > 0;
    }

    amountIsEnough = (amount) => {
        if (this.state.tokenSymbol === 'BLC') {
            if (this.props.blcBalance < amount) {
                return false;
            } else {
                return true;
            }
        } else if (this.state.tokenSymbol === 'ETH') {
            if (this.props.ethBalance < amount) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
}
    
const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#67AFCB',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopStartRadius : 10,
        borderTopEndRadius: 10,
        padding: 10,
    }, 
    bodyContainer: {
        // marginHorizontal: 20,
        marginTop:10,
    },
    buttonContainer: {
        marginTop:20,
        marginBottom: 10,
    },
    tokenSelectContainer : {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection:'row', 
        justifyContent:'space-between'
    },
    containerBalance: {      
        marginBottom: 5,
    },
    containerTotalPrice: {

    },
    containerPaymentInfomation: {      
        marginBottom: 5,
    },
    headerText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    },
    subTitleText: {
        fontSize : 12, 
        textAlign:'center',
        color: 'black', 
    },
    descriptionText: {
        fontSize: 12,        
        color: '#B4B7BA',
        textAlign: 'center',
    },
    balanceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#BD3D3A',
        textAlign: 'center',
    },
    maxIconText: {
        textAlign: 'center', 
        fontSize:8, 
        fontWeight:'bold'
    }
});

function mapStateToProps(state) {
    return {
        visibleModalPayment: state.modal.visibleModalPayment,
        paymentInfomation: state.walletTemp.paymentInfomation,
        defaultWallet: state.wallet.defaultWallet,
        ethBalance: state.wallet.ethBalance,
        blcBalance: state.wallet.blcBalance,
        useFingerPrint: state.config.useFingerPrint,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showModalPayment: () => {
            dispatch(ActionCreator.showModalPayment());
        },
        hideModalPayment: () => {
            dispatch(ActionCreator.hideModalPayment());
        },
        setModalInfomation: (infomation) => {
            dispatch(ActionCreator.setModalInfomation(infomation));
        },
        showModalInfomation: () => {
            dispatch(ActionCreator.showModalInfomation());
        },
        setModalFingerPrintScanerFinishProcess: (finishProcess) => {
            dispatch(ActionCreator.setModalFingerPrintScanerFinishProcess(finishProcess));
        },
        showModalSpinner: (message) => {
            dispatch(ActionCreator.showModalSpinner(message));
        },
        hideModalSpinner: () => {
            dispatch(ActionCreator.hideModalSpinner());
        },
        showModalFingerPrintScaner: () => {
            dispatch(ActionCreator.showModalFingerPrintScaner());
        },
        setModalPincodeFinishProcess: (finishProcess) => {
            dispatch(ActionCreator.setModalPincodeFinishProcess(finishProcess));
        },   
        showModalPincode: () => {
            dispatch(ActionCreator.showModalPincode());
        },
        setEthBalance: (balance) => {
            dispatch(ActionCreator.setEthBalance(balance));
        },
        setBlcBalance: (balance) => {
            dispatch(ActionCreator.setBlcBalance(balance));
        },                
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalPayment);