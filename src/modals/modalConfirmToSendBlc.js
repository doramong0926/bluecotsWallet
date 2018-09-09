
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'
import Modal from 'react-native-simple-modal';
import ActionCreator from './../actions';
import { connect } from 'react-redux';
import WalletUtils from './../utils/wallet';
import { 
	ETHERSCAN_API_KEY,
	INFURA_API_KEY ,
	SEGMENT_API_KEY,
	NETWORK,
	DEFAULT_TOKEN_NAME,
	DEFAULT_TOKEN_SYMBOL,
	DEFAULT_TOKEN_CONTRACT_ADDRESS,
	DEFAULT_TOKEN_DECIMALS,
	WALLET_VERSION
 } from './../config/constants';

class ModalConfirmToSendBlc extends Component {
    constructor(props, context) {
        super(props, context);
    }

    state = {
        gasForSend: 0,
        isEnoughEth: false,
    };

    render() {
        return (
            <Modal 
                offset={0}
                open={this.props.visibleModalConfirmToSendBlc}
                animationDuration={200}
                animationTension={40}
                closeOnTouchOutside={true}
                disableOnBackPress={false}
                modalDidClose={() => {this.modalClose()}}
                modalDidOpen={() => {this.modalOpen()}}
                modalProps={undefined}
                containerProps={undefined}
                containerStyle={{
                    justifyContent: "center"
                }}
                modalStyle={{
                    borderRadius: 10,
                    margin: 20,
                    padding: 10,
                    backgroundColor: "white"
                }}
                overlayStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                    flex: 1
                }}
            >
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Confirmation</Text>
                </View>
                <View style={styles.messageContainer}>                
                    {this.renderMessage()}            
                    <Text style={styles.messageText}>txFee : {this.state.gasForSend.toFixed(14)} ETH</Text>
                    
                </View>
                <View style={styles.buttonContainer}>
                    <View style={{flex:1}}>
                        <Button
                            disabled={
                                !this.state.isEnoughEth
                            }
                            onPress={this.handelPressOk}
                            title="SEND"
                            buttonStyle={{
                                backgroundColor: "#BD3D3A",
                                borderColor: "transparent", 
                                borderRadius: 5
                            }}
                            containerViewStyle={{
                                // alignSelf: 'flex-end',
                                // margin: 20,
                            }}
                        />
                    </View>
                    <View style={{flex:1}}>
                        <Button
                            onPress={this.modalClose}
                            title="CANCEL"
                            buttonStyle={{
                                backgroundColor: "#BCBCBE",
                                borderColor: "transparent", 
                                borderRadius: 5
                            }}
                            containerViewStyle={{
                                // alignSelf: 'flex-end',
                                // margin: 20,
                            }}
                        />
                    </View>
                </View>
            </Modal>
        );
    }

    renderMessage = () => {
        if (this.state.isEnoughEth) {
            return <Text style={styles.messageText}>Are you sure to send {this.props.amountToSendBlc} BLC to {this.props.addressToSendBlc}</Text>            
        } else {
            return <Text style={styles.messageText}>You don't have enough gas.</Text>
        }
    }

    handelPressOk = () => {
        this.sendTransaction();
        setTimeout(() => {
            this.props.hideModalConfirmToSendBlc();            
            this.props.setAddressToSendBlc('');
            this.props.setAmountToSendBlc('');
        },);
        this.props.showModalSpinner('sending');
    }

    modalClose = () => {
        this.props.hideModalConfirmToSendBlc();
        this.setState({gasForSend: 0});
        this.setState({isEnoughEth: false});
    }

    modalOpen = () => {
        this.isEnoughGas();
    }

    isEnoughGas = async () => {
        try {
            const gasLimit = await WalletUtils.getEstimateGasForErc20(
                    DEFAULT_TOKEN_CONTRACT_ADDRESS,
                    DEFAULT_TOKEN_DECIMALS, 
                    this.props.walletForSend.walletAddress,
                    this.props.addressToSendBlc,
                    this.props.amountToSendBlc
            )
            const gasPriceData = await WalletUtils.getGasPrice();
            if (gasLimit === undefined || gasPriceData === undefined) {
                this.setState({isEnoughEth: false});
                return false;
            } else {
                const txFee = gasLimit.wei * gasPriceData;
                this.setState({gasForSend: txFee});
                console.log(this.props.ethBalanceForSend)
                console.log(this.props.ethBalanceForSend)
                console.log(this.props.ethBalanceForSend)
                console.log(this.props.ethBalanceForSend)
                console.log(this.props.ethBalanceForSend)
                
                if ((txFee) <= this.props.ethBalanceForSend) {
                    this.setState({isEnoughEth: true});
                    return true;
                } else {
                    this.setState({isEnoughEth: false});
                    return false;
                }   
            }      
        } catch (error) {
            this.setState({isEnoughEth: false});
            return false;
        }
    }

    sendTransaction = async () => {
        try {  
            const txid = await WalletUtils.sendTransaction(
                { 
                    contractAddress: DEFAULT_TOKEN_CONTRACT_ADDRESS,
                    symbol: DEFAULT_TOKEN_SYMBOL, 
                    decimals: DEFAULT_TOKEN_DECIMALS
                },
                this.props.walletForSend,
                this.props.addressToSendBlc,
                this.props.amountToSendBlc,
            );
            this.props.hideModalSpinner();
            const infomation = {
                title: 'SUCCESS', 
                message1: 'Success to send BLC', 
                transactionId: txid,
            };
            this.props.setModalInfomation(infomation);
            this.props.showModalInfomation();
        } catch (error) {
            console.log('sendTransaction error : ' + error);
            this.props.hideModalSpinner();
            const infomation = {
                title: 'FAIL', 
                message1: 'Fail to send BLC', 
                message2: 'Please check your transaction'
            };
            this.props.setModalInfomation(infomation);
            this.props.showModalInfomation();
        }
    };
}

function mapStateToProps(state) {
    return {
        visibleModalConfirmToSendBlc: state.modal.visibleModalConfirmToSendBlc,
        addressToSendBlc: state.walletTemp.addressToSendBlc,
        amountToSendBlc: state.walletTemp.amountToSendBlc,
        walletForSend: state.walletTemp.walletForSend,
        ethBalanceForSend: state.walletTemp.ethBalanceForSend,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showModalConfirmToSendBlc: () => {
            dispatch(ActionCreator.showModalConfirmToSendBlc());
        },
        hideModalConfirmToSendBlc: () => {
            dispatch(ActionCreator.hideModalConfirmToSendBlc());
        },
        setAddressToSendBlc: (address) => {
            dispatch(ActionCreator.setAddressToSendBlc(address));
        },
        setAmountToSendBlc: (balance) => {
            dispatch(ActionCreator.setAmountToSendBlc(balance));
        },
        showModalInfomation: () => {
            dispatch(ActionCreator.showModalInfomation());
        },
        setModalInfomation: (infomation) => {
            dispatch(ActionCreator.setModalInfomation(infomation));
        },
        showModalSpinner: (message) => {
            dispatch(ActionCreator.showModalSpinner(message));
        },
        hideModalSpinner: () => {
            dispatch(ActionCreator.hideModalSpinner());
        },
    };
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#67AFCB',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
    },
    headerText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    },
    messageContainer: {
        marginVertical : 10,
        paddingHorizontal: 10,
    },
    messageText: {
        textAlign: 'left'
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 5,
    },
})
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirmToSendBlc);

