
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-simple-modal';
import ActionCreator from './../actions';
import { connect } from 'react-redux';

class ModalCopyAddressToClipboard extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Modal 
                offset={0}
                open={this.props.visibleModalCopyAddressToClipboard}
                animationDuration={200}
                animationTension={40}
                closeOnTouchOutside={true}
                disableOnBackPress={false}
                modalDidClose={() => {this.props.hideModalCopyAddressToClipboard()}}
                modalDidOpen={() => undefined}
                modalProps={undefined}
                containerProps={undefined}
                containerStyle={{
                    justifyContent: "center"
                }}
                modalStyle={{
                    borderRadius: 2,
                    margin: 20,
                    padding: 10,
                    backgroundColor: "white"
                }}
                overlayStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                    flex: 1
                }}
            >
                <View style={{alignItems: 'center', justifyContent: 'center'}}>  
                    <Text> Success to copy address to clipboard.</Text>
                    <Text> Please check the address one more time.</Text>
                    <Text> {this.props.copyAddressToClipboard} </Text>
                </View>
            </Modal>
        );
    }

    handelClose = () => {        
        this.props.hideModalCopyAddressToClipboard();
        this.props.setCopyAddressToClipboard('');
    }
}

function mapStateToProps(state) {
    return {
        visibleModalCopyAddressToClipboard: state.modal.visibleModalCopyAddressToClipboard,
        copyAddressToClipboard: state.wallet.copyAddressToClipboard,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        hideModalCopyAddressToClipboard: () => {
            dispatch(ActionCreator.hideModalCopyAddressToClipboard());
        },
        setCopyAddressToClipboard: (address) => {
            dispatch(ActionCreator.setCopyAddressToClipboard(address));
        },
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalCopyAddressToClipboard);

