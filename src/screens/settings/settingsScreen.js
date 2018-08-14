import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
 
class settingsScreen extends Component{
    static navigationOptions = {
        tabBarLabel: 'settings',
        tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-settings" size={30} color={tintColor} />
        )
    };
    render(){
        return (
            <View style={style.container}>
                <Text>settings screen</Text>
            </View>
        );
    }
}
export default settingsScreen;
 
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})