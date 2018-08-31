
import React, { Component } from 'react';
import { Text, View } from 'react-native';
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
                    <View>  
                        <Text> {this.props.modalInfomationText.title} </Text>
                        <Text> {this.props.modalInfomationText.text} </Text>
                    </View>
                    <View>
                        <Button
                            onPress={this.handlePressClose}
                            title="Close"
                        />
                    </View>
                </View>
            </Modal>
        );
    }

    handlePressClose = () => {
        this.props.hideModalInfomation();
        const infomation = {title:'', text: ''};
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
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalInfomation);

