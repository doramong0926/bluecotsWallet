
import React, { Component } from 'react';
import { View } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import ActionCreator from './../actions';
import { connect } from 'react-redux';

class SelectAnotherWalletIcon extends Component {
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
        this.props.showModalSelectAnotherWallet(); 
    }
}

function mapStateToProps(state) {
    return {
        visibleModalSelectAnotherWallet: state.modal.visibleModalSelectAnotherWallet
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showModalSelectAnotherWallet: () => {
            dispatch(ActionCreator.showModalSelectAnotherWallet());
        },
        hideModalSelectAnotherWallet: () => {
            dispatch(ActionCreator.hideModalSelectAnotherWallet());
        }
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SelectAnotherWalletIcon);
