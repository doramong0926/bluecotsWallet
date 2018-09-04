
import './../../../shim';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Image, Easing } from 'react-native';
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

class splashScreen extends Component {

    state = {
        isVisible: true,
    };

    static navigationOptions = {
        header: null,
    }

    constructor () {
        super()
        this.spinValue = new Animated.Value(0)
        this.state={
            isVisible : true,
        }
    };   

    componentDidMount = () => {
        var that = this;     
        setTimeout(function(){     
          that.Hide_Splash_Screen();     
        }, 5000);

        this.playAnimationSpin();        
    };

    Hide_Splash_Screen=()=>{ 
        this.setState({ 
            isVisible : false      
        });     
    }

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
        const bluecotsLogoImg = require('./image/bluecots_COIN.png');
        const appVersion = WALLET_VERSION;

        let Splash_Screen = ( 
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
        ) 
        return(
            <View style = { styles.container }>
                <Text style={{textAlign: 'center'}}> Hello Guys </Text>
                {
                  (this.state.isVisible === true) ? Splash_Screen : null
                }
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

export default splashScreen;
    



