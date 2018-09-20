
import React, { Component } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Linking } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-simple-modal';
import WalletUtils from './../utils/wallet';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import ActionCreator from './../actions';

class ModalTransactionHistory extends Component {     
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        walletForHistory: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,        
    };
    
    render() {
        return (
            <Modal 
                offset={0}
                open={this.props.visibleModalTransactionHistory}
                animationDuration={200}
                animationTension={40}
                closeOnTouchOutside={true}
                disableOnBackPress={false}
                modalDidClose={() => {this.closeModal()}}
                modalDidOpen={() => undefined}
                modalProps={undefined}
                containerProps={undefined}
                containerStyle={{
                    justifyContent: "center",
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
                    <Text style={styles.headerText}>Transaction History</Text>
                </View>
                <TouchableHighlight onPress={() => this.handlePress()} underlayColor="gray">
                    <View style={styles.bodyContainer}>
                        <View>
                            <Moment unix element={Text} >{this.props.modalTransactionHistoryInfomation.timeStamp}</Moment>                    
                            <Text>Block : {this.props.modalTransactionHistoryInfomation.blockNumber}</Text>
                            <Text>Status : {this.props.modalTransactionHistoryInfomation.status}</Text>
                            <Text>Value : {WalletUtils.fromWei(this.props.modalTransactionHistoryInfomation.value, 'ether')} {this.props.modalTransactionHistoryInfomation.symbol}</Text>
                            <Text>Fee : {WalletUtils.fromWei(WalletUtils.toWei(this.props.modalTransactionHistoryInfomation.gasUsed, 'gwei'),'ether')} ETH</Text>
                            
                                <View style={styles.BodyContainer2}>
                                    <View>
                                        <Text>From : </Text>
                                    </View>
                                    <View>
                                        <Text>{this.props.modalTransactionHistoryInfomation.from}</Text>
                                    </View>
                                </View>
                                <View style={styles.BodyContainer2}>
                                    <View>
                                        <Text>To : </Text>
                                    </View>
                                    <View>
                                        <Text>{this.props.modalTransactionHistoryInfomation.to}</Text>
                                    </View>
                                </View>
                                <View style={styles.BodyContainer2}>
                                    <View>
                                        <Text>TxID : </Text>
                                    </View>
                                    <View>
                                        <Text>{this.props.modalTransactionHistoryInfomation.hash}</Text>
                                    </View>
                                </View>
                        </View>
                        <View style={{margin:10, alignItems:'center'}}>
                            <Text>Click to more infomation</Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <View style={styles.buttonContainer}>                    
                    <Button
                        onPress={this.closeModal}
                        title="Close"
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
            </Modal>
        );
    }

    closeModal = () => {
        this.props.hideModalTransactionHistory();
    }

    handlePress = () => {
        const address = "https://ropsten.etherscan.io/tx/" + this.props.modalTransactionHistoryInfomation.hash;
        Linking.canOpenURL(address).then(supported => {
            if (supported) {
                Linking.openURL(address);
            } 
        });
    }
}

function mapStateToProps(state) {
    return {
        visibleModalTransactionHistory: state.modal.visibleModalTransactionHistory,
        modalTransactionHistoryInfomation: state.modal.modalTransactionHistoryInfomation,
        walletForHistory: state.walletTemp.walletForHistory,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        hideModalTransactionHistory: () => {
            dispatch(ActionCreator.hideModalTransactionHistory());
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
    BodyContainer2: {
        flexDirection: 'row',
        paddingRight: 40, 
    },
    buttonContainer: {
        marginBottom: 10,
    },
    headerText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalTransactionHistory);
