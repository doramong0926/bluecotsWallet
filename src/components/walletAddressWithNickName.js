import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
                <View style={styles.container}>
                    <Text style={styles.nickName}>{this.props.defaultWallet.nickName}</Text>
                    <Text style={styles.address}>{this.props.defaultWallet.walletAddress}</Text>
                </View>
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
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 5,
        margin: 5,
        backgroundColor: "#347B98",
    },
    nickName: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
    },
    address: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
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
