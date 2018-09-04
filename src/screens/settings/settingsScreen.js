import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { persistor, store } from './../../config/store';
import { Button } from 'react-native-elements'
import { 
	ETHERSCAN_API_KEY,
	INFURA_API_KEY ,
	SEGMENT_API_KEY,
	NETWORK,
	DEFAULT_TOKEN_NAME,
	DEFAULT_TOKEN_SYMBOL,
	DEFAULT_TOKEN_CONTRACT_ADDRESS,
	DEFAULT_TOKEN_DECIMALS,
	WALLET_VERSION
 } from './../../config/constants';
 
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
                <Text></Text>
                <Text>DEFAULT_TOKEN_NAME : {DEFAULT_TOKEN_NAME}</Text>
                <Text>DEFAULT_TOKEN_SYMBOL : {DEFAULT_TOKEN_SYMBOL}</Text>
                <Text>DEFAULT_TOKEN_CONTRACT_ADDRESS : {DEFAULT_TOKEN_CONTRACT_ADDRESS}</Text>                
                <Text>DEFAULT_TOKEN_DECIMALS : {DEFAULT_TOKEN_DECIMALS}</Text>
                <Text>ETHERSCAN_API_KEY : {ETHERSCAN_API_KEY}</Text>
                <Text>INFURA_API_KEY : {INFURA_API_KEY}</Text>
                <Text>SEGMENT_API_KEY : {SEGMENT_API_KEY}</Text>
                <Text>NETWORK : {NETWORK}</Text>
                <Text>WALLET_VERSION : {WALLET_VERSION}</Text>
                <Button
                    onPress={this.resetPersistor}
                    icon={{name: 'retweet', type: 'font-awesome'}}
                    title="RESET"
                    buttonStyle={{
                        backgroundColor: "#67AFCB",
                        borderColor: "transparent", 
                        borderRadius: 5
                    }}
                    containerViewStyle={{
                        // alignSelf: 'stretch',
                        // margin: 1,
                    }}
                />
            </View>
        );
    }
    resetPersistor = () => {
        persistor.purge();
    } 
}
export default settingsScreen;
 
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 20,
    }
})