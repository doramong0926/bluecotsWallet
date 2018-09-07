
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

import { 
    ETHERSCAN_API_KEY,
    INFURA_API_KEY ,
    SEGMENT_API_KEY,
    NETWORK,
    DEFAULT_TOKEN_NAME,
    DEFAULT_TOKEN_SYMBOL,
    DEFAULT_TOKEN_CONTRACT_ADDRESS,
    DEFAULT_TOKEN_DECIMALS,
    WALLET_VERSION
  } from './../../config/constants';

//import RNFS from "react-native-fs"


class historyScreen extends Component{  
    static navigationOptions = {
        //tabBarVisible: false,
        tabBarLabel: 'history',
        tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-stats" size={30} color={tintColor} />
        )
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
        isLoading: true,
        txData: [
            {
                blockNumber: '',
                timeStamp: '',
                hash : '',
                from: '',
                value: '',
            },
        ],
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
        }, 5000)
    }

    componentWillReceiveProps() {
        this.fetchTransaction();
    }

    render(){
        const unixTimestamp = 198784740;
        return (
            <View style={styles.container}>
                <Header
                    backgroundColor={'#092834'}
                    //leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'History', style: { fontWeight: 'bold', color: '#fff' } }}
                    //rightComponent={{ icon: 'home', color: '#fff' }}
                />                
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
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                    <Text> data fetching... </Text>
                </View>
            )
        } else {
            return ( 
                <View style={{ flex: 1, alignItems: 'center'}}>
                    <View style={{margin: 5, borderColor: 'gray', borderWidth: 0.5}}></View>
                    <ListView
                        dataSource={this.state.dataSourceForTransaction}
                        renderRow={this.renderTransaction}
                        style={styles.listViewContainer}
                    />
                </View>
            )
        }
    }

    renderTransaction = (txData) => {
        if (txData.from !== undefined && txData.from !== '') {
            return (
                <View>
                    <TouchableHighlight onPress={() => this.handlePress(txData)} underlayColor="gray">
                    <View style={styles.listViewContainer}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{width: 60, borderRadius:50, backgroundColor:'green'}}>
                                {
                                    (txData.from == this.props.walletForHistory.walletAddress) ? 
                                        ( <Text style={{textAlign:'center'}}>Sent</Text> ) : 
                                        ( <Text style={{textAlign:'center'}}>Received</Text> )
                                }
                            </View>
                            <Text> {WalletUtils.fromWei(txData.value)} BLC (</Text>
                            <Moment unix fromNow element={Text} >{txData.timeStamp}</Moment>
                            <Text>)</Text>           
                        </View>
                        <Text>{txData.hash}</Text>
                    </View>
                    </TouchableHighlight>
                    <View style={{margin: 10, borderColor: 'gray', borderWidth: 0.5}}></View>
                </View>
             ) 
        }
    }

    handlePress = (txData) => {
        const infomation = {
            title: 'TRANSACTION', 
            message1: 'Timestamp' + txData.timeStamp, 
            message2: 'TXID : ' + txData.hash, 
            message3: 'Sent ' + WalletUtils.fromWei(txData.value) + ' BLC', 
            
        };
        this.props.setModalInfomation(infomation);
        this.props.showModalInfomation();
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
            
            if (txData.message === 'OK') {
                console.log("fetching wallet address: " + this.props.walletForHistory.walletAddress)
                this.setState({txData: txData.result})                
                this.state.dataSourceForTransaction = this.state.dataSourceForTransaction.cloneWithRows(this.state.txData)
                this.props.setIsLoadingTxData(false);
            } else if (txData.message === 'No transactions found') {
                this.props.setIsLoadingTxData(true);
            } else {
                ;
            }
        }
    }
}

function mapStateToProps(state) {
    return {
        walletForHistory: state.walletTemp.walletForHistory,
        defaultWallet: state.wallet.defaultWallet,
        isLoadingTxData:state.walletTemp.isLoadingTxData,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setWalletForHistory: (wallet) => {
            dispatch(ActionCreator.setWalletForHistory(wallet));
        },
        showModalInfomation: () => {
            dispatch(ActionCreator.showModalInfomation());
        },
        setModalInfomation: (infomation) => {
            dispatch(ActionCreator.setModalInfomation(infomation));
        },
        setIsLoadingTxData: (value) => {
            dispatch(ActionCreator.setIsLoadingTxData(value));
        },
        showModalInfomation: () => {
            dispatch(ActionCreator.showModalInfomation());
        },
        setModalInfomation: (infomation) => {
            dispatch(ActionCreator.setModalInfomation(infomation));
        },
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(historyScreen);
 

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
})