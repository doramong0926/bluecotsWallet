
import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import ActionCreator from '../actions';
import PropTypes from 'prop-types';
import WalletUtils from '../utils/wallet';
import Moment from 'react-moment';
import Spinner from 'react-native-loading-spinner-overlay';
import { Divider } from 'react-native-material-design';

import { 
    DEFAULT_TOKEN_SYMBOL,
    DEFAULT_TOKEN_CONTRACT_ADDRESS,
    DEFAULT_TOKEN_DECIMALS,
    defaultTransactionData,
  } from '../config/constants';

//import RNFS from "react-native-fs"


class HistoryOfTransaction extends Component{  
    static propTypes = {      
        defaultWallet: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,
    };

    state = {
        dataSourceForTransaction: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        transactionHistoryData: defaultTransactionData,
        isNoTransactionData: true
    };

    componentWillMount() {
        this.fetchTransaction();  
    }

    componentDidMount() {
        setInterval(() => {
            this.fetchTransaction();
        }, 10000)
    }

    componentWillReceiveProps() {
        this.fetchTransaction();
    }

    render(){
        return (
            <View style={styles.container}>
                {this.renderListView()}
            </View>  
        );        
    }

    renderListView = () => {
        return ( 
            <View style={{ flex: 1}}>
                {
                    (this.state.isNoTransactionData == true) ? 
                    (
                        <View>
                            <View style={{flex:1, height: 120, alignItems: 'center', justifyContent: 'center'}}>
                                <Text>There is no transactions.</Text>
                            </View>
                        </View>
                    ) :
                    (
                        <View style={styles.listViewContainer}>
                            <ListView
                                enableEmptySections={true}
                                dataSource={this.state.dataSourceForTransaction}
                                renderRow={this.renderTransaction}
                                style={styles.listViewInnerContainer}
                            />
                        </View>
                    )
                }
                {(this.props.isLoadingTxData === true) ? 
                    (<View>                
                        <Spinner visible={this.props.isLoadingTxData} cancelable={true} textContent="fetching" textStyle={{fontSize:20, fontWeight:'normal', color: '#FFF'}}/>
                    </View>) :
                    (<View></View>)
                }     
            </View>
        )
    }

    renderTransaction = (txData) => {
        if (txData.from !== undefined && txData.from !== '') {
            return (
                <View>
                    <Divider />
                    <TouchableOpacity onPress={() => this.handlePress(txData)} value="0.5">
                        <View style={styles.listViewInnerContainer}>
                            <View style={{flexDirection:'row'}}>
                                <View style={{width: 60, borderRadius:50, backgroundColor:'#92B558'}}>
                                    {
                                        (txData.from == this.props.defaultWallet.walletAddress) ? 
                                            ( <Text style={{fontSize:12, textAlign:'center'}}>Send</Text> ) : 
                                            ( <Text style={{fontSize:12, textAlign:'center'}}>Receive</Text> )
                                    }
                                </View>
                                <Text> {WalletUtils.fromWei(txData.value, 'ether')} {this.props.tokenName} (</Text>
                                <Moment unix fromNow element={Text} >{txData.timeStamp}</Moment>
                                <Text>)</Text>           
                            </View>      
                                {                  
                                    (txData.from == this.props.defaultWallet.walletAddress) ? 
                                    (<Text style={{fontSize: 12}}>to : {txData.to}</Text>) :
                                    (<Text style={{fontSize: 12}}>from : {txData.from}</Text>)
                                }
                        </View>
                    </TouchableOpacity>
                </View>
             ) 
        }
        else {
            return (
                <Text></Text>
            )
        }
    }

    handlePress = (txData) => {
        const infomation = {
            blockNumber: txData.blockNumber,
            timeStamp: txData.timeStamp,
            hash : txData.hash,
            from: txData.from,
            value: txData.value,
            to: txData.to,
            gasUsed: txData.gasUsed,
            symbol: this.props.tokenName,
            status: "Success"
        }

        this.props.setModalTransactionHistoryInfomation(infomation);
        this.props.showModalTransactionHistory();
    } 

    fetchTransaction = async() => {
        if (this.props.defaultWallet.walletAddress !== undefined && this.props.defaultWallet.walletAddress !== '')
        {
            if (this.props.tokenName == 'BLC') {
                var txData = await WalletUtils.getTransactions(
                    DEFAULT_TOKEN_CONTRACT_ADDRESS,
                    this.props.defaultWallet.walletAddress,
                    DEFAULT_TOKEN_DECIMALS,
                    DEFAULT_TOKEN_SYMBOL,
                    this.props.offset,
                )
            } else {
                var txData = await WalletUtils.getTransactions(
                    null,
                    this.props.defaultWallet.walletAddress,
                    null,
                    "ETH",
                    this.props.offset,
                )
            }

            if (txData.message === 'OK') {
                this.setState({transactionHistoryData: this.parsingTxData(txData.result)});
                this.state.dataSourceForTransaction = this.state.dataSourceForTransaction.cloneWithRows(this.state.transactionHistoryData)
                this.setState({isNoTransactionData: false});
                this.props.setIsLoadingTxData(false);                
            } else if (txData.message === 'NO_TRANSACTIONS_FOUND') {
                this.setState({transactionHistoryData: defaultTransactionData});
                this.state.dataSourceForTransaction = this.state.dataSourceForTransaction.cloneWithRows(this.state.transactionHistoryData) 
                this.setState({isNoTransactionData: true});
                this.props.setIsLoadingTxData(false);
            } else {
                ;
            }
        }
    }

    fetchingTxReceiptStatus = (hash) => {
        return '1';
        
        const txStatus = WalletUtils.getTxReceiptStatus(hash);    
        if (txStatus.message !== 'OK') {
            return '0';
        } else if (txStatus.result.status === 1) {
            return '1';
        } else {
            return '0';
        }       
    }

    parsingTxData = (txData) => {
        return txData.filter(t=> (t.from === this.props.defaultWallet.walletAddress || t.to === this.props.defaultWallet.walletAddress))
            .map(t => ({
                from: t.from,
                to: t.to,
                timeStamp: t.timeStamp,  
                hash: t.hash,  
                value: t.value,
                blockNumber: t.blockNumber,
                gasUsed: t.gasUsed,
                isError: '0',
                txreceipt_status : this.fetchingTxReceiptStatus(t.hash),
            }))
    }
}

function mapStateToProps(state) {
    return {
        defaultWallet: state.wallet.defaultWallet,
        isLoadingTxData: state.walletTemp.isLoadingTxData,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setIsLoadingTxData: (value) => {
            dispatch(ActionCreator.setIsLoadingTxData(value));
        },        
        showModalTransactionHistory: () => {
            dispatch(ActionCreator.showModalTransactionHistory());
        },
        setModalTransactionHistoryInfomation: (infomation) => {
            dispatch(ActionCreator.setModalTransactionHistoryInfomation(infomation));
        },
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(HistoryOfTransaction); 

const styles = StyleSheet.create({
    container: {        
        flex: 1, 
    },
    listViewContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    listViewInnerContainer: {
        flex: 1,
        marginHorizontal: 0,
        marginVertical : 5,
        paddingHorizontal: 0,
        paddingVertical: 5,
    },
    statusContainer: {
        marginHorizontal: 20, 
        marginVertical: 5, 
        flexDirection:'row', 
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    statusIconContainer: {
        flexDirection: 'row',
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusIcon1: {
        width:10, 
        height:10, 
        backgroundColor: '#92B558', 
        borderRadius:100
    },
    statusIcon2: {
        width:10, 
        height:10, 
        backgroundColor: '#D5AE41', 
        borderRadius:100
    },
    statusIcon3: {
        width:10, 
        height:10, 
        backgroundColor: '#BD3D3A', 
        borderRadius:100
    },
    statusGuideFont: {
        fontSize: 12,
    }
})