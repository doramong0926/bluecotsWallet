import actionTypes from './actionTypes';

export function setIsLoadingTxData(value) {
    return {
        type: actionTypes.SET_IS_LOADING_TX_DATA,
        payload: value
    };
}

export function setWalletForChange(wallet) {
    return {
        type: actionTypes.SET_WALLET_FOR_CHNAGE,
        payload: wallet
    };
}
