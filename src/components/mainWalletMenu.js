import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ActionCreator from './../actions';
import { connect } from 'react-redux';

class MainWalletMenu extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.iconView}>
                    <Ionicons name="ios-add-circle-outline" onPress={this.handlePressAdd} size={30} color="black" />
                    <Text style={styles.iconText}>  Add </Text>
                </View>
                <View style={styles.iconView}>
                    <Ionicons name="ios-settings-outline" onPress={this.handlePressSettings} size={30} color="black" />
                    <Text style={styles.iconText}> Settings </Text>
                </View> 
            </View>
        );
    }

    handlePressAdd = () => {
        this.props.showModalAddWallet();
    }

    handlePressSettings = () => {
        this.props.showModalDefaultWalletSettings(); 
    }
}

function mapStateToProps(state) {
    return {
        
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showModalAddWallet: () => {
            dispatch(ActionCreator.showModalAddWallet());
        },
        showModalChangeDefaultWallet: () => {
            dispatch(ActionCreator.showModalChangeDefaultWallet());
        },
        showModalDefaultWalletSettings: () => {
            dispatch(ActionCreator.showModalDefaultWalletSettings());
        },
    };
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',        
        justifyContent: 'center', 
        alignItems: 'center', 
        margin: 10,
    },
    iconView: {
        alignItems: 'center', 
        justifyContent: 'center', 
        width:60, 
    },
    iconText: {
        textAlign: 'center', 
        fontSize: 10
    }
});
  
export default connect(mapStateToProps, mapDispatchToProps)(MainWalletMenu);