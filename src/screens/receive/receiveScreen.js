
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import WalletUtils from './../../utils/wallet';
import { store } from './../../config/store';

class receiveScreen extends Component{  
    static navigationOptions = {
        tabBarLabel: 'receive',
        tabBarIcon: ({ tintColor }) => (
            <Ionicons name="md-filing" size={30} color={tintColor} />
        )
    };  
    componentDidMount() {
        ;
    }

    render(){
        return (
            <View style={style.container}>
                <View style={style.container}>
                    <QRCode 
                        size = {200} 
                        value={store.getState().defaultWallet.walletAddress}
                    />
                </View>
                <View style={style.container}>
                    <Text>{store.getState().defaultWallet.walletAddress}</Text>
                </View>
            </View>  
        );
    }
}
export default receiveScreen;
 
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})