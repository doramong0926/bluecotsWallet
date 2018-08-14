import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { store } from './../config/store';

import BLC_ICON_IMAGE from './images/bluecots_COIN_40x40.png';
import TokenSymbolWithName from './tokenSymbolWithName';
import WalletAddressWithNickName from './walletAddressWithNickName';
import CreateWalletIcon from './createWalletIcon';
import DefaultWalletSettingIcon from './defaultWalletSettingIcon';

class WalletBalanceErc20 extends Component {
    render() {
        return (
            <View style={{flex: 9}}>
                <View style={{flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{flex:9, alignItems: 'center', justifyContent: 'center'}}>
                        <WalletAddressWithNickName walletAddr={store.getState().defaultWallet.walletAddress} nickName={store.getState().defaultWallet.nickName}/>
                    </View>
                    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                        <DefaultWalletSettingIcon
                                defaultWalletSettingModalIsOpen={this.props.defaultWalletSettingModalIsOpen}
                                setDefaultWalletSettingModalIsOpen={this.props.setDefaultWalletSettingModalIsOpen}
                        />
                    </View>
                </View>
                <View style={{flex: 5, alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 2, flexDirection: 'row'}}>
                            <TokenSymbolWithName icon={BLC_ICON_IMAGE} tokenString={'ETH'} tokenName={'ethereum'} />
                        </View>
                        <View style={{flex: 5, flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Text style={{fontSize : 30, fontWeight: 'bold', textAlign:'center' }}>{this.props.currentETHBalance.toFixed(3)}</Text>
                            <Text style={{fontSize :10, textAlign: 'center' }}> ETH</Text>
                        </View>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 2, flexDirection: 'row'}}>
                            <TokenSymbolWithName icon={BLC_ICON_IMAGE} tokenString={'BLC'} tokenName={'bluecots'} />
                        </View>
                        <View style={{flex: 5, flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Text style={{fontSize : 30, fontWeight: 'bold', textAlign: 'center' }}>{this.props.currentBLCBalance.toFixed(3)}</Text>
                            <Text style={{fontSize :10, textAlign: 'center' }}> BLC</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex: 2, alignItems: 'center'}}>
                    <CreateWalletIcon setCreateWalletModalIsOpen={this.props.setCreateWalletModalIsOpen}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    balanceContainer: {
        flex: 4,
        backgroundColor: 'darkcyan',
        padding: 20,
    },
})

export default WalletBalanceErc20;

