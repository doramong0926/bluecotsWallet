import React, { Component } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-simple-modal';
import ActionCreator from '../actions';
import PINCode from '@haskkor/react-native-pincode'
import { connect } from 'react-redux';

class ModalPincode extends Component {    
    constructor(props, context) {
        super(props, context);
    };
    render() {
        return (
            <Modal 
                offset={0}
                open={this.props.visibleModalPincode}
                animationDuration={200}
                animationTension={40}
                closeOnTouchOutside={true}
                disableOnBackPress={false}
                modalDidClose={() => {this.closeModal()}}
                modalDidOpen={undefined}
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
        if (this.props.modalFinishProcess) {
            this.props.modalFinishProcess();
        }
        setTimeout(() => {
            this.closeModal();
        },);
    }

    handelOnfail = (pinAttempts) => {
        console.log("handelOnfail called : " + pinAttempts)
    }

    closeModal = () => {
        this.props.hideModalPincode();
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