
import React, { Component } from 'react';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { createStackNavigator, StackNavigator } from 'react-navigation';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

import SettingsMainScreen from './settingsMainScreen';
import SettingsAcountScreen from './settingsAcountScreen';
import SettingsWalletScreen from './settingsWalletScreen';
import SettingsSecurityScreen from './settingsSecurityScreen';
import SettingsAboutScreen from './settingsAboutScreen';



class SettingsScreen extends Component{
    static navigationOptions = {
        tabBarLabel: 'settings',
        tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-settings" size={30} color={tintColor} />
        )
    };
    
    render() {        
        return (
                <SettingsStackNavigator />
        );
    }
}

export default SettingsScreen;

const SettingsStackNavigator = createStackNavigator({
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