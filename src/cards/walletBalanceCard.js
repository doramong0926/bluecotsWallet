import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ActionCreator from '../actions';
import WalletUtils from '../utils/wallet';

import ETH_ICON_IMAGE from './images/ethereum_40x40.png';
import BLC_ICON_IMAGE from './images/bluecots_COIN_40x40.png';
import TokenSymbolWithName from './../components/tokenSymbolWithName';
import MainWalletMenu from './../components/mainWalletMenu';
import PropTypes from 'prop-types';
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
 } from '../config/constants';
 import { Card, Divider } from 'react-native-material-design';

class WalletBalanceCard extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        defaultWallet: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,
    };

    componentDidMount(){
        this.updateWalletBalance();
        setInterval(() => {
            this.updateWalletBalance();
        }, 1000)
    }

    render() {
        return (
            <View style={styles.container}>         
                <Card style={styles.containerCard}>
                    <Card.Body>
                        <View style={styles.containerTitle}>
                            <Text style={styles.textTitle}>Balance ({this.props.defaultWallet.nickName})</Text>
                            <Text style={styles.descriptionText}>{this.props.defaultWallet.walletAddress}</Text>
                        </View>
                        <View style={styles.containerBalanceTop}>
                            <View style={{flex: 2, flexDirection: 'row'}}>
                                <TokenSymbolWithName icon={BLC_ICON_IMAGE} tokenString={'BLC'} tokenName={'bluecots'} />
                            </View>
                            <View style={{flex: 5, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <Text style={styles.balanceText}>
                                    {(this.props.blcBalance) ? this.props.blcBalance.toFixed(3): '0.000'}
                                </Text>
                                <Text style={{fontSize :10, textAlign: 'center' }}> BLC</Text>
                            </View>
                        </View>
                        <Divider />
                        <View style={styles.containerBalanceBottom}>
                            <View style={{flex: 2, flexDirection: 'row'}}>
                                <TokenSymbolWithName icon={ETH_ICON_IMAGE} tokenString={'ETH'} tokenName={'ethereum'} />
                            </View>
                            <View style={{flex: 5, flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <Text style={styles.balanceText}>
                                    {(this.props.ethBalance) ? this.props.ethBalance.toFixed(3): '0.000'}
                                </Text>
                                <Text style={{fontSize :10, textAlign: 'center' }}> ETH</Text>
                            </View>
                        </View>
                        <Divider />                            
                        <View style={styles.containerMenuIcon}>
                            <MainWalletMenu navigation={this.props.navigation}/>
                        </View>
                    </Card.Body>
                </Card>         
            </View>
        );
    }    
    
    updateWalletBalance = async () => {
        if (this.props.defaultWallet.walletAddress) {
                const currentETHBalance = await WalletUtils.getBalance({
                walletAddress: this.props.defaultWallet.walletAddress,
                contractAddress:'', 
                symbol:'ETH', 
                decimals:0
            });
                const currentBLCBalance = await WalletUtils.getBalance({
                walletAddress: this.props.defaultWallet.walletAddress,
                contractAddress: DEFAULT_TOKEN_CONTRACT_ADDRESS,
                symbol: DEFAULT_TOKEN_SYMBOL, 
                decimals: DEFAULT_TOKEN_DECIMALS, 
            });
            if (currentETHBalance !== undefined) {
                if (this.props.ethBalance !== currentETHBalance)
                {
                    this.props.setEthBalance(currentETHBalance); 
                }
            }
            if (currentBLCBalance !== undefined) {
                if (this.props.blcBalance !== currentBLCBalance)
                {
                    this.props.setBlcBalance(currentBLCBalance);
                }
            }
        }
    }
}

function mapStateToProps(state) {
    return {
        defaultWallet: state.wallet.defaultWallet,
        ethBalance: state.wallet.ethBalance,
        blcBalance: state.wallet.blcBalance,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setEthBalance: (balance) => {
            dispatch(ActionCreator.setEthBalance(balance));
        },
        setBlcBalance: (balance) => {
            dispatch(ActionCreator.setBlcBalance(balance));
        },
    };
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start"
        // alignItems: 'center',
        // height: 300,
    },
    containerCard: {
        marginTop: 4,  
        marginBottom: 0,  
        marginHorizontal: 4,
    },
    containerNotice: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    containerTransaction: {      
        // marginBottom: 20,
    },
    containerTitle: {
        // flex: 1,
        // backgroundColor: 'gray',         
        marginBottom: 20,
    },
    containerBalanceTop: {
        marginBottom: 15,
        flexDirection: 'row',
    },
    containerBalanceBottom: {
        marginTop: 15,
        marginBottom: 15,
        flexDirection: 'row',
    },
    containerMenuIcon: {
        marginTop: 15,
    },
    textNotice: {
        fontSize : 12, 
        textAlign:'left',
        color: 'black',
    },
    textTitle: {
        fontSize : 16, 
        fontWeight: 'bold', 
        textAlign:'center',
        color: 'black',
    },
    balanceText: {
        fontSize : 28, 
        fontWeight: 'bold', 
        textAlign:'center',
        color: '#BD3D3A',
    },
    descriptionText: {
        fontSize: 12,        
        color: '#B4B7BA',
        textAlign: 'center',
    },
})
  
export default connect(mapStateToProps, mapDispatchToProps)(WalletBalanceCard);

