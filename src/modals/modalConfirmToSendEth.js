
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
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
                <View style={styles.heaerContainer}>
                    <Text style={styles.headerText}>Confirmation</Text>
                </View>
                <View style={styles.messageContainer}>  
                    <Text style={styles.messageText}>Are you sure to send {this.props.amountToSendEth} ETH to {this.props.addressToSendEth}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <View style={{flex:1}}>
                        <Button
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
                            onPress={this.handelPressCancel}
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

    handelPressOk = () => {
        this.sendTransaction();
        setTimeout(() => {
            this.props.hideModalConfirmToSendEth();            
            this.props.setAddressToSendEth('');
            this.props.setAmountToSendEth('');
        },);
        this.props.showModalSpinner('sending');
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
            this.props.hideModalSpinner();
            const infomation = {
                title: 'SUCCESS', 
                message1: 'Success to send ETH', 
            };
            this.props.setModalInfomation(infomation);
            this.props.showModalInfomation();
        } catch (error) {
            console.log('sendTransaction error : ' + error);
            this.props.hideModalSpinner();
            const infomation = {
                title: 'FAIL', 
                message1: 'Fail to send ETH', 
                message2: 'Please check your transaction'
            };
            this.props.setModalInfomation(infomation);
            this.props.showModalInfomation();
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
    heaerContainer: {
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
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirmToSendEth);

