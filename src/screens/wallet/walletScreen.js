
import React, { Component } from 'react';
import { ListView, StyleSheet, Text, View } from 'react-native';
import WalletUtils from './../../utils/wallet';
import { store } from './../../config/store';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import WalletBalanceErc20 from './../../components/walletBalanceErc20';
import CreateWalletModal from '../../components/createWalletModal';
import RestoreWalletModal from '../../components/restoreWalletModal';
import GenerateWalletModal from '../../components/generateWalletModal';
import DefaultWalletSettingModal from '../../components/defaultWalletSettingModal';
import SelectAnotherWalletModal from '../../components/selectAnotherWalletModal';

class WalletScreen extends Component{
    static navigationOptions = {
        // title: 'Wallet & GiftCon',
        tabBarLabel: 'wallet',
        tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-card" size={30} color={tintColor} />
        )
    };
    
    state = {
        currentETHBalance: 0,
        currentBLCBalance: 0,
        createWalletModalIsOpen: false,
        restoreWalletModalIsOpen: false,
        generateWalletModalIsOpen: false,
        defaultWalletSettingModalIsOpen: false,
        selectAnotherWalletModalIsOpen: false,
        dataSourceForWalletListModal: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        }),
    };

    omponentDidMount() {
        this.updateWalletBalance();
        this.fetchWalletList();
    }

    render() {
        return (
            <View style={styles.container}>  
                <View style={styles.balanceContainer}>
                    <WalletBalanceErc20 
                        currentETHBalance={this.state.currentETHBalance} 
                        currentBLCBalance={this.state.currentBLCBalance} 
                        setCreateWalletModalIsOpen={this.setCreateWalletModalIsOpen.bind(this)}
                        defaultWalletSettingModalIsOpen={this.state.defaultWalletSettingModalIsOpen}
                        setDefaultWalletSettingModalIsOpen={this.setDefaultWalletSettingModalIsOpen.bind(this)}
                    />
                </View>
                <View style={styles.gifticonContainer}>
                    <Text>gifticon container not ready.</Text>
                </View>
                <CreateWalletModal
                    updateWalletBalance={this.updateWalletBalance.bind(this)}
                    createWalletModalIsOpen={this.state.createWalletModalIsOpen}
                    setCreateWalletModalIsOpen={this.setCreateWalletModalIsOpen.bind(this)}    
                    setRestoreWalletModalIsOpen={this.setRestoreWalletModalIsOpen.bind(this)}  
                    setGenerateWalletModalIsOpen={this.setGenerateWalletModalIsOpen.bind(this)}             
                />
                <RestoreWalletModal
                    updateWalletBalance={this.updateWalletBalance.bind(this)}
                    restoreWalletModalIsOpen={this.state.restoreWalletModalIsOpen}
                    setRestoreWalletModalIsOpen={this.setRestoreWalletModalIsOpen.bind(this)}
                    fetchWalletList={this.fetchWalletList.bind(this)}
                />
                <GenerateWalletModal
                    updateWalletBalance={this.updateWalletBalance.bind(this)}
                    generateWalletModalIsOpen={this.state.generateWalletModalIsOpen}
                    setGenerateWalletModalIsOpen={this.setGenerateWalletModalIsOpen.bind(this)}
                    fetchWalletList={this.fetchWalletList.bind(this)}
                />
                <DefaultWalletSettingModal
                    updateWalletBalance={this.updateWalletBalance.bind(this)}
                    defaultWalletSettingModalIsOpen={this.state.defaultWalletSettingModalIsOpen}
                    setDefaultWalletSettingModalIsOpen={this.setDefaultWalletSettingModalIsOpen.bind(this)}   
                    setSelectAnotherWalletModalIsOpen={this.setSelectAnotherWalletModalIsOpen.bind(this)}                      
                />
                <SelectAnotherWalletModal
                    updateWalletBalance={this.updateWalletBalance.bind(this)}
                    selectAnotherWalletModalIsOpen={this.state.selectAnotherWalletModalIsOpen}
                    setSelectAnotherWalletModalIsOpen={this.setSelectAnotherWalletModalIsOpen.bind(this)}     
                    dataSourceForWalletListModal={this.state.dataSourceForWalletListModal}    
                    fetchWalletList={this.fetchWalletList.bind(this)}             
                />

                
            </View>  
        );
    }

    setCreateWalletModalIsOpen(value) {
        this.setState({createWalletModalIsOpen: value});
    }

    setRestoreWalletModalIsOpen(value) {
        this.setState({restoreWalletModalIsOpen: value});
    }

    setGenerateWalletModalIsOpen(value) {
        this.setState({generateWalletModalIsOpen: value});
    }

    setDefaultWalletSettingModalIsOpen(value) {
        this.setState({defaultWalletSettingModalIsOpen: value});
    }   

    setSelectAnotherWalletModalIsOpen(value) {
        this.setState({selectAnotherWalletModalIsOpen: value});
    }       

    updateWalletBalance() {
        console.log('updateWalletBalance call')
        const { defaultWallet } = store.getState(); 
        if (defaultWallet.walletAddress) {
            this.fetchEthBalance();    
            this.fetchBlcBalance();   
        }
    }

    fetchWalletList = async () => {
        var walletList = WalletUtils.getRegistedWalletList('BLC');
        console.log('walletList : ' + walletList);
        console.log('c' + walletList.wallet);
        this.setState({
            dataSourceForWalletListModal: this.state.dataSourceForWalletListModal.cloneWithRows(walletList)
        });
    };
    
    fetchEthBalance = async () => {
        const { defaultWallet } = store.getState();  
        const currentETHBalance = await WalletUtils.getBalance({
            walletAddress: defaultWallet.walletAddress,
            contractAddress:'', 
            symbol:'ETH', 
            decimals:0
        });
        this.setState({
            currentETHBalance,
        }); 
    };
    
    fetchBlcBalance = async () => {
        const { defaultWallet } = store.getState();  
        const currentBLCBalance = await WalletUtils.getBalance({
            walletAddress: defaultWallet.walletAddress,
            contractAddress: process.env.DEFAULT_TOKEN_CONTRACT_ADDRESS,
            symbol: process.env.DEFAULT_TOKEN_SYMBOL, 
            decimals: process.env.DEFAULT_TOKEN_DECIMALS, 
        });
        this.setState({
            currentBLCBalance,
        });
    };    
}
export default WalletScreen;
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    balanceContainer: {
        flex: 5,
        backgroundColor: 'darkcyan',
        padding: 20,
    },
    gifticonContainer: {
        flex: 6,
        alignItems: 'center',
        justifyContent : 'center',
    },
})