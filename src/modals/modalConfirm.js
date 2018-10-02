
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'
import Modal from 'react-native-simple-modal';
import ActionCreator from '../actions';
import { connect } from 'react-redux';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

class ModalConfirm extends Component {

    constructor(props, context) {
        super(props);
        this.state = {
            scanResult: {
                status: false,
                message: "init"
            },
            modalConfirmHeader: {
                text: '',
            },
            modalConfirmBody: [{
                text: ''
            }],
        };
    }
    
    componentDidMount() {   
        this.setState({
            modalConfirmHeader: this.props.modalConfirmHeader,
            modalConfirmBody: this.props.modalConfirmBody,
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.modalConfirmHeader !== nextProps.modalConfirmHeader) {
            this.setState({
                modalConfirmHeader: nextProps.modalConfirmHeader,
            })
        }
        if (this.props.modalConfirmBody !== nextProps.modalConfirmBody) {
            this.setState({
                modalConfirmBody: nextProps.modalConfirmBody,
            })
        }
    }

    render() {
        return (
            <Modal 
                offset={0}
                open={this.props.visibleModalConfirm}
                animationDuration={200}
                animationTension={40}
                closeOnTouchOutside={true}
                disableOnBackPress={false}
                modalDidClose={() => {this.closeModal()}}
                modalDidOpen={() => {this.openModal()}}
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
                    {this.renderHeader()}
                    <View style={{alignSelf:"flex-end", paddingRight:20, position:"absolute"}}>
                        <TouchableOpacity onPress={() => this.handleCloseModal()} value={'0.5'}>
                            <Ionicons name="ios-close-circle-outline" size={20}/>
                        </TouchableOpacity>
                    </View>                      
                </View>
                <View style={styles.bodyContainer}>  
                    {this.renderBody()}
                </View>
                <View style={styles.buttonContainer}>
                    <View style={{flex:1}}>
                        <Button
                            onPress={this.handelPressOk}
                            title="Confirm"
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
                </View>
            </Modal>
        );
    }

    handelPressOk = () => {
        const scanResult = {
            status : true,
            message : "Ok"
        }
        this.setState({scanResult: scanResult})        
        this.props.hideModalConfirm();
    }

    handleCloseModal = () => {
        const scanResult = {
            status : false,
            message : "cancle"
        }
        this.setState({scanResult: scanResult});   
        this.props.hideModalConfirm();
    }

    closeModal = () => {
        if (this.props.modalFinishProcess) {
            this.props.modalFinishProcess(this.state.scanResult)
        }
        this.props.hideModalConfirm();
        const scanResult = {
            status : false,
            message : "init"
        }
        this.setState({scanResult: scanResult});
    }

    openModal = () => {
        const scanResult = {
            status: false,
            message: "init"
        }
        this.setState({scanResult: scanResult})
    }

    renderHeader = () => {
        if (this.state.modalConfirmHeader.text === "" || this.state.modalConfirmHeader.text === null || this.state.modalConfirmHeader.text === undefined) {
            return <Text style={styles.headerText}>Infomation</Text>
        } else {
            return <Text style={styles.headerText}>{this.state.modalConfirmHeader.text}</Text>
        }
    }

    renderBody = () => {
        return (
            this.state.modalConfirmBody.map((item, index) => 
                <Text key={index} style={styles.bodyText}>{item.text}</Text>
            )
        )    
    }
}

function mapStateToProps(state) {
    return {
        visibleModalConfirm: state.modal.visibleModalConfirm,
        modalConfirmHeader: state.modal.modalConfirmHeader,
        modalConfirmBody: state.modal.modalConfirmBody,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        hideModalConfirm: () => {
            dispatch(ActionCreator.hideModalConfirm());
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
        flexDirection: 'row',
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
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalConfirm);

