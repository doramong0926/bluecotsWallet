import actionTypes from './../actions/actionTypes';
import { defaultWallet } from './../config/constants';

const initialState = {
    walletForSend: defaultWallet,
    walletForReceive: defaultWallet,
    walletForHistory: defaultWallet,
    ethBalanceForSend: 0,
    blcBalanceForSend: 0,
    addressToSendBlc: '',
    amountToSendBlc: '',
    addressToSendEth: '',
    amountToSendEth: '',
    copyAddressToClipboard: '',
    isLoadingTxData: true,
};  

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_IS_LOADING_TX_DATA:
            return Object.assign({}, state, {
                isLoadingTxData: action.payload,
        });

        case actionTypes.SET_WALLET_FOR_SEND:
            return Object.assign({}, state, {
                walletForSend: action.payload,
            });

        case actionTypes.SET_WALLET_FOR_RECEIVE:
            return Object.assign({}, state, {
                walletForReceive: action.payload,
            });

        case actionTypes.SET_WALLET_FOR_HISTORY:
            return Object.assign({}, state, {
                walletForHistory: action.payload,
            });

        case actionTypes.SET_ETH_BALANCE_FOR_SEND:
            return Object.assign({}, state, {
                ethBalanceForSend: action.payload,
            });

        case actionTypes.SET_BLC_BALANCE_FOR_SEND:
            return Object.assign({}, state, {
                blcBalanceForSend: action.payload,
            });

        case actionTypes.SET_ADDRESS_TO_SEND_BLC:
            return Object.assign({}, state, {
                addressToSendBlc: action.payload,
            });

        case actionTypes.SET_AMOUNT_TO_SEND_BLC:
            return Object.assign({}, state, {
                amountToSendBlc: action.payload,
            });

        case actionTypes.SET_ADDRESS_TO_SEND_ETH:
            return Object.assign({}, state, {
                addressToSendEth: action.payload,
            });

        case actionTypes.SET_AMOUNT_TO_SEND_ETH:
            return Object.assign({}, state, {
                amountToSendEth: action.payload,
            });

        case actionTypes.SET_COPY_ADDRESS_TO_CLIPBOARD:
            return Object.assign({}, state, {
                copyAddressToClipboard: action.payload,
            });


        default:
            return state;
    }
};