import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
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
 
class SettingsSecurityScreen extends Component{
    static navigationOptions = {
        title: 'Security',
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
    render(){
        return (
            <View style={{flex: 1}}>
                <View style={style.container}>
                    <Text> Security setting page</Text>
                </View>
            </View>
        );
    }
}
export default SettingsSecurityScreen;
 
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 20,
    }
})