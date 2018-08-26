
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements'
import Modal from 'react-native-simple-modal';
import ActionCreator from './../actions';
import { connect } from 'react-redux';
import WalletUtils from './../utils/wallet';

class ModalConfirmToSend extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Modal 
                offset={0}
                open={this.props.visibleModalConfirmToSend}
                animationDuration={200}
                animationTension={40}
                closeOnTouchOutside={true}
                disableOnBackPress={false}
                modalDidClose={() => {this.props.hideModalConfirmToSend()}}
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
        this.sendErc20Transaction();
        setTimeout(() => {
            this.props.hideModalConfirmToSend();
            this.props.showModalSuccess();
            this.props.setAddressToSendBlc('');
            this.props.setAmountToSendBlc('');
        },);
    }

    handelPressCancel = () => {
        this.props.hideModalConfirmToSend();
    }

    sendErc20Transaction = async () => {
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
        } catch (error) {
            ;
        }
    };

    
}

function mapStateToProps(state) {
    return {
        visibleModalConfirmToSend: state.modal.visibleModalConfirmToSend,
        addressToSendBlc: state.wallet.addressToSendBlc,
        amountToSendBlc: state.wallet.amountToSendBlc,
        walletForSend: state.wallet.walletForSend,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showModalSuccess: () => {
            dispatch(ActionCreator.showModalSuccess());
        },
        hideModalSuccess: () => {
            dispatch(ActionCreator.hideModalSuccess());
        },
        showModalConfirmToSend: () => {
            dispatch(ActionCreator.showModalConfirmToSend());
        },
        hideModalConfirmToSend: () => {
            dispatch(ActionCreator.hideModalConfirmToSend());
        },
        setAddressToSendBlc: (address) => {
            dispatch(ActionCreator.setAddressToSendBlc(address));
        },
        setAmountToSendBlc: (balance) => {
            dispatch(ActionCreator.setAmountToSendBlc(balance));
        },
        showModalSuccess: () => {
            dispatch(ActionCreator.showModalSuccess());
        },
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirmToSend);

