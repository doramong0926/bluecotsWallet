
import React, { Component } from 'react';
import { Text, View, ListView, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-simple-modal';
import ActionCreator from './../actions';
import { connect } from 'react-redux';
import WalletUtils from './../utils/wallet';
import PropTypes from 'prop-types';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { 
	DEFAULT_TOKEN_SYMBOL,
	DEFAULT_TOKEN_CONTRACT_ADDRESS,
	DEFAULT_TOKEN_DECIMALS,
 } from './../config/constants';

class ModalChangeDefaultWallet extends Component {
    static propTypes = {
        defaultWallet: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,
    };

    constructor(props, context) {
        super(props);
        this.state = {
            dataSourceForWalletList: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    }

    componentDidMount() {   
        this.fetchWalletList(this.props.walletList);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.walletList !== nextProps.walletList) {
            this.fetchWalletList(nextProps.walletList);
        }
    }
    
    render() {
        return (            
            <Modal 
                offset={0}
                open={this.props.visibleModalChangeDefaultWallet}
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
                    margin: 0,
                    padding:0,
                    borderRadius: 10,
                    marginHorizontal: 20,
                    backgroundColor: "white"
                }}
                overlayStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                    flex: 1
                }}
            >
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Wallet List</Text>
                    <View style={{alignSelf:"flex-end", paddingRight:20, position:"absolute"}}>
                        <TouchableOpacity onPress={() => this.closeModal()} value={'0.5'}>
                            <Ionicons name="ios-close-circle-outline" size={20}/>
                        </TouchableOpacity>
                    </View>                      
                </View>
                <ListView
                    dataSource={this.state.dataSourceForWalletList}
                    renderRow={this.renderWalletList}
                    style={styles.bodyContainer}
                />
            </Modal>
        );
    }

    closeModal = () => {
        this.props.hideModalChangeDefaultWallet()
    }

    openModal = () => {
        this.fetchWalletList(this.props.walletList);
    }    

    renderWalletList = (wallet) => {
        if (wallet.walletAddress !== undefined && wallet.walletAddress !== '') {
            return (
                <View>
                    <TouchableOpacity onPress={() => this.handlePress(wallet)} value={'0.5'}>
                        <View style={{flexDirection: 'row', margin: 10}}>
                            <View style={{flex:3}}>
                                <Text> {wallet.nickName} </Text>
                            </View>
                            <View style={{flex:7}}>
                                <Text> {wallet.walletAddress.substring(0,22)}... </Text>
                            </View>
                        </View>                                        
                    </TouchableOpacity>
                    <View style={{borderColor: 'gray', borderWidth: 0.5}}></View>
                </View>
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
        this.props.setIsLoadingTxData(true);
        setTimeout(() => {
            this.updateWalletBalance(this.props.defaultWallet.walletAddress);
            this.props.hideModalChangeDefaultWallet();
        },); 
    }

    fetchWalletList = (walletList) => {
        this.state.dataSourceForWalletList = this.state.dataSourceForWalletList.cloneWithRows(walletList);
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
                contractAddress: DEFAULT_TOKEN_CONTRACT_ADDRESS,
                symbol: DEFAULT_TOKEN_SYMBOL, 
                decimals: DEFAULT_TOKEN_DECIMALS, 
            });
            if (currentETHBalance !== undefined) {
                if (this.props.ethBalance !== currentETHBalance)
                {
                    this.props.setEthBalance(currentETHBalance); 
                }
            }
            if (currentBLCBalance !== undefined) {
                if (this.props.blcBalance !== currentBLCBalance)
                {
                    this.props.setBlcBalance(currentBLCBalance);
                }
            } 
        }
    }    
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#B4B7BA',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopStartRadius : 10,
        borderTopEndRadius: 10,
        padding: 10,
    }, 
    bodyContainer: {
        // justifyContent: 'center',
        paddingHorizontal: 10,
    },   
    headerText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    },
})

function mapStateToProps(state) {
    return {
        walletList: state.wallet.walletList,
        defaultWallet: state.wallet.defaultWallet,
        visibleModalChangeDefaultWallet: state.modal.visibleModalChangeDefaultWallet,
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
        showModalChangeDefaultWallet: () => {
            dispatch(ActionCreator.showModalChangeDefaultWallet());
        },
        hideModalChangeDefaultWallet: () => {
            dispatch(ActionCreator.hideModalChangeDefaultWallet());
        },
        setIsLoadingTxData: (value) => {
            dispatch(ActionCreator.setIsLoadingTxData(value));
        },
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalChangeDefaultWallet);