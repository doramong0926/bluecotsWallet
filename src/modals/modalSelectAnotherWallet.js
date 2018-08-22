
import React, { Component } from 'react';
import { Text, View, ListView, TouchableHighlight, Alert, Clipboard, StyleSheet } from 'react-native';
import Modal from 'react-native-simple-modal';
import ActionCreator from './../actions';
import { connect } from 'react-redux';
import WalletUtils from './../utils/wallet';
import PropTypes from 'prop-types';
import store from './../config/store';

class ModalSelectAnotherWallet extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        defaultWallet: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,
    };

    state = {
        dataSourceForWalletList: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        }),
    };
    
    componentDidMount() {
        this.fetchWalletList();
    }

    componentWillReceiveProps() {
        this.fetchWalletList();
    }

    render() {
        return (            
            <Modal 
                offset={0}
                open={this.props.visibleModalSelectAnotherWallet}
                animationDuration={200}
                animationTension={40}
                closeOnTouchOutside={true}
                disableOnBackPress={false}
                modalDidClose={() => {this.closeModal()}}
                modalDidOpen={() => {this.openModal()}}
                modalProps={undefined}
                containerProps={undefined}
                containerStyle={{
                    justifyContent: "center"
                }}
                modalStyle={{
                    borderRadius: 2,
                    margin: 20,
                    padding: 10,
                    backgroundColor: "white"
                }}
                overlayStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                    flex: 1
                }}
            >
                <View>
                    <Text style={{textAlign: 'center'}}>Wallet List</Text>
                </View>
                <View>
                    <ListView
                        dataSource={this.state.dataSourceForWalletList}
                        renderRow={this.renderWalletList}
                        style={styles.listView}
                    />
                </View>  
            </Modal>
        );
    }

    closeModal = () => {
        this.props.hideModalSelectAnotherWallet()
    }

    openModal = () => {
        this.fetchWalletList();
    }    

    renderWalletList = (wallet) => {
        if (wallet.walletAddress !== undefined && wallet.walletAddress !== '') {
            return (
                <TouchableHighlight onPress={() => this.handlePress(wallet)} underlayColor="gray">
                    <View style={{flexDirection: 'row', margin: 10}}>
                        <View style={{flex:4}}>
                            <Text> {wallet.nickName} </Text>
                        </View>
                        <View style={{flex:6}}>
                            <Text> {wallet.walletAddress.substring(0,18)}... </Text>
                        </View>
                    </View>
                </TouchableHighlight>
            );
        } else {
            return (
                <View>
                </View>
            )
        }
    }

    handlePress = (wallet) => {
        this.props.setDefaultWallet(wallet);
        setTimeout(() => {
            this.updateWalletBalance(this.props.defaultWallet.walletAddress);
            this.props.hideModalSelectAnotherWallet();
        },); 
    }

    fetchWalletList = () => {
        this.state.dataSourceForWalletList = this.state.dataSourceForWalletList.cloneWithRows(this.props.walletList);
    };
    
    updateWalletBalance = async (walletAddress) => {
        if (walletAddress) {
                const currentETHBalance = await WalletUtils.getBalance({
                walletAddress: walletAddress,
                contractAddress:'', 
                symbol:'ETH', 
                decimals:0
            });
                const currentBLCBalance = await WalletUtils.getBalance({
                walletAddress: walletAddress,
                contractAddress: process.env.DEFAULT_TOKEN_CONTRACT_ADDRESS,
                symbol: process.env.DEFAULT_TOKEN_SYMBOL, 
                decimals: process.env.DEFAULT_TOKEN_DECIMALS, 
            });
            if (currentETHBalance !== undefined && currentBLCBalance !== undefined) {
                this.props.setEthBalance(currentETHBalance); 
                this.props.setBlcBalance(currentBLCBalance);
            };      
        }
    }    
}

const styles = StyleSheet.create({
    listView: {
        paddingTop: 20,
      },
})

function mapStateToProps(state) {
    return {
        walletList: state.wallet.walletList,
        defaultWallet: state.wallet.defaultWallet,
        visibleModalSelectAnotherWallet: state.modal.visibleModalSelectAnotherWallet,
        //dataSourceForWalletList: state.modal.dataSourceForWalletList,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setDefaultWallet: (wallet) => {
            dispatch(ActionCreator.setDefaultWallet(wallet));
        },
        setEthBalance: (balance) => {
            dispatch(ActionCreator.setEthBalance(balance));
        },
        setBlcBalance: (balance) => {
            dispatch(ActionCreator.setBlcBalance(balance));
        },
        showModalSelectAnotherWallet: () => {
            dispatch(ActionCreator.showModalSelectAnotherWallet());
        },
        hideModalSelectAnotherWallet: () => {
            dispatch(ActionCreator.hideModalSelectAnotherWallet());
        }
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalSelectAnotherWallet);