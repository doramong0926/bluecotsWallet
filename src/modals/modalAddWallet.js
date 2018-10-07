
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-simple-modal';
import ActionCreator from './../actions';
import { connect } from 'react-redux';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

class ModalAddWallet extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {   
    }

    componentWillReceiveProps(nextProps) {
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
                    margin: 0,
                    padding:0,
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
                    <Text style={styles.headerText}>Add Wallet</Text>
                    <View style={{alignSelf:"flex-end", paddingRight:20, position:"absolute"}}>
                        <TouchableOpacity onPress={() => this.props.hideModalAddWallet()} value={'0.5'}>
                            <Ionicons name="ios-close-circle-outline" size={20}/>
                        </TouchableOpacity>
                    </View>                      
                </View>
                <View style={styles.bodyContainer}>
                    <TouchableOpacity onPress={() => this.handleNewPress()} value={'0.5'}>
                        <View style={{flexDirection: 'row', margin: 10}}>   
                            <Text style={styles.menuText}>Generate new wallet</Text>
                            <View style={{flex: 1, alignItems:'flex-end', justifyContent:'center'}} >
                                <Ionicons name="ios-arrow-dropdown" size={20} />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{borderColor: 'gray', borderWidth: 0.5}}></View>
                    <TouchableOpacity onPress={() => this.handleResotrePress()} value="0.5">
                        <View style={{flexDirection: 'row', margin: 10}}>   
                            <Text style={styles.menuText}>Restore wallet with private key</Text>
                            <View style={{flex: 1, alignItems:'flex-end', justifyContent:'center'}} >
                                <Ionicons name="ios-arrow-dropdown" size={20} />
                            </View>
                        </View>
                    </TouchableOpacity>
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
    headerContainer: {
        backgroundColor: '#B4B7BA',
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
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalAddWallet);

