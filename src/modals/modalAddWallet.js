
import React, { Component } from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import Modal from 'react-native-simple-modal';
import ActionCreator from './../actions';
import { connect } from 'react-redux';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

class ModalAddWallet extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Modal 
                offset={0}
                open={this.props.visibleModalAddWallet}
                animationDuration={200}
                animationTension={40}
                closeOnTouchOutside={true}
                disableOnBackPress={false}
                modalDidClose={() => {this.props.hideModalAddWallet()}}
                modalDidOpen={() => undefined}
                modalProps={undefined}
                containerProps={undefined}
                containerStyle={{
                    justifyContent: "center"
                }}
                modalStyle={{
                    borderRadius: 10,
                    margin: 20,
                    padding: 10,
                    backgroundColor: "white"
                }}
                overlayStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
                    flex: 1
                }}
            >
                <View style={styles.heaerContainer}>
                    <Text style={styles.headerText}>Add Wallet</Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                    <TouchableHighlight onPress={() => this.handleNewPress()} underlayColor="gray">
                        <View style={{flexDirection: 'row', margin: 10}}>   
                            <Text style={styles.menuText}>New</Text>
                            <View style={{flex: 1, alignItems:'flex-end', justifyContent:'center'}} >
                                <Ionicons name="ios-arrow-dropdown" size={20} />
                            </View>
                        </View>
                    </TouchableHighlight>
                    <View style={{borderColor: 'gray', borderWidth: 0.5}}></View>
                    <TouchableHighlight onPress={() => this.handleResotrePress()} underlayColor="gray">
                        <View style={{flexDirection: 'row', margin: 10}}>   
                            <Text style={styles.menuText}>Restore</Text>
                            <View style={{flex: 1, alignItems:'flex-end', justifyContent:'center'}} >
                                <Ionicons name="ios-arrow-dropdown" size={20} />
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
            </Modal>
        );
    }

    handleResotrePress = () => {
        this.props.hideModalAddWallet();
        this.props.showModalRestoreWallet();
    }
    handleNewPress = () => {
        this.props.hideModalAddWallet();
        this.props.showModalGenerateWallet(); 
    }
}

function mapStateToProps(state) {
    return {
        visibleModalAddWallet: state.modal.visibleModalAddWallet
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showModalAddeWallet: () => {
            dispatch(ActionCreator.showModalAddeWallet());
        },
        hideModalAddWallet: () => {
            dispatch(ActionCreator.hideModalAddWallet());
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

const styles = StyleSheet.create({
    heaerContainer: {
        backgroundColor: '#67AFCB',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 10,
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
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalAddWallet);

