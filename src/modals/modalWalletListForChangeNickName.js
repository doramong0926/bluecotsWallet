
import React, { Component } from 'react';
import { Text, View, ListView, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-simple-modal';
import ActionCreator from '../actions';
import { connect } from 'react-redux';
import WalletUtils from '../utils/wallet';
import PropTypes from 'prop-types';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { 
	DEFAULT_TOKEN_SYMBOL,
	DEFAULT_TOKEN_CONTRACT_ADDRESS,
    DEFAULT_TOKEN_DECIMALS,
    defaultWallet,
 } from '../config/constants';

class ModalWalletListForChangeNickName extends Component {
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
                open={this.props.visibleModalWalletListForChangeNickName}
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
        this.props.hideModalWalletListForChangeNickName()
    }

    openModal = () => {
        this.fetchWalletList();
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
        this.props.hideModalWalletListForChangeNickName();
        this.props.setWalletForChange(wallet);
        setTimeout(() => {
            this.props.showModalChangeNickName();    
        }, );
    }

    fetchWalletList = () => {
        this.state.dataSourceForWalletList = this.state.dataSourceForWalletList.cloneWithRows(this.props.walletList);
    };
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#67AFCB',
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
        visibleModalWalletListForChangeNickName: state.modal.visibleModalWalletListForChangeNickName,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        hideModalWalletListForChangeNickName: () => {
            dispatch(ActionCreator.hideModalWalletListForChangeNickName());
        },
        showModalChangeNickName: () => {
            dispatch(ActionCreator.showModalChangeNickName());
        },
        setWalletForChange: (wallet) => {
            dispatch(ActionCreator.setWalletForChange(wallet));
        },    
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalWalletListForChangeNickName);