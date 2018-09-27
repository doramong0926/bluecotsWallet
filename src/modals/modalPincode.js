import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-simple-modal';
import ActionCreator from '../actions';
import PINCode from '@haskkor/react-native-pincode'
import { connect } from 'react-redux';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import ImageSlider from 'react-native-image-slider';

import SLIDER_IMAGE1 from './../components/images/sampleSlider1.jpg';
import SLIDER_IMAGE2 from './../components/images/sampleSlider2.jpg';
import SLIDER_IMAGE3 from './../components/images/sampleSlider3.jpg';

class ModalPincode extends Component {    
    constructor(props, context) {
        super(props, context);
    };

    state = {
        errorMessage: null,
        scanResult: {
            status: false,
            message: "init"
        }
    }

    render() {
        const sliderImage = [
            SLIDER_IMAGE1,
            SLIDER_IMAGE2,
            SLIDER_IMAGE3,
        ];
        return (
            <Modal 
                offset={0}
                open={this.props.visibleModalPincode}
                animationDuration={200}
                animationTension={40}
                closeOnTouchOutside={true}
                disableOnBackPress={false}
                modalDidClose={() => {this.closeModal()}}
                modalDidOpen={() => {this.openModal()}}
                modalProps={undefined}
                containerProps={undefined}
                containerStyle={{
                    alignItems: "center",
                    justifyContent: "center",
                    flex:1,
                }}
                modalStyle={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}
                overlayStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                    flex: 1
                }}
            >
                <PINCode 
                    status={'enter'} 
                    storedPin={this.props.pincode} 
                    touchIDDisabled={true}
                    finishProcess={this.handelFinishProcess}
                    onFail={this.handelOnfail}
                /> 
            </Modal>
        );
    }  

    handelFinishProcess = () => {
        const scanResult = {
            message: "success",
            status: true,
        }
        this.setState({scanResult: scanResult})
        setTimeout(() => {
            this.props.hideModalPincode();
        },);
    }

    handelOnfail = (pinAttempts) => {
        console.log("handelOnfail called : " + pinAttempts)
    }

    closeModal = () => {
        if (this.props.modalFinishProcess) {
            this.props.modalFinishProcess(this.state.scanResult);
        }
        this.props.hideModalPincode();
    }

    openModal = () => {
        const scanResult = {
            status: false,
            message: "init"
        }
        this.setState({scanResult: scanResult})
    }
}

function mapStateToProps(state) {
    return {
        visibleModalPincode: state.modal.visibleModalPincode,
        pincode: state.config.pincode,        
    };
}

function mapDispatchToProps(dispatch) {
    return {
        hideModalPincode: () => {
            dispatch(ActionCreator.hideModalPincode());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalPincode);