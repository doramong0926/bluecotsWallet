
import React, { Component } from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'
import Modal from 'react-native-simple-modal';
import ActionCreator from '../actions';
import { connect } from 'react-redux';

class ModalAsk extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Modal 
                offset={0}
                open={this.props.visibleModalAsk}
                animationDuration={200}
                animationTension={40}
                closeOnTouchOutside={true}
                disableOnBackPress={false}
                modalDidClose={() => {this.props.handleCloseModal}}
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
                <View style={styles.headerContainer}>
                    {this.renderHeader()}
                </View>
                <View style={styles.messageContainer}>  
                    {this.renderBody()}
                </View>
                <View style={styles.buttonContainer}>
                    <View style={{flex:1}}>
                        <Button
                            onPress={this.handelPressOk}
                            title="OK"
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
                    <View style={{flex:1}}>
                        <Button
                            onPress={this.handelPressCancel}
                            title="CANCEL"
                            buttonStyle={{
                                backgroundColor: "#BCBCBE",
                                borderColor: "transparent", 
                                borderRadius: 5
                            }}
                            containerViewStyle={{
                                // alignSelf: 'flex-end',
                                // margin: 20,
                            }}
                        />
                    </View>
                </View>
            </Modal>
        );
    }

    handelPressOk = () => {
        if (this.props.modalFinishProcess) {
            const result = {
                status : true,
                message : "Ok"
            }
            this.props.modalFinishProcess(result)
        }
        this.props.hideModalAsk();
    }

    handelPressCancel = () => {
        if (this.props.modalFinishProcess) {
            const result = {
                status : false,
                message : "Cancle"
            }
            this.props.modalFinishProcess(result)
        }
        this.props.hideModalAsk();
    }

    handleCloseModal = () => {
        this.props.hideModalAsk();
    }

    renderHeader = () => {
        if (this.props.header.text === "" || this.props.header.text === null || this.props.header.text === undefined) {
            return <Text style={styles.headerText}>Infomation</Text>
        } else {
            return <Text style={styles.headerText}>{this.props.header.text}</Text>
        }
    }

    renderBody = () => {
        return (
            this.props.body.map((item, index) => 
                <Text key={index} style={styles.bodyText}>{item.text}</Text>
            )
        )    
    }
}

function mapStateToProps(state) {
    return {
        visibleModalAsk: state.modal.visibleModalAsk,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        hideModalAsk: () => {
            dispatch(ActionCreator.hideModalAsk());
        },
    };
}

const styles = StyleSheet.create({
    headerContainer: {
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
    messageContainer: {
        marginVertical : 10,
        paddingHorizontal: 10,
    },
    bodyText: {
        textAlign: 'left'
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 5,
    },
})
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalAsk);

