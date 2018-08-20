
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import ActionCreator from './../../actions';
import { connect } from 'react-redux';

class receiveScreen extends Component{  
    static navigationOptions = {
        tabBarLabel: 'receive',
        tabBarIcon: ({ tintColor }) => (
            <Ionicons name="md-filing" size={30} color={tintColor} />
        )
    };  
    componentDidMount() {
        ;
    }

    render(){
        return (
            <View style={style.container}>
                <View style={style.container}>
                    <QRCode 
                        size = {200} 
                        value={this.props.defaultWallet.walletAddress}
                    />
                </View>
                <View style={style.container}>
                    <Text>{this.props.defaultWallet.walletAddress}</Text>
                </View>
            </View>  
        );
    }
}

function mapStateToProps(state) {
    return {
        defaultWallet: state.wallet.defaultWallet,
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(receiveScreen);
 
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})