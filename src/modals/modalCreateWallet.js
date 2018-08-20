
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-simple-modal';
import { Ionicons } from '@expo/vector-icons';
import ActionCreator from './../actions';
import { connect } from 'react-redux';

class ModalCreateWallet extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Modal 
                offset={0}
                open={this.props.visibleModalCreateWallet}
                animationDuration={200}
                animationTension={40}
                closeOnTouchOutside={true}
                disableOnBackPress={false}
                modalDidClose={() => {this.props.hideModalCreateWallet()}}
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
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>  
                    <View style={{margin: 10}}>
                        <Ionicons name="ios-refresh-circle-outline" onPress={this.handleResotrePress} size={60} color="black" />   
                        <Text style={{marginTop: 5, textAlign: 'center'}}>restore</Text>
                    </View>
                    <View style={{margin: 10}}>
                        <Ionicons name="ios-add-circle-outline" onPress={this.handleNewPress} size={60} color="black" />
                        <Text style={{marginTop: 5, textAlign: 'center'}}>new</Text>
                    </View>
                </View>
            </Modal>
        );
    }

    handleResotrePress = () => {
        this.props.hideModalCreateWallet();
        this.props.showModalRestoreWallet();
    }
    handleNewPress = () => {
        this.props.hideModalCreateWallet();
        this.props.showModalGenerateWallet(); 
    }
}

function mapStateToProps(state) {
    return {
        visibleModalCreateWallet: state.modal.visibleCreateWalletModal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showModalCreateWallet: () => {
            dispatch(ActionCreator.showModalCreateWallet());
        },
        hideModalCreateWallet: () => {
            dispatch(ActionCreator.hideModalCreateWallet());
        },
        showModalRestoreWallet: () => {
            dispatch(ActionCreator.showModalRestoreWallet());
        },
        hideModalRestoreWallet: () => {
            dispatch(ActionCreator.hideModalRestoreWallet());
        },
        showModalGenerateWallet: () => {
            dispatch(ActionCreator.showModalGenerateWallet());
        },
        hideModalGenerateWallet: () => {
            dispatch(ActionCreator.hideModalGenerateWallet());
        }
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateWallet);

