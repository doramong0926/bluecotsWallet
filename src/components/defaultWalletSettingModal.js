
import React, { Component } from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import Modal from 'react-native-simple-modal';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import EthUtil from 'ethereumjs-util';
import WalletUtils from './../utils/wallet';

class DefaultWalletSettingModal extends Component {  
    render() {
        return (
            <Modal 
                offset={0}
                open={this.props.defaultWalletSettingModalIsOpen}
                animationDuration={200}
                animationTension={40}
                closeOnTouchOutside={true}
                disableOnBackPress={false}
                modalDidClose={() => {this.props.setDefaultWalletSettingModalIsOpen(false)}}
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
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableHighlight onPress={() => this.handleSelectPress()} underlayColor="gray">
                        <View style={{flexDirection: 'row', margin: 10}}>
                            <Text style={{marginTop: 5, textAlign: 'justify'}}>Select another wallet</Text>
                        </View>  
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.handleModifyNickNamePress()} underlayColor="gray">
                        <View style={{flexDirection: 'row', margin: 10}}>   
                            <Text style={{marginTop: 5, textAlign: 'justify'}}>Modify nickname</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.handleBackupPress()} underlayColor="gray">
                        <View style={{flexDirection: 'row', margin: 10}}>
                            <Text style={{marginTop: 5, textAlign: 'justify'}}>Backup wallet</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.handleBackupPress()} underlayColor="gray">
                        <View style={{flexDirection: 'row', margin: 10}}>
                            <Text style={{marginTop: 5, textAlign: 'justify'}}>Delete wallet</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </Modal>
        );
    }
    handleSelectPress = () => {
        this.props.setDefaultWalletSettingModalIsOpen(false); 
        this.props.setSelectAnotherWalletModalIsOpen(true); 
    }
    handleModifyNickNamePress = () => {
        this.props.setDefaultWalletSettingModalIsOpen(false); 
    }
    handleBackupPress = () => {
        this.props.setDefaultWalletSettingModalIsOpen(false); 
    }
    handleDeletePress = () => {
        this.props.setDefaultWalletSettingModalIsOpen(false); 
    }
}

export default DefaultWalletSettingModal;
