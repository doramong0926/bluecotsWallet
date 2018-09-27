import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
                    <TouchableOpacity onPress={() => this.handlePressAdd()} value="0.5">
                        <View style={styles.iconView}>
                            <Ionicons name="ios-add-circle-outline" size={30} color="black" />
                            <Text style={styles.iconText}>Add wallet</Text>
                        </View>
                        </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.handlePressChangeWallet()} value="0.5">
                        <View style={styles.iconView}>
                            <Ionicons name="ios-repeat-outline" size={30} color="black" />
                            <Text style={styles.iconText}>Change wallet</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.handlePressSend()} value="0.5">
                        <View style={styles.iconView}>
                            <Ionicons name="ios-send-outline" size={30} color="black" />
                            <Text style={styles.iconText}>Send</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.handlePressReceive()} value="0.5">
                        <View style={styles.iconView}>
                            <Ionicons name="ios-qr-scanner-outline" size={30} color="black" />
                            <Text style={styles.iconText}>Receive</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.handlePressSettings()} value="0.5">
                        <View style={styles.iconView}>
                            <Ionicons name="ios-settings-outline" onPress={this.handlePressSettings} size={30} color="black" />
                            <Text style={styles.iconText}>Settings</Text>
                        </View> 
                    </TouchableOpacity>
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
        this.props.setModalSendTokenName('BLC');
        this.props.setModalAddressToSend(null);
        this.props.setModalAmountToSend(null);
        setTimeout(() => {
            this.props.showModalSend();    
        }, );
    }

    handlePressReceive = () => {
        this.props.showModalReceive();
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
        showModalReceive: () => {
            dispatch(ActionCreator.showModalReceive());
        },
        showModalSend: () => {
            dispatch(ActionCreator.showModalSend());
        },
        setModalSendTokenName: (tokenName) => {
            dispatch(ActionCreator.setModalSendTokenName(tokenName));
        },
        setModalAddressToSend: (address) => {
            dispatch(ActionCreator.setModalAddressToSend(address));
        },
        setModalAmountToSend: (amount) => {
            dispatch(ActionCreator.setModalAmountToSend(amount));
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
