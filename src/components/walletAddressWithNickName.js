import React, { Component } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { store } from './../config/store';

class walletAddressWithNickName extends Component {
    render() {
        return (
            (store.getState().defaultWallet.walletAddress) ? (this.renderAddressWithnickName()) : (this.renderNeedToAddAddress())
        );
    }

    renderAddressWithnickName = () => {
        return (
            <View>
                <Text style={styles.nickName}>{this.props.nickName}</Text>
                <Text style={styles.address}>{this.props.walletAddr}</Text>
            </View>
        );
    }; 

    renderNeedToAddAddress = () => {
        return (
            <View>
                <Text style={styles.address}>Wallet address is not exist. Please add wallet first.</Text>
            </View>
        )
    };     
}

const styles = StyleSheet.create({
    nickName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
    address: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'black',
    },
})

export default walletAddressWithNickName;

