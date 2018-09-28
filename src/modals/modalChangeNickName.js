
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import Modal from 'react-native-simple-modal';
import ActionCreator from '../actions';
import { connect } from 'react-redux';
import EthereumJsWallet from 'ethereumjs-wallet';
import WalletUtils from '../utils/wallet';
import PropTypes from 'prop-types';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { 
	DEFAULT_TOKEN_SYMBOL,
	DEFAULT_TOKEN_CONTRACT_ADDRESS,
    DEFAULT_TOKEN_DECIMALS,
    defaultWallet,
 } from '../config/constants';
 
const uuid = require('uuid')

class ModalChangeNickName extends Component {     
    constructor(props, context) {
        super(props, context);
    };
    
    static propTypes = {
        defaultWallet: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,
    };

    state = {
        nickName: '',
    };
    
    render() {
        return (
            <Modal 
                offset={0}
                open={this.props.visibleModalChangeNickName}
                animationDuration={200}
                animationTension={40}
                closeOnTouchOutside={true}
                disableOnBackPress={false}
                modalDidClose={() => {this.closeModal()}}
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
                    <Text style={styles.headerText}>Change nickname</Text>
                    <View style={{alignSelf:"flex-end", paddingRight:20, position:"absolute"}}>
                        <TouchableOpacity onPress={() => this.closeModal()} value={'0.5'}>
                            <Ionicons name="ios-close-circle-outline" size={20}/>
                        </TouchableOpacity>
                    </View>                      
                </View>
                <View style={styles.bodyContainer}>
                    <FormLabel>Nickname</FormLabel>
                    <FormInput 
                        inputStyle = {{paddingLeft:5, paddingRight:5, marginRight:0, fontSize:11}}
                        value={this.state.nickName} 
                        onChangeText={(value) => this.setState({nickName: value})}
                    />
                    {this.nickNameValidationMsg()}
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        disabled={!this.isValidChangeButton()}
                        onPress={this.handelPressChange}
                        title="Change"
                        buttonStyle={{
                            backgroundColor: "#BD3D3A",
                            borderColor: "transparent", 
                            borderRadius: 5
                        }}
                        containerViewStyle={{
                            // alignSelf: 'stretch',
                            // margin: 20,
                        }}
                    />
                </View>
            </Modal>
        );
    }

    nickNameValidationMsg = () =>
    {
        if (this.isEmptString(this.state.nickName)) {
            return <FormValidationMessage>{'This field is required.'}</FormValidationMessage>
        } else if (this.isUsedNickName(this.state.nickName)){
            return <FormValidationMessage>{'Nickname(' + this.state.nickName + ') already be used.'}</FormValidationMessage>
        } else {
            return <FormValidationMessage labelStyle={{color:'#79C753'}}>{'Nickname is valid.'}</FormValidationMessage>
        }
    }

    closeModal = () => {        
        this.props.hideModalChangeNickName();
    }

    scanFingerPrint = () => {
        this.props.setModalFingerPrintScanerFinishProcess(this.modalFingerPrintScanerFinishProcess.bind(this));
            if (Platform.OS === 'android') {
                this.props.showModalFingerPrintScaner();
            } else {
                //ios는 우찌하나?
                this.props.showModalFingerPrintScaner();
        }
    }

    usePinCode = () => {
        this.props.setModalPincodeFinishProcess(this.modalPincodeFinishProcess.bind(this));
        this.props.showModalPincode();
    }

    changeNickName() {
        var wallet = this.props.walletForChange;
        wallet.nickName = this.state.nickName;
        this.props.changeNickName(wallet);
        if (this.props.walletForChange.walletAddress === this.props.defaultWallet.walletAddress) {
            setTimeout(() => {
                this.props.setDefaultWallet(wallet);    
            }, );
        }
    }

