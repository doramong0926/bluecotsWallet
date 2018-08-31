import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ActionCreator from './../actions';

class WalletAddressWithNickNameForReceive extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        walletForReceive: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,        
        defaultWallet: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,
    };

    componentWillMount() {
        this.props.setWalletForReceive(this.props.defaultWallet);
    }
    render() {
        return (
            this.renderAddressWithnickName()
        );
    }

    renderAddressWithnickName = () => {
        if (this.props.walletForReceive.walletAddress) {
            return (
                <View>
                    <Text style={styles.nickName}>{this.props.walletForReceive.nickName}</Text>
                    <Text style={styles.address}>{this.props.walletForReceive.walletAddress}</Text>
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
        walletForReceive: state.walletTemp.walletForReceive,
        defaultWallet: state.wallet.defaultWallet,
    };
}

function mapDispatchToProps(dispatch) {
    return {        
        setWalletForReceive: (wallet) => {
            dispatch(ActionCreator.setWalletForReceive(wallet));
        },
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(WalletAddressWithNickNameForReceive);
