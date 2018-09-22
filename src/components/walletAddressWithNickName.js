import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ActionCreator from './../actions';

class walletAddressWithNickName extends Component {
    static propTypes = {
        defaultWallet: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,
    };

    render() {
        return (
            this.renderAddressWithnickName()
        );
    }

    renderAddressWithnickName = () => {
        if (this.props.defaultWallet.walletAddress) {
            return (
                <TouchableHighlight onPress={() => this.chageWallet()} underlayColor="gray">
                    <View style={styles.container}>
                        <Text style={styles.nickName}>Nickname : {this.props.defaultWallet.nickName}</Text>
                        <Text style={styles.address}>{this.props.defaultWallet.walletAddress}</Text>
                        {/* <View style={{paddingTop:5}}>
                            <Text style={{textAlign: 'center', color:'#BCBCBE'}}>Click to change wallet</Text>
                        </View>    */}
                    </View>
                </TouchableHighlight>     
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <Text style={styles.address}>Wallet address is not exist. Please add wallet first.</Text>
                </View>
            )
        }
    };  
    chageWallet = () => {
        this.props.showModalChangeDefaultWallet(); 
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    nickName: {
        fontSize: 13,
        color: 'black',
        textAlign: 'left',
    },
    address: {
        fontSize: 13,        
        color: 'black',
        textAlign: 'left',
    },
})

function mapStateToProps(state) {
    return {
        defaultWallet: state.wallet.defaultWallet,
    };
}

function mapDispatchToProps(dispatch) {
    return {     
        showModalChangeDefaultWallet: () => {
            dispatch(ActionCreator.showModalChangeDefaultWallet());
        },
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(walletAddressWithNickName);
