
import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import Modal from 'react-native-simple-modal';
import ActionCreator from './../actions';
import { connect } from 'react-redux';
import EthereumJsWallet from 'ethereumjs-wallet';
import WalletUtils from './../utils/wallet';
const uuid = require('uuid')

class ModalGenerateWallet extends Component {     
    constructor(props, context) {
        super(props, context);
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
                    borderRadius: 2,
                    margin: 20,
                    padding: 10,
                    backgroundColor: "white"
                }}
                overlayStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                    flex: 1
                }}
            >
                <View>
                    <View>
                        <FormLabel>nickName</FormLabel>
                        <FormInput value={this.state.nickName} onChangeText={(value) => this.setState({nickName: value})}/>
                    </View>
                    <View>
                        <Button
                            disabled={!this.isValidGenerateButton()}
                            onPress={this.generateWallet}
                            title="generate"
                        />
                    </View>
                </View>
            </Modal>
        );
    }

    closeModal = () => {
        this.setState({
            nickName: '',
        })
        this.props.hideModalGenerateWallet();
    }

    generateWallet = () => {
        this.props.hideModalGenerateWallet();
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
        const registedWalletList1 = this.props.walletList
                .filter(wallet => wallet.symbol == 'BLC')
                .map(wallet => wallet.walletAddress);
        const registedWalletList2 = this.props.walletList
            .filter(wallet => wallet.symbol == 'BLC')
            .map(wallet => wallet.nickName);

        if (registedWalletList1.includes(walletFromEth.getAddressString())) {
            Alert.alert(
                'This address is already registed',
                wallet.walletAddress,
                [
                    {
                        text: 'OK', onPress: () => {}
                    }
                ]
            );
        } else if (registedWalletList2.includes(nickName)) {
            Alert.alert(
                'This nickName is already registed',
                wallet.nickName,
                [
                    {
                        text: 'OK', onPress: () => {}
                    }
                ]
            );
        } else {
                this.props.addWallet(wallet);
                this.props.setDefaultWallet(wallet);

                Alert.alert(
                    'Success to restore wallet from PrivateKey',
                    this.props.defaultWallet.walletAddress,
                    [
                        {
                            text: 'OK', onPress: () => {}
                        }
                    ]
                );


                const walletList = this.props.walletList.filter(wallet => wallet.symbol == 'BLC');            
                console.log('walletList : ' + walletList);
                this.props.setWalletList(walletList);
                this.updateWalletBalance();
        }
        this.setState({
            nickName: '',
        })
    };

    updateWalletBalance = async () => {
        console.log('defaultWallet : ' + this.props.defaultWallet);
        if (this.props.defaultWallet.walletAddress) {
            const currentETHBalance = await WalletUtils.getBalance({
                walletAddress: this.props.defaultWallet.walletAddress,
                contractAddress:'', 
                symbol:'ETH', 
                decimals:0
            });
            const currentBLCBalance = await WalletUtils.getBalance({
                walletAddress: this.props.defaultWallet.walletAddress,
                contractAddress: process.env.DEFAULT_TOKEN_CONTRACT_ADDRESS,
                symbol: process.env.DEFAULT_TOKEN_SYMBOL, 
                decimals: process.env.DEFAULT_TOKEN_DECIMALS, 
            });
            this.props.setEthBalance(currentETHBalance); 
            this.props.setBlcBalance(currentBLCBalance);
        }
    }

    isValidGenerateButton = () => {
        if (!this.isEmptString(this.state.nickName))
        {
            return true;
        }
        return false;
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
        setWalletList: (walletList) => {
            dispatch(ActionCreator.setWalletList(walletList));
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
        hideModalGenerateWallet: () => {
            dispatch(ActionCreator.hideModalGenerateWallet());
        }        
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalGenerateWallet);
