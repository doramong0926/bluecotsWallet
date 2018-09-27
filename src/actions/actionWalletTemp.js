import actionTypes from './actionTypes';

export function setIsLoadingTxData(value) {
    return {
        type: actionTypes.SET_IS_LOADING_TX_DATA,
        payload: value
    };
}