    modalFingerPrintScanerFinishProcess(result) {
        if (result.status == true) {
            this.changeNickName();
            this.setState({nickName: ''})
            this.props.setWalletForChange('')
        } else {
            if (result.message === 'usePinCode') { 
                this.usePinCode();
            } else {
                this.setState({nickName: ''})
            this.props.setWalletForChange('')
            }
        }
    }

    modalPincodeFinishProcess(result) {
        if (result.status === true) {
            this.changeNickName();
            this.setState({nickName: ''})
            this.props.setWalletForChange('')
        } else {
            this.setState({nickName: ''})
            this.props.setWalletForChange('')
        }
    }

    confirmToChangeWalletFinishProcess = (result) => {
        if (result.status === true) {
            if (this.props.useFingerPrint === true){
                this.scanFingerPrint();
            } else {
                this.usePinCode();
            }
        } else {
            this.setState({nickName: ''})
            this.props.setWalletForChange('')
        }        
    }

    handelPressChange = () => {
        this.props.hideModalChangeNickName();
        this.props.setModalConfirmFinishProcess(this.confirmToChangeWalletFinishProcess.bind(this));
        this.props.setModalConfirmHeader("Confirmation");
        this.props.setModalConfirmBody([
            {text: "Are you sure to change nickname to " + this.state.nickName + "?"},
        ]);
        this.props.showModalConfirm();
    }

    isUsedNickName = (nickName) => {
        const registedWalletList = this.props.walletList
            .filter(wallet => wallet.symbol === 'BLC')
            .map(wallet => wallet.nickName);
        if (registedWalletList.includes(nickName)) {
            return true;
        } else {
            return false;
        }
    }

    isValidChangeButton = () => {
        if (!this.isEmptString(this.state.nickName) && !this.isUsedNickName(this.state.nickName))
        {
            return true;
        } else {
            return false;
        }
    }

    isEmptString = (s) => {
        if (s) {
            return false;
        } else {
            return true;
        }
    }
}

function mapStateToProps(state) {
    return {
        defaultWallet: state.wallet.defaultWallet,
        walletList: state.wallet.walletList,
        visibleModalChangeNickName: state.modal.visibleModalChangeNickName,
        walletForChange: state.walletTemp.walletForChange,
        useFingerPrint: state.config.useFingerPrint,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setDefaultWallet: (defaultWallet) => {
            dispatch(ActionCreator.setDefaultWallet(defaultWallet));
        },
        hideModalChangeNickName: () => {
            dispatch(ActionCreator.hideModalChangeNickName());
        },
        showModalInfomation: () => {
            dispatch(ActionCreator.showModalInfomation());
        },
        setModalInfomation: (infomation) => {
            dispatch(ActionCreator.setModalInfomation(infomation));
        },
        showModalConfirm: () => {
            dispatch(ActionCreator.showModalConfirm());
        },
        setModalConfirmFinishProcess: (finishProcess) => {
            dispatch(ActionCreator.setModalConfirmFinishProcess(finishProcess));
        },
        setModalConfirmHeader: (header) => {
            dispatch(ActionCreator.setModalConfirmHeader(header));
        },
        setModalConfirmBody: (body) => {
            dispatch(ActionCreator.setModalConfirmBody(body));
        },
        changeNickName: (wallet) => {
            dispatch(ActionCreator.changeNickName(wallet));
        },
        setWalletForChange: (wallet) => {
            dispatch(ActionCreator.setWalletForChange(wallet));
        },
        setModalPincodeFinishProcess: (finishProcess) => {
            dispatch(ActionCreator.setModalPincodeFinishProcess(finishProcess));
        },   
        showModalPincode: () => {
            dispatch(ActionCreator.showModalPincode());
        },
        showModalFingerPrintScaner: () => {
            dispatch(ActionCreator.showModalFingerPrintScaner());
        },
        setModalFingerPrintScanerFinishProcess: (finishProcess) => {
            dispatch(ActionCreator.setModalFingerPrintScanerFinishProcess(finishProcess));
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
        marginTop: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        marginBottom: 10,
    },
    headerText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    },
})
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalChangeNickName);
