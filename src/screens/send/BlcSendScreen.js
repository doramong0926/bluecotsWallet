
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements'
import { store } from './../../config/store';

class BlcSendScreen extends Component{
    static navigationOptions = {
        tabBarLabel: 'BLC'
    };

    state = {
        walletAddress: '',
        nickName: '',
        addressToSendErc20: '',
        amountToSendErc20: '',
    };

    componentDidMount() {
        this.fetchWalletInfo();
    }

    render(){
        return (
            <View style={style.container}>
                <View>
                    <FormLabel>Wallet address ({this.state.nickName})</FormLabel>
                    <FormInput>{this.state.walletAddress}</FormInput>
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
            </View>
        );
    }

    fetchWalletInfo = () => {
        if (store.getState().defaultWallet.walletAddress)
        {
            this.walletAddress = store.getState().defaultWallet.walletAddress;
            this.nickName = store.getState().defaultWallet.nickName;
        }
        else 
        {
            this.walletAddress = '0x';
            this.nickName = 'Wallet address is not exist.'            
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
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
