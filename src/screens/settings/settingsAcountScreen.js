import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { Button, Header } from 'react-native-elements'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { persistor } from './../../config/store';
import { StackNavigator } from 'react-navigation';
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

 import SettingsMainScreen from './settingsMainScreen';
import SettingsWalletScreen from './settingsWalletScreen';
import SettingsSecurityScreen from './settingsSecurityScreen';
import SettingsAboutScreen from './settingsAboutScreen';
 
class SettingsAcountScreen extends Component{
    static navigationOptions = {
        // title: 'Acount',
        header: null,
    }

    render(){
        return (
            <View style={{flex: 1}}>
                <Header
                        backgroundColor={'#092834'}
                        //leftComponent={<Ionicons name="arrow-back" color={'#fff'} onPress = {this.props.navigation.goBack()}/>}
                        leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: () => this.props.navigation.goBack()}}
                        centerComponent={{ text: 'Acount', style: { fontWeight: 'bold', color: '#fff' } }}
                        IconProps={{type: 'font-awesome'}}
                        //rightComponent={{ icon: 'home', color: '#fff' }}
                />
                <View style={style.container}>

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
            </View>
        );
    }
    resetPersistor = () => {
        persistor.purge();
    } 
}
export default SettingsAcountScreen;
 
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 20,
    }
})