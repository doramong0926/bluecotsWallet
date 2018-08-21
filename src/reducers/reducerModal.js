
import { ListView } from 'react-native';
import actionTypes from './../actions/actionTypes';

const initialState = {  
    visibleModalCreateWallet: false,
    visibleModalDefaultWalletSettings: false,
    visibleModalRestoreWallet: false,
    visibleModalGenerateWallet: false,
    visibleModalSelectAnotherWallet: false,
    dataSourceForWalletList: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
    }),
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

        case actionTypes.SET_WALLET_LIST:
            return Object.assign({}, state, {
                dataSourceForWalletList: state.dataSourceForWalletList.cloneWithRows(action.payload)
            });

        default:
            return state;
    }
};

