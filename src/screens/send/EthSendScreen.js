
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements'

class EthSendScreen extends Component{
    static navigationOptions = {
        tabBarLabel: 'ETH',
    };

    state = {
        addressToSendEth: '',
        amountToSendEth: '',
    };

    render(){
        return (
            <View style={style.container}>
                <View >
                    <FormLabel>Address to send ETH</FormLabel>
                    <FormInput onChangeText={(value) => this.getAddressToSendEth(value)}/>
                </View>
                <View>
                    <FormLabel>Amount to send ETH</FormLabel>
                    <FormInput onChangeText={(value) => this.getAmountToSendEth(value)}/>
                </View>
                <View>
                    <Button
                        disabled={!this.addressIsValid() || !this.amountIsValid()}
                        onPress={this.sendTransaction}
                        title="Send"
                    />
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



    getAmountToSendEth = (input) => {
        const amountToSendEth = input;
        this.setState({
            amountToSendEth,
        });
        console.log('====================================');
        console.log('amount to send ETH: ' + this.state.amountToSendEth);
        console.log('====================================');
    }

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

    addressIsValid = () => {
        /^0x([A-Fa-f0-9]{40})$/.test(this.state.addressToSendErc20);
    }

    amountIsValid = () => {
        parseFloat(this.state.amountToSendErc20, 10) > 0;
    }
}
export default EthSendScreen;
 
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
