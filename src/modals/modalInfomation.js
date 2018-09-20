
import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Linking } from 'react-native';
import Modal from 'react-native-simple-modal';
import ActionCreator from '../actions';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';

class ModalInfomation extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Modal 
                offset={0}
                open={this.props.visibleModalInfomation}
                animationDuration={200}
                animationTension={40}
                closeOnTouchOutside={true}
                disableOnBackPress={false}
                modalDidClose={() => {this.handlePressClose()}}
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
                    <Text style={styles.headerText}> {this.props.modalInfomationText.title}</Text>
                </View>
                <View style={styles.bodyContainer}>  
                    <Text style={styles.bodyText}>{this.props.modalInfomationText.message1}</Text>                      
                    <Text style={styles.bodyText}>{this.props.modalInfomationText.message2}</Text>                      
                    <Text style={styles.bodyText}>{this.props.modalInfomationText.message3}</Text>
                    {
                        (this.props.modalInfomationText.transactionId !== '' && this.props.modalInfomationText.transactionId !== undefined) ?
                        (
                            <TouchableHighlight onPress={() => this.handlePressTxid(this.props.modalInfomationText.transactionId)} underlayColor="gray">
                                <View>
                                    <Text style={styles.bodyText}>{this.props.modalInfomationText.transactionId}</Text>
                                    <View style={{marginTop: 5}}>
                                        <Text style={{textAlign: 'center', color: 'gray'}}>Click to check txid</Text> 
                                    </View>
                                </View>
                            </TouchableHighlight>
                        ) : 
                        (
                            <View></View>
                        )
                    }
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={this.handlePressClose}
                        title="Close"
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
            </Modal>
        );
    }

    handlePressTxid = (txid) => {
        const address = "https://ropsten.etherscan.io/tx/" + txid;
        Linking.canOpenURL(address).then(supported => {
            if (supported) {
                Linking.openURL(address);
            } 
        });
    }

    handlePressClose = () => {
        this.props.hideModalInfomation();
        const infomation = {title:'', message: ''};
        this.props.setModalInfomation(infomation);
    }
}

function mapStateToProps(state) {
    return {
        visibleModalInfomation: state.modal.visibleModalInfomation,
        modalInfomationText: state.modal.modalInfomationText
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showModalInfomation: () => {
            dispatch(ActionCreator.showModalInfomation());
        },
        hideModalInfomation: () => {
            dispatch(ActionCreator.hideModalInfomation());
        },
        setModalInfomation: (infomation) => {
            dispatch(ActionCreator.setModalInfomation(infomation));
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
    bodyText: {
        textAlign: 'left'
    },
})
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalInfomation);

