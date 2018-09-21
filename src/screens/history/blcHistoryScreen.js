
import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Header } from 'react-native-elements'
import { connect } from 'react-redux';
import WalletAddressWithNickNameForHistory from './../../components/walletAddressWithNickNameForHistory';
import ActionCreator from './../../actions';
import PropTypes from 'prop-types';
import WalletUtils from './../../utils/wallet';
import Moment from 'react-moment';
import Spinner from 'react-native-loading-spinner-overlay';

import { 
    ETHERSCAN_API_KEY,
    INFURA_API_KEY ,
    SEGMENT_API_KEY,
    NETWORK,
    DEFAULT_TOKEN_NAME,
    DEFAULT_TOKEN_SYMBOL,
    DEFAULT_TOKEN_CONTRACT_ADDRESS,
    DEFAULT_TOKEN_DECIMALS,
    WALLET_VERSION,
    defaultTransactionData,
  } from './../../config/constants';

//import RNFS from "react-native-fs"


class BlcHistoryScreen extends Component{  
    static navigationOptions = {
        //tabBarVisible: false,
        tabBarLabel: 'BLC',        
    };  

    static propTypes = {
        walletForHistory: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,        
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
        this.props.setWalletForHistory(this.props.defaultWallet);
        setTimeout(() => {
            this.fetchTransaction();    
        },);
    }

    componentDidMount() {
        this.fetchTransaction();
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
                <View>
                    <WalletAddressWithNickNameForHistory />
                </View>
                {this.renderListView()}
            </View>  
        );        
    }

    renderListView = () => {
        if (this.props.isLoadingTxData === true) {
            return (
                <View>                
                    <Spinner visible={this.props.isLoadingTxData} cancelable={true} textContent="fetching" textStyle={{fontSize:20, fontWeight:'normal', color: '#FFF'}}/>
                </View>
            )
        } else {
            return ( 
                <View style={{ flex: 1, alignItems: 'center'}}>
                    {
                        (this.state.isNoTransactionData == true) ? 
                        (
                            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                                <Text>There is no transactions.</Text>
                            </View>
                        ) :
                        (
                            <View>
                                <View style={styles.statusContainer}>
                                    <View style={styles.statusIconContainer}>
                                        <View style={styles.statusIcon1}>
                                        </View>
                                        <Text style={styles.statusGuideFont}> Success</Text>
                                    </View>
                                    <View style={styles.statusIconContainer}>
                                        <View style={styles.statusIcon2}>
                                        </View>
                                        <Text style={styles.statusGuideFont}> Pending</Text>
                                    </View>
                                    <View style={styles.statusIconContainer}>
                                        <View style={styles.statusIcon3}>
                                        </View>
                                        <Text style={styles.statusGuideFont}> Failure</Text>
                                    </View>
                                </View>
                                <View style={{marginHorizontal: 20, marginTop: 10, borderColor: 'gray', borderWidth: 0.5}}></View>            
                                <ListView
                                    dataSource={this.state.dataSourceForTransaction}
                                    renderRow={this.renderTransaction}
                                    style={styles.listViewContainer}
                                />
                            </View>
                        )
                    }     
                </View>
            )
        }
    }

    renderTransaction = (txData) => {
        if (txData.from !== undefined && txData.from !== '' && txData.value !== '0') {
            return (
                <View>
                    <TouchableHighlight onPress={() => this.handlePress(txData)} underlayColor="gray">
                    <View style={styles.listViewContainer}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{width: 60, borderRadius:50, backgroundColor:'#92B558'}}>
                                {
                                    (txData.from == this.props.walletForHistory.walletAddress) ? 
                                        ( <Text style={{fontSize:12, textAlign:'center'}}>Send</Text> ) : 
                                        ( <Text style={{fontSize:12, textAlign:'center'}}>Receive</Text> )
                                }
                            </View>
                            <Text> {WalletUtils.fromWei(txData.value, 'ether')} BLC (</Text>
                            <Moment unix fromNow element={Text} >{txData.timeStamp}</Moment>
                            <Text>)</Text>           
                        </View>      
                            {                  
                                (txData.from == this.props.walletForHistory.walletAddress) ? 
                                (<Text style={{fontSize: 12}}>to : {txData.to}</Text>) :
                                (<Text style={{fontSize: 12}}>from : {txData.from}</Text>)
                            }
                    </View>
                    </TouchableHighlight>
                    <View style={{marginHorizontal: 10, marginVertical: 5, borderColor: 'gray', borderWidth: 0.5}}></View>
                </View>
             ) 
        }
        else {
            return (
                <View></View>
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
            symbol: "BLC",
            status: "Success"
        }

        this.props.setModalTransactionHistoryInfomation(infomation);
        this.props.showModalTransactionHistory();
    } 

    fetchTransaction = async() => {
        if (this.props.walletForHistory.walletAddress !== undefined && this.props.walletForHistory.walletAddress !== '')
        {
            const txData = await WalletUtils.getTransactions(
                DEFAULT_TOKEN_CONTRACT_ADDRESS,
                this.props.walletForHistory.walletAddress,
                DEFAULT_TOKEN_DECIMALS,
                DEFAULT_TOKEN_SYMBOL,
            )
            // WalletUtils.getUnconfimrdTransaction();
            
            if (txData.message === 'OK') {
                this.setState({transactionHistoryData: this.parsingTxData(txData.result)});
                this.state.dataSourceForTransaction = this.state.dataSourceForTransaction.cloneWithRows(this.state.transactionHistoryData)
                this.setState({isNoTransactionData: false});
                this.props.setIsLoadingTxData(false);
                
            } else if (txData.message === 'No transactions found') {
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

    parsingTxData = (data) => {
        return data.filter(t=> (t.from === this.props.walletForHistory.walletAddress || t.to === this.props.walletForHistory.walletAddress))
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
        walletForHistory: state.walletTemp.walletForHistory,
        defaultWallet: state.wallet.defaultWallet,
        isLoadingTxData: state.walletTemp.isLoadingTxData,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setWalletForHistory: (wallet) => {
            dispatch(ActionCreator.setWalletForHistory(wallet));
        },
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
  
export default connect(mapStateToProps, mapDispatchToProps)(BlcHistoryScreen);
 

const styles = StyleSheet.create({
    container: {        
        flex: 1,
        backgroundColor: '#E4F1F6',   
    },
    container2: {
        flex: 1,               
        alignItems: 'center',   
        justifyContent: 'center',
    },
    listViewContainer: {
        flex: 1,
        margin : 5,
        padding: 5,
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