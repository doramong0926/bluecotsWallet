
import React, { Component } from 'react';
import { StyleSheet, Text, View, Clipboard } from 'react-native';
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
                    <FormInput value={this.props.addressToSendBlc} onChangeText={(value) => this.props.setAddressToSendBlc(value)}/>
                </View>
                <View>
                    <FormLabel>Amount to send BLC</FormLabel>
                    <FormInput value={this.props.amountToSendBlc.toString()} onChangeText={(value) => this.props.setAmountToSendBlc(value)}/>
                </View>
                <View>
                    <Button
                        onPress={this.handelPressPaste}
                        title="paste"
                    />
                    <Button
                        disabled={!this.addressIsValid(this.props.addressToSendBlc) || !this.amountIsValid(this.props.amountToSendBlc)}
                        onPress={this.handelPressSend}
                        title="Send"
                    />
                </View>
            </View>
        );
    }

    handelPressSend = () => {
        this.props.showModalConfirmToSend();
    }
    
    handelPressPaste = async () => {
        const address = await Clipboard.getString();   
        this.props.setAddressToSendBlc(address);
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
        blcBalanceForSend: state.wallet.blcBalanceForSend,
        addressToSendBlc: state.wallet.addressToSendBlc,
        amountToSendBlc: state.wallet.amountToSendBlc,
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
        showModalSuccess: () => {
            dispatch(ActionCreator.showModalSuccess());
        },
        hideModalSuccess: () => {
            dispatch(ActionCreator.hideModalSuccess());
        },
        showModalConfirmToSend: () => {
            dispatch(ActionCreator.showModalConfirmToSend());
        },
        setAddressToSendBlc: (address) => {
            dispatch(ActionCreator.setAddressToSendBlc(address));
        },
        setAmountToSendBlc: (balance) => {
            dispatch(ActionCreator.setAmountToSendBlc(balance));
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
