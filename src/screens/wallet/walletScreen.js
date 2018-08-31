
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements'
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
                <Header
                    backgroundColor={'#092834'}
                    //leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'BlueCots Wallet', style: { fontWeight: 'bold', color: '#fff' } }}
                    //rightComponent={{ icon: 'home', color: '#fff' }}
                />
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