import actionTypes from './../actions/actionTypes';
import { defaultWallet } from './../config/constants';

const initialState = {
    walletForSend: defaultWallet,
    ethBalanceForSend: 0,
    blcBalanceForSend: 0,
    addressToSendBlc: '',
    amountToSendBlc: '',
    addressToSendEth: '',
    amountToSendEth: '',
    copyAddressToClipboard: '',
    isLoadingTxData: true,
    modalConfirmToSendBlcFinishProcess: undefined,
    modalConfirmToSendEthFinishProcess: undefined,
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

        case actionTypes.SET_MODAL_CONFIRM_TO_SEND_BLC_FINISH_PROCESS:
            return Object.assign({}, state, {
                modalConfirmToSendBlcFinishProcess: action.payload,
            });   
        
        case actionTypes.SET_MODAL_CONFIRM_TO_SEND_ETH_FINISH_PROCESS:
            return Object.assign({}, state, {
                modalConfirmToSendEthFinishProcess: action.payload,
            });   

        default:
            return state;
    }
};