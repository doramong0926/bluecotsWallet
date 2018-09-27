
import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import ActionCreator from '../../actions';
import Expo, { Constants } from 'expo';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import PropTypes from 'prop-types';


class VerificationFingerPrintScreen extends Component{

    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        header: null,        
    };

    state = {
        fingerPrintCompatible: false,
        fingerprintsExisit: false,
        result: '',
    }

    static propTypes = {
        defaultWallet: PropTypes.shape({
            walletAddress: PropTypes.string.isRequired,
        }).isRequired,
    };
      
    componentDidMount() {
        this.checkDeviceForHardware();
        this.checkForFingerprints();
        setTimeout(() => {
            if (this.state.fingerPrintCompatible === true && this.state.fingerprintsExisit === true) {
                this.scanFingerPrint();
                // if (this.props.useFingerPrint === true) {
                //     this.scanFingerPrint();
                // }
            } else {
                this.props.setUseFingerPrint(false);
                if (this.props.defaultWallet.walletAddress === "") {
                    this.props.navigation.dispatch(resetActionToAddWallet);
                    this.props.navigation.navigate('AddWallet');
                } else {
                    this.props.navigation.dispatch(resetActionToMain);
                    this.props.navigation.navigate('Main');         
                }
            }   
        }, );
    }

    render() {
        return (
            (this.state.fingerPrintCompatible !== true || this.state.fingerprintsExisit !== true) ? 
                (
                    <View>
                        <Text style={styles.text}>    
                            your device does not support finger print
                        </Text>
                    </View>
                ) : 
                (   
                    <View style={styles.container}>
                        <View style={{flex: 9, alignItems:'center', justifyContent: 'space-around',}}>
                            <TouchableOpacity onPress={() => this.scanFingerPrint()} value="0.5">
                                <View style={styles.fingerPrintIconContainer}>
                                    <Ionicons name="ios-finger-print" size={200} />                                    
                                    <Text style={styles.text}>Click to scan finger print</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {
                            (this.props.useFingerPrint) ?
                            (
                                <View style={styles.skipIconContainer}>
                                    <TouchableOpacity onPress={() => this.usePinCode()} value="0.5">
                                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                                            <Text style={{textAlign: 'center', fontSize: 20, marginRight:5}}>Use Pincode</Text>
                                            <FontAwesome name="arrow-right" size={20}/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ) :
                            (
                                <View style={styles.skipIconContainer}>
                                    <TouchableOpacity onPress={() => this.skipFingerPrint()} value="0.5">
                                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                                            <Text style={{textAlign: 'center', fontSize: 20, marginRight:5}}>Skip</Text>
                                            <FontAwesome name="arrow-right" size={20}/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                        
                    </View>
                )
        );
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

    skipFingerPrint = () => {
        this.props.setUseFingerPrint(false);
        if (this.props.defaultWallet.walletAddress === "") {
            this.props.navigation.dispatch(resetActionToAddWallet);
            this.props.navigation.navigate('AddWallet');
        } else {
            this.props.navigation.dispatch(resetActionToMain);
            this.props.navigation.navigate('Main');         
        }
    }

    usePinCode = () => {
        this.props.setSkipFingerPrintScan(true);
        this.props.navigation.dispatch(resetActionToPincode);
        this.props.navigation.navigate('VerificationPincode');
    }

    modalFingerPrintScanerFinishProcess (result) {
        if (result.status == true) {
            if (this.props.defaultWallet.walletAddress === "") {
                this.props.navigation.dispatch(resetActionToAddWallet);
                this.props.navigation.navigate('AddWallet');
            } else {
                this.props.navigation.dispatch(resetActionToMain);
                this.props.navigation.navigate('Main');         
            }
            if (this.props.useFingerPrint === undefined){
                this.props.setUseFingerPrint(true);
            }
        } else {
            if (result.message === 'usePinCode') {
                this.usePinCode();
            } else {
            }
        }
    }
    
    checkDeviceForHardware = async () => {
        const fingerPrintCompatible = await Expo.Fingerprint.hasHardwareAsync();
        this.setState({fingerPrintCompatible})
    }
    
    checkForFingerprints = async () => {
        const fingerprintsExisit = await Expo.Fingerprint.isEnrolledAsync();
        this.setState({fingerprintsExisit})
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,    
    //   paddingTop: Constants.statusBarHeight,
    //   backgroundColor: '#ecf0f1',
    },
    text: {
      textAlign: 'center'
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 150,
      height: 60,
      backgroundColor: '#056ecf',
      borderRadius: 5
    },
    buttonText: {
      fontSize: 30,
      color: '#fff'   
    },
    fingerPrintIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    skipIconContainer: {
        flex: 1,
        margin: 15,
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
    
})

const resetActionToMain = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Main' })],
});

const resetActionToAddWallet = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'AddWallet' })],
});

const resetActionToPincode = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'VerificationPincode' })],
});

function mapStateToProps(state) {
    return {
        pincode: state.config.pincode,
        useFingerPrint: state.config.useFingerPrint,
        defaultWallet: state.wallet.defaultWallet,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setPincode: (pincode) => {
            dispatch(ActionCreator.setPincode(pincode));
        },
        showModalFingerPrintScaner: () => {
            dispatch(ActionCreator.showModalFingerPrintScaner());
        },
        setUseFingerPrint: (fingerPrint) => {
            dispatch(ActionCreator.setUseFingerPrint(fingerPrint));
        },
        setModalFingerPrintScanerFinishProcess: (finishProcess) => {
            dispatch(ActionCreator.setModalFingerPrintScanerFinishProcess(finishProcess));
        },        
        setSkipFingerPrintScan: (skip) => {
            dispatch(ActionCreator.setSkipFingerPrintScan(skip));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VerificationFingerPrintScreen);