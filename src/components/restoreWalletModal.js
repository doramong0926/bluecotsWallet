
import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Alert, Clipboard, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import Modal from 'react-native-simple-modal';
import EthUtil from 'ethereumjs-util';
import WalletUtils from './../utils/wallet';

class RestoreWalletModal extends Component {     
    state = {
        nickName: '',
        privateKey: '',
    };
    
    render() {
        return (
            <Modal 
                offset={0}
                open={this.props.restoreWalletModalIsOpen}
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
        this.props.setRestoreWalletModalIsOpen(false)
    }

    restoreWallet = () => {
        var ret = false;
        this.props.setRestoreWalletModalIsOpen(false);
        const nickName = this.state.nickName;
        const privateKey = this.state.privateKey;
        ret = WalletUtils.restoreWallet(nickName, privateKey);        
        
        this.setState({
            nickName: '',
            privateKey: '',
        })

        if (ret) {
            this.props.updateWalletBalance();
            this.props.fetchWalletList();
        }
    };

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

export default RestoreWalletModal;
