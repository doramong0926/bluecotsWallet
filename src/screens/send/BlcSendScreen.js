
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements'
import WalletUtils from './../../utils/wallet';
import { connect } from 'react-redux';
import ActionCreator from './../../actions';
import WalletAddressWithNickNameForSend from './../../components/walletAddressWithNickNameForSend';
import SelectAnotherWalletIcon from './../../components/selectAnotherWalletIcon';
import PropTypes from 'prop-types';


class BlcSendScreen extends Component{
    constructor(props, context) {
        super(props, context);
    }

    static navigationOptions = {
        tabBarLabel: 'BLC'
    };

    static propTypes = {
        walletForSend: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,
    };

    state = {
        addressToSendErc20: '',
        amountToSendErc20: '',
    };

    componentDidMount() {
        this.updateWalletBalance(this.props.walletForSend.walletAddress);
    }

    componentWillReceiveProps() {
        this.updateWalletBalance(this.props.walletForSend.walletAddress);
    }

    render(){
        return (
            <View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{flex:9, alignItems: 'center', justifyContent: 'center'}}>
                        <WalletAddressWithNickNameForSend />
                    </View>
                    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                        <SelectAnotherWalletIcon />
                    </View>
                </View>
                <View>
                    <Text style={styles.balance}> Available balance </Text>
                    <Text style={styles.balance}> {this.props.blcBalanceForSend} </Text>
                </View>                
                <View>
                    <FormLabel>Address to send BLC</FormLabel>
                    <FormInput value={this.state.addressToSendErc20} onChangeText={(value) => this.getAddressToSendErc20(value)}/>
                </View>
                <View>
                    <FormLabel>Amount to send BLC</FormLabel>
                    <FormInput onChangeText={(value) => this.getAmountToSendErc20(value)}/>
                </View>
                <View>
                    <Button
                        onPress={this.readPrivateKeyFromClipboard}
                        title="paste"
                    />
                    <Button
                        disabled={!this.addressIsValid() || !this.amountIsValid()}
                        onPress={this.sendErc20Transaction}
                        title="Send"
                    />
                </View>
            </View>
        );
    }

    readPrivateKeyFromClipboard = async () => {   
        const addressToSendErc20 = await Clipboard.getString();   
        this.setState({ addressToSendErc20 }); 
    };

    updateWalletBalance = async (walletAddress) => {
        if (walletAddress) {
                const currentETHBalance = await WalletUtils.getBalance({
                walletAddress: walletAddress,
                contractAddress:'', 
                symbol:'ETH', 
                decimals:0
            });
                const currentBLCBalance = await WalletUtils.getBalance({
                walletAddress: walletAddress,
                contractAddress: process.env.DEFAULT_TOKEN_CONTRACT_ADDRESS,
                symbol: process.env.DEFAULT_TOKEN_SYMBOL, 
                decimals: process.env.DEFAULT_TOKEN_DECIMALS, 
            });
            if (currentETHBalance !== undefined && currentBLCBalance !== undefined) {
                this.props.setEthBalanceForSend(currentETHBalance); 
                this.props.setBlcBalanceForSend(currentBLCBalance);
            };      
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

function mapStateToProps(state) {
    return {
        walletForSend: state.wallet.walletForSend,
        blcBalanceForSend: state.wallet.blcBalanceForSend,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setEthBalanceForSend: (balance) => {
            dispatch(ActionCreator.setEthBalanceForSend(balance));
        },
        setBlcBalanceForSend: (balance) => {
            dispatch(ActionCreator.setBlcBalanceForSend(balance));
        },
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
