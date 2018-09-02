import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ActionCreator from './../actions';
import WalletUtils from './../utils/wallet';

import ETH_ICON_IMAGE from './images/ethereum_40x40.png';
import BLC_ICON_IMAGE from './images/bluecots_COIN_40x40.png';
import TokenSymbolWithName from './tokenSymbolWithName';
import WalletAddressWithNickName from './walletAddressWithNickName';
import CreateWalletIcon from './createWalletIcon';
import PropTypes from 'prop-types';

class WalletBalanceErc20 extends Component {
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
            <View>
                <View>
                    <WalletAddressWithNickName />
                </View>
                <View style={styles.container}>
                    <View style={styles.containerBalance}>
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
                    <View style={styles.containerBalance}>
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
                </View>
                <View>
                    <CreateWalletIcon/>
                </View>
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
                contractAddress: process.env.DEFAULT_TOKEN_CONTRACT_ADDRESS,
                symbol: process.env.DEFAULT_TOKEN_SYMBOL, 
                decimals: process.env.DEFAULT_TOKEN_DECIMALS, 
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
        alignItems: 'center', 
        justifyContent: 'center'
    },
    containerBalance: {
        flexDirection: 'row', 
        marginHorizontal: 15, 
        marginVertical: 10
    },
    balanceText: {
        fontSize : 30, 
        fontWeight: 'bold', 
        textAlign:'center',
        color: '#BD3D3A',
    }
})
  
export default connect(mapStateToProps, mapDispatchToProps)(WalletBalanceErc20);

