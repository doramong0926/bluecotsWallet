
import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Header } from 'react-native-elements'
import { connect } from 'react-redux';
import WalletAddressWithNickNameForHistory from './../../components/walletAddressWithNickNameForHistory';
import ActionCreator from './../../actions';
import PropTypes from 'prop-types';
import WalletUtils from './../../utils/wallet';

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
    };

    componentDidMount() {
        this.fetchTransaction();
    }

    componentWillMount() {
        this.props.setWalletForHistory(this.props.defaultWallet);
    }

    componentWillUpdate() {
        //this.fetchTransaction();
    }

    render(){
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
                <View style={styles.container2}>
                    <ListView
                        dataSource={this.state.dataSourceForTransaction}
                        renderRow={this.renderTransaction}
                        style={styles.listViewContainer}
                    />
                </View>                
            </View>  
        );        
    }

    renderTransaction = (txData) => {
        if (txData !== undefined && txData !== '') {
            return (
                <View>
                    <Text> timeStamp : {txData.timeStamp}</Text>
                    <Text> hash : {txData.hash}</Text>
                    <Text> from : {txData.from}</Text>
                    <Text> value : {txData.value}</Text>
                </View>
             ) 
        } else {
            return (
                <View>
                </View>
            )
        }
    }

    fetchTransaction = async() => {
        const txData = await WalletUtils.getTransactions(
            DEFAULT_TOKEN_CONTRACT_ADDRESS,
            this.props.walletForHistory.walletAddress,
            DEFAULT_TOKEN_DECIMALS,
            DEFAULT_TOKEN_SYMBOL,
        )
        // console.log('txtxtxtxttx from' + txData.from);
        // console.log('txtxtxtxttx timestamp' + txData.timestamp);
        // console.log('txtxtxtxttx transactionHash' + txData.transactionHash);
        // console.log('txtxtxtxttx value' + txData.value);
        console.log('txtxtxtxttx' + txData[0].from);
        console.log('txtxtxtxttx' + txData[0].timeStamp);
        console.log('txtxtxtxttx' + txData[0].hash);
        console.log('txtxtxtxttx' + txData[0].value);
        // this.setState({txData: txData})
        this.state.dataSourceForTransaction = this.state.dataSourceForTransaction.cloneWithRows(txData);
    }
}

function mapStateToProps(state) {
    return {
        walletForHistory: state.walletTemp.walletForHistory,
        defaultWallet: state.wallet.defaultWallet,
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
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(historyScreen);
 

const styles = StyleSheet.create({
    container: {        
        flex: 1,
        backgroundColor: '#E4F1F6',   
    },
    container2: {                
        alignItems: 'center',     
    },
    listViewContainer: {
        paddingTop: 20,
    }, 
})