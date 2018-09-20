import React, { Component } from 'react';
import { Platform } from 'react-native';

import { 
    createStackNavigator, 
    createBottomTabNavigator, 
    createMaterialTopTabNavigator,
} from 'react-navigation';

import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
import { Ionicons } from '@expo/vector-icons';

import VerificationPincodeScreen from '../screens/verification/verificationPincodeScreen';
import VerificationFingerPrintScreen from '../screens/verification/verificationFingerPrintScreen';
import AddWalletScreen from '../screens/addWallet/addWalletScreen';
import WalletScreen from '../screens/wallet/walletScreen'
import itemsScreen from '../screens/items/itemsScreen'
import receiveScreen from '../screens/receive/receiveScreen'
import BlcSendScreen from '../screens/send/BlcSendScreen'
import EthSendScreen from '../screens/send/EthSendScreen'
import BlcHistoryScreen from '../screens/history/blcHistoryScreen'
import EthHistoryScreen from '../screens/history/ethHistoryScreen'
import SettingsMainScreen from '../screens/settings/settingsMainScreen';
import SettingsAcountScreen from '../screens/settings/settingsAcountScreen';
import SettingsWalletScreen from '../screens/settings/settingsWalletScreen';
import SettingsSecurityScreen from '../screens/settings/settingsSecurityScreen';
import SettingsAboutScreen from '../screens/settings/settingsAboutScreen';

export const SettingsStackNavigator = createStackNavigator (
    {
        SettingsMain:{
            screen: SettingsMainScreen
        },
        Acount:{
            screen: SettingsAcountScreen
        },
        Wallet:{
            screen: SettingsWalletScreen
        },
        Security:{
            screen: SettingsSecurityScreen
        },
        About:{
            screen: SettingsAboutScreen
        }
    },
    {
        transitionConfig: getSlideFromRightTransition
    }
);

export const HistoryScreenTabNavigator = createMaterialTopTabNavigator (
    {
        BlcHistoryTap:{
            screen: BlcHistoryScreen
        },
        EthHistoryTap:{
            screen: EthHistoryScreen
        },
    }, 
    {
        animationEnabled: true,
        swipeEnabled: true,
        tabBarOptions: {
            labelStyle: {
                fontSize: 12,
            },
            tabStyle: {
                //width: 100,
            },
            style: {
                justifyContent: 'center',
                //width: 200,
                backgroundColor: "#347B98",
                //borderRadius: 50,
            },
        },
        navigationOptions: {
            header: null,
            headerLeft: null,
        },
    }
)

export const SendScreenTabNavigator = createMaterialTopTabNavigator (
    {
        BlcSendTap:{
            screen: BlcSendScreen
        },
        EthSendTab:{
            screen: EthSendScreen
        },
    }, 
    {
        animationEnabled: true,
        swipeEnabled: true,
        tabBarOptions: {
            labelStyle: {
                fontSize: 12,
            },
            tabStyle: {
            },
            style: {
                justifyContent: 'center',
                backgroundColor: "#347B98",
            },     
        },
        navigationOptions: {
            header: null,
            headerLeft: null,
        },
    }
)

export const MainScreenTabNavigator = createBottomTabNavigator (
    {
        walletTab:{
            screen: WalletScreen,   
        },
        itemsTab:{
            screen: itemsScreen,
        },
        sendTab:{
            screen: SendScreenTabNavigator,            
        },
        receiveTab:{
            screen: receiveScreen,
        },
        historyTab:{
            screen: HistoryScreenTabNavigator,
        },   
        settingsTab:{
            screen: SettingsStackNavigator,
        },
    }, 
    {
        
        initialRouteName: 'walletTab',
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
        },
        navigationOptions: ({ navigation }) => {
            const { routeName } = navigation.state;
            let tabBarLabel;
            if (routeName === 'sendTab') {
                tabBarLabel = 'send';
            } else if (routeName === 'historyTab') {
                tabBarLabel = 'history';
            } else if (routeName === 'settingsTab') {
                tabBarLabel = 'settings';
            }
            return {
                header: null,
                headerLeft: null,
                tabBarLabel,
                tabBarIcon: ({ focused, tintColor }) => {
                    const { routeName } = navigation.state;
                    if (routeName === 'sendTab')
                    {
                        return <Ionicons name="ios-send" size={30} color={tintColor} />  
                    } else if (routeName === 'historyTab') {
                        return <Ionicons name="ios-stats" size={30} color={tintColor} />
                    } else if (routeName === 'settingsTab') {
                        return <Ionicons name="ios-settings" size={30} color={tintColor} />
                    }
                }
            }
        },
        transitionConfig: getSlideFromRightTransition,
    }
)

export const AppStackNavigator = createStackNavigator (
    {
        VerificationPincode:{
            screen: VerificationPincodeScreen,
        },
        VerificationFingerPrint: {
            screen: VerificationFingerPrintScreen,
        },
        AddWallet: {
            screen: AddWalletScreen,
        },
        Main:{
            screen: MainScreenTabNavigator,
        },
    },
    {
        transitionConfig: getSlideFromRightTransition,
        navigationOptions: {
            header: null,
        },
    }
);