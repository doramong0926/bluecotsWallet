
import React, { Component } from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ActionCreator from './../actions';
import Modal from 'react-native-simple-modal';

class ModalDefaultWalletSettings extends Component {  
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Modal 
                offset={0}
                open={this.props.visibleModalDefaultWalletSettings}
                animationDuration={200}
                animationTension={40}
                closeOnTouchOutside={true}
                disableOnBackPress={false}
                modalDidClose={() => {this.props.hideModalDefaultWalletSettings()}}
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
                    <TouchableHighlight onPress={() => this.handleSelectPress()} underlayColor="gray">
                        <View style={{flexDirection: 'row', margin: 10}}>
                            <Text style={{marginTop: 5, textAlign: 'justify'}}>Select another wallet</Text>
                        </View>  
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.handleModifyNickNamePress()} underlayColor="gray">
                        <View style={{flexDirection: 'row', margin: 10}}>   
                            <Text style={{marginTop: 5, textAlign: 'justify'}}>Modify nickname</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.handleBackupPress()} underlayColor="gray">
                        <View style={{flexDirection: 'row', margin: 10}}>
                            <Text style={{marginTop: 5, textAlign: 'justify'}}>Backup wallet</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.handleBackupPress()} underlayColor="gray">
                        <View style={{flexDirection: 'row', margin: 10}}>
                            <Text style={{marginTop: 5, textAlign: 'justify'}}>Delete wallet</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </Modal>
        );
    }
    handleSelectPress = () => {
        this.props.hideModalDefaultWalletSettings();
        this.props.showModalSelectAnotherWallet(); 
    }
    handleModifyNickNamePress = () => {
        this.props.hideModalDefaultWalletSettings(); 
    }
    handleBackupPress = () => {
        this.props.hideModalDefaultWalletSettings(); 
    }
    handleDeletePress = () => {
        this.props.this.props.hideModalDefaultWalletSettings(); 
    }
}

function mapStateToProps(state) {
    return {
        visibleModalDefaultWalletSettings: state.modal.visibleModalDefaultWalletSettings
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showModalDefaultWalletSettings: () => {
            dispatch(ActionCreator.showModalDefaultWalletSettings());
        },
        hideModalDefaultWalletSettings: () => {
            dispatch(ActionCreator.hideModalDefaultWalletSettings());
        },
        showModalSelectAnotherWallet: () => {
            dispatch(ActionCreator.showModalSelectAnotherWallet());
        },
        hideModalSelectAnotherWallet: () => {
            dispatch(ActionCreator.hideModalSelectAnotherWallet());
        }
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalDefaultWalletSettings);
