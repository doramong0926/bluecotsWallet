import React, { Component } from 'react';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import {
  Alert,
  Linking,
  Dimensions,
  LayoutAnimation,
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Clipboard,
  TouchableHighlight,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import Modal from 'react-native-simple-modal';

import ActionCreator from '../actions';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ModalWalletInfomation extends Component {
    constructor(props, context) {
        super(props, context);
    };
    
    static propTypes = {
        defaultWallet: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,
    };

    componentDidMount() {
    }

    render() {
        return (
            <Modal 
                offset={0}
                open={this.props.visibleModalWalletInfomation}
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
                    backgroundColor: "white",
                }}
                overlayStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                    flex: 1
                }}
            >
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Wallet infomation</Text>
                </View>
                <View style={styles.bodyContainer}>
                    <TouchableHighlight onPress={() => this.handlePressCopy()} underlayColor="gray">
                        <View style={styles.walletAddressContainer}>
                            <View style={styles.walletAddressInnerContainer}>
                                <Text style={styles.nickNameText}>{this.props.defaultWallet.nickName}</Text>
                                <Text style={styles.addressText}>{this.props.defaultWallet.walletAddress}</Text>
                            </View>
                            <View style={{margin: 5}}>
                                <Text style={styles.descriptionText}> Click address to copy</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.handlePressToSave()} underlayColor="gray">
                        <View style={styles.qrcodeContainer}>
                            <View style={styles.qrCode}>
                                {this.renderQrCode()}                        
                            </View>
                            <View style={{margin: 5}}>
                                <Text style={styles.descriptionText}> Click Qr-code to save</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.buttonContainer}>                    
                    <Button
                        onPress={this.closeModal}
                        title="Close"
                        buttonStyle={{
                            backgroundColor: "#BD3D3A",
                            borderColor: "transparent", 
                            borderRadius: 5
                        }}
                        containerViewStyle={{
                            // alignSelf: 'flex-end',
                            // margin: 20,
                        }}
                    />
                </View>
            </Modal>
        );
    }  

    closeModal = () => {
        this.props.hideModalWalletInfomation();
    }

    handlePressCopy = async () => {
        Clipboard.setString(this.props.defaultWallet.walletAddress);
        const address = await Clipboard.getString();
        this.props.hideModalWalletInfomation();
        const infomation = {
            title: 'INFOMATION', 
            message1: 'Success to copy address to clipboard.', 
            message2: 'Please check the address one more time.',
            message3: address,
        };
        this.props.setModalInfomation(infomation);
        setTimeout(() => {
            this.props.showModalInfomation();    
        }, 300);
    };

    handlePressToSave = () => {        
        /*
        this.svg.toDataURL((data) => {
            filePath = RNFS.CachesDirectoryPath + "/" + this.props.walletForReceive.walletAddress + ".png";
            RNFS.writeFile(filePath, data, 'base64')
              .then((success) => {
                  return CameraRoll.saveToCameraRoll(filePath, 'photo')
              })
              .then(() => {
                  this.setState({ busy: false, imageSaved: true  })
                  ToastAndroid.show('Saved to gallery !!', ToastAndroid.SHORT)
              })
        })
        */ 
    };

    renderQrCode = () => {
        if (this.props.defaultWallet.walletAddress)
        {
            return (
                <QRCode 
                    size = {250} 
                    value={this.props.defaultWallet.walletAddress}
                    getRef={(c) => (this.svg = c)}
                />
            )
        } else {
            return (
                <Text> need to add wallet first</Text>
            )
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
    walletAddressContainer: {
        marginVertical: 10,
    },
    walletAddressInnerContainer: {
        justifyContent: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    qrcodeContainer: {
        
    },
    qrCode: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
    },
    descriptionText: {
        fontSize: 12,        
        color: '#B4B7BA',
        textAlign: 'center',
    },
    nickNameText: {
    },
    addressText: {

    },
});

function mapStateToProps(state) {
    return {
        visibleModalWalletInfomation: state.modal.visibleModalWalletInfomation,
        defaultWallet: state.wallet.defaultWallet,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        hideModalWalletInfomation: () => {
            dispatch(ActionCreator.hideModalWalletInfomation());
        },
        showModalInfomation: () => {
            dispatch(ActionCreator.showModalInfomation());
        },
        setModalInfomation: (infomation) => {
            dispatch(ActionCreator.setModalInfomation(infomation));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalWalletInfomation);