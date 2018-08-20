
import React, { Component } from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ActionCreator from './../actions';
import { connect } from 'react-redux';

class CreateWalletIcon extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <View>
                <Ionicons name="ios-add-circle-outline" onPress={this.handlePress} size={60} color="black" />
            </View>
        );
    }

    handlePress = () => {
        this.props.showModalCreateWallet();
    }
}

function mapStateToProps(state) {
    return {
        
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showModalCreateWallet: () => {
            dispatch(ActionCreator.showModalCreateWallet());
        },
        hideModalCreateWallet: () => {
            dispatch(ActionCreator.hideModalCreateWallet());
        }
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(CreateWalletIcon);
