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

export function setPaymentInfomation(paymentInfomation) {
    return {        
        type: actionTypes.SET_PAYMENT_INFOMATION,
        payload: paymentInfomation
    };
}

export function setEthBalance(balance) {
    return {
        type: actionTypes.SET_ETH_BALANCE,
        payload: balance
    };
}

export function setBlcBalance(balance) {
    return {
        type: actionTypes.SET_BLC_BALANCE,
        payload: balance
    };
}
