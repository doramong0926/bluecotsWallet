import React, { Component } from 'react';
import { View, } from 'react-native';
import ActionCreator from './src/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {AppStackNavigator} from './src/navigator/navigators'

import ModalAsk from './src/modals/modalAsk';
import ModalAddWallet from './src/modals/modalAddWallet';
import ModalSelectAnotherWalletForSend from './src/modals/modalSelectAnotherWalletForSend';
import ModalSelectAnotherWalletForReceive from './src/modals/modalSelectAnotherWalletForReceive';
import ModalSelectAnotherWalletForHistory from './src/modals/modalSelectAnotherWalletForHistory';
import ModalDefaultWalletSettings from './src/modals/modalDefaultWalletSettings';
import ModalGenerateWallet from './src/modals/modalGenerateWallet';
import ModalRestoreWallet from './src/modals/modalRestoreWallet';
import ModalChangeDefaultWallet from './src/modals/modalChangeDefaultWallet';
import ModalConfirmToSendBlc from './src/modals/modalConfirmToSendBlc';
import ModalConfirmToSendEth from './src/modals/modalConfirmToSendEth';
import ModalQrCodeScaner from './src/modals/modalQrCodeScaner';
import ModalTransactionHistory from './src/modals/modalTransactionHistory';
import ModalInfomation from './src/modals/modalInfomation';
import ModalSpinner from './src/modals/modalSpinner'
import ModalFingerPrintScaner from './src/modals/modalFingerPrintScaner';
import ModalPincode from './src/modals/modalPincode';
import ModalWalletInfomation from './src/modals/modalWalletInfomation';


class MainEntry extends Component {

    constructor(props) {
        super(props)
    }
    
    static propTypes = {
        modalAskFinishProcess: PropTypes.func,
        modalFingerPrintScanerFinishProcess: PropTypes.func,
        modalAddWalletFinishProcess: PropTypes.func,
        modalConfirmToSendBlcFinishProcess: PropTypes.func,
        modalConfirmToSendEthFinishProcess: PropTypes.func,
        modalPincodeFinishProcess: PropTypes.func,
    };

    render() {
        return (
            <View style={{flex:1}}>
                <AppStackNavigator />    
                <ModalAsk 
                    header={this.props.modalAskHeader} 
                    body={this.props.modalAskBody} 
                    modalFinishProcess={this.props.modalAskFinishProcess} 
                />
                <ModalWalletInfomation />
                <ModalAddWallet />
                <ModalDefaultWalletSettings />
                <ModalGenerateWallet 
                    modalFinishProcess={this.props.modalAddWalletFinishProcess}
                />
                <ModalRestoreWallet 
                    modalFinishProcess={this.props.modalAddWalletFinishProcess}
                /> 
                <ModalSelectAnotherWalletForSend />
                <ModalSelectAnotherWalletForReceive />
                <ModalSelectAnotherWalletForHistory />
                <ModalChangeDefaultWallet />
                <ModalConfirmToSendBlc 
                    modalFinishProcess={this.props.modalConfirmToSendBlcFinishProcess}
                />
                <ModalConfirmToSendEth 
                    modalFinishProcess={this.props.modalConfirmToSendEthFinishProcess}    
                />
                <ModalQrCodeScaner />
                <ModalFingerPrintScaner 
                    modalFinishProcess={this.props.modalFingerPrintScanerFinishProcess}
                />
                <ModalPincode
                    modalFinishProcess={this.props.modalPincodeFinishProcess}
                />
                <ModalTransactionHistory />
                <ModalInfomation />                    
                <ModalSpinner />
            </View>   
        );
    }
}

function mapStateToProps(state) {
    return {
        modalAskHeader: state.modal.modalAskHeader,
        modalAskBody: state.modal.modalAskBody,
        modalAskFinishProcess: state.modal.modalAskFinishProcess,
        modalFingerPrintScanerFinishProcess: state.modal.modalFingerPrintScanerFinishProcess,
        modalAddWalletFinishProcess: state.modal.modalAddWalletFinishProcess,
        modalConfirmToSendBlcFinishProcess: state.walletTemp.modalConfirmToSendBlcFinishProcess,
        modalConfirmToSendEthFinishProcess: state.walletTemp.modalConfirmToSendEthFinishProcess,
        modalPincodeFinishProcess: state.modal.modalPincodeFinishProcess,
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

  
export default connect(mapStateToProps, mapDispatchToProps)(MainEntry);
