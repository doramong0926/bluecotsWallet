
import React, { Component } from 'react';
import { StyleSheet, Text, View, Clipboard } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements'
import WalletUtils from './../../utils/wallet';
import { connect } from 'react-redux';
import ActionCreator from './../../actions';
import WalletAddressWithNickNameForSend from './../../components/walletAddressWithNickNameForSend';
import SelectAnotherWalletIcon from './../../components/selectAnotherWalletIcon';
import PropTypes from 'prop-types';


class EthSendScreen extends Component{
    constructor(props, context) {
        super(props, context);
    }

    static navigationOptions = {
        tabBarLabel: 'ETH'
    };

    static propTypes = {
        walletForSend: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,
    };

    componentDidMount() {
        this.updateWalletBalance(this.props.walletForSend.walletAddress);
        setInterval(() => {
            this.updateWalletBalance(this.props.walletForSend.walletAddress);
        }, 1000)
    }

    componentWillMount() {
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
                        <SelectAnotherWalletIcon ScreenType='send' />
                    </View>
                </View>
                <View>
                    <Text style={styles.balance}> Available balance </Text>
                    <Text style={styles.balance}> {this.props.ethBalanceForSend} </Text>
                </View>                
                <View>
                    <FormLabel>Address to send ETH</FormLabel>
                    <FormInput value={this.props.addressToSendEth} onChangeText={(value) => this.props.setAddressToSendEth(value)}/>
                </View>
                <View>
                    <FormLabel>Amount to send ETH</FormLabel>
                    <FormInput value={this.props.amountToSendEth.toString()} onChangeText={(value) => this.props.setAmountToSendEth(value)}/>
                </View>
                <View>
                    <Button
                        onPress={this.handelPressPaste}
                        title="paste"
                    />
                    <Button
                        disabled={!this.addressIsValid(this.props.addressToSendEth) || !this.amountIsValid(this.props.amountToSendEth)}
                        onPress={this.handelPressSend}
                        title="Send"
                    />
                </View>
            </View>
        );
    }

    handelPressSend = () => {
        this.props.showModalConfirmToSendEth();
    }
    
    handelPressPaste = async () => {
        const address = await Clipboard.getString();   
        this.props.setAddressToSendEth(address);
    };

    updateWalletBalance = async (walletAddress) => {
        if (walletAddress) {
            const currentETHBalance = await WalletUtils.getBalance({
                walletAddress: walletAddress,
                contractAddress:'', 
                symbol:'ETH', 
                decimals:0
            });
            if (currentETHBalance !== undefined) {
                if (this.props.ethBalanceForSend !== currentETHBalance)
                {
                    this.props.setEthBalanceForSend(currentETHBalance); 
                }
            }
        }
    }   

    addressIsValid = (walletAddress) => {
        return WalletUtils.addressIsValid(walletAddress);
    }

    amountIsValid = (amount) => {
        return parseFloat(amount, 10) > 0;
    }
}

function mapStateToProps(state) {
    return {
        walletForSend: state.wallet.walletForSend,
        ethBalanceForSend: state.wallet.ethBalanceForSend,
        addressToSendEth: state.wallet.addressToSendEth,
        amountToSendEth: state.wallet.amountToSendEth,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showModalConfirmToSendEth: () => {
            dispatch(ActionCreator.showModalConfirmToSendEth());
        },
        setEthBalanceForSend: (balance) => {
            dispatch(ActionCreator.setEthBalanceForSend(balance));
        },
        setAddressToSendEth: (address) => {
            dispatch(ActionCreator.setAddressToSendEth(address));
        },
        setAmountToSendEth: (balance) => {
            dispatch(ActionCreator.setAmountToSendEth(balance));
        },
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(EthSendScreen);

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
