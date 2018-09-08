

import actionTypes from './../actions/actionTypes';

const initialState = {  
    visibleModalAddWallet: false,
    visibleModalDefaultWalletSettings: false,
    visibleModalRestoreWallet: false,
    visibleModalGenerateWallet: false,
    visibleModalSelectAnotherWalletForSend: false,
    visibleModalSelectAnotherWalletForReceive: false,
    visibleModalSelectAnotherWalletForHistory: false,
    visibleModalChangeDefaultWallet: false,
    visibleModalConfirmToSendBlc: false,
    visibleModalConfirmToSendEth: false,
    visibleModalQrCodeScaner: false,
    visibleModalSpinner: false,
    visibleModalInfomation: false,
    modalInfomationText: {title: '', message1: '', message2: '', message3: ''},    
    visibleModalTransactionHistory: false,
    modalTransactionHistoryInfomation: {
        blockNumber: '',
        timeStamp: '',
        hash : '',
        from: '',
        value: '',
        to: '',
        gasUsed: '',
        symbol: '',
        status: '',
    },
    tokenNameForQrCode: '',
    spinnerText: '',  
};  
 
export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_MODAL_ADD_WALLET:
            return Object.assign({}, state, {
                visibleModalAddWallet: true
            });

        case actionTypes.HIDE_MODAL_ADD_WALLET:
            return Object.assign({}, state, {
                visibleModalAddWallet: false
            });

        case actionTypes.SHOW_MODAL_DEFAULT_WALLET_SETTINGS:
            return Object.assign({}, state, {
                visibleModalDefaultWalletSettings: true
            });

        case actionTypes.HIDE_MODAL_DEFAULT_WALLET_SETTINGS:
            return Object.assign({}, state, {
                visibleModalDefaultWalletSettings: false
            });

        case actionTypes.SHOW_MODAL_RESTORE_WALLET:
            return Object.assign({}, state, {
                visibleModalRestoreWallet: true
            });

        case actionTypes.HIDE_MODAL_RESTORE_WALLET:
            return Object.assign({}, state, {
                visibleModalRestoreWallet: false
            });

        case actionTypes.SHOW_MODAL_GENERATE_WALLET:
            return Object.assign({}, state, {
                visibleModalGenerateWallet: true
            });

        case actionTypes.HIDE_MODAL_GENERATE_WALLET:
            return Object.assign({}, state, {
                visibleModalGenerateWallet: false
            });

        case actionTypes.SHOW_MODAL_SELECT_ANOTHER_WALLET_FOR_SEND:
            return Object.assign({}, state, {
                visibleModalSelectAnotherWalletForSend: true
            });

        case actionTypes.HIDE_MODAL_SELECT_ANOTHER_WALLET_FOR_SEND:
            return Object.assign({}, state, {
                visibleModalSelectAnotherWalletForSend: false
            });

        case actionTypes.SHOW_MODAL_SELECT_ANOTHER_WALLET_FOR_RECEIVE:
            return Object.assign({}, state, {
                visibleModalSelectAnotherWalletForReceive: true
            });

        case actionTypes.HIDE_MODAL_SELECT_ANOTHER_WALLET_FOR_RECEIVE:
            return Object.assign({}, state, {
                visibleModalSelectAnotherWalletForReceive: false
            });

        case actionTypes.SHOW_MODAL_SELECT_ANOTHER_WALLET_FOR_HISTORY:
            return Object.assign({}, state, {
                visibleModalSelectAnotherWalletForHistory: true
            });

        case actionTypes.HIDE_MODAL_SELECT_ANOTHER_WALLET_FOR_HISTORY:
            return Object.assign({}, state, {
                visibleModalSelectAnotherWalletForHistory: false
            });

        case actionTypes.SHOW_MODAL_CHANGE_DEFAULT_WALLET:
            return Object.assign({}, state, {
                visibleModalChangeDefaultWallet: true
            });

        case actionTypes.HIDE_MODAL_CHANGE_DEFAULT_WALLET:
            return Object.assign({}, state, {
                visibleModalChangeDefaultWallet: false
            });      

        case actionTypes.SHOW_MODAL_CONFIRM_TO_SEND_BLC:
            return Object.assign({}, state, {
                visibleModalConfirmToSendBlc: true
            });

        case actionTypes.HIDE_MODAL_CONFIRM_TO_SEND_BLC:
            return Object.assign({}, state, {
                visibleModalConfirmToSendBlc: false
            });

        case actionTypes.SHOW_MODAL_CONFIRM_TO_SEND_ETH:
            return Object.assign({}, state, {
                visibleModalConfirmToSendEth: true
            });

        case actionTypes.HIDE_MODAL_CONFIRM_TO_SEND_ETH:
            return Object.assign({}, state, {
                visibleModalConfirmToSendEth: false
            });

        case actionTypes.SHOW_MODAL_QR_CODE_SCANER:
            return Object.assign({}, state, {
                visibleModalQrCodeScaner: true
            });

        case actionTypes.HIDE_MODAL_QR_CODE_SCANER:
            return Object.assign({}, state, {
                visibleModalQrCodeScaner: false
            });

        case actionTypes.SHOW_MODAL_INFOMATION:
            return Object.assign({}, state, {
                visibleModalInfomation: true
            });

        case actionTypes.HIDE_MODAL_INFOMATION:
            return Object.assign({}, state, {
                visibleModalInfomation: false
            });

        case actionTypes.SET_MODAL_INFOMATION:
            return Object.assign({}, state, {
                modalInfomationText: action.payload,
            });

        case actionTypes.SET_TOKEN_NAME_FOR_QR_CODE:
            return Object.assign({}, state, {
                tokenNameForQrCode: action.payload,
            });

        case actionTypes.SHOW_MODAL_SPINNER:
            return Object.assign({}, state, {
                visibleModalSpinner: true,
                spinnerText: action.payload,
            });

        case actionTypes.HIDE_MODAL_SPINNER:
            return Object.assign({}, state, {
                visibleModalSpinner: false,
                spinnerText: '',
            });

        case actionTypes.SHOW_MODAL_TRANSACTION_HISTORY:
            return Object.assign({}, state, {
                visibleModalTransactionHistory: true
            });

        case actionTypes.HIDE_MODAL_TRANSACTION_HISTORY:
            return Object.assign({}, state, {
                visibleModalTransactionHistory: false
            });

        case actionTypes.SET_MODAL_TRANSACTION_HISTORY_INFOMATION:
            return Object.assign({}, state, {
                modalTransactionHistoryInfomation: action.payload,
            });
            
        default:
            return state;
    }
};

