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
import BlcSendScreen from '../screens/send/BlcSendScreen'
import EthSendScreen from '../screens/send/EthSendScreen'
import BlcHistoryScreen from '../screens/history/blcHistoryScreen'
import EthHistoryScreen from '../screens/history/ethHistoryScreen'
import SettingsMainScreen from '../screens/settings/settingsMainScreen';
import SettingsAccountScreen from '../screens/settings/settingsAccountScreen';
import SettingsWalletScreen from '../screens/settings/settingsWalletScreen';
import SettingsSecurityScreen from '../screens/settings/settingsSecurityScreen';
import SettingsAboutScreen from '../screens/settings/settingsAboutScreen';

export const SettingsStackNavigator = createStackNavigator (
    {
        SettingsMain:{
            screen: SettingsMainScreen
        },
        Account:{
            screen: SettingsAccountScreen
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
        transitionConfig: getSlideFromRightTransition,
        navigationOptions: {
            title: 'Settings',
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
        },
        headerLayoutPreset: 'center'
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
    }
)

export const WalletStackNavigator = createStackNavigator (
    {
        WalletStack: {
            screen: WalletScreen,
        }
    },
    {
        navigationOptions: {
            title: 'Bluecots wallet',
            headerTitleStyle: {
                textAlign: 'center',
                fontSize: 14,
                color: 'white',
            },
            headerStyle: {
                backgroundColor: '#092834',
                height: 40,
            },
        },
        headerLayoutPreset: 'center'
    }
)

export const ItemsStackNavigator = createStackNavigator (
    {
        ItemsStack: {
            screen: itemsScreen,
        }
    },
    {
        navigationOptions: {
            title: 'Items',
            headerTitleStyle: {
                textAlign: 'center',
                fontSize: 14,
                color: 'white',
            },
            headerStyle: {
                backgroundColor: '#092834',
                height: 40,
            },
        },
        headerLayoutPreset: 'center'
    }
)

export const SendStackNavigator = createStackNavigator (
    {
        SendStack: {
            screen: SendScreenTabNavigator,
        }
    },
    {
        navigationOptions: {
            title: 'Send',
            headerTitleStyle: {
                textAlign: 'center',
                fontSize: 14,
                color: 'white',
            },
            headerStyle: {
                backgroundColor: '#092834',
                height: 40,
            },
        },
        headerLayoutPreset: 'center'
    }
)

export const HistoryStackNavigator = createStackNavigator (
    {
        HistoryStack: {
            screen: HistoryScreenTabNavigator,
        }
    },
    {
        navigationOptions: {
            title: 'History',
            headerTitleStyle: {
                textAlign: 'center',
                fontSize: 14,
                color: 'white',
            },
            headerStyle: {
                backgroundColor: '#092834',
                height: 40,
            },
        },
        headerLayoutPreset: 'center'
    }
)

export const MainScreenTabNavigator = createBottomTabNavigator (
    {
        wallet:{
            screen: WalletStackNavigator,            
        },        
        items:{
            screen: ItemsStackNavigator,
        },
        send:{
            screen: SendStackNavigator,            
        },
        history:{
            screen: HistoryStackNavigator,
        },   
        settings:{
            screen: SettingsStackNavigator,
        },
    }, 
    {   
        initialRouteName: 'wallet',
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
            return {
                tabBarIcon: ({ focused, tintColor }) => {
                    switch(routeName) {
                        case 'wallet':
                            return <Ionicons name="ios-card" size={30} color={tintColor} />
                            break;
                        case 'items':
                            return <Ionicons name="ios-cart" size={30} color={tintColor} />
                            break;
                        case 'send':
                            return <Ionicons name="ios-send" size={30} color={tintColor} />
                            break;
                        case 'history':
                            return <Ionicons name="ios-stats" size={30} color={tintColor} />
                            break;
                        case 'settings':
                            return <Ionicons name="ios-settings" size={30} color={tintColor} />
                            break;
                    }
                },
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
        }
    }
);
