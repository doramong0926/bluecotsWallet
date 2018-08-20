
import React, { Component } from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ActionCreator from './../actions';
import { connect } from 'react-redux';

class DefaultWalletSettingIcon extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Ionicons name="ios-menu" onPress={this.handlePress} size={35} color="black" />
            </View>
        );
    }

    handlePress = () => {
        this.props.showModalDefaultWalletSettings(true); 
    }
}

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showModalDefaultWalletSettings: () => {
            dispatch(ActionCreator.showModalDefaultWalletSettings());
        },
        hideModalDefaultWalletSettings: () => {
            dispatch(ActionCreator.hideModalDefaultWalletSettings());
        }
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(DefaultWalletSettingIcon);