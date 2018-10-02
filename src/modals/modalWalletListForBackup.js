
import React, { Component } from 'react';
import { Text, View, ListView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Modal from 'react-native-simple-modal';
import ActionCreator from '../actions';
import { connect } from 'react-redux';
import WalletUtils from '../utils/wallet';
import PropTypes from 'prop-types';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

class ModalWalletListForBackup extends Component {
    static propTypes = {
    };

    constructor(props, context) {
        super(props, context);
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
                open={this.props.visibleModalWalletListForBackup}
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
                    <Text style={styles.headerText}>Backup wallet</Text>
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
        this.props.hideModalWalletListForBackup()
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
        this.props.hideModalWalletListForBackup();
        this.props.setTempWallet(wallet);
        this.props.showModalBackupWallet();        
    }

    fetchWalletList = (walletList) => {
        this.state.dataSourceForWalletList = this.state.dataSourceForWalletList.cloneWithRows(walletList);
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
        visibleModalWalletListForBackup: state.modal.visibleModalWalletListForBackup,
        useFingerPrint: state.config.useFingerPrint,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        hideModalWalletListForBackup: () => {
            dispatch(ActionCreator.hideModalWalletListForBackup());
        },
        showModalBackupWallet: () => {
            dispatch(ActionCreator.showModalBackupWallet());
        },
        setTempWallet: (wallet) => {
            dispatch(ActionCreator.setTempWallet(wallet));
        },   
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalWalletListForBackup);