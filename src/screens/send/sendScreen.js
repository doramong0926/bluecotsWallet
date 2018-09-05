
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
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
            <View style={styles.container}>
                <Header
                    backgroundColor={'#092834'}
                    //leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'Send', style: { fontWeight: 'bold', color: '#fff' } }}
                    //rightComponent={{ icon: 'home', color: '#fff' }}
                />
                <SendScreenTabNavigator />
            </View>
        );
    }
}

export default sendScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E4F1F6',
    },
})

const SendScreenTabNavigator = createMaterialTopTabNavigator({
    blcTap:{
        screen: BlcSendScreen
    },
    ethTab:{
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
            //width: 100,
        },
        style: {
            justifyContent: 'center',
            //width: 200,
            backgroundColor: "#347B98",
            //borderRadius: 50,
        },
      }
})