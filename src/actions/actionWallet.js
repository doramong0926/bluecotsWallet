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

export function setWalletForSend(wallet) {
    return {
        type: actionTypes.SET_WALLET_FOR_SEND,
        payload: wallet
    };
}

export function setWalletForReceive(wallet) {
    return {
        type: actionTypes.SET_WALLET_FOR_RECEIVE,
        payload: wallet
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

export function setEthBalanceForSend(balance) {
    return {
        type: actionTypes.SET_ETH_BALANCE_FOR_SEND,
        payload: balance
    };
}

export function setBlcBalanceForSend(balance) {
    return {
        type: actionTypes.SET_BLC_BALANCE_FOR_SEND,
        payload: balance
    };
}

export function setEthBalanceForReceive(balance) {
    return {
        type: actionTypes.SET_ETH_BALANCE_FOR_RECEIVE,
        payload: balance
    };
}

export function setBlcBalanceForReceive(balance) {
    return {
        type: actionTypes.SET_BLC_BALANCE_FOR_RECEIVE,
        payload: balance
    };
}
