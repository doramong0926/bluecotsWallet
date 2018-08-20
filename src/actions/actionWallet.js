import actionTypes from './actionTypes';

export function addWallet(wallet) {
    return {
        type: actionTypes.ADD_WALLET,
        payload: wallet
    };
}

export function removeWallet(wallet) {
    return {
        type: actionTypes.REMOVE_WALLET,
        payload: wallet,
    };
}

export function setDefaultWallet(wallet) {
    return {
        type: actionTypes.SET_DEFAULT_WALLET,
        payload: wallet
    };
}

export function removeDefaultWallet(wallet) {
    return {
        type: actionTypes.SET_DEFAULT_WALLET
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
