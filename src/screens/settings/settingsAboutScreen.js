import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { persistor } from './../../config/store';
import { WALLET_VERSION } from './../../config/constants';

class SettingsAboutScreen extends Component{
    static navigationOptions = {
        title: 'About',
        headerTitleStyle: {
            textAlign: 'center',
            fontSize: 14,
            color: 'white',
        },
        headerStyle: {
            backgroundColor: '#092834',
            height: 40,
        },
        headerTintColor: 'white',
    }

    render(){
        return (
            <View sytle={{flex: 1}}>
                <View style={style.container}>
                <Text>WALLET_VERSION : {WALLET_VERSION}</Text>
                </View>
            </View>
        );
    }
}
export default SettingsAboutScreen;
 
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 20,
    }
})