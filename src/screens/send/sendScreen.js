
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import WalletUtils from './../../utils/wallet';

class sendScreen extends Component{
    static navigationOptions = {
        tabBarLabel: 'send',
        tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-send" size={30} color={tintColor} />
        )
    };

    state = {
        addressToSendEth: '',
        amountToSendEth: '',
        addressToSendErc20: '',
        amountToSendErc20: '',
    };
    
    componentDidMount() {
        ;   
    }

    render(){
        return (
            <View style={style.container}>
                <View style={style.container}>
                    <View >
                        <FormLabel>Address to send ETH</FormLabel>
                        <FormInput onChangeText={(value) => this.fetchaddressToSendEth(value)}/>
                    </View>
                    <View>
                        <FormLabel>Amount to send ETH</FormLabel>
                        <FormInput onChangeText={(value) => this.fetchamountToSendEth(value)}/>
                    </View>
                    <View>
                        <Button
                            disabled={!this.addressIsValid() || !this.amountIsValid()}
                            onPress={this.sendTransaction}
                            title="Send"
                        />
                    </View>
                </View>
                <View style={style.container}>
                    <View>
                        <FormLabel>Address to send ERC20</FormLabel>
                        <FormInput onChangeText={(value) => this.fetchaddressToSendErc20(value)}/>
                    </View>
                    <View>
                        <FormLabel>Amount to send ERC20</FormLabel>
                        <FormInput onChangeText={(value) => this.fetchamountToSendErc20(value)}/>
                    </View>
                    <View>
                        <Button
                            disabled={!this.addressIsValid() || !this.amountIsValid()}
                            onPress={this.sendErc20Transaction}
                            title="Send"
                        />
                    </View>
                </View>
            </View>  
        );
    }

    getAddressToSendEth = (input) => {
        const addressToSendEth = input;
        this.setState({
            addressToSendEth,
        });
        console.log('====================================');
        console.log('address to send ETH: ' + this.state.addressToSendEth);
        console.log('====================================');
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

    getAmountToSendEth = (input) => {
        const amountToSendEth = input;
        this.setState({
            amountToSendEth,
        });
        console.log('====================================');
        console.log('amount to send ETH: ' + this.state.amountToSendEth);
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

    addressIsValid = () => /^0x([A-Fa-f0-9]{40})$/.test(this.state.addressToSendErc20);
    amountIsValid = () => parseFloat(this.state.amountToSendErc20, 10) > 0;

    sendTransaction = async () => {
        try {  
            await WalletUtils.sendTransaction(
            { 
                contractAddress: "",
                symbol: "ETH",
                decimals: ""
            },
            this.state.addressToSendErc20,
            this.state.amountToSendErc20,
            );
            console.log('====================================');
            console.log('Sending ETH');
            console.log("You've successfully sent" + this.state.amountToSendErc20 + 
                        'ETH ' + 'to' + this.state.addressToSendErc20);
            console.log('====================================');
        } catch (error) {
            ;
        }
    };

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
}
export default sendScreen;
 
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})