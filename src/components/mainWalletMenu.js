import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import ActionCreator from './../actions';
import { connect } from 'react-redux';

class MainWalletMenu extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.iconView}>
                        <Ionicons name="ios-add-circle-outline" onPress={this.handlePressAdd} size={30} color="black" />
                        <Text style={styles.iconText}>Add wallet</Text>
                    </View>
                    <View style={styles.iconView}>
                        <Ionicons name="ios-repeat-outline" onPress={this.handlePressChangeWallet} size={30} color="black" />
                        <Text style={styles.iconText}>Change wallet</Text>
                    </View>
                    <View style={styles.iconView}>
                        <Ionicons name="ios-send-outline" onPress={this.handlePressSend} size={30} color="black" />
                        <Text style={styles.iconText}>Send</Text>
                    </View>
                    <View style={styles.iconView}>
                        <Ionicons name="ios-qr-scanner-outline" onPress={this.handlePressReceive} size={30} color="black" />
                        <Text style={styles.iconText}>Receive</Text>
                    </View>
                    <View style={styles.iconView}>
                        <Ionicons name="ios-settings-outline" onPress={this.handlePressSettings} size={30} color="black" />
                        <Text style={styles.iconText}>Settings</Text>
                    </View> 
                </View>
            </View>
        );
    }

    handlePressAdd = () => {
        this.props.showModalAddWallet();
    }

    handlePressChangeWallet = () => {
        this.props.showModalChangeDefaultWallet(); 
    }  

    handlePressSend = () => {
        this.props.navigation.navigate('send');
    }

    handlePressReceive = () => {
        this.props.showModalWalletInfomation();
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
        showModalWalletInfomation: () => {
            dispatch(ActionCreator.showModalWalletInfomation());
        },
    };
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',        
        justifyContent: 'center', 
        alignItems: 'center',
    },
    iconView: {
        alignItems: 'center', 
        justifyContent: 'center', 
        width:70, 
    },
    iconText: {
        textAlign: 'center', 
        fontSize: 10
    }
});
  
export default connect(mapStateToProps, mapDispatchToProps)(MainWalletMenu);
