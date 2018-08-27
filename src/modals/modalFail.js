
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Modal from 'react-native-simple-modal';
import ActionCreator from './../actions';
import { connect } from 'react-redux';

class ModalFail extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Modal 
                offset={0}
                open={this.props.visibleModalFail}
                animationDuration={200}
                animationTension={40}
                closeOnTouchOutside={true}
                disableOnBackPress={false}
                modalDidClose={() => {this.props.hideModalFail()}}
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
                    <Text> Fail </Text>
                </View>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        visibleModalFail: state.modal.visibleModalFail
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showModalFail: () => {
            dispatch(ActionCreator.showModalFail());
        },
        hideModalFail: () => {
            dispatch(ActionCreator.hideModalFail());
        },
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ModalFail);

