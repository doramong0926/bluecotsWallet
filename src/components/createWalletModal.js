
import React, { Component } from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import Modal from 'react-native-simple-modal';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import EthUtil from 'ethereumjs-util';
import WalletUtils from './../utils/wallet';

class CreateWalletModal extends Component {  
    render() {
        return (
            <Modal 
                offset={0}
                open={this.props.createWalletModalIsOpen}
                animationDuration={200}
                animationTension={40}
                closeOnTouchOutside={true}
                disableOnBackPress={false}
                modalDidClose={() => {this.props.setCreateWalletModalIsOpen(false)}}
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
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>  
                    <View style={{margin: 10}}>
                        <Ionicons name="ios-refresh-circle-outline" onPress={this.handleResotrePress} size={60} color="black" />   
                        <Text style={{marginTop: 5, textAlign: 'center'}}>restore</Text>
                    </View>
                    <View style={{margin: 10}}>
                        <Ionicons name="ios-add-circle-outline" onPress={this.handleNewPress} size={60} color="black" />
                        <Text style={{marginTop: 5, textAlign: 'center'}}>new</Text>
                    </View>
                </View>
            </Modal>
        );
    }
    handleResotrePress = () => {
        this.props.setCreateWalletModalIsOpen(false); 
        this.props.setRestoreWalletModalIsOpen(true); 
    }
    handleNewPress = () => {
        this.props.setCreateWalletModalIsOpen(false); 
        this.props.setGenerateWalletModalIsOpen(true); 
    }
}

export default CreateWalletModal;
