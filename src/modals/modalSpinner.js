import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Modal from 'react-native-simple-modal';
import ActionCreator from './../actions';
import { connect } from 'react-redux';

import Spinner from 'react-native-loading-spinner-overlay';

class ModalSpinner extends Component {

    /* eslint react/no-did-mount-set-state: 0 */
    componentDidMount() {
        // setInterval(() => {
        //     this.setState({
        //         visible: !this.state.visible
        //     });
        // }, 3000);
    }

    render() {
        return (
            <View>                
                <Spinner visible={this.props.visibleModalSpinner} textContent={this.props.spinnerText} textStyle={{fontSize:20, fontWeight:'normal', color: '#FFF'}} />
            </View>
        );
    }

    closeModal = () => {
        this.props.hideModalSpinner();
    }
}

function mapStateToProps(state) {
    return {
        visibleModalSpinner: state.modal.visibleModalSpinner,
        spinnerText: state.modal.spinnerText,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showModalSpinner: (message) => {
            dispatch(ActionCreator.showModalSpinner(message));
        },
        hideModalSpinner: () => {
            dispatch(ActionCreator.hideModalSpinner());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalSpinner);