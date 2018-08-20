import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import ActionCreator from './../actions';
import WalletUtils from './../utils/wallet';

import BLC_ICON_IMAGE from './images/bluecots_COIN_40x40.png';
import TokenSymbolWithName from './tokenSymbolWithName';
import WalletAddressWithNickName from './walletAddressWithNickName';
import CreateWalletIcon from './createWalletIcon';
import DefaultWalletSettingIcon from './defaultWalletSettingIcon';
import { store } from './../config/store';

class WalletBalanceErc20 extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount(){
        this.updateWalletBalance();
    }

    render() {
        return (
            <View style={{flex: 9}}>
                <View style={{flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{flex:9, alignItems: 'center', justifyContent: 'center'}}>
                        <WalletAddressWithNickName />
                    </View>
                    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                        <DefaultWalletSettingIcon />
                    </View>
                </View>
                <View style={{flex: 5, alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 2, flexDirection: 'row'}}>
                            <TokenSymbolWithName icon={BLC_ICON_IMAGE} tokenString={'ETH'} tokenName={'ethereum'} />
                        </View>
                        <View style={{flex: 5, flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Text style={{fontSize : 30, fontWeight: 'bold', textAlign:'center' }}>{this.props.ethBalance.toFixed(3)}</Text>
                            <Text style={{fontSize :10, textAlign: 'center' }}> ETH</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 2, flexDirection: 'row'}}>
                            <TokenSymbolWithName icon={BLC_ICON_IMAGE} tokenString={'BLC'} tokenName={'bluecots'} />
                        </View>
                        <View style={{flex: 5, flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Text style={{fontSize : 30, fontWeight: 'bold', textAlign: 'center' }}>{this.props.blcBalance.toFixed(3)}</Text>
                            <Text style={{fontSize :10, textAlign: 'center' }}> BLC</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex: 2, alignItems: 'center'}}>
                    <CreateWalletIcon/>
                </View>
            </View>
        );
    }    

    updateWalletBalance = async () => {
        console.log('defaultWallet : ' + this.props.defaultWallet);
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
            this.props.setEthBalance(currentETHBalance); 
            this.props.setBlcBalance(currentBLCBalance);
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
        setEthBalance: () => {
            dispatch(ActionCreator.setEthBalance());
        },
        setBlcBalance: () => {
            dispatch(ActionCreator.setBlcBalance());
        },
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(WalletBalanceErc20);

