
import React, { Component } from 'react';
import { Text, View, ListView, TouchableOpacity, StyleSheet, Platform, Clipboard } from 'react-native';
import Modal from 'react-native-simple-modal';
import ActionCreator from '../actions';
import { connect } from 'react-redux';
import WalletUtils from '../utils/wallet';
import PropTypes from 'prop-types';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

class ModalBackupWallet extends Component {
    static propTypes = {
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            dataSourceForWalletList: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            walletForBackup: {
                walletAddress: '',
                privatekey: '',
            }
        };
    }

    componentDidMount() { 
        const walletForBackup = {
            walletAddress: '',
            privatekey: '',
        }  
        this.setState({walletForBackup: walletForBackup})
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
                open={this.props.visibleModalBackupWallet}
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
        this.props.hideModalBackupWallet();
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

    fetchWalletList = (walletList) => {
        this.state.dataSourceForWalletList = this.state.dataSourceForWalletList.cloneWithRows(walletList);
    };

    handlePress = (wallet) => {        
        const walletForBackup = {
            walletAddress: wallet.walletAddress,
            privatekey: wallet.privateKey,
        }  
        this.setState({
            walletForBackup: walletForBackup
        });
        this.props.hideModalBackupWallet();
        this.props.setModalConfirmFinishProcess(this.confirmToBackupWalletFinishProcess.bind(this));
        this.props.setModalConfirmHeader("Confirmation");
        this.props.setModalConfirmBody([
            {text: "Are you sure to backup wallet?"},
        ]);
        this.props.showModalConfirm();
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

    copyPrivateKey = async () => {
        Clipboard.setString(this.state.walletForBackup.privatekey);
        const privatekey = await Clipboard.getString();
        const infomation = {
            title: 'Backup private key', 
            message1: 'Success to copy private key to clipboard.', 
            message2: ' ',
            message3: privatekey,
        };
        this.props.setModalInfomation(infomation);
        setTimeout(() => {
            this.props.showModalInfomation();    
        }, );
    };

    modalFingerPrintScanerFinishProcess(result) {
        if (result.status == true) {
            this.copyPrivateKey();
        } else {
            if (result.message === 'usePinCode') { 
                this.usePinCode();
            } else {
            }
        }
    }

    modalPincodeFinishProcess(result) {
        if (result.status === true) {
            this.copyPrivateKey();
        } else {
        }
    }

    confirmToBackupWalletFinishProcess = (result) => {
        if (result.status === true) {
            if (this.props.useFingerPrint === true){
                this.scanFingerPrint();
            } else {
                this.usePinCode();
            }
        } else {
        }        
    }
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
        visibleModalBackupWallet: state.modal.visibleModalBackupWallet,
        useFingerPrint: state.config.useFingerPrint,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        hideModalBackupWallet: () => {
            dispatch(ActionCreator.hideModalBackupWallet());
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
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalBackupWallet);