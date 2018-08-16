
import React, { Component } from 'react';
import { Text, View, ListView, TouchableHighlight, Alert, Clipboard, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import Modal from 'react-native-simple-modal';
import WalletUtils from './../utils/wallet';
import { Item } from 'native-base';
import { store } from '../config/store';
import { log } from 'util';

class SelectAnotherWalletModal extends Component {
    state = {
        nickName: '',
    };

    render() {
        return (            
            <Modal 
                offset={0}
                open={this.props.selectAnotherWalletModalIsOpen}
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
                    <Text style={{textAlign: 'center'}}>Wallet List2 </Text>
                </View>
                <View>
                    <ListView
                        dataSource={this.props.dataSourceForWalletListModal}
                        renderRow={this.renderWalletList}
                        style={styles.listView}
                    />
                </View>  
            </Modal>
        );
    }

    closeModal = () => {
        this.props.setSelectAnotherWalletModalIsOpen(false)
    }

    renderWalletList = (wallet) => {
        return (
            <TouchableHighlight onPress={() => this.handlePress(wallet)} underlayColor="gray">
                <View style={{flexDirection: 'row', margin: 10}}>
                    <View style={{flex:4}}>
                        <Text> {wallet.nickName} </Text>
                    </View>
                    <View style={{flex:6}}>
                        <Text> {wallet.walletAddress.substring(0,18)}... </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    handlePress = (wallet) => {
        WalletUtils.setDefaultWallet(wallet);
        this.props.updateWalletBalance();
        this.props.setSelectAnotherWalletModalIsOpen(false);
    }
}

const styles = StyleSheet.create({
    listView: {
        paddingTop: 20,
      },
})

export default SelectAnotherWalletModal;
