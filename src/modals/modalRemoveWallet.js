
import React, { Component } from 'react';
import { Text, View, ListView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
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

class ModalRemoveWallet extends Component {
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
        walletForRemove: defaultWallet,
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
                open={this.props.visibleModalRemoveWallet}
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
        this.props.hideModalRemoveWallet()
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

    removeWallet() {
        if (this.state.walletForRemove.walletAddress === this.props.defaultWallet.walletAddress) {
            this.props.walletList.forEach(item => {
                if (item.walletAddress !== this.state.walletForRemove.walletAddress) {
                    this.props.removeWallet(this.state.walletForRemove);
                    this.props.setDefaultWallet(item);
                    const infomation = {
                        title: 'Remove wallet', 
                        message1: 'Success to remove wallet.',
                        message2: this.state.walletForRemove.walletAddress,
                    };
                    this.props.setModalInfomation(infomation);
                    setTimeout(() => {
                        this.props.showModalInfomation();    
                    }, );        
                    this.props.setIsLoadingTxData(true);
                    setTimeout(() => {
                        this.updateWalletBalance(this.props.defaultWallet.walletAddress);
                        this.setState({walletForRemove:defaultWallet});
                    },); 
                    return;
                }
            });
        } else {
            this.props.removeWallet(this.state.walletForRemove);
            this.setState({walletForRemove:defaultWallet});
        }
    }

    modalFingerPrintScanerFinishProcess(result) {
        if (result.status == true) {
            this.removeWallet();
        } else {
            if (result.message === 'usePinCode') { 
                this.usePinCode();
            } else {
                this.setState({walletForRemove:defaultWallet});
            }
        }
    }

    modalPincodeFinishProcess(result) {
        if (result.status === true) {
            this.removeWallet();
        } else {
            this.setState({walletForRemove:defaultWallet});
        }
    }

    confirmToRemoveWalletFinishProcess = (result) => {
        if (result.status === true) {
            if (this.props.useFingerPrint === true){
                this.scanFingerPrint();
            } else {
                this.usePinCode();
            }
        } else {
            this.setState({walletForRemove:defaultWallet});
        }        
    }

    handlePress = (wallet) => {
        this.setState({walletForRemove: wallet});
        this.props.setModalConfirmFinishProcess(this.confirmToRemoveWalletFinishProcess.bind(this));
        this.props.setModalConfirmHeader("Confirmation");
        this.props.setModalConfirmBody([
            {text: "There is no way to recover wallet without private key."},
            {text: "Please backup wallet before remove wallet."},
            {text: "Are you sure to remove wallet?"},
            {text: wallet.walletAddress},
        ]);
        this.props.hideModalRemoveWallet();
        this.props.showModalConfirm();        
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
        visibleModalRemoveWallet: state.modal.visibleModalRemoveWallet,
        useFingerPrint: state.config.useFingerPrint,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        hideModalRemoveWallet: () => {
            dispatch(ActionCreator.hideModalRemoveWallet());
        },
        setDefaultWallet: (wallet) => {
            dispatch(ActionCreator.setDefaultWallet(wallet));
        },
        setEthBalance: (balance) => {
            dispatch(ActionCreator.setEthBalance(balance));
        },
        setBlcBalance: (balance) => {
            dispatch(ActionCreator.setBlcBalance(balance));
        },        
        setIsLoadingTxData: (value) => {
            dispatch(ActionCreator.setIsLoadingTxData(value));
        },
        removeWallet: (wallet) => {
            dispatch(ActionCreator.removeWallet(wallet));
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
        showModalInfomation: () => {
            dispatch(ActionCreator.showModalInfomation());
        },
        setModalInfomation: (infomation) => {
            dispatch(ActionCreator.setModalInfomation(infomation));
        },
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalRemoveWallet);