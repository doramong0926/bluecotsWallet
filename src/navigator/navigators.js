import React, { Component } from 'react';
import { Platform } from 'react-native';

import { 
    createStackNavigator, 
    createBottomTabNavigator, 
    createMaterialTopTabNavigator,
} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import VerificationPincodeScreen from '../screens/verification/verificationPincodeScreen';
import VerificationFingerPrintScreen from '../screens/verification/verificationFingerPrintScreen';
import AddWalletScreen from '../screens/addWallet/addWalletScreen';
import WalletScreen from '../screens/wallet/walletScreen'
import HotelScreen from '../screens/hotel/hotelScreen'
import HistoryScreen from '../screens/history/historyScreen'
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

export const HotelStackNavigator = createStackNavigator (
    {
        HotelStack: {
            screen: HotelScreen,
        }
    },
    {
        navigationOptions: {
            title: 'Hotel',
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
            screen: HistoryScreen,
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

export const MainScreenTabNavigator = createMaterialBottomTabNavigator (
    {
        wallet:{
            screen: WalletStackNavigator,            
        },        
        hotel:{
            screen: HotelStackNavigator,
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
        activeColor: '#FCCB1A',
        inactiveColor: '#B4B7BA',
        barStyle: { backgroundColor: '#092834' },
        navigationOptions: ({ navigation }) => {
            const { routeName } = navigation.state;
            return {
                tabBarIcon: ({ focused, tintColor }) => {
                    switch(routeName) {
                        case 'wallet':
                            return <Ionicons name="ios-card" size={27} color={tintColor} />
                            break;
                        case 'hotel':
                            return <FontAwesome name="building" size={27} color={tintColor} />
                            break;
                        case 'history':
                            return <Ionicons name="ios-stats" size={27} color={tintColor} />
                            break;
                        case 'settings':
                            return <Ionicons name="ios-settings" size={27} color={tintColor} />
                            break;
                    }
                },
            }
        },
        transitionConfig: getSlideFromRightTransition,
    }
);

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
