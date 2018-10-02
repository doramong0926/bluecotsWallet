import React, { Component } from 'react';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import Modal from 'react-native-simple-modal';

import ActionCreator from '../actions';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
// import RNFS from "react-native-fs"

import { 
	defaultWallet
 } from './../config/constants';

class ModalReceive extends Component {
    static propTypes = {
        defaultWallet: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,
    };

    constructor(props, context) {
        super(props);
        this.state = {
            defaultWallet: defaultWallet
        };
    }    

    componentDidMount() {   
        this.setState({
            defaultWallet: this.props.defaultWallet,
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.defaultWallet !== nextProps.defaultWallet) {
            this.setState({
                defaultWallet: nextProps.defaultWallet,
            })
        }
    }

    render() {
        return (
            <Modal 
                offset={0}
                open={this.props.visibleModalReceive}
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
                    <Text style={styles.headerText}>Receive</Text>
                    <View style={{alignSelf:"flex-end", paddingRight:20, position:"absolute"}}>
                        <TouchableOpacity onPress={() => this.closeModal()} value={'0.5'}>
                            <Ionicons name="ios-close-circle-outline" size={20}/>
                        </TouchableOpacity>
                    </View>                      
                </View>
                <View style={styles.bodyContainer}>
                        <View style={styles.walletAddressContainer}>
                            <Text style={styles.subTitleText}>Wallet address</Text>    
                            <TouchableOpacity onPress={() => this.handlePressCopy()} value="0.5">
                                <View style={{alignItems:"center", justifyContent:"center", flexDirection:"row"}}>
                                    <Text style={styles.walletAddressText}>{this.props.defaultWallet.walletAddress}</Text> 
                                    <View style={{alignItems:"center", marginLeft: 3}}>
                                        <Ionicons name="ios-copy-outline" size={15}/>
                                    </View>              
                                </View>
                            </TouchableOpacity>
                        </View> 
                    <View style={styles.qrcodeContainer}>
                        <TouchableOpacity onPress={() => this.handlePressToSave()} value="0.5">
                            {this.renderQrCode()}    
                        </TouchableOpacity>
                        
                    </View>
                    <View style={{marginBottom: 10}}>
                        <Text style={styles.descriptionText}> Click to save Qr-code</Text>
                    </View>
                </View>
            </Modal>
        );
    }  

    closeModal = () => {
        this.props.hideModalReceive();
    }

    handlePressCopy = async () => {
        Clipboard.setString(this.props.defaultWallet.walletAddress);
        const address = await Clipboard.getString();
        this.props.hideModalReceive();
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

    handlePressToSave() {
        // this.svg.toDataURL((data) => {
        //     RNFS.writeFile(RNFS.CachesDirectoryPath+"/"+ this.props.defaultWallet.nickName +"qrcode.png", data, 'base64')
        //       .then((success) => {
        //             return CameraRoll.saveToCameraRoll(RNFS.CachesDirectoryPath+"/"+ this.props.defaultWallet.nickName +"qrcode.png", 'photo')
        //       })
        //       .then(() => {
        //             this.setState({ busy: false, imageSaved: true  })
        //             const infomation = {
        //                 title: 'INFOMATION', 
        //                 message1: 'Success to save qr-code to cameraroll.', 
        //             };
        //             this.props.setModalInfomation(infomation);
        //       })
        // })
    }

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
        marginHorizontal: 20,
        // marginTop:10,
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
        borderRadius: 6,
        padding: 10,
    },
    qrcodeContainer: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15,
        paddingBottom: 10,
        marginBottom: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 6,
    },
    walletAddressText: {
        fontSize: 11,        
        color: '#B4B7BA',
        textAlign: 'center',
    },
    descriptionText: {
        fontSize: 12,        
        color: '#B4B7BA',
        textAlign: 'center',
    },
    subTitleText: {
        fontSize : 12, 
        textAlign:'center',
        color: 'black', 
    },
    nickNameText: {
    },
    addressText: {
    },
});

function mapStateToProps(state) {
    return {
        visibleModalReceive: state.modal.visibleModalReceive,
        defaultWallet: state.wallet.defaultWallet,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        hideModalReceive: () => {
            dispatch(ActionCreator.hideModalReceive());
        },
        showModalInfomation: () => {
            dispatch(ActionCreator.showModalInfomation());
        },
        setModalInfomation: (infomation) => {
            dispatch(ActionCreator.setModalInfomation(infomation));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalReceive);