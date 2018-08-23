import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletAddressWithNickNameForSend extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        walletForSend: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,
    };

    render() {
        return (
            this.renderAddressWithnickName()
        );
    }

    renderAddressWithnickName = () => {
        if (this.props.walletForSend.walletAddress) {
            return (
                <View>
                    <Text style={styles.nickName}>{this.props.walletForSend.nickName}</Text>
                    <Text style={styles.address}>{this.props.walletForSend.walletAddress}</Text>
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
        walletForSend: state.wallet.walletForSend,
    };
}

function mapDispatchToProps(dispatch) {
    return {        
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(WalletAddressWithNickNameForSend);
