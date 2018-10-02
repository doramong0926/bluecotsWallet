import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, } from 'react-native';
import Expo, { Constants, Permissions } from 'expo';
import Modal from 'react-native-simple-modal';
import { Button } from 'react-native-elements';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import ActionCreator from '../actions';

import { connect } from 'react-redux';
import { log } from 'util';

class ModalFingerPrintScaner extends Component {    
    static propTypes = {
    };

    constructor(props, context) {
        super(props);
        this.state = {
            errorMessage: null,
            scanResult: {
                status: false,
                message: "init"
            }
        }
    }

    componentDidMount() {   
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        return (
            <Modal 
                offset={0}
                open={this.props.visibleModalFingerPrintScaner}
                animationDuration={200}
                animationTension={40}
                closeOnTouchOutside={false}
                disableOnBackPress={false}
                modalDidClose={() => {this.closeModal()}}
                modalDidOpen={() => {this.scanFingerprint()}}
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
                    <Text style={styles.headerText}>FingerPrint Scanner</Text>
                    <View style={{alignSelf:"flex-end", paddingRight:20, position:"absolute"}}>
                        <TouchableOpacity onPress={() => this.handelCancel()} value={'0.5'}>
                            <Ionicons name="ios-close-circle-outline" size={20}/>
                        </TouchableOpacity>
                    </View>                      
                </View>
                <View style={styles.bodyContainer}>   
                    <Ionicons name="ios-finger-print" size={120} />
                    <View>
                        {this.renderFingerPrintMessage()}                    
                    </View>
                </View>
                {this.renderButton()}
            </Modal>
        );
    }  

    handelUsePincode = () => {
        const scanResult = {
            status: false,
            message: "usePinCode"
        }
        this.setState({scanResult: scanResult})
        const errorMessage = null;
        this.setState({errorMessage: errorMessage})
        setTimeout(() => {
           this.props.hideModalFingerPrintScaner(); 
        }, );
    }

    handelCancel = () => {
        const scanResult = {
            status: false,
            message: "cancel"
        }
        this.setState({scanResult: scanResult})
        const errorMessage = null;
        this.setState({errorMessage: errorMessage})
        setTimeout(() => {
            this.props.hideModalFingerPrintScaner(); 
         }, );
    }

    closeModal = () => {
        if (this.props.modalFinishProcess) {
            const scanResult = this.state.scanResult;
            this.props.modalFinishProcess(scanResult);
        }
        setTimeout(() => {
            Expo.Fingerprint.cancelAuthenticate();
            this.props.hideModalFingerPrintScaner();
            this.initState();    
        },);
    }

    renderFingerPrintMessage = () => {        
        if (this.state.scanResult.status === true) {
            return (
                <View>
                    <Text style={{textAlign: 'center'}}>Correct finger print</Text>                    
                </View>
            )
        } else {
            if (this.state.scanResult.message === 'init' || this.state.scanResult.message === 'cancel' || this.state.scanResult.message === 'usePinCode') {
                return (
                    <View>
                        <Text style={{textAlign: 'center'}}>Scan your finger print</Text>
                    </View>
                )
            } else {
                return (
                    <View>
                        <Text style={{textAlign: 'center'}}>Incorrect finger print</Text>
                        <Text style={{textAlign: 'center'}}>{this.state.errorMessage}</Text>
                    </View>
                )
            }
        }
    }

    renderButton = () => {
        if (this.props.useFingerPrint) {
            return(
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={this.handelUsePincode}
                        title="Use PinCode"
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
            )
        } else {
            return (
                <View style={styles.buttonContainer}>                    
                </View>
            )         
        }
    }

    initState = () => {
        const scanResult = {
            status: false,
            message: "init"
        }
        this.setState({scanResult: scanResult})
        const errorMessage = null;
        this.setState({errorMessage: errorMessage})
    }

    scanFingerprint = async () => {
        const result = await Expo.Fingerprint.authenticateAsync('Scan your finger.');
        console.log('Scan Result:', result)
        if (result.success === true) {
            const scanResult = {
                status: true,
                message: "Success"
            }
            this.setState({scanResult: scanResult})
            setTimeout(() => {
                this.props.hideModalFingerPrintScaner();
            },500);
        } else {
            this.setState({errorMessage: result.error})
            const scanResult = {
                status: false,
                message: "Failure"
            }
            this.setState({scanResult: scanResult})
            
            if (result.error == 'lockout') {
                var retryTime = 5000;
            } else if (result.error == 'user_cancel') {
                this.initState();
                return;
            } else {
                var retryTime = 500;
            }
            
            setTimeout(() => {
                this.scanFingerprint(); 
            }, retryTime);
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
        alignItems: 'center',
        justifyContent: 'center',
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
});

function mapStateToProps(state) {
    return {
        visibleModalFingerPrintScaner: state.modal.visibleModalFingerPrintScaner,
        useFingerPrint: state.config.useFingerPrint,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        hideModalFingerPrintScaner: () => {
            dispatch(ActionCreator.hideModalFingerPrintScaner());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalFingerPrintScaner);