
import React, { Component } from 'react';
import { StyleSheet, View, Clipboard } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import WalletUtils from './../../utils/wallet';
import { connect } from 'react-redux';
import ActionCreator from './../../actions';
import WalletAddressWithNickNameForSend from './../../components/walletAddressWithNickNameForSend';
import PropTypes from 'prop-types';
import { Permissions } from 'expo';


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
                <WalletAddressWithNickNameForSend tokenName='ETH'/>
                <View>
                    <FormLabel>Amount to send ETH</FormLabel>
                    <FormInput containerStyle={styles.inputContainer} underlineColorAndroid='transparent' value={this.props.amountToSendEth.toString()} onChangeText={(value) => this.props.setAmountToSendEth(value)}/>                    
                    {this.amountValidationMsg()}
                </View>
                <View>
                    <FormLabel>Address to send ETH</FormLabel>
                    <FormInput containerStyle={styles.inputContainer} underlineColorAndroid='transparent' editable={false} value={this.props.addressToSendEth} onChangeText={(value) => this.props.setAddressToSendEth(value)}/>
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
                            !this.addressIsValid(this.props.addressToSendEth) || 
                            !this.amountIsValid(this.props.amountToSendEth) ||
                            !this.amountIsEnough(this.props.amountToSendEth) ||
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

    addressValidationMsg = () =>
    {
        if (this.props.addressToSendEth === '' || this.props.addressToSendEth === null) {
            return <FormValidationMessage>{'This field is required.'}</FormValidationMessage>
        } else if (!this.addressIsValid(this.props.addressToSendEth)) {
            return <FormValidationMessage>{'address is wrong.'}</FormValidationMessage>
        } else if (this.isSameAddressWithTxAddress(this.props.walletForSend.walletAddress)) {
            return <FormValidationMessage>{'You can not send ETH to same address.'}</FormValidationMessage>
        } else {
            return <FormValidationMessage labelStyle={{color:'#79C753'}}>{'address is valid.'}</FormValidationMessage>
        }
    }

    amountValidationMsg = () =>
    {
        if (this.props.amountToSendEth === '' || this.props.amountToSendEth === null) {
            return <FormValidationMessage>{'This field is required.'}</FormValidationMessage>
        } else if (!this.amountIsValid(this.props.amountToSendEth)) {
            return <FormValidationMessage>{'amount is wrong.'}</FormValidationMessage>
        } else if (!this.amountIsEnough(this.props.amountToSendEth)) {
            return <FormValidationMessage>{'ETH is not enough.'}</FormValidationMessage>
        } else {
            return <FormValidationMessage labelStyle={{color:'#79C753'}}>{'amount is valid.'}</FormValidationMessage>
        }
    }

    handelPressQrcord = async () => {      
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        if (status === 'granted') {
            this.props.setTokenNameForQrCode('ETH');
            this.props.showModalQrCodeScaner();
        }        
    }

    handelPressSend = () => {
        this.props.showModalConfirmToSendEth();
    }

    handelPressClear = () => {
        this.props.setAddressToSendEth('');
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

    isSameAddressWithTxAddress = (walletAddress) => {
        if (walletAddress === this.props.addressToSendEth) {        
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
        if (this.props.ethBalanceForSend < amount) {
            return false;
        } else {
            return true;
        }
    }
}

function mapStateToProps(state) {
    return {
        walletForSend: state.walletTemp.walletForSend,
        ethBalanceForSend: state.walletTemp.ethBalanceForSend,
        addressToSendEth: state.walletTemp.addressToSendEth,
        amountToSendEth: state.walletTemp.amountToSendEth,
        defaultWallet: state.wallet.defaultWallet,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showModalQrCodeScaner: () => {
            dispatch(ActionCreator.showModalQrCodeScaner());
        },
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
        setWalletForSend: (wallet) => {
            dispatch(ActionCreator.setWalletForSend(wallet));
        },
        setTokenNameForQrCode: (name) => {
            dispatch(ActionCreator.setTokenNameForQrCode(name));
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
    inputContainer: {
        borderColor: '#67AFCB',
        borderWidth: 1,
        paddingHorizontal: 10,
    }
})
