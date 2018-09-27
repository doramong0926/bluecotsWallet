
import './../../../shim';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Image, Easing } from 'react-native';
import { 
	WALLET_VERSION
 } from './../../config/constants';

class MainLogoScreen extends Component {
    static navigationOptions = {
        header: null,
    }

    constructor () {
        super()
        this.spinValue = new Animated.Value(0)
    };   

    componentDidMount = () => {
        this.playAnimationSpin()
    };

    playAnimationSpin = () => {
        this.spinValue.setValue(0)
        Animated.timing(
            this.spinValue,
            {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear
            }
        ).start(() => this.playAnimationSpin())
    };

    render(){        
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });
        const bluecotsLogoImg = require('./images/bluecots_COIN.png');
        const appVersion = WALLET_VERSION;
        return (
            <View style={style.container}>
                <View style={style.container}>
                    <Animated.Image
                        style={{
                        width: 200,
                        height: 200,
                        transform: [{rotate: spin}] }}
                        source={bluecotsLogoImg}
                    />
                </View>
                <View style={style.container}>
                    <Text>Bluecots wallet</Text>
                    <Text>(version : {appVersion})</Text>
                </View>
            </View>            
        );
    };
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default MainLogoScreen;
    



