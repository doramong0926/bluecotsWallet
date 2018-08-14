
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

class CreateWalletIcon extends Component {
    render() {
        return (
            <View>
                <Ionicons name="ios-add-circle-outline" onPress={this.handlePress} size={60} color="black" />
            </View>
        );
    }

    handlePress = () => {
        this.props.setCreateWalletModalIsOpen(true); 
    }
}

export default CreateWalletIcon;
