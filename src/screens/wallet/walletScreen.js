
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import WalletBalanceErc20 from './../../components/walletBalanceErc20';

class WalletScreen extends Component{
    static navigationOptions = {
        // title: 'Wallet & GiftCon',
        tabBarLabel: 'wallet',
        tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-card" size={30} color={tintColor} />
        )
    };

    render() {
        return (
            <View style={styles.container}>  
                <View style={styles.balanceContainer}>
                    <WalletBalanceErc20 />
                </View>
                <View style={styles.gifticonContainer}>
                    <Text>gifticon container not ready.</Text>
                </View>
            </View>  
        );
    }
}
  
export default WalletScreen;
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    balanceContainer: {
        flex: 5,
        backgroundColor: 'darkcyan',
        padding: 20,
    },
    gifticonContainer: {
        flex: 6,
        alignItems: 'center',
        justifyContent : 'center',
    },
})