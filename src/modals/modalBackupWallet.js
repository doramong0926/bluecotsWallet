
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Clipboard } from 'react-native';
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
 import { FileSystem } from 'expo';
//  import RNFS from 'react-native-fs';
// var RNFS = require('react-native-fs');
 
const uuid = require('uuid')

class ModalBackupWallet extends Component {     
    constructor(props, context) {
        super(props, context);
    };
    
    static propTypes = {
        defaultWallet: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,
    };

    state = {
        typeOfBackup: '',
    };

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
                    <Text style={styles.headerText}>Backup wallet</Text>
                    <View style={{alignSelf:"flex-end", paddingRight:20, position:"absolute"}}>
                        <TouchableOpacity onPress={() => this.closeModal()} value={'0.5'}>
                            <Ionicons name="ios-close-circle-outline" size={20}/>
                        </TouchableOpacity>
                    </View>                      
                </View>
                <View style={styles.bodyContainer}>  
                    <Text>wallet address : </Text>
                    <Text>{this.props.tempWallet.walletAddress}</Text>
                    <Text>Select type of backup privatekey.</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <View style={{flexDirection: 'row' ,alignItems:'center', justifyContent:'space-around'}}>
                        <View style={{flex:1}}>
                            <Button
                                onPress={this.handelPressCopy}
                                title="Copy"
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
                        <View style={{flex:1}}>
                            <Button
                                onPress={this.handelPressSave}
                                title="Save"
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
                    </View>
                </View>
            </Modal>
        );
    }

    closeModal = () => {        
        this.props.hideModalBackupWallet();
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
        Clipboard.setString(this.props.tempWallet.privateKey);
        const privateKey = await Clipboard.getString();
        const infomation = {
            title: 'Backup private key', 
            message1: 'Success to copy private key to clipboard.', 
            message2: 'Please be careful to keep your private key.',
            message3: privateKey,
        };
        this.props.setModalInfomation(infomation);
        setTimeout(() => {
            this.props.showModalInfomation();    
        }, );
    };

    ensureFolderExists () {
        const path = `${FileSystem.documentDirectory}MyFolder`
        return FileSystem.getInfoAsync(path).then(({exists}) => {
            if (!exists) {
                return FileSystem.makeDirectoryAsync(path)
            } else {
                return Promise.resolve(true)
            }
        })
    }

    savePrivateKey = async (privateKey) => {
        console.log(`${FileSystem.documentDirectory}MyFolder/my_file.txt`)
        console.log(`${FileSystem.documentDirectory}MyFolder/my_file.txt`)
        console.log(`${FileSystem.documentDirectory}MyFolder/my_file.txt`)
        console.log(`${FileSystem.documentDirectory}MyFolder/my_file.txt`)
        console.log(`${FileSystem.documentDirectory}MyFolder/my_file.txt`)
        console.log(`${FileSystem.documentDirectory}MyFolder/my_file.txt`)
        console.log(`${FileSystem.documentDirectory}MyFolder/my_file.txt`)
        this.ensureFolderExists().then(() => {
            FileSystem.writeAsStringAsync(`${FileSystem.documentDirectory}MyFolder/my_file.txt`, "ddddddddddddddd")
        })
        FileSystem.writeAsStringAsync(`${FileSystem.documentDirectory}MyFolder/my_file.txt`, "ddddddddddddddd")

        // const path = FileSystem.documentDirectory;
        // const fullPath = path + this.props.tempWallet.walletAddress + '_privateKey.txt';
        // console.log('path = ' + path)
        // console.log('fullPath = ' + fullPath)

        // await FileSystem.makeDirectoryAsync(path, {intermediates: true}).then(
        //     console.log('dddddddddddddddddddd Created base dir ', path)
        // ).catch(
        //     console.log('eeeeeeeeeeeeeeee Created base dir ', path)
        // )
        // await FileSystem.writeAsStringAsync(fullPath, this.props.tempWallet.privateKey).then(
        //     console.log("ddddddddddddddddd writeAsStringAsync")
        // ).catch(
        //     console.log("eeeeeeeeeeeeeeeeeeee writeAsStringAsync")
        // )
        
        // const allFiles = await FileSystem.readDirectoryAsync(path).then(
        //     console.log('dddddddddddddddddd readDirectoryAsync ' + allFiles)
        // ).catch(
        //     console.log('eeeeeeeeeeeeeeee readDirectoryAsync ' + allFiles)
        // )

        // write the file
        // RNFS.writeFile(path, this.props.tempWallet.privateKey, 'utf8')
        // .then((success) => {
        //     const infomation = {
        //         title: 'Backup private key', 
        //         message1: 'Success to save private key to to ' + path,
        //         message2: 'Please be careful to keep your private key.',
        //     };
        //     this.props.setModalInfomation(infomation);
        //     setTimeout(() => {
        //         this.props.showModalInfomation();    
        //     }, );
        // })
        // .catch((err) => {
        //     console.log(err.message);
        //     const infomation = {
        //         title: 'Backup private key', 
        //         message1: 'Failure to save private key to to ' + path,
        //         message2: err.message,
        //     };
        //     this.props.setModalInfomation(infomation);
        //     setTimeout(() => {
        //         this.props.showModalInfomation();    
        //     }, );
        // });
    };

    backupWallet = () => {
        if (this.state.typeOfBackup === 'copy') {
            this.copyPrivateKey();
        } else {
            this.savePrivateKey(this.props.tempWallet.privateKey);            
        }
        this.setState({typeOfBackup: ''});
        this.props.setTempWallet('')
    }

    modalFingerPrintScanerFinishProcess(result) {
        if (result.status == true) {
            this.backupWallet();
        } else {
            if (result.message === 'usePinCode') { 
                this.usePinCode();
            } else {
                this.setState({typeOfBackup: ''});
                this.props.setTempWallet('')
            }
        }
    }

    modalPincodeFinishProcess(result) {
        if (result.status === true) {
            this.backupWallet();
        } else {
            this.setState({typeOfBackup: ''});
            this.props.setTempWallet('')
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
            this.setState({typeOfBackup: ''});
            this.props.setTempWallet('')
        }        
    }

    handelPressCopy = () => {
        this.setState({typeOfBackup: 'copy'});
        this.props.hideModalBackupWallet();
        this.props.setModalConfirmFinishProcess(this.confirmToBackupWalletFinishProcess.bind(this));
        this.props.setModalConfirmHeader("Confirmation");
        this.props.setModalConfirmBody([
            {text: "Are you sure to backup wallet?"},
        ]);
        this.props.showModalConfirm();
    }

    handelPressSave = () => {
        this.setState({typeOfBackup: 'save'});
        this.props.hideModalBackupWallet();
        this.props.setModalConfirmFinishProcess(this.confirmToBackupWalletFinishProcess.bind(this));
        this.props.setModalConfirmHeader("Confirmation");
        this.props.setModalConfirmBody([
            {text: "Are you sure to backup wallet?"},
        ]);
        this.props.showModalConfirm();
    }
}

function mapStateToProps(state) {
    return {
        defaultWallet: state.wallet.defaultWallet,
        walletList: state.wallet.walletList,
        visibleModalBackupWallet: state.modal.visibleModalBackupWallet,
        tempWallet: state.walletTemp.tempWallet,
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
        setTempWallet: (wallet) => {
            dispatch(ActionCreator.setTempWallet(wallet));
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
        margin: 20,
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
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalBackupWallet);
