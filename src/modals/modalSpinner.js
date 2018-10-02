import React, { Component } from 'react';
import { View } from 'react-native';
import ActionCreator from './../actions';
import { connect } from 'react-redux';

import Spinner from 'react-native-loading-spinner-overlay';

class ModalSpinner extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        }
    }

    componentDidMount(){
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        return (
            <View>                
                <Spinner 
                    visible={this.props.visibleModalSpinner} 
                    textContent={this.props.spinnerText} 
                    textStyle={{fontSize:20}} 
                />
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