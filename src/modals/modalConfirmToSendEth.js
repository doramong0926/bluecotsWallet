
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

    state = {
        gasForSend: 0,
        isEnoughEth: false,
    };

    render() {
        return (
            <Modal 
                offset={0}
                open={this.props.visibleModalConfirmToSendEth}
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
                    marginHorizontal: 20,
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
                <View style={styles.bodyContainer}>  
                    {this.renderMessage()}            
                    <Text style={styles.bodyText}>txFee : {this.state.gasForSend.toFixed(14)} ETH</Text>                    
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
            return <Text style={styles.messageText}>Are you sure to send {this.props.amountToSendEth} ETH to {this.props.addressToSendEth}</Text>
        } else {
            return <Text style={styles.messageText}>You don't have enough gas.</Text>
        }
    }

    handelPressOk = () => {
        this.props.hideModalConfirmToSendEth();
        if (this.props.modalFinishProcess) {
            this.props.modalFinishProcess();
        }
    }

    modalClose = () => {
        this.props.hideModalConfirmToSendEth();
        this.setState({gasForSend: 0});
        this.setState({isEnoughEth: false});
    }

    modalOpen = () => {
        this.isEnoughGas();
    }

    isEnoughGas = async () => {
        try {
            const gasLimit = await WalletUtils.getEstimateGasForEth(
                    this.props.walletForSend.walletAddress,
                    this.props.addressToSendEth,
                    this.props.amountToSendEth
            )
            const gasPriceData = await WalletUtils.getGasPrice();
            if (gasLimit === undefined || gasPriceData === undefined) {
                this.setState({isEnoughEth: false});
                return false;
            } else {
                const txFee = gasLimit.wei * gasPriceData;
                this.setState({gasForSend: txFee});
                if (this.props.amountToSendEth <= this.props.ethBalanceForSend - txFee) {
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
}

function mapStateToProps(state) {
    return {
        visibleModalConfirmToSendEth: state.modal.visibleModalConfirmToSendEth,
        addressToSendEth: state.walletTemp.addressToSendEth,
        amountToSendEth: state.walletTemp.amountToSendEth,
        walletForSend: state.walletTemp.walletForSend,
        ethBalanceForSend: state.walletTemp.ethBalanceForSend,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        hideModalConfirmToSendEth: () => {
            dispatch(ActionCreator.hideModalConfirmToSendEth());
        },
    };
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
        margin: 20,
    }, 
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    headerText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    },
    bodyText: {
        textAlign: 'left'
    },
})
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirmToSendEth);

