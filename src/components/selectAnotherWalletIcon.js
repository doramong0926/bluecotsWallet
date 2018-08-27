
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
        if(this.props.ScreenType == "send") {
            this.props.showModalSelectAnotherWalletForSend(); 
        } else {
            this.props.showModalSelectAnotherWalletForReceive(); 
        }        
    }
}

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showModalSelectAnotherWalletForSend: () => {
            dispatch(ActionCreator.showModalSelectAnotherWalletForSend());
        },
        showModalSelectAnotherWalletForReceive: () => {
            dispatch(ActionCreator.showModalSelectAnotherWalletForReceive());
        },
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SelectAnotherWalletIcon);
