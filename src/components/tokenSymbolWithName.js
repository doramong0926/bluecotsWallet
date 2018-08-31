import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';

class TokenSymbolWithName extends Component {
    render() {
        return (
            <View style={{flexDirection: 'row'}}>
                <View>
                    <Image style={{width:40, height:40}} source={this.props.icon} />
                </View>
                <View style={{paddingLeft: 5}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>{this.props.tokenString}</Text>
                    <Text style={{fontSize: 10, textAlign: 'center'}}>{this.props.tokenName}</Text>
                </View>
            </View>
        );
    }
}

export default TokenSymbolWithName;

