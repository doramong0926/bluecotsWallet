
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import Modal from 'react-native-simple-modal';
import ActionCreator from './../actions';
import { connect } from 'react-redux';
import EthereumJsWallet from 'ethereumjs-wallet';
import WalletUtils from './../utils/wallet';
import PropTypes from 'prop-types';
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
 } from './../config/constants';
 
const uuid = require('uuid')

class ModalGenerateWallet extends Component {     
    constructor(props, context) {
        super(props, context);
    };
    
    static propTypes = {
        defaultWallet: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,
    };

    state = {
        nickName: '',
    };
    
    render() {
        return (
            <Modal 
                offset={0}
                open={this.props.visibleModalGenerateWallet}
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
                    borderRadius: 10,
                    margin: 20,
                    padding: 10,
                    backgroundColor: "white"
                }}
                overlayStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                    flex: 1
                }}
            >
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Add wallet - NEW</Text>
                </View>
                <View>
                    <FormLabel>Nickname</FormLabel>
                    <FormInput containerStyle={styles.inputContainer} value={this.state.nickName} onChangeText={(value) => this.setState({nickName: value})}/>
                    {this.nickNameValidationMsg()}
                </View>
                <View style={styles.generateButton}>
                    <Button
                        disabled={!this.isValidGenerateButton()}
                        onPress={this.generateWallet}
                        title="GENERATE"
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

    closeModal = () => {
        this.setState({
            nickName: '',
        })
        this.props.hideModalGenerateWallet();
    }

    generateWallet = () => {        
        const nickName = this.state.nickName;
        const walletFromEth = EthereumJsWallet.generate();
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
        this.props.setWalletForSend(wallet);
        this.props.setWalletForReceive(wallet);        

        setTimeout(() => {
            this.updateWalletBalance(this.props.defaultWallet.walletAddress); 
            const infomation = {
                title: 'INFOMATION', 
                message1: 'Success to generate wallet', 
                message2: this.props.defaultWallet.walletAddress
            };
            this.props.setModalInfomation(infomation);
            this.props.showModalInfomation();
        },);     
        this.setState({
            nickName: '',
        })
        if (this.props.modalFinishProcess) {
            this.props.modalFinishProcess();
        }
        this.props.hideModalGenerateWallet();
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

    isValidGenerateButton = () => {
        if (!this.isEmptString(this.state.nickName) && !this.isUsedNickName(this.state.nickName))
        {
            return true;
        } else {
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
}

function mapStateToProps(state) {
    return {
        defaultWallet: state.wallet.defaultWallet,
        walletList: state.wallet.walletList,
        visibleModalGenerateWallet: state.modal.visibleModalGenerateWallet
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addWallet: (wallet) => {
            dispatch(ActionCreator.addWallet(wallet));
        }, 
        setEthBalance: (balance) => {
            dispatch(ActionCreator.setEthBalance(balance));
        },
        setBlcBalance: (balance) => {
            dispatch(ActionCreator.setBlcBalance(balance));
        },
        setDefaultWallet: (defaultWallet) => {
            dispatch(ActionCreator.setDefaultWallet(defaultWallet));
        },
        setWalletForSend: (wallet) => {
            dispatch(ActionCreator.setWalletForSend(wallet));
        },
        setWalletForReceive: (wallet) => {
            dispatch(ActionCreator.setWalletForReceive(wallet));
        },  
        hideModalGenerateWallet: () => {
            dispatch(ActionCreator.hideModalGenerateWallet());
        },
        setEthBalanceForSend: (balance) => {
            dispatch(ActionCreator.setEthBalanceForSend(balance));
        },
        setBlcBalanceForSend: (balance) => {
            dispatch(ActionCreator.setBlcBalanceForSend(balance));
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
        backgroundColor: '#67AFCB',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
    },
    headerText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    },
    menuText: {
        marginTop: 5, 
        textAlign: 'center'
    },
    inputContainer: {
        // borderColor: '#67AFCB',
        // borderWidth: 1,
        // paddingHorizontal: 10,
    },
    generateButton: {
        marginTop: 5, 
    },
})
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalGenerateWallet);
