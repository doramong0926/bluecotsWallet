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
            price: null,
            gasForSend: null,
            isEnoughGas: null,
        }
    };
    
    static propTypes = {
        defaultWallet: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,
    };

    componentWillMount() {
        this.updateWalletBalance(this.props.defaultWallet.walletAddress);
        this.props.setModalSendTokenName(this.props.paymentInfomation.tokenSymbol);
        this.props.setModalAmountToSend(this.props.paymentInfomation.price);
        this.props.setModalAddressToSend(this.props.paymentInfomation.walletAddress);
        setTimeout(() => {
            this.calculateGasPrice(
                this.props.paymentInfomation.tokenSymbol, 
                this.props.paymentInfomation.walletAddress, 
                this.props.paymentInfomation.price
            );
        }, );
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
                    <Text style={styles.headerText}>Payment {this.props.modalSendTokenName} </Text>
                    <View style={{alignSelf:"flex-end", paddingRight:20, position:"absolute"}}>
                        <TouchableOpacity onPress={() => this.closeModal()} value={'0.5'}>
                            <Ionicons name="ios-close-circle-outline" size={20}/>
                        </TouchableOpacity>
                    </View>                      
                </View>
                
                <View style={styles.bodyContainer}>
                    <View style={styles.tokenSelectContainer}>
                        <View style={styles.tokenSelectButtonContainer}>
                            <TouchableOpacity onPress={() => this.handleSelectToken('BLC')} value="0.5">
                                <View style={(this.props.modalSendTokenName === 'BLC') ? (styles.selectedLeftButtonContainer) : (styles.unselectedLeftButtonContainer)}>
                                    <Text> BLC </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.handleSelectToken('ETH')} value="0.5">
                                <View style={(this.props.modalSendTokenName === 'BLC') ? (styles.unselectedRightButtonContainer) : (styles.selectedRightButtonContainer)}>
                                    <Text> ETH </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.containerBalance}>
                        <Text style={styles.subTitleText}>Available balance</Text>
                        <Text style={styles.descriptionText}>{this.props.defaultWallet.walletAddress}</Text>
                        {this.renderBalance()}                        
                    </View> 
                    <View>
                        <FormLabel>Address to send {this.props.modalSendTokenName}</FormLabel>
                        <View style={styles.inputContainer}>
                            <FormInput 
                                textInputEditable = {false}
                                containerStyle={{marginRight:0,}} 
                                // underlineColorAndroid='transparent' 
                                inputStyle = {{paddingLeft:5, paddingRight:5, marginRight:0, fontSize:11}}
                                value = {(this.props.addressToSend === null) ? (null) : (this.props.addressToSend)}
                                onChangeText={(value) => this.props.setModalAddressToSend(value)}
                            />                      
                        </View>                        
                        {this.addressValidationMsg()}
                    </View> 
                    <View>
                        <FormLabel>Amount to send {this.props.modalSendTokenName}</FormLabel>
                        <View style={styles.inputContainer}>
                            <Text>{this.props.amountToSend}</Text>
                            <FormInput 
                                textInputEditable = {false}
                                containerStyle={{marginRight:0,}} 
                                // underlineColorAndroid='transparent' 
                                inputStyle = {{paddingLeft:5, paddingRight:5, marginRight:0, fontSize:12}}
                                keyboardType = 'numeric'
                                value = {(this.props.amountToSend === null) ? ('0') : (this.props.amountToSend.toString())}
                                onChangeText={(value) => {
                                    this.setState({isEnoughGas: null})     
                                    this.props.setModalAmountToSend(value);
                                }
                            }/>
                        </View>
                        {this.amountValidationMsg()}
                    </View>
                </View> 
                <View style={styles.buttonContainer}>  
                    <Button
                        disabled={
                            !this.addressIsValid(this.props.addressToSend) || 
                            !this.amountIsValid(this.props.amountToSend) || 
                            !this.amountIsEnough(this.props.amountToSend) ||
                            this.isSameAddressWithTxAddress(this.props.addressToSend) ||
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
        if (this.props.modalSendTokenName === 'BLC') {
            return <Text style={styles.balanceText}> {this.props.blcBalance} BLC</Text>
        } else if (this.props.modalSendTokenName === 'ETH') {
            return <Text style={styles.balanceText}> {this.props.ethBalance} ETH</Text>
        }
    }

    openModal = () => {
        this.updateWalletBalance(this.props.defaultWallet.walletAddress);
        this.props.setModalSendTokenName(this.props.paymentInfomation.tokenSymbol);
        this.props.setModalAmountToSend(this.props.paymentInfomation.price);
        this.props.setModalAddressToSend(this.props.paymentInfomation.walletAddress);
        setTimeout(() => {
            this.calculateGasPrice(
                this.props.paymentInfomation.tokenSymbol, 
                this.props.paymentInfomation.walletAddress, 
                this.props.paymentInfomation.price
            );
        }, );
    }

    closeModal = () => {
        this.props.hideModalPayment();
    }

    handleSelectToken = (modalSendTokenName) => {
        if (this.props.modalSendTokenName !== modalSendTokenName) {
            this.props.setModalSendTokenName(this.props.paymentInfomation.tokenSymbol);
            this.props.setModalAmountToSend(this.props.paymentInfomation.price);
            this.props.setModalAddressToSend(this.props.paymentInfomation.walletAddress);
            setTimeout(() => {
                this.calculateGasPrice(
                    this.props.paymentInfomation.tokenSymbol, 
                    this.props.paymentInfomation.walletAddress, 
                    this.props.paymentInfomation.price
                );
            }, );
        }
    }

    handelPressSend = async () => {      
        this.closeModal();  
        if (this.state.isEnoughGas === true) {
            this.props.setModalConfirmFinishProcess(this.confirmToSendFinishProcess.bind(this));
            this.props.setModalConfirmHeader("Confirmation");
            this.props.setModalConfirmBody([
                {text: "Infomation for payment"},
                {text: `Hotel name : ${this.props.paymentInfomation.hotelInfo.name}`},
                {text: `Order Id : ${this.props.paymentInfomation.itemCode}`},
                {text: `Adult : ${this.props.paymentInfomation.adult} / Kid : ${this.props.paymentInfomation.adult}`},
                {text: `Price : ${this.props.paymentInfomation.price}`},
                {text: "Are you sure to send " + this.props.modalSendTokenName},
                {text: "Amount : " + this.props.amountToSend + this.props.modalSendTokenName},
                {text: "To : " + this.props.addressToSend},
                {text: "Estimated tx-fee : " + this.state.gasForSend.toFixed(14) + " ETH"},
            ]);
            this.props.showModalConfirm();
        } else {
            const infomation = {
                title: 'Failure', 
                message1: 'Fail to send BLC', 
                message2: 'You do not have enough gas',
                message3: 'Estimated tx-fee : ' + this.state.gasForSend.toFixed(14) + " ETH",
            };
            this.props.setModalInfomation(infomation);
            this.props.showModalInfomation();
        }  
    }

    handelPressPaste = async () => {
        const address = await Clipboard.getString(); 
        this.props.setModalAddressToSend(address);
    };

    handelPressClear = () => {
        this.props.setModalAddressToSend(null);
        this.props.setModalAmountToSend(null);
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

    confirmToSendFinishProcess = (result) => {
        if (result.status === true) {
            if (this.props.useFingerPrint === true){
                this.scanFingerPrint();
            } else {
                this.props.hideModalPayment();
                this.usePinCode();
            }
        } else {
            this.props.showModalPayment();
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
                    contractAddress: (this.props.modalSendTokenName === 'BLC') ? (DEFAULT_TOKEN_CONTRACT_ADDRESS) : (''),
                    symbol: this.props.modalSendTokenName, 
                    decimals: (this.props.modalSendTokenName === 'BLC') ? (DEFAULT_TOKEN_DECIMALS) : (0),
                },
                this.props.defaultWallet,
                this.props.addressToSend,
                this.props.amountToSend,
            );
            setTimeout(() => {
                this.props.hideModalSpinner();
                const infomation = {
                    title: 'SUCCESS', 
                    message1: 'Success to send ' + this.props.modalSendTokenName, 
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
        if (this.props.addressToSend === '' || this.props.addressToSend === null) {
            return <FormValidationMessage>{'This field is required.'}</FormValidationMessage>
        } else if (!this.addressIsValid(this.props.addressToSend)) {
            return <FormValidationMessage>{'Address is wrong.'}</FormValidationMessage>
        } else if (this.isSameAddressWithTxAddress(this.props.addressToSend)) {
            return <FormValidationMessage>{'You can not send ' + this.props.modalSendTokenName + ' to same address.'}</FormValidationMessage>
        } else {
            return  <FormValidationMessage labelStyle={{color:'#79C753'}}> {'Address is valid.'} </FormValidationMessage>
        }
    }

    amountValidationMsg = () => {
        if (this.props.amountToSend === '' || this.props.amountToSend === null) {
            return <FormValidationMessage>{'This field is required.'}</FormValidationMessage>
        } else if (!this.amountIsValid(this.props.amountToSend)) {
            return <FormValidationMessage>{'Amount is wrong.'}</FormValidationMessage>
        } else if (!this.amountIsEnough(this.props.amountToSend)) {
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
        if (this.props.modalSendTokenName === 'BLC') {
            if (this.props.blcBalance < amount) {
                return false;
            } else {
                return true;
            }
        } else if (this.props.modalSendTokenName === 'ETH') {
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
    tokenSelectButtonContainer : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#92B558',
        borderWidth: 1,
        borderRadius:5,
    },
    unselectedLeftButtonContainer : {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
    },
    selectedLeftButtonContainer : {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#92B558',
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
    },
    unselectedRightButtonContainer : {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
    },
    selectedRightButtonContainer : {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#92B558',
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
    },

    inputContainer: {
        flexDirection:'row', 
        justifyContent:'space-between'
    },
    containerBalance: {      
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
        modalSendTokenName: state.modal.modalSendTokenName,
        defaultWallet: state.wallet.defaultWallet,
        ethBalance: state.wallet.ethBalance,
        blcBalance: state.wallet.blcBalance,
        useFingerPrint: state.config.useFingerPrint,
        addressToSend: state.modal.addressToSend,
        amountToSend: state.modal.amountToSend,
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
        setTokenNameForQrCode: (name) => {
            dispatch(ActionCreator.setTokenNameForQrCode(name));
        },
        showModalQrCodeScaner: () => {
            dispatch(ActionCreator.showModalQrCodeScaner());
        },
        showModalConfirm: () => {
            dispatch(ActionCreator.showModalConfirm());
        },
        setModalConfirmFinishProcess: (finishProcess) => {
            dispatch(ActionCreator.setModalConfirmFinishProcess(finishProcess));
        },
        setModalConfirmHeader: (header) => {
            dispatch(ActionCreator.setModalConfirmHeader(header));
        },
        setModalConfirmBody: (body) => {
            dispatch(ActionCreator.setModalConfirmBody(body));
        },
        setModalAddressToSend: (address) => {
            dispatch(ActionCreator.setModalAddressToSend(address));
        },
        setModalAmountToSend: (amount) => {
            dispatch(ActionCreator.setModalAmountToSend(amount));
        },
        setModalSendTokenName: (tokenName) => {
            dispatch(ActionCreator.setModalSendTokenName(tokenName));
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