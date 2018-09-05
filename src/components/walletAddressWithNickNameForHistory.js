import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ActionCreator from './../actions';

class WalletAddressWithNickNameForHistory extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        walletForHistory: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,        
        defaultWallet: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,
    };

    componentWillMount() {
        this.props.setWalletForHistory(this.props.defaultWallet);
    }
    render() {
        return (
            this.renderAddressWithnickName()
        );
    }

    renderAddressWithnickName = () => {
        if (this.props.walletForHistory.walletAddress) {
            return (
                <TouchableHighlight onPress={() => this.chageWallet()} underlayColor="gray">
                    <View style={styles.container}>
                        <Text style={styles.nickName}>{this.props.walletForHistory.nickName}</Text>
                        <Text style={styles.address}>{this.props.walletForHistory.walletAddress}</Text>
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
                    <Text style={styles.address}>Please add wallet first.</Text>
                </View>
            )
        }
    };  
    chageWallet = () => {
        this.props.showModalSelectAnotherWalletForHistory(); 
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
})

function mapStateToProps(state) {
    return {
        walletForHistory: state.walletTemp.walletForHistory,
        defaultWallet: state.wallet.defaultWallet,
    };
}

function mapDispatchToProps(dispatch) {
    return {        
        setWalletForHistory: (wallet) => {
            dispatch(ActionCreator.setWalletForHistory(wallet));
        },
        showModalSelectAnotherWalletForHistory: () => {
            dispatch(ActionCreator.showModalSelectAnotherWalletForHistory());
        },
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(WalletAddressWithNickNameForHistory);
