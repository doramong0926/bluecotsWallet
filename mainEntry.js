import React, { Component } from 'react';
import { View, } from 'react-native';
import ActionCreator from './src/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {AppStackNavigator} from './src/navigator/navigators'

import ModalConfirm from './src/modals/modalConfirm';
import ModalPayment from './src/modals/modalPayment';
import ModalBackupWallet from './src/modals/modalBackupWallet';
import ModalChangeNickName from './src/modals/modalChangeNickName';
import ModalWalletListForChangeNickName from './src/modals/modalWalletListForChangeNickName';
import ModalRemoveWallet from './src/modals/modalRemoveWallet';
import ModalAddWallet from './src/modals/modalAddWallet';
import ModalDefaultWalletSettings from './src/modals/modalDefaultWalletSettings';
import ModalGenerateWallet from './src/modals/modalGenerateWallet';
import ModalRestoreWallet from './src/modals/modalRestoreWallet';
import ModalChangeDefaultWallet from './src/modals/modalChangeDefaultWallet';
import ModalQrCodeScaner from './src/modals/modalQrCodeScaner';
import ModalTransactionHistory from './src/modals/modalTransactionHistory';
import ModalInfomation from './src/modals/modalInfomation';
import ModalSpinner from './src/modals/modalSpinner'
import ModalFingerPrintScaner from './src/modals/modalFingerPrintScaner';
import ModalPincode from './src/modals/modalPincode';
import ModalReceive from './src/modals/modalReceive';
import ModalSend from './src/modals/modalSend';


class MainEntry extends Component {

    constructor(props) {
        super(props)
    }
    
    static propTypes = {
        modalConfirmFinishProcess: PropTypes.func,
        modalFingerPrintScanerFinishProcess: PropTypes.func,
        modalAddWalletFinishProcess: PropTypes.func,
        modalPincodeFinishProcess: PropTypes.func,
    };

    render() {
        return (
            <View style={{flex:1}}>
                <AppStackNavigator />   
                <ModalBackupWallet />
                <ModalChangeNickName />
                <ModalWalletListForChangeNickName />             
                <ModalRemoveWallet />
                <ModalReceive />
                <ModalAddWallet />
                <ModalDefaultWalletSettings />
                <ModalGenerateWallet 
                    modalFinishProcess={this.props.modalAddWalletFinishProcess}
                />
                <ModalRestoreWallet 
                    modalFinishProcess={this.props.modalAddWalletFinishProcess}
                /> 
                <ModalChangeDefaultWallet />
                <ModalTransactionHistory />
                <ModalPayment />
                <ModalSend />                
                <ModalQrCodeScaner />
                <ModalConfirm
                    header={this.props.modalConfirmHeader} 
                    body={this.props.modalConfirmBody} 
                    modalFinishProcess={this.props.modalConfirmFinishProcess} 
                />
                <ModalFingerPrintScaner 
                    modalFinishProcess={this.props.modalFingerPrintScanerFinishProcess}
                />
                <ModalPincode
                    modalFinishProcess={this.props.modalPincodeFinishProcess}
                />
                <ModalInfomation />                    
                <ModalSpinner />
            </View>   
        );
    }
}

function mapStateToProps(state) {
    return {
        modalConfirmHeader: state.modal.modalConfirmHeader,
        modalConfirmBody: state.modal.modalConfirmBody,
        modalConfirmFinishProcess: state.modal.modalConfirmFinishProcess,
        modalFingerPrintScanerFinishProcess: state.modal.modalFingerPrintScanerFinishProcess,
        modalAddWalletFinishProcess: state.modal.modalAddWalletFinishProcess,
        modalPincodeFinishProcess: state.modal.modalPincodeFinishProcess,
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

  
export default connect(mapStateToProps, mapDispatchToProps)(MainEntry);
