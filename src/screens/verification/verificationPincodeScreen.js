
import React, { Component } from 'react';
import { View } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import PINCode from '@haskkor/react-native-pincode'
import { connect } from 'react-redux';
import ActionCreator from './../../actions';
import Expo from 'expo';

// export declare enum PinResultStatus {
//     initial = "initial",
//     success = "success",
//     failure = "failure",
//     locked = "locked",
// }

class VerificationPincodeScreen extends Component{
    static navigationOptions = {
        header: null,        
    };

    state = {
        fingerPrintCompatible: false,
        fingerprintsExisit: false,
    }
    
    componentWillMount() {
        if (this.props.useFingerPrint === true && this.props.skipFingerPrintScan !== true) {
            // this.props.navigation.dispatch(resetActionToVerificationFingerPrint);
            this.props.navigation.navigate('VerificationFingerPrint');
        } else {
            this.props.setSkipFingerPrintScan(false);
        }        
    }

    // componentDidMount() {
    //     if (this.props.useFingerPrint === true && this.props.skipFingerPrintScan !== true) {
    //         // this.props.navigation.dispatch(resetActionToVerificationFingerPrint);
    //         this.props.navigation.navigate('VerificationFingerPrint');
    //     } else {
    //         this.props.setSkipFingerPrintScan(false);
    //     }
    // }

    render() {        
        return (
            <View style={{flex:1}}>
                {
                    (this.props.pincode !== '' && this.props.pincode !== undefined && this.props.useFingerPrint !== undefined) ? 
                    (
                        <PINCode 
                            status={'enter'} 
                            storePin={this.props.setPincode} 
                            storedPin={this.props.pincode} 
                            touchIDDisabled={true}
                            finishProcess={this.handelFinishProcess}
                            onFail={this.handelOnfail}
                        />
                    ) :
                    (
                        <PINCode 
                            status={'choose'} 
                            storePin={this.setPincode.bind(this)}
                            touchIDDisabled={true}
                        />
                    ) 
                }           
            </View>
        );
    }

    handelFinishProcess = () => {        
        setTimeout(() => {
            this.props.navigation.dispatch(resetActionToMain);
            this.props.navigation.navigate('Main');
        }, )
    }

    setPincode = (pincode) => {
        this.props.setPincode(pincode)
        this.checkDeviceForHardware();
        this.checkForFingerprints();
        setTimeout(() => {
            if (this.state.fingerPrintCompatible !== true) {
                this.props.navigation.dispatch(resetActionToMain);
                this.props.navigation.navigate('Main');
            } else {
                this.props.navigation.dispatch(resetActionToVerificationFingerPrint);
                this.props.navigation.navigate('VerificationFingerPrint');
            }  
        }, );
    }

    handelOnfail = (pinAttempts) => {
        console.log("handelOnfail called : " + pinAttempts)
    }

    getPincodeStatus = () => {
        console.log("getPincodeStatus called")
    }

    checkDeviceForHardware = async () => {
        let fingerPrintCompatible = await Expo.Fingerprint.hasHardwareAsync();
        this.setState({fingerPrintCompatible})
    }
    
    checkForFingerprints = async () => {
        let fingerprintsExisit = await Expo.Fingerprint.isEnrolledAsync();
        this.setState({fingerprintsExisit})
    }
}

const resetActionToMain = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Main' })],
});

const resetActionToVerificationFingerPrint = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'VerificationFingerPrint' })],
});

function mapStateToProps(state) {
    return {
        pincode: state.config.pincode,
        useFingerPrint: state.config.useFingerPrint,
        skipFingerPrintScan: state.modal.skipFingerPrintScan,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setPincode: (pincode) => {
            dispatch(ActionCreator.setPincode(pincode));
        },
        showModalInfomation: () => {
            dispatch(ActionCreator.showModalInfomation());
        },
        hideModalInfomation: () => {
            dispatch(ActionCreator.hideModalInfomation());
        },
        setModalInfomation: (infomation) => {
            dispatch(ActionCreator.setModalInfomation(infomation));
        },
        setSkipFingerPrintScan: (skip) => {
            dispatch(ActionCreator.setSkipFingerPrintScan(skip));
        },
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(VerificationPincodeScreen);