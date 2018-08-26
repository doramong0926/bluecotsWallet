

import actionTypes from './../actions/actionTypes';

const initialState = {  
    visibleModalCreateWallet: false,
    visibleModalDefaultWalletSettings: false,
    visibleModalRestoreWallet: false,
    visibleModalGenerateWallet: false,
    visibleModalSelectAnotherWallet: false,
    visibleModalChangeDefaultWallet: false,
    visibleModalSuccess: false,
    visibleModalConfirmToSend: false,
};  
 
export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_MODAL_CREATE_WALLET:
            return Object.assign({}, state, {
                visibleCreateWalletModal: true
            });

        case actionTypes.HIDE_MODAL_CREATE_WALLET:
            return Object.assign({}, state, {
                visibleCreateWalletModal: false
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

        case actionTypes.SHOW_MODAL_SELECT_ANOTHER_WALLET:
            return Object.assign({}, state, {
                visibleModalSelectAnotherWallet: true
            });

        case actionTypes.HIDE_MODAL_SELECT_ANOTHER_WALLET:
            return Object.assign({}, state, {
                visibleModalSelectAnotherWallet: false
            });

        case actionTypes.SHOW_MODAL_CHANGE_DEFAULT_WALLET:
            return Object.assign({}, state, {
                visibleModalChangeDefaultWallet: true
            });

        case actionTypes.HIDE_MODAL_CHANGE_DEFAULT_WALLET:
            return Object.assign({}, state, {
                visibleModalChangeDefaultWallet: false
            });

        case actionTypes.SHOW_MODAL_SUCCESS:
            return Object.assign({}, state, {
                visibleModalSuccess: true
            });

        case actionTypes.HIDE_MODAL_SUCCESS:
            return Object.assign({}, state, {
                visibleModalSuccess: false
            });

        case actionTypes.SHOW_MODAL_CONFIRM_TO_SEND:
            return Object.assign({}, state, {
                visibleModalConfirmToSend: true
            });

        case actionTypes.HIDE_MODAL_CONFIRM_TO_SEND:
            return Object.assign({}, state, {
                visibleModalConfirmToSend: false
            });

        default:
            return state;
    }
};

