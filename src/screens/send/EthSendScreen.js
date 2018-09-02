
import React, { Component } from 'react';
import { StyleSheet, Text, View, Clipboard } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
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
            <View>
                <WalletAddressWithNickNameForSend tokenName='ETH'/>
                <View style={styles.formInput}>
                    <FormLabel>Amount to send ETH</FormLabel>
                    <FormInput value={this.props.amountToSendEth.toString()} onChangeText={(value) => this.props.setAmountToSendEth(value)}/>                    
                    {this.amountValidationMsg()}
                </View>
                <View style={styles.formInput}>
                    <FormLabel>Address to send ETH</FormLabel>
                    <FormInput style editable={false} value={this.props.addressToSendEth} onChangeText={(value) => this.props.setAddressToSendEth(value)}/>
                    {this.addressValidationMsg()}
                </View>
                <View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
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
                                    alignSelf: 'stretch',
                                    margin: 1,
                                }}
                            />
                        </View>
                        <View style={{flex:1}}>
                            <Button style={styles.button}
                                onPress={this.handelPressPaste}
                                icon={{name: 'copy', type: 'font-awesome'}}
                                title="Paste"
                                buttonStyle={{
                                    backgroundColor: "#67AFCB",
                                    borderColor: "transparent", 
                                    borderRadius: 5
                                }}
                                containerViewStyle={{
                                    alignSelf: 'stretch',
                                    margin: 1,
                                }}
                            />
                        </View>
                        <View style={{flex:1}}>
                            <Button style={styles.button}
                                onPress={this.handelPressClear}
                                icon={{name: 'trash-o', type: 'font-awesome'}}
                                title="Clear"
                                buttonStyle={{
                                    backgroundColor: "#67AFCB",
                                    borderColor: "transparent", 
                                    borderRadius: 5
                                }}
                                containerViewStyle={{
                                    alignSelf: 'stretch',
                                    margin: 1,
                                }}
                            />
                        </View>
                    </View>           
                </View>    
                <View style={{justifyContent: 'flex-end'}}>
                    <Button
                        disabled={!this.addressIsValid(this.props.addressToSendEth) || !this.amountIsValid(this.props.amountToSendEth)}
                        onPress={this.handelPressSend}
                        title="Send"
                        buttonStyle={{
                            backgroundColor: "#BD3D3A",
                            borderColor: "transparent", 
                            borderRadius: 5
                        }}
                        containerViewStyle={{
                            alignSelf: 'stretch',
                            margin: 20,
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
    formInput: {
        margin: 5,
        borderColor: 'blue',
    }
})
