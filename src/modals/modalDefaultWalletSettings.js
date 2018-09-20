
import React, { Component } from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ActionCreator from './../actions';
import Modal from 'react-native-simple-modal';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

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
                    <Text style={styles.headerText}>Default Wallet settings</Text>
                </View>
                <View style={styles.bodyContainer}>
                    <TouchableHighlight onPress={() => this.handleModifyNickNamePress()} underlayColor="gray">
                        <View style={{flexDirection: 'row', margin: 10}}>   
                            <Text style={styles.menuText}>Modify nickname</Text>
                            <View style={{flex: 1, alignItems:'flex-end', justifyContent:'center'}} >
                                <Ionicons name="ios-arrow-dropdown" size={20} />
                            </View>
                        </View>
                    </TouchableHighlight>
                    <View style={{borderColor: 'gray', borderWidth: 0.5}}></View>
                    <TouchableHighlight onPress={() => this.handleBackupPress()} underlayColor="gray">
                        <View style={{flexDirection: 'row', margin: 10}}>
                            <Text style={styles.menuText}>Backup wallet</Text>
                            <View style={{flex: 1, alignItems:'flex-end', justifyContent:'center'}} >
                                <Ionicons name="ios-arrow-dropdown" size={20} />
                            </View>
                        </View>
                    </TouchableHighlight>
                    <View style={{borderColor: 'gray', borderWidth: 0.5}}></View>
                    <TouchableHighlight onPress={() => this.handleBackupPress()} underlayColor="gray">
                        <View style={{flexDirection: 'row', margin: 10}}>
                            <Text style={styles.menuText}>Delete wallet</Text>
                            <View style={{flex: 1, alignItems:'flex-end', justifyContent:'center'}} >
                                <Ionicons name="ios-arrow-dropdown" size={20} />
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
            </Modal>
        );
    }
    handleSelectPress = () => {
        this.props.hideModalDefaultWalletSettings();
        this.props.showModalChangeDefaultWallet(); 
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
        showModalChangeDefaultWallet: () => {
            dispatch(ActionCreator.showModalChangeDefaultWallet());
        },
    };
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
        justifyContent: 'center',
        paddingHorizontal: 10,
    }, 
    headerText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    },
    menuText: {
        marginTop: 5, 
        textAlign: 'center'
    }
})
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalDefaultWalletSettings);
