
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements'
import WalletUtils from './../../utils/wallet';
import ActionCreator from './../../actions';
import { connect } from 'react-redux';
import WalletAddressWithNickName from './../../components/walletAddressWithNickName';
import SelectAnotherWalletIcon from './../../components/selectAnotherWalletIcon';
import ModalSelectAnotherWallet from './../../modals/modalSelectAnotherWallet';

class BlcSendScreen extends Component{
    constructor(props, context) {
        super(props, context);
    }

    static navigationOptions = {
        tabBarLabel: 'BLC'
    };

    state = {
        addressToSendErc20: '',
        amountToSendErc20: '',
    };

    render(){
        return (
            <View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{flex:9, alignItems: 'center', justifyContent: 'center'}}>
                        <WalletAddressWithNickName />
                    </View>
                    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                        <SelectAnotherWalletIcon />
                    </View>
                </View>
                <View>
                    <Text style={styles.balance}> Available balance </Text>
                    <Text style={styles.balance}> {this.props.blcBanlance} </Text>
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

function mapStateToProps(state) {
    return {
        blcBanlance: state.wallet.blcBanlance,
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(BlcSendScreen);

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
