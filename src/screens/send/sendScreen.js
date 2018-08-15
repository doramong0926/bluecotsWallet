
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from 'react-navigation'; 
import BlcSendScreen from './BlcSendScreen'
import EthSendScreen from './EthSendScreen'

class sendScreen extends Component{
    static navigationOptions = {
        tabBarLabel: 'send',
        tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-send" size={30} color={tintColor} />
        )
    };

    render(){
        return (
            <SendScreenTabNavigator />
        );
    }
}
export default sendScreen;

const SendScreenTabNavigator = createMaterialTopTabNavigator({
    blcTap:{
        screen: BlcSendScreen
    },
    ethTab:{
        screen: EthSendScreen
    },
}, 
{
    animationEnabled: false,
    swipeEnabled: true,
    tabBarOptions: {
        labelStyle: {
            fontSize: 12,
        },
        tabStyle: {
            width: 100,
        },
        style: {
            justifyContent: 'center',
            width: 200,
            marginTop: 50,
            backgroundColor: 'darkcyan',
            borderRadius: 50,
        },
      }
})