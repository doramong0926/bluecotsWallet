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

export function changeNickName(wallet) {
    return {
        type: actionTypes.CHANGE_NICKNAME,
        payload: wallet
    };
}

