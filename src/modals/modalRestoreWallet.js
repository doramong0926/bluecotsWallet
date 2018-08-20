
import React, { Component } from 'react';
import { View, Clipboard, Alert } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import Modal from 'react-native-simple-modal';
import EthUtil from 'ethereumjs-util';
import EthereumJsWallet from 'ethereumjs-wallet';
import WalletUtils from './../utils/wallet';
import ActionCreator from './../actions';
import { connect } from 'react-redux';
const uuid = require('uuid')


class ModalRestoreWallet extends Component {     
    constructor(props, context) {
        super(props, context);
    }

    state = {
        nickName: '',
        privateKey: '',
    };
    
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
                        <FormLabel>PrivateKey</FormLabel>
                        <FormInput value={this.state.privateKey} onChangeText={(value) => this.setState({privateKey: value})}/>
                    </View>
                    <View>
                        <Button
                            onPress={this.readPrivateKeyFromClipboard}
                            title="paste"
                        />
                        <Button
                            disabled={!this.isValidRestoreButton()}
                            onPress={this.restoreWallet}
                            title="restore"
                        />
                    </View>
                </View>
            </Modal>
        );
    }

    closeModal = () => {
        this.setState({
            nickName: '',
            privateKey: '',
        })
        this.props.hideModalRestoreWallet();
        const walletList = this.props.walletList.filter(wallet => wallet.symbol == 'BLC');            
        console.log('walletList : ' + walletList);
        this.props.setWalletList(walletList);
        this.updateWalletBalance();
    }

    restoreWallet = () => {
        this.props.hideModalRestoreWallet();
        const nickName = this.state.nickName;
        const privateKey = this.state.privateKey;    
        const walletFromEth = EthereumJsWallet.fromPrivateKey(
            Buffer.from(privateKey, 'hex'),
        );

        if (!WalletUtils.addressIsValid(walletFromEth.getAddressString())) {
            Alert.alert(
                'Fail to restore wallet from PrivateKey',
                'please check your privateKey',
                [
                    {text: 'OK', onPress: () => console.log('wallet address is wrong : '+ walletFromEth.getAddressString())},
                ]
            );
        } else {
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
                const walletList = this.props.walletList.filter(wallet => wallet.symbol == 'BLC');            
                console.log('walletList : ' + walletList);
                this.props.setWalletList(walletList);
                this.updateWalletBalance();
                Alert.alert(
                    'Success to restore wallet from PrivateKey',
                    this.props.defaultWallet.walletAddress,
                    [
                        {
                            text: 'OK', onPress: () => {}
                        }
                    ]
                );
            }
        }
        
        this.setState({
            nickName: '',
            privateKey: '',
        })
    };

    updateWalletBalance = async () => {
        console.log('defaultWallet.walletAddress : ' + this.props.defaultWallet.walletAddress);
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
            console.log("ddddddddddd currentETHBalance: " + currentETHBalance)
            console.log("ddddddddddd currentBLCBalance: " + currentBLCBalance)
            this.props.setEthBalance(currentETHBalance); 
            this.props.setBlcBalance(currentBLCBalance);
        }
    }

    readPrivateKeyFromClipboard = async () => {   
        const privateKey = await Clipboard.getString();   
        this.setState({ privateKey }); 
    };

    isValidRestoreButton = () => {
        if (this.isValidPrivateKey(this.state.privateKey))
        {
            if (!this.isEmptString(this.state.nickName))
            {
                return true;
            }
        }
        return false;
    }

    isValidPrivateKey = (h) => {
        try {
            if (EthUtil.isValidPrivate(Buffer.from(h, 'hex'))) {
                return true;
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
        setWalletList: (walletList) => {
            dispatch(ActionCreator.setWalletList(walletList));
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
        }
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalRestoreWallet);
