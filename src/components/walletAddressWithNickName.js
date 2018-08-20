import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ActionCreator from './../actions';

class walletAddressWithNickName extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            this.renderAddressWithnickName()
        );
    }

    renderAddressWithnickName = () => {
        if (this.props.defaultWallet) {
            return (
                <View>
                    <Text style={styles.nickName}>{this.props.defaultWallet.nickName}</Text>
                    <Text style={styles.address}>{this.props.defaultWallet.walletAddress}</Text>
                </View>
            );
        }
        else {
            return (
                <View>
                    <Text style={styles.address}>Wallet address is not exist. Please add wallet first.</Text>
                </View>
            )
        }
    };  
}

const styles = StyleSheet.create({
    nickName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
    address: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'black',
    },
})

function mapStateToProps(state) {
    return {
        defaultWallet: state.wallet.defaultWallet,
    };
}

function mapDispatchToProps(dispatch) {
    return {        
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(walletAddressWithNickName);
