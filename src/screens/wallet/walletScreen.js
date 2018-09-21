
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import WalletBalanceErc20 from './../../components/walletBalanceErc20';

class WalletScreen extends Component{
    static navigationOptions = {    
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
        backgroundColor: '#E4F1F6',
    },
    balanceContainer: {
        backgroundColor: '#67AFCB',
    },
    gifticonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent : 'center',
    },
})