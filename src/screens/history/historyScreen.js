
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from 'react-navigation'; 
import BlcHistoryScreen from './blcHistoryScreen'
import EthHistoryScreen from './ethHistoryScreen'

class HistoryScreen extends Component{
    static navigationOptions = {
        tabBarLabel: 'history',
        tabBarIcon: ({ tintColor }) => (
            <Ionicons name="ios-stats" size={30} color={tintColor} />
        )
    };

    render(){
        return (
            <View style={styles.container}>
                <Header
                    backgroundColor={'#092834'}
                    //leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'History', style: { fontWeight: 'bold', color: '#fff' } }}
                    //rightComponent={{ icon: 'home', color: '#fff' }}
                />
                <SendScreenTabNavigator />
            </View>
        );
    }
}

export default HistoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E4F1F6',
    },
})

const SendScreenTabNavigator = createMaterialTopTabNavigator({
    blcTap:{
        screen: BlcHistoryScreen
    },
    ethTab:{
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
      }
})