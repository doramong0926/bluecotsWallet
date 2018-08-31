import actionTypes from './actionTypes';

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

export function setCopyAddressToClipboard(address) {
    return {
        type: actionTypes.SET_COPY_ADDRESS_TO_CLIPBOARD,
        payload: address
    };
}

