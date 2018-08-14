
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

class DefaultWalletSettingIcon extends Component {
    render() {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Ionicons name="ios-menu" onPress={this.handlePress} size={35} color="black" />
            </View>
        );
    }

    handlePress = () => {
        this.props.setDefaultWalletSettingModalIsOpen(true); 
    }
}

export default DefaultWalletSettingIcon;
