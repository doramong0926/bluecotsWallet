import actionTypes from './actionTypes';

export function setIsLoadingTxData(value) {
    return {
        type: actionTypes.SET_IS_LOADING_TX_DATA,
        payload: value
    };
}

export function setTempWallet(wallet) {
    return {
        type: actionTypes.SET_TEMP_WALLET,
        payload: wallet
    };
}
