import React, { Component } from 'react';
import { StyleSheet, Platform, View, Text, Animated, Image, Easing} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';    

import WalletScreen from './../wallet/walletScreen'
import itemsScreen from './../items/itemsScreen'
import sendScreen from './../send/sendScreen'
import receiveScreen from './../receive/receiveScreen'
import settingsScreen from './../settings/settingsScreen'

class mainScreen extends Component{

    static navigationOptions = {
        // title: 'Wallet & GiftCon',
        header: null,
    }

    render(){
        return (
            <MainScreenTabNavigator />
        );
    }
}
export default mainScreen;

const MainScreenTabNavigator = createBottomTabNavigator({
        walletTab:{
            screen:WalletScreen    
        },
        itemsTab:{
            screen:itemsScreen
        },
        sendTab:{
            screen:sendScreen
        },
        receiveTab:{
            screen:receiveScreen
        },
        settingsTab:{
            screen:settingsScreen
        },    
    }, 
    {
        animationEnabled: true,
        swipeEnabled: false,
        tabBarOptions: {
            style: {
                ...Platform.select({
                    android:{
                        backgroundColor:'white'
                    }
                })
            },
            activeTintColor: '#000',
            inactiveTintColor: '#d1cece',
            showLabel: true,
            showIcon: true,
        }
    }
)
