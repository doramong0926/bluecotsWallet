import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
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
                <TouchableHighlight onPress={() => this.chageWallet()} underlayColor="gray">
                    <View style={styles.container}>
                        <Text style={styles.nickName}>{this.props.walletForReceive.nickName}</Text>
                        <Text style={styles.address}>{this.props.walletForReceive.walletAddress}</Text>
                        <View style={{paddingTop:5}}>
                                <Text style={{textAlign: 'center', color:'#BCBCBE'}}>Click to change wallet.</Text>
                        </View>
                    </View>
                </TouchableHighlight>
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
    chageWallet = () => {
        this.props.showModalSelectAnotherWalletForReceive(); 
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#67AFCB',
        margin: 5,        
        padding: 5,
        borderRadius: 10,
    },
    nickName: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    address: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
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
        showModalSelectAnotherWalletForReceive: () => {
            dispatch(ActionCreator.showModalSelectAnotherWalletForReceive());
        },
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(WalletAddressWithNickNameForReceive);
