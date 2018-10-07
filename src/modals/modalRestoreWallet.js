
import React, { Component } from 'react';
import { View, Text, Clipboard, StyleSheet, TouchableOpacity } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import Modal from 'react-native-simple-modal';
import EthUtil from 'ethereumjs-util';
import EthereumJsWallet from 'ethereumjs-wallet';
import WalletUtils from './../utils/wallet';
import ActionCreator from './../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { 
	DEFAULT_TOKEN_SYMBOL,
	DEFAULT_TOKEN_CONTRACT_ADDRESS,
	DEFAULT_TOKEN_DECIMALS,
 } from './../config/constants';

 
const uuid = require('uuid')


class ModalRestoreWallet extends Component {    
    static propTypes = {
        defaultWallet: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            nickName: '',
            privateKey: '',
        };
    }
    
    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
    }
    
    render() {
        return (
            <Modal 
                offset={0}
                open={this.props.visibleModalRestoreWallet}
                animationDuration={200}
                animationTension={40}
                closeOnTouchOutside={true}
                disableOnBackPress={false}
                modalDidClose={() => {this.closeModal()}}
                modalDidOpen={() => undefined}
                modalProps={undefined}
                containerProps={undefined}
                containerStyle={{
                    justifyContent: "center"
                }}
                modalStyle={{
                    margin: 0,
                    padding:0,
                    borderRadius: 10,
                    marginHorizontal: 20,
                    backgroundColor: "white"
                }}
                overlayStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                    flex: 1
                }}
            >
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Restore wallet</Text>
                    <View style={{alignSelf:"flex-end", paddingRight:20, position:"absolute"}}>
                        <TouchableOpacity onPress={() => this.closeModal()} value={'0.5'}>
                            <Ionicons name="ios-close-circle-outline" size={20}/>
                        </TouchableOpacity>
                    </View>                      
                </View>
                <View style={styles.bodyContainer}>
                    <View>
                        <FormLabel>Nickname</FormLabel>
                        <FormInput 
                            underlineColorAndroid='gray'
                            inputStyle = {{paddingLeft:5, paddingRight:5, marginRight:0, fontSize:11}}
                            value = {this.state.nickName} 
                            onChangeText = {(value) => this.setState({nickName: value})}
                        />
                        {this.nickNameValidationMsg()}
                    </View>
                    <View>
                        <FormLabel>PrivateKey</FormLabel>
                        <FormInput 
                            underlineColorAndroid='gray'
                            inputStyle = {{paddingLeft:5, paddingRight:5, marginRight:0, fontSize:11}}
                            value={this.state.privateKey}
                            onChangeText={(value) => this.setState({privateKey: value})}
                        />
                        {this.privateKeyValidationMsg()}
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        disabled={!this.isValidRestoreButton()}
                        onPress={this.restoreWallet}
                        title="Restore"
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
            </Modal>
        );
    }

    nickNameValidationMsg = () =>
    {
        if (this.isEmptString(this.state.nickName)) {
            return <FormValidationMessage>{'This field is required.'}</FormValidationMessage>
        } else if (this.isUsedNickName(this.state.nickName)){
            return <FormValidationMessage>{'Nickname(' + this.state.nickName + ') already be used.'}</FormValidationMessage>
        } else {
            return <FormValidationMessage labelStyle={{color:'#79C753'}}>{'Nickname is valid.'}</FormValidationMessage>
        }
    }

    privateKeyValidationMsg = () =>
    {
        if (this.isEmptString(this.state.privateKey)) {
            return <FormValidationMessage>{'This field is required.'}</FormValidationMessage>
        } else if (!this.isValidPrivateKey(this.state.privateKey)){
            return <FormValidationMessage>{'PrivateKey is not valid'}</FormValidationMessage>
        } else if (this.isUsedPrivateKey(this.state.privateKey)){
            return <FormValidationMessage>{'PrivateKey already be used.'}</FormValidationMessage>
        } else {
            return <FormValidationMessage labelStyle={{color:'#79C753'}}>{'PrivateKey is valid.'}</FormValidationMessage>
        }
    }    

    closeModal = () => {
        this.setState({
            nickName: '',
            privateKey: '',
        })
        this.props.hideModalRestoreWallet();
    }

    restoreWallet = () => {
        this.props.hideModalRestoreWallet();
        const nickName = this.state.nickName;
        const privateKey = this.state.privateKey;    
        const walletFromEth = EthereumJsWallet.fromPrivateKey(
            Buffer.from(privateKey, 'hex'),
        );

        const wallet = {
            id : uuid.v4(),
            nickName: nickName,
            name: 'Bluecots',
            symbol: 'BLC',
            walletAddress: walletFromEth.getAddressString(),
            privateKey: walletFromEth.getPrivateKey().toString('hex') 
        }
        
        this.props.addWallet(wallet);
        this.props.setDefaultWallet(wallet);   

        setTimeout(() => {
            this.updateWalletBalance(this.props.defaultWallet.walletAddress);
            const infomation = {
                title: 'INFOMATION', 
                message1: 'Success to restore wallet', 
                message2: this.props.defaultWallet.walletAddress
            };
            this.props.setModalInfomation(infomation);
            this.props.showModalInfomation();
            if (this.props.modalFinishProcess) {
                this.props.modalFinishProcess();
            }
        },);    
        
        this.setState({
            nickName: '',
            privateKey: '',
        })
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
                contractAddress: DEFAULT_TOKEN_CONTRACT_ADDRESS,
                symbol: DEFAULT_TOKEN_SYMBOL, 
                decimals: DEFAULT_TOKEN_DECIMALS, 
            });
            if (currentETHBalance !== undefined) {
                if (this.props.ethBalance !== currentETHBalance)
                {
                    this.props.setEthBalance(currentETHBalance); 
                }
            }
            if (currentBLCBalance !== undefined) {
                if (this.props.blcBalance !== currentBLCBalance)
                {
                    this.props.setBlcBalance(currentBLCBalance);
                }
            }
        }
    }

    readPrivateKeyFromClipboard = async () => {   
        const privateKey = await Clipboard.getString();   
        this.setState({ privateKey }); 
    };

    isValidRestoreButton = () => {
        if (this.isValidPrivateKey(this.state.privateKey) && !this.isUsedPrivateKey(this.state.privateKey))
        {
            if (!this.isEmptString(this.state.nickName) && !this.isUsedNickName(this.state.nickName))
            {
                return true;
            }
        }
        return false;
    }

    isValidPrivateKey = (h) => {
        try {
            if (EthUtil.isValidPrivate(Buffer.from(h, 'hex'))) {
                const walletFromEth = EthereumJsWallet.fromPrivateKey(
                    Buffer.from(h, 'hex'),
                );
                if (WalletUtils.addressIsValid(walletFromEth.getAddressString())) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
        catch (e) {
            return false;
        }
    }

    isEmptString = (s) => {
        if (s) {
            return false;
        } else {
            return true;
        }
    }

    isUsedNickName = (nickName) => {
        const registedWalletList = this.props.walletList
            .filter(wallet => wallet.symbol === 'BLC')
            .map(wallet => wallet.nickName);
        if (registedWalletList.includes(nickName)) {
            return true;
        } else {
            return false;
        }
    }

    isUsedPrivateKey = (privateKey) => {
        const walletFromEth = EthereumJsWallet.fromPrivateKey(
            Buffer.from(privateKey, 'hex'),
        );
        const registedWalletList = this.props.walletList
            .filter(wallet => wallet.symbol === 'BLC')
            .map(wallet => wallet.walletAddress); 
        if (registedWalletList.includes(walletFromEth.getAddressString())) {
            return true;
        } else {
            return false;
        }
    }
}

function mapStateToProps(state) {
    return {
        defaultWallet: state.wallet.defaultWallet,
        walletList: state.wallet.walletList,
        visibleModalRestoreWallet: state.modal.visibleModalRestoreWallet
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addWallet: (wallet) => {
            dispatch(ActionCreator.addWallet(wallet));
        },        
        setDefaultWallet: (defaultWallet) => {
            dispatch(ActionCreator.setDefaultWallet(defaultWallet));
        },    
        setEthBalance: (balance) => {
            dispatch(ActionCreator.setEthBalance(balance));
        },
        setBlcBalance: (balance) => {
            dispatch(ActionCreator.setBlcBalance(balance));
        },
        showModalRestoreWallet: () => {
            dispatch(ActionCreator.showModalRestoreWallet());
        },
        hideModalRestoreWallet: () => {
            dispatch(ActionCreator.hideModalRestoreWallet());
        },
        showModalInfomation: () => {
            dispatch(ActionCreator.showModalInfomation());
        },
        setModalInfomation: (infomation) => {
            dispatch(ActionCreator.setModalInfomation(infomation));
        },
    };
}  

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#B4B7BA',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopStartRadius : 10,
        borderTopEndRadius: 10,
        padding: 10,
    }, 
    bodyContainer: {
        // marginTop: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        marginBottom: 10,
    },
    headerText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalRestoreWallet);
