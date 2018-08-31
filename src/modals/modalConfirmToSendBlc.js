
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements'
import Modal from 'react-native-simple-modal';
import ActionCreator from './../actions';
import { connect } from 'react-redux';
import WalletUtils from './../utils/wallet';

class ModalConfirmToSendBlc extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Modal 
                offset={0}
                open={this.props.visibleModalConfirmToSendBlc}
                animationDuration={200}
                animationTension={40}
                closeOnTouchOutside={true}
                disableOnBackPress={false}
                modalDidClose={() => {this.props.hideModalConfirmToSendBlc()}}
                modalDidOpen={() => undefined}
                modalProps={undefined}
                containerProps={undefined}
                containerStyle={{
                    justifyContent: "center"
                }}
                modalStyle={{
                    borderRadius: 2,
                    margin: 20,
                    padding: 10,
                    backgroundColor: "white"
                }}
                overlayStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                    flex: 1
                }}
            >
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>  
                    <Text>Are you sure to send {this.props.amountToSendBlc} BLC to {this.props.addressToSendBlc}</Text>
                </View>
                <Button
                    onPress={this.handelPressOk}
                    title="OK"
                />
                <Button
                    onPress={this.handelPressCancel}
                    title="CANCEL"
                />
            </Modal>
        );
    }

    handelPressOk = () => {
        this.sendTransaction();
        setTimeout(() => {
            this.props.hideModalConfirmToSendBlc();            
            this.props.setAddressToSendBlc('');
            this.props.setAmountToSendBlc('');
        },);
    }

    handelPressCancel = () => {
        this.props.hideModalConfirmToSend();
    }

    sendTransaction = async () => {
        try {  
            await WalletUtils.sendTransaction(
                { 
                    contractAddress: process.env.DEFAULT_TOKEN_CONTRACT_ADDRESS,
                    symbol: process.env.DEFAULT_TOKEN_SYMBOL, 
                    decimals: process.env.DEFAULT_TOKEN_DECIMALS
                },
                this.props.walletForSend,
                this.props.addressToSendBlc,
                this.props.amountToSendBlc,
            );
            this.props.showModalSuccess();
        } catch (error) {
            console.log('sendTransaction error : ' + error);
            this.props.showModalFail();
        }
    };

    
}

function mapStateToProps(state) {
    return {
        visibleModalConfirmToSendBlc: state.modal.visibleModalConfirmToSendBlc,
        addressToSendBlc: state.walletTemp.addressToSendBlc,
        amountToSendBlc: state.walletTemp.amountToSendBlc,
        walletForSend: state.walletTemp.walletForSend,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showModalSuccess: () => {
            dispatch(ActionCreator.showModalSuccess());
        },
        showModalFail: () => {
            dispatch(ActionCreator.showModalFail());
        },
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
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirmToSendBlc);

