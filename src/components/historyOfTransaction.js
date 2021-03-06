
import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import ActionCreator from '../actions';
import PropTypes from 'prop-types';
import WalletUtils from '../utils/wallet';
import ReactMoment from 'react-moment';
import Spinner from 'react-native-loading-spinner-overlay';
import { Divider } from '@doramong0926/react-native-material-design';

import { 
    DEFAULT_TOKEN_SYMBOL,
    DEFAULT_TOKEN_CONTRACT_ADDRESS,
    DEFAULT_TOKEN_DECIMALS,
    defaultTransactionData,
    defaultWallet,
  } from '../config/constants';

//import RNFS from "react-native-fs"


class HistoryOfTransaction extends Component{  
    static propTypes = {      
        defaultWallet: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,
    };

    constructor(props, context) {
        super(props);
        this.state = {
            dataSourceForTransaction: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            transactionHistoryData: defaultTransactionData,
            isNoTransactionData: true,
            defaultWallet: defaultWallet,
            tokenName: 'BLC',
            previousTokenName: 'BLC',
        };
    }

    componentDidMount() {       
        this.setState({
            defaultWallet: this.props.defaultWallet,
            tokenName: this.props.tokenName,
            previousTokenName: this.props.tokenName,
        }) 
        this.fetchTransaction();
        setInterval(() => {
            this.fetchTransaction();
        }, 10000)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.defaultWallet !== nextProps.defaultWallet) {
            this.setState({
                defaultWallet: nextProps.defaultWallet,
            }) 
            this.fetchTransaction();
        }
        if (this.props.tokenName != nextProps.tokenName) {
            this.setState({
                tokenName: nextProps.tokenName,
            }) 
        }
        if (this.props.previousTokenName != nextProps.previousTokenName) {
            this.setState({
                previousTokenName: nextProps.previousTokenName,
            }) 
        }
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
                            <View style={{flexDirection:'row', alignItems: 'center'}}>
                                <View style={{width: 60, borderRadius:50, backgroundColor:'#92B558'}}>
                                    {
                                        (txData.from == this.state.defaultWallet.walletAddress) ? 
                                            ( <Text style={{fontSize:12, textAlign:'center'}}>Send</Text> ) : 
                                            ( <Text style={{fontSize:12, textAlign:'center'}}>Receive</Text> )
                                    }
                                </View>
                                <View style={{flexDirection:'row', paddingLeft: 5}}>
                                    <Text style={{textAlign:'center'}}>{WalletUtils.fromWei(txData.value, 'ether')} </Text>
                                    <Text style={{textAlign:'center'}}>
                                        {(this.props.isLoadingTxData === true) ? 
                                            (this.state.previousTokenName) : 
                                            (this.state.tokenName)}
                                    </Text>
                                    <Text style={{textAlign:'center'}}> (
                                        <ReactMoment unix fromNow style={{textAlign:'center'}} element={Text} >{txData.timeStamp}</ReactMoment>
                                        )
                                    </Text>
                                </View>
                            </View>    
                            <View style={{marginTop: 5}}>
                                {                  
                                    (txData.from == this.state.defaultWallet.walletAddress) ? 
                                    (<Text style={{fontSize: 12}}>to : {txData.to}</Text>) :
                                    (<Text style={{fontSize: 12}}>from : {txData.from}</Text>)
                                }
                            </View>  
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
                if(this.props.isLoadingTxData !== false) {
                    this.props.setIsLoadingTxData(false);
                    this.setState({previousTokenName: this.props.tokenName});                
                }
            } else if (txData.message === 'NO_TRANSACTIONS_FOUND') {
                this.setState({transactionHistoryData: defaultTransactionData});
                this.state.dataSourceForTransaction = this.state.dataSourceForTransaction.cloneWithRows(this.state.transactionHistoryData) 
                this.setState({isNoTransactionData: true});
                if(this.props.isLoadingTxData !== false) {
                    this.props.setIsLoadingTxData(false);
                    this.setState({previousTokenName: this.props.tokenName});
                }
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