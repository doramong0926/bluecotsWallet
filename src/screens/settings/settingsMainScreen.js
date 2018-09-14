import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Button, Header, Icon } from 'react-native-elements'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';

import SettingsAcountScreen from './settingsAcountScreen';
import SettingsWalletScreen from './settingsWalletScreen';
import SettingsSecurityScreen from './settingsSecurityScreen';
import SettingsAboutScreen from './settingsAboutScreen';

class SettingsMainScreen extends Component{
    static navigationOptions = {
        // title: 'Settings',
        header: null,
    }

    render(){
        return (
            <View style={{flex:1}}>
                <Header
                    backgroundColor={'#092834'}
                    //leftComponent={<Ionicons name="arrow-back" color={'#fff'} onPress = {this.props.navigation.goBack()}/>}
                    centerComponent={{ text: 'Settings', style: { fontWeight: 'bold', color: '#fff' } }}
                    IconProps={{type: 'font-awesome'}}
                    //rightComponent={{ icon: 'home', color: '#fff' }}
                />
                {/* <View style={{marginVertical: 5, borderColor: 'gray', borderWidth: 0.5}}></View> */}
                <TouchableHighlight onPress={() => this.handlePressAcount()} underlayColor="gray">
                    <View style={{flexDirection: 'row', margin: 5, padding: 10}}>   
                        <Text style={styles.menuText}>Acount</Text>
                        <View style={{flex: 1, alignItems:'flex-end', justifyContent:'center'}} >
                            <Ionicons name="ios-arrow-dropdown" size={20} />
                        </View>
                    </View>
                </TouchableHighlight>

                <View style={{marginVertical: 5, borderColor: 'gray', borderWidth: 0.5}}></View>

                <TouchableHighlight onPress={() => this.handlePressWallet()} underlayColor="gray">
                    <View style={{flexDirection: 'row', margin: 5, padding: 10}}>   
                        <Text style={styles.menuText}>Wallet</Text>
                        <View style={{flex: 1, alignItems:'flex-end', justifyContent:'center'}} >
                            <Ionicons name="ios-arrow-dropdown" size={20} />
                        </View>
                    </View>
                </TouchableHighlight>

                <View style={{marginVertical: 5, borderColor: 'gray', borderWidth: 0.5}}></View>

                <TouchableHighlight onPress={() => this.handlePressSecurity()} underlayColor="gray">
                    <View style={{flexDirection: 'row', margin: 5, padding: 10}}>   
                        <Text style={styles.menuText}>Security</Text>
                        <View style={{flex: 1, alignItems:'flex-end', justifyContent:'center'}} >
                            <Ionicons name="ios-arrow-dropdown" size={20} />
                        </View>
                    </View>
                </TouchableHighlight>

                <View style={{marginVertical: 5, borderColor: 'gray', borderWidth: 0.5}}></View>
                
                <TouchableHighlight onPress={() => this.handlePressAbout()} underlayColor="gray">
                    <View style={{flexDirection: 'row', margin: 5, padding: 10}}>   
                        <Text style={styles.menuText}>About bluecots wallet</Text>
                        <View style={{flex: 1, alignItems:'flex-end', justifyContent:'center'}} >
                            <Ionicons name="ios-arrow-dropdown" size={20} />
                        </View>
                    </View>
                </TouchableHighlight>
                
                <View style={{marginVertical: 5, borderColor: 'gray', borderWidth: 0.5}}></View>
            </View>
        );
    }

    handlePressSettingsMain = () => {
        this.props.navigation.navigate('SettingsMain');
    }

    handlePressAcount = () => {
        this.props.navigation.navigate('Acount');
    }

    handlePressWallet = () => {
        this.props.navigation.navigate('Wallet');
    }

    handlePressSecurity = () => {
        this.props.navigation.navigate('Security');
    }

    handlePressAbout = () => {
        this.props.navigation.navigate('About');
    }
}
export default SettingsMainScreen;
 
const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    menuText: {
        marginTop: 5, 
        textAlign: 'left',
        fontSize: 15,
    }
})