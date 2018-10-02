import React, { Component } from 'react';
import {
  Dimensions,
  LayoutAnimation,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { BarCodeScanner, Permissions } from 'expo';
import Modal from 'react-native-simple-modal';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import ActionCreator from './../actions';

import { connect } from 'react-redux';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

class ModalQrCodeScaner extends Component {    
    static propTypes = {
    };

    constructor(props, context) {
        super(props);
        this.state = {
            lastScannedData: null,
        };
    }

    componentDidMount() {   
        this._requestCameraPermission();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.visibleModalQrCodeScaner !== nextProps.visibleModalQrCodeScaner) {
            if (nextProps.visibleModalQrCodeScaner === true) {
                this._requestCameraPermission();
            }
        }
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
                this.props.setModalAddressToSend(result.data);
            }
            else if (this.props.tokenNameForQrCode === 'ETH') {
                this.props.setModalAddressToSend(result.data);
            }            
            this.props.hideModalQrCodeScaner();
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
                    marginHorizontal: 20,
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
                    <View style={{alignSelf:"flex-end", paddingRight:20, position:"absolute"}}>
                        <TouchableOpacity onPress={() => this.closeModal()} value={'0.5'}>
                            <Ionicons name="ios-close-circle-outline" size={20}/>
                        </TouchableOpacity>
                    </View>                      
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
                <View style={styles.bodyContainer}>
                    <Text style={{textAlign: 'center'}}>Focus on qr-code</Text>
                </View>
            </Modal>
        );
    }  

    closeModal = () => {
        this.setState({
            lastScannedData: null
        })
        this.props.hideModalQrCodeScaner();
        this.props.showModalSend();
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
    qrCodeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    bodyContainer: {
        margin: 10,
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
        showModalSend: () => {
            dispatch(ActionCreator.showModalSend());
        },
        showModalQrCodeScaner: () => {
            dispatch(ActionCreator.showModalQrCodeScaner());
        },
        hideModalQrCodeScaner: () => {
            dispatch(ActionCreator.hideModalQrCodeScaner());
        },
        setModalAddressToSend: (address) => {
            dispatch(ActionCreator.setModalAddressToSend(address));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalQrCodeScaner);