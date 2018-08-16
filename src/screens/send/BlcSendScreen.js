
import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements'
import { store } from './../../config/store';
import WalletUtils from './../../utils/wallet';
import WalletAddressWithNickName from './../../components/walletAddressWithNickName';
import SelectAnotherWalletIcon from './../../components/selectAnotherWalletIcon';
import SelectAnotherWalletModal from './../../components/selectAnotherWalletModal';

class BlcSendScreen extends Component{
    static navigationOptions = {
        tabBarLabel: 'BLC'
    };

    state = {
        walletAddress: '',
        nickName: '',
        addressToSendErc20: '',
        amountToSendErc20: '',
        currentBLCBalance: 0,
        selectAnotherWalletModalIsOpen : false,
        dataSourceForWalletListModal: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        }),
    };

    componentDidMount() {
        this.fetchWalletList();
        this.fetchWalletInfo();
        this.updateWalletBalance();
    }

    render(){
        return (
            <View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{flex:9, alignItems: 'center', justifyContent: 'center'}}>
                        <WalletAddressWithNickName walletAddr={this.state.walletAddress} nickName={this.state.nickName}/>
                    </View>
                    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                        <SelectAnotherWalletIcon
                            selectAnotherWalletModalIsOpen={this.state.selectAnotherWalletModalIsOpen}
                            setSelectAnotherWalletModalIsOpen={this.setSelectAnotherWalletModalIsOpen.bind(this)}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.balance}> Available balance </Text>
                    <Text style={styles.balance}> {this.state.currentBLCBalance} </Text>
                </View>
                <View>
                    <FormLabel>Address to send BLC</FormLabel>
                    <FormInput onChangeText={(value) => this.getAddressToSendErc20(value)}/>
                </View>
                <View>
                    <FormLabel>Amount to send BLC</FormLabel>
                    <FormInput onChangeText={(value) => this.getAmountToSendErc20(value)}/>
                </View>
                <View>
                    <Button
                        disabled={!this.addressIsValid() || !this.amountIsValid()}
                        onPress={this.sendErc20Transaction}
                        title="Send"
                    />
                </View>
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

    setSelectAnotherWalletModalIsOpen = (value) => {
        this.setState({
            selectAnotherWalletModalIsOpen: value
        });
    };

    updateWalletBalance = async () => {
        const currentBLCBalance = await WalletUtils.getBalance({
            walletAddress:this.state.walletAddress,
            contractAddress: process.env.DEFAULT_TOKEN_CONTRACT_ADDRESS,
            symbol: process.env.DEFAULT_TOKEN_SYMBOL, 
            decimals: process.env.DEFAULT_TOKEN_DECIMALS, 
        });
        this.setState({
            currentBLCBalance,
        });
    };
    
    fetchWalletList = async () => {
        var walletList = WalletUtils.getRegistedWalletList('BLC');
        console.log('walletList : ' + walletList);
        console.log('c' + walletList.wallet);
        this.setState({
            dataSourceForWalletListModal: this.state.dataSourceForWalletListModal.cloneWithRows(walletList)
        });
    };
    
    fetchWalletInfo = () => {
        if (store.getState().defaultWallet.walletAddress)
        {
            this.state.walletAddress = store.getState().defaultWallet.walletAddress;
            this.state.nickName = store.getState().defaultWallet.nickName;
        }
        else 
        {
            this.state.walletAddress = '0x';
            this.state.nickName = 'Wallet address is not exist.'            
        }
    }

    getAddressToSendErc20 = (input) => {
        const addressToSendErc20 = input;
        this.setState({
          addressToSendErc20,
        });
        console.log('====================================');
        console.log('address to send ERC20: ' + this.state.addressToSendErc20);
        console.log('====================================');
    }

    getAmountToSendErc20 = (input) => {
        const amountToSendErc20 = input;
        this.setState({
            amountToSendErc20,
        });
        console.log('====================================');
        console.log('amount to send ERC20: ' + this.state.amountToSendErc20);
        console.log('====================================');
    }

    sendErc20Transaction = async () => {
        try {  
            await WalletUtils.sendTransaction(
            { 
                contractAddress: process.env.DEFAULT_TOKEN_CONTRACT_ADDRESS,
                symbol: process.env.DEFAULT_TOKEN_SYMBOL, 
                decimals: process.env.DEFAULT_TOKEN_DECIMALS
            },
            this.state.addressToSendErc20,
            this.state.amountToSendErc20,
            );
            console.log('====================================');
            console.log('Sending BLC');
            console.log("You've successfully sent" + this.state.amountToSendErc20 + 
                        'BLC ' + 'to' + this.state.addressToSendErc20);
            console.log('====================================');
        } catch (error) {
            ;
        }
    };

    addressIsValid = () => {
        /^0x([A-Fa-f0-9]{40})$/.test(this.state.addressToSendErc20);
    }

    amountIsValid = () => {
        parseFloat(this.state.amountToSendErc20, 10) > 0;
    }
}
export default BlcSendScreen;

const styles = StyleSheet.create({
    nickName: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
    address: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        fontWeight: 'bold',
        color: 'black',
    },
    balance: {
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    }
})
