import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ActionCreator from './../actions';

class WalletAddressWithNickNameForSend extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        walletForSend: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,        
        defaultWallet: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,
    };

    componentWillMount() {
        this.props.setWalletForSend(this.props.defaultWallet);
    }

    render() {
        return (
            this.renderAddressWithnickName()
        );
    }

    renderAddressWithnickName = () => {
        if (this.props.walletForSend.walletAddress) {
            return (
                <TouchableHighlight onPress={() => this.chageWallet()} underlayColor="gray">
                    <View style={styles.container}>
                        <View>
                            <Text style={styles.nickName}>{this.props.walletForSend.nickName}</Text>
                            <Text style={styles.address}>{this.props.walletForSend.walletAddress}</Text>
                        </View>
                        <View style={{paddingTop:5}}>
                            <Text style={styles.balanceTitle}> Available balance </Text>
                            {this.renderBalance()}
                        </View>                    
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
    
    renderBalance = () => {
        if (this.props.tokenName === 'BLC') {
            return <Text style={styles.balance}> {this.props.blcBalanceForSend.toFixed(10)} BLC</Text>
        } else if (this.props.tokenName === 'ETH') {
            return <Text style={styles.balance}> {this.props.ethBalanceForSend.toFixed(10)} ETH</Text>
        }
    }

    chageWallet = () => {
        this.props.showModalSelectAnotherWalletForSend(); 
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#67AFCB',
        marginVertical: 10,
        marginHorizontal: 15,        
        padding: 5,
        borderRadius: 10,
    },
    nickName: {
        fontSize: 14,
        color: 'black',
        textAlign: 'center',
    },
    address: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    balanceTitle: {
        fontSize: 12,
        color: 'black',
        textAlign: 'center',
    },
    balance: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#BD3D3A',
        textAlign: 'center',
    }
})

function mapStateToProps(state) {
    return {
        walletForSend: state.walletTemp.walletForSend,
        defaultWallet: state.wallet.defaultWallet,
        blcBalanceForSend: state.walletTemp.blcBalanceForSend,
        ethBalanceForSend: state.walletTemp.ethBalanceForSend,        
    };
}

function mapDispatchToProps(dispatch) {
    return {   
        setWalletForSend: (wallet) => {
            dispatch(ActionCreator.setWalletForSend(wallet));
        },     
        showModalSelectAnotherWalletForSend: () => {
            dispatch(ActionCreator.showModalSelectAnotherWalletForSend());
        },
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(WalletAddressWithNickNameForSend);
