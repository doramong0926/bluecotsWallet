import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
 
class itemsScreen extends Component{
    static navigationOptions = {
    };
    render(){
        return (
            <View style={style.container}>
                <Text>Items screen</Text>
                <Text>It is not supported yet.</Text>
            </View>
        );
    }
}
export default itemsScreen;
 
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})