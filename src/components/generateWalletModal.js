
import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Alert, Clipboard, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import Modal from 'react-native-simple-modal';
import WalletUtils from './../utils/wallet';

class GenerateWalletModal extends Component {     
    state = {
        nickName: '',
    };
    
    render() {
        return (
            <Modal 
                offset={0}
                open={this.props.generateWalletModalIsOpen}
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
        this.props.setGenerateWalletModalIsOpen(false)
    }

    generateWallet = () => {
        var ret = false;
        this.props.setGenerateWalletModalIsOpen(false);
        const nickName = this.state.nickName;
        ret = WalletUtils.generateWallet(nickName);        
        
        this.setState({
            nickName: '',
        })

        if (ret) {
            this.props.updateWalletBalance();
            this.props.fetchWalletList();
        }
    };

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


export default GenerateWalletModal;
