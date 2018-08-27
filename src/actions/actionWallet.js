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

export function setAddressToSendBlc(address) {
    return {
        type: actionTypes.SET_ADDRESS_TO_SEND_BLC,
        payload: address
    };
}

export function setAmountToSendBlc(balance) {
    return {
        type: actionTypes.SET_AMOUNT_TO_SEND_BLC,
        payload: balance
    };
}

export function setAddressToSendEth(address) {
    return {
        type: actionTypes.SET_ADDRESS_TO_SEND_ETH,
        payload: address
    };
}

export function setAmountToSendEth(balance) {
    return {
        type: actionTypes.SET_AMOUNT_TO_SEND_ETH,
        payload: balance
    };
}