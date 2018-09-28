import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Button, Icon } from 'react-native-elements'
import { Ionicons, FontAwesome } from '@expo/vector-icons';

class SettingsMainScreen extends Component{
    static navigationOptions = {
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
    }

    state = {
        accountDropDownVisible : false,
    }

    render(){
        return (
            <View style={{flex:1}}>
                <TouchableHighlight onPress={() => this.handlePressAccount()} underlayColor="gray">
                    <View style={{flexDirection: 'row', margin: 5, padding: 10}}>   
                        <Text style={styles.menuText}>Account</Text>
                        <View style={{flex: 1, alignItems:'flex-end', justifyContent:'center'}} >
                            <Ionicons name="ios-arrow-dropdown" size={20} />
                        </View>
                    </View>
                </TouchableHighlight>
                <View>
                    {this.renderAccountDropDown()}
                </View>

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

    renderAccountDropDown = () => {
        if (this.state.accountDropDownVisible === true) {
            return (
                <View>
                    <TouchableHighlight onPress={() => this.handlePressAccount1()} underlayColor="gray">
                        <Text>item1</Text>
                    </TouchableHighlight>
                    <Text>item2</Text>
                    <Text>item3</Text>
                </View>
            )
        }
    }

    handlePressSettingsMain = () => {
        this.props.navigation.navigate('SettingsMain');
    }

    handlePressAccount = () => {
        // this.props.navigation.navigate('Account');
        if (this.state.accountDropDownVisible === false) {
            this.setState({accountDropDownVisible: true});
        } else {
            this.setState({accountDropDownVisible: false});
        }
        
    }

    handlePressAccount1 = () => {
        this.props.navigation.navigate('Account');        
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