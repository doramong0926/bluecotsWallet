import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Button, Header } from 'react-native-elements'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { persistor } from './../../config/store';
import { WALLET_VERSION } from './../../config/constants';
import { StackNavigator } from 'react-navigation';

import SettingsMainScreen from './settingsMainScreen';
import SettingsAcountScreen from './settingsAcountScreen';
import SettingsWalletScreen from './settingsWalletScreen';
import SettingsSecurityScreen from './settingsSecurityScreen';

class SettingsAboutScreen extends Component{
    static navigationOptions = {
        // title: 'About',
        header: null,
    }
    render(){
        return (
            <View sytle={{flex: 1}}>
                <Header
                    backgroundColor={'#092834'}
                    //leftComponent={<Ionicons name="arrow-back" color={'#fff'} onPress = {this.props.navigation.goBack()}/>}
                    leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.props.navigation.goBack()}}
                    centerComponent={{ text: 'About', style: { fontWeight: 'bold', color: '#fff' } }}
                    IconProps={{type: 'font-awesome'}}
                    //rightComponent={{ icon: 'home', color: '#fff' }}
                />
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