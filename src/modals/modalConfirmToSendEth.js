
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements'
import Modal from 'react-native-simple-modal';
import ActionCreator from './../actions';
import { connect } from 'react-redux';
import WalletUtils from './../utils/wallet';

class ModalConfirmToSendEth extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Modal 
                offset={0}
                open={this.props.visibleModalConfirmToSendEth}
                animationDuration={200}
                animationTension={40}
                closeOnTouchOutside={true}
                disableOnBackPress={false}
                modalDidClose={() => {this.props.hideModalConfirmToSendEth()}}
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
                    <Text>Are you sure to send {this.props.amountToSendEth} ETH to {this.props.addressToSendEth}</Text>
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
            this.props.hideModalConfirmToSendEth();            
            this.props.setAddressToSendEth('');
            this.props.setAmountToSendEth('');
        },);
    }

    handelPressCancel = () => {
        this.props.hideModalConfirmToSendEth();
    }

    sendTransaction = async () => {
        try {  
            await WalletUtils.sendTransaction(
                { 
                    contractAddress:'', 
                    symbol:'ETH', 
                    decimals:0
                },
                this.props.walletForSend,
                this.props.addressToSendEth,
                this.props.amountToSendEth,
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
        visibleModalConfirmToSendEth: state.modal.visibleModalConfirmToSendEth,
        addressToSendEth: state.walletTemp.addressToSendEth,
        amountToSendEth: state.walletTemp.amountToSendEth,
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
        showModalConfirmToSendEth: () => {
            dispatch(ActionCreator.showModalConfirmToSendEth());
        },
        hideModalConfirmToSendEth: () => {
            dispatch(ActionCreator.hideModalConfirmToSendEth());
        },
        setAddressToSendEth: (address) => {
            dispatch(ActionCreator.setAddressToSendEth(address));
        },
        setAmountToSendEth: (balance) => {
            dispatch(ActionCreator.setAmountToSendEth(balance));
        },
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirmToSendEth);

