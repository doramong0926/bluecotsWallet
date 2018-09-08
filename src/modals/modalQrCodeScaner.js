import React, { Component } from 'react';
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
} from 'react-native';

import { BarCodeScanner, Permissions } from 'expo';
import Modal from 'react-native-simple-modal';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import ActionCreator from './../actions';

import EthereumJsWallet from 'ethereumjs-wallet';
import WalletUtils from './../utils/wallet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ModalQrCodeScaner extends Component {

    constructor(props, context) {
        super(props, context);
    };
    
    static propTypes = {
    };

    state = {
        lastScannedData: null,
    };

    componentDidMount() {
        this._requestCameraPermission();
    }

    componentWillReceiveProps() {
        this._requestCameraPermission();
    }
    
    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted',
        });
    };

    _handleBarCodeRead = result => {
        if (result.data !== this.state.lastScannedData) {
            LayoutAnimation.spring();
            this.setState({
                lastScannedData: result.data,
            });
            if (this.props.tokenNameForQrCode === 'BLC') {
                this.props.setAddressToSendBlc(result.data);
            }
            else if (this.props.tokenNameForQrCode === 'ETH') {
                this.props.setAddressToSendEth(result.data);
            }            
            this.props.hideModalQrCodeScaner();
            const infomation = {
                title:'INFOMATION',
                message1: 'address from QR-Code scaner', 
                message2: result.data
            };
            this.props.setModalInfomation(infomation);
            this.props.showModalInfomation();
        }
    };

    render() {
        return (
            <Modal 
                offset={0}
                open={this.props.visibleModalQrCodeScaner}
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
                    margin: 20,
                    padding: 10,
                    backgroundColor: "white",
                    height: 400,

                }}
                overlayStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                    flex: 1
                }}
            >
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>QR-Code Scanner</Text>
                </View>
                <View style={styles.qrCodeContainer}>   
                    {this.state.hasCameraPermission === null
                        ? <Text>Requesting for camera permission</Text>
                        : this.state.hasCameraPermission === false
                            ?   <Text style={{ color: '#fff' }}>
                                    Camera permission is not granted
                                </Text>
                            :   <BarCodeScanner
                                    onBarCodeRead={this._handleBarCodeRead}
                                    style={{
                                        //height: Dimensions.get('window').height,
                                        height: 400,
                                        width: Dimensions.get('window').width,
                                    }}
                                />
                    }
                </View>
                <View style={{marginVertical: 5}}>
                    <Text style={{textAlign: 'center'}}> Please focus on qr-code.</Text>
                </View>
                <View style={styles.bottomContainer}>                    
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
        this.setState({
            lastScannedData: null
        })
        this.props.hideModalQrCodeScaner();
    }
}
    
const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#67AFCB',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
    },
    headerText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    },
    qrCodeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        marginTop: 10,
        marginBottom: 5,
    },
    bottomContainer: {
        marginVertical: 5,
    },
});

function mapStateToProps(state) {
    return {
        visibleModalQrCodeScaner: state.modal.visibleModalQrCodeScaner,
        tokenNameForQrCode: state.modal.tokenNameForQrCode,
        addressToSendBlc: state.walletTemp.addressToSendBlc,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showModalQrCodeScaner: () => {
            dispatch(ActionCreator.showModalQrCodeScaner());
        },
        hideModalQrCodeScaner: () => {
            dispatch(ActionCreator.hideModalQrCodeScaner());
        },
        setAddressToSendBlc: (address) => {
            dispatch(ActionCreator.setAddressToSendBlc(address));
        },
        setAddressToSendEth: (address) => {
            dispatch(ActionCreator.setAddressToSendEth(address));
        },
        showModalInfomation: () => {
            dispatch(ActionCreator.showModalInfomation());
        },
        setModalInfomation: (infomation) => {
            dispatch(ActionCreator.setModalInfomation(infomation));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalQrCodeScaner);