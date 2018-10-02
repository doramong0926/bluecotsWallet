
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ActionCreator from './../actions';
import Modal from 'react-native-simple-modal';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

class ModalDefaultWalletSettings extends Component {  
    constructor(props, context) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {   
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        return (
            <Modal 
                offset={0}
                open={this.props.visibleModalDefaultWalletSettings}
                animationDuration={200}
                animationTension={40}
                closeOnTouchOutside={true}
                disableOnBackPress={false}
                modalDidClose={() => {this.props.hideModalDefaultWalletSettings()}}
                modalDidOpen={() => undefined}
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
                    <Text style={styles.headerText}>Default Wallet settings</Text>
                    <View style={{alignSelf:"flex-end", paddingRight:20, position:"absolute"}}>
                        <TouchableOpacity onPress={() => this.props.hideModalDefaultWalletSettings()} value={'0.5'}>
                            <Ionicons name="ios-close-circle-outline" size={20}/>
                        </TouchableOpacity>
                    </View>                      
                </View>
                <View style={styles.bodyContainer}>
                    <TouchableOpacity onPress={() => this.handleModifyNickNamePress()} value={'0.5'}>
                        <View style={{flexDirection: 'row', margin: 10}}>   
                            <Text style={styles.menuText}>Modify nickname</Text>
                            <View style={{flex: 1, alignItems:'flex-end', justifyContent:'center'}} >
                                <Ionicons name="ios-arrow-dropdown" size={20} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{borderColor: 'gray', borderWidth: 0.5}}></View>
                    <TouchableOpacity onPress={() => this.handleBackupPress()} value={'0.5'}>
                        <View style={{flexDirection: 'row', margin: 10}}>
                            <Text style={styles.menuText}>Backup wallet</Text>
                            <View style={{flex: 1, alignItems:'flex-end', justifyContent:'center'}} >
                                <Ionicons name="ios-arrow-dropdown" size={20} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{borderColor: 'gray', borderWidth: 0.5}}></View>
                    <TouchableOpacity onPress={() => this.handleDeletePress()} value={'0.5'}>
                        <View style={{flexDirection: 'row', margin: 10}}>
                            <Text style={styles.menuText}>Delete wallet</Text>
                            <View style={{flex: 1, alignItems:'flex-end', justifyContent:'center'}} >
                                <Ionicons name="ios-arrow-dropdown" size={20} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }
    handleSelectPress = () => {
        this.props.hideModalDefaultWalletSettings();
        this.props.showModalChangeDefaultWallet(); 
    }
    handleModifyNickNamePress = () => {
        this.props.hideModalDefaultWalletSettings(); 
        this.props.showModalWalletListForChangeNickName();
    }
    handleBackupPress = () => {
        this.props.hideModalDefaultWalletSettings(); 
        this.props.showModalBackupWallet();
    }
    handleDeletePress = () => {
        this.props.hideModalDefaultWalletSettings();
        if (this.props.walletList.length <= 2)
        {
            const infomation = {
                title: 'Infomation', 
                message1: 'You can not remove wallet.', 
                message2: 'There is only 1 wallet.', 
            };
            this.props.setModalInfomation(infomation);
            this.props.showModalInfomation();
        } else {
            this.props.showModalRemoveWallet();
        }
    }
}

function mapStateToProps(state) {
    return {
        visibleModalDefaultWalletSettings: state.modal.visibleModalDefaultWalletSettings,
        walletList: state.wallet.walletList,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showModalDefaultWalletSettings: () => {
            dispatch(ActionCreator.showModalDefaultWalletSettings());
        },
        hideModalDefaultWalletSettings: () => {
            dispatch(ActionCreator.hideModalDefaultWalletSettings());
        },
        showModalChangeDefaultWallet: () => {
            dispatch(ActionCreator.showModalChangeDefaultWallet());
        },
        showModalRemoveWallet: () => {
            dispatch(ActionCreator.showModalRemoveWallet());
        },
        setModalInfomation: (infomation) => {
            dispatch(ActionCreator.setModalInfomation(infomation));
        },
        showModalInfomation: () => {
            dispatch(ActionCreator.showModalInfomation());
        },
        showModalWalletListForChangeNickName: () => {
            dispatch(ActionCreator.showModalWalletListForChangeNickName());
        },
        showModalBackupWallet: () => {
            dispatch(ActionCreator.showModalBackupWallet());
        },
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
        justifyContent: 'center',
        paddingHorizontal: 10,
    }, 
    headerText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    },
    menuText: {
        marginTop: 5, 
        textAlign: 'center'
    }
})
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalDefaultWalletSettings);
