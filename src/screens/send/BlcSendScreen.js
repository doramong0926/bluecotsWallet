
import React, { Component } from 'react';
import { StyleSheet, View, Text, Clipboard, TouchableHighlight } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import WalletUtils from './../../utils/wallet';
import { connect } from 'react-redux';
import ActionCreator from './../../actions';
import WalletAddressWithNickNameForSend from './../../components/walletAddressWithNickNameForSend';
import PropTypes from 'prop-types';
import { Permissions } from 'expo';

import { 
	ETHERSCAN_API_KEY,
	INFURA_API_KEY ,
	SEGMENT_API_KEY,
	NETWORK,
	DEFAULT_TOKEN_NAME,
	DEFAULT_TOKEN_SYMBOL,
	DEFAULT_TOKEN_CONTRACT_ADDRESS,
	DEFAULT_TOKEN_DECIMALS,
	WALLET_VERSION
 } from './../../config/constants';

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
        defaultWallet: PropTypes.shape({
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
        this.props.setWalletForSend(this.props.defaultWallet);
        this.updateWalletBalance(this.props.walletForSend.walletAddress);
    }

    render(){
        return (
            <View style={{flex:1}}>
                <WalletAddressWithNickNameForSend tokenName='BLC'/>
                <View>
                    <FormLabel>Amount to send BLC</FormLabel>
                    <FormInput 
                        containerStyle={styles.inputContainer} 
                        underlineColorAndroid='transparent' 
                        value={this.props.amountToSendBlc.toString()} 
                        onChangeText={(value) => this.props.setAmountToSendBlc(value)                            
                    }/>
                    {this.amountValidationMsg()}
                </View>
                <View>
                    <FormLabel>Address to send BLC</FormLabel>
                    <FormInput containerStyle={styles.inputContainer} underlineColorAndroid='transparent' editable={false} value={this.props.addressToSendBlc} onChangeText={(value) => this.props.setAddressToSendBlc(value)}/>
                    {this.addressValidationMsg()}
                </View>
                <View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{flex:1}}>
                            <Button
                                onPress={this.handelPressPaste}
                                icon={{name: 'copy', type: 'font-awesome'}}
                                title="Paste"
                                buttonStyle={{
                                    backgroundColor: "#67AFCB",
                                    borderColor: "transparent", 
                                    borderRadius: 5
                                }}
                                containerViewStyle={{
                                    // alignSelf: 'stretch',
                                    // margin: 1,
                                }}
                            />
                        </View>
                        <View style={{flex:1}}>
                            <Button
                                onPress={this.handelPressQrcord}
                                icon={{name: 'qrcode', type: 'font-awesome'}}
                                title="QR-Code"
                                buttonStyle={{
                                    backgroundColor: "#67AFCB",
                                    borderColor: "transparent", 
                                    borderRadius: 5
                                }}
                                containerViewStyle={{
                                    // alignSelf: 'stretch',
                                    // margin: 1,
                                }}
                            />
                        </View>
                        <View style={{flex:1}}>
                            <Button
                                onPress={this.handelPressClear}
                                icon={{name: 'trash-o', type: 'font-awesome'}}
                                title="Clear"
                                buttonStyle={{
                                    backgroundColor: "#67AFCB",
                                    borderColor: "transparent", 
                                    borderRadius: 5
                                }}
                                containerViewStyle={{
                                    // alignSelf: 'stretch',
                                    // margin: 1,
                                }}
                            />
                        </View>
                    </View>           
                </View>    
                <View style={{flex:1, justifyContent: 'flex-end', marginBottom: 10}}>
                    <Button
                        disabled={
                            !this.addressIsValid(this.props.addressToSendBlc) || 
                            !this.amountIsValid(this.props.amountToSendBlc) || 
                            !this.amountIsEnough(this.props.amountToSendBlc) ||
                            this.isSameAddressWithTxAddress(this.props.walletForSend.walletAddress)
                        }
                        onPress={this.handelPressSend}
                        title="Send"
                        buttonStyle={{
                            backgroundColor: "#BD3D3A",
                            borderColor: "transparent", 
                            borderRadius: 5
                        }}
                        containerViewStyle={{
                            // alignSelf: 'stretch',
                            // margin: 20,
                        }}
                    />
                </View>
            </View>
        );
    }

    setMaxAmount = () => {        
        this.props.setAmountToSendBlc(this.props.blcBalanceForSend);
    }

    addressValidationMsg = () =>
    {
        if (this.props.addressToSendBlc === '' || this.props.addressToSendBlc === null) {
            return <FormValidationMessage>{'This field is required.'}</FormValidationMessage>
        } else if (!this.addressIsValid(this.props.addressToSendBlc)) {
            return <FormValidationMessage>{'address is wrong.'}</FormValidationMessage>
        } else if (this.isSameAddressWithTxAddress(this.props.walletForSend.walletAddress)) {
            return <FormValidationMessage>{'You can not send BLC to same address.'}</FormValidationMessage>
        } else {
            return  <FormValidationMessage labelStyle={{color:'#79C753'}}> {'address is valid.'} </FormValidationMessage>
        }
    }

    amountValidationMsg = () =>
    {
        if (this.props.amountToSendBlc === '' || this.props.amountToSendBlc === null) {
            return <FormValidationMessage>{'This field is required.'}</FormValidationMessage>
        } else if (!this.amountIsValid(this.props.amountToSendBlc)) {
            return <FormValidationMessage>{'amount is wrong.'}</FormValidationMessage>
        } else if (!this.amountIsEnough(this.props.amountToSendBlc)) {
            return <FormValidationMessage>{'BLC is not enough.'}</FormValidationMessage>
        } else {
            return <FormValidationMessage labelStyle={{color:'#79C753'}}>{'amount is valid.'}</FormValidationMessage>
        }
    }

    handelPressQrcord = async () => {      
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        if (status === 'granted') {
            this.props.setTokenNameForQrCode('BLC');
            this.props.showModalQrCodeScaner();
        }        
    }

    handelPressSend = () => {
        this.props.showModalConfirmToSendBlc();
    }

    handelPressClear = () => {
        this.props.setAddressToSendBlc('');
        this.props.setAmountToSendBlc('');
    }
    
    handelPressPaste = async () => {
        const address = await Clipboard.getString();   
        this.props.setAddressToSendBlc(address);
    };

    updateWalletBalance = async (walletAddress) => {
        if (walletAddress) {
            const currentBLCBalance = await WalletUtils.getBalance({
                walletAddress: walletAddress,
                contractAddress: DEFAULT_TOKEN_CONTRACT_ADDRESS,
                symbol: DEFAULT_TOKEN_SYMBOL, 
                decimals: DEFAULT_TOKEN_DECIMALS, 
            });            
            if (currentBLCBalance !== undefined) {
                if (this.props.blcBalanceForSend !== currentBLCBalance)
                {
                    this.props.setBlcBalanceForSend(currentBLCBalance);
                }
            }    
        }
    }   

    isSameAddressWithTxAddress = (walletAddress) => {
        if (walletAddress === this.props.addressToSendBlc) {        
            return true;
        } else {
            return false;
        }
    }

    addressIsValid = (walletAddress) => {
        return WalletUtils.addressIsValid(walletAddress);
    }

    amountIsValid = (amount) => {
        return parseFloat(amount, 10) > 0;
    }

    amountIsEnough = (amount) => {
        if (this.props.blcBalanceForSend < amount) {
            return false;
        } else {
            return true;
        }
    }
}

function mapStateToProps(state) {
    return {
        walletForSend: state.walletTemp.walletForSend,
        blcBalanceForSend: state.walletTemp.blcBalanceForSend,
        addressToSendBlc: state.walletTemp.addressToSendBlc,
        amountToSendBlc: state.walletTemp.amountToSendBlc,
        defaultWallet: state.wallet.defaultWallet,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showModalQrCodeScaner: () => {
            dispatch(ActionCreator.showModalQrCodeScaner());
        },
        showModalConfirmToSendBlc: () => {
            dispatch(ActionCreator.showModalConfirmToSendBlc());
        },
        setBlcBalanceForSend: (balance) => {
            dispatch(ActionCreator.setBlcBalanceForSend(balance));
        },
        setAddressToSendBlc: (address) => {
            dispatch(ActionCreator.setAddressToSendBlc(address));
        },
        setAmountToSendBlc: (balance) => {
            dispatch(ActionCreator.setAmountToSendBlc(balance));
        },
        setWalletForSend: (wallet) => {
            dispatch(ActionCreator.setWalletForSend(wallet));
        },
        setTokenNameForQrCode: (name) => {
            dispatch(ActionCreator.setTokenNameForQrCode(name));
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
    inputContainer: {
        borderColor: '#67AFCB',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    maxText: {
        color: 'red',
        fontWeight: 'bold',
        alignItems: 'center',
    }
})
