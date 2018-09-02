
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
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
                    <Text style={styles.headerText}> {this.props.modalInfomationText.title}</Text>
                </View>
                <View style={styles.messageContainer}>  
                    <Text style={styles.menuText}>{this.props.modalInfomationText.message1}</Text>                      
                    <Text style={styles.menuText}>{this.props.modalInfomationText.message2}</Text>                      
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
        textAlign: 'left'
    },
    buttonContainer: {
        marginVertical: 5,
    },
    messageContainer: {
        marginVertical : 10,
        paddingHorizontal: 10,
    }
})
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalInfomation);

