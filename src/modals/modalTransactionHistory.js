
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-simple-modal';
import WalletUtils from './../utils/wallet';
import { connect } from 'react-redux';
import ReactMoment from 'react-moment';
import PropTypes from 'prop-types';
import ActionCreator from './../actions';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { defaultTransactionData } from './../config/constants';

class ModalTransactionHistory extends Component {     
    constructor(props, context) {
        super(props);
        this.state = {
            modalTransactionHistoryInfomation: defaultTransactionData
        };
    }

    componentDidMount() {   
        this.setState({
            modalTransactionHistoryInfomation: this.props.modalTransactionHistoryInfomation,
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.modalTransactionHistoryInfomation !== nextProps.modalTransactionHistoryInfomation) {
            this.setState({
                modalTransactionHistoryInfomation: nextProps.modalTransactionHistoryInfomation,
            })
        }
    }
    
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
                    margin: 0,
                    padding:0,
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
                    <View style={{alignSelf:"flex-end", paddingRight:20, position:"absolute"}}>
                        <TouchableOpacity onPress={() => this.closeModal()} value={'0.5'}>
                            <Ionicons name="ios-close-circle-outline" size={20}/>
                        </TouchableOpacity>
                    </View>                      
                </View>
                    <View style={styles.bodyContainer}>
                        <ReactMoment unix element={Text} >{this.state.modalTransactionHistoryInfomation.timeStamp}</ReactMoment>                    
                        <Text>Block : {this.state.modalTransactionHistoryInfomation.blockNumber}</Text>
                        <Text>Status : {this.state.modalTransactionHistoryInfomation.status}</Text>
                        <Text>Value : {WalletUtils.fromWei(this.state.modalTransactionHistoryInfomation.value, 'ether')} {this.state.modalTransactionHistoryInfomation.symbol}</Text>
                        <Text>Fee : {WalletUtils.fromWei(WalletUtils.toWei(this.state.modalTransactionHistoryInfomation.gasUsed, 'gwei'),'ether')} ETH</Text>
                        <View style={styles.BodyContainer2}>
                            <View>
                                <Text>From : </Text>
                            </View>
                            <View>
                                <Text>{this.state.modalTransactionHistoryInfomation.from}</Text>
                            </View>
                        </View>
                        <View style={styles.BodyContainer2}>
                            <View>
                                <Text>To : </Text>
                            </View>
                            <View>
                                <Text>{this.state.modalTransactionHistoryInfomation.to}</Text>
                            </View>
                        </View>
                        <View style={styles.BodyContainer2}>
                            <View>
                                <Text>TxID : </Text>
                            </View>
                            <View>
                                <Text>{this.state.modalTransactionHistoryInfomation.hash}</Text>
                            </View>
                        </View>
                    </View>
                <View style={styles.buttonContainer}>                    
                    <Button
                        onPress={this.handlePress}
                        title="More Infomation"
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
        backgroundColor: '#B4B7BA',
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
