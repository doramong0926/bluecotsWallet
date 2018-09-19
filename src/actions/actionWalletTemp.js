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

export function setWalletForHistory(wallet) {
    return {
        type: actionTypes.SET_WALLET_FOR_HISTORY,
        payload: wallet
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

export function setIsLoadingTxData(value) {
    return {
        type: actionTypes.SET_IS_LOADING_TX_DATA,
        payload: value
    };
}

export function setModalConfirmToSendBlcFinishProcess(finishProcess) {
    return {
        type: actionTypes.SET_MODAL_CONFIRM_TO_SEND_BLC_FINISH_PROCESS,
        payload: finishProcess
    };
}

export function setModalConfirmToSendEthFinishProcess(finishProcess) {
    return {
        type: actionTypes.SET_MODAL_CONFIRM_TO_SEND_ETH_FINISH_PROCESS,
        payload: finishProcess
    };
}



