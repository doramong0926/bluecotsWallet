import actionTypes from './actionTypes';

export function showModalAddWallet() {
  return {
    type: actionTypes.SHOW_MODAL_ADD_WALLET
  };
}

export function hideModalAddWallet() {
    return {
      type: actionTypes.HIDE_MODAL_ADD_WALLET
    };
}

export function showModalDefaultWalletSettings() {
  return {
    type: actionTypes.SHOW_MODAL_DEFAULT_WALLET_SETTINGS
  };
}

export function hideModalDefaultWalletSettings() {
    return {
      type: actionTypes.HIDE_MODAL_DEFAULT_WALLET_SETTINGS
    };
}

export function showModalRestoreWallet() {
  return {
    type: actionTypes.SHOW_MODAL_RESTORE_WALLET
  };
}

export function hideModalRestoreWallet() {
    return {
      type: actionTypes.HIDE_MODAL_RESTORE_WALLET
    };
}

export function showModalGenerateWallet() {
  return {
    type: actionTypes.SHOW_MODAL_GENERATE_WALLET
  };
}

export function hideModalGenerateWallet() {
    return {
      type: actionTypes.HIDE_MODAL_GENERATE_WALLET
    };
}

export function showModalSelectAnotherWalletForSend() {
  return {
    type: actionTypes.SHOW_MODAL_SELECT_ANOTHER_WALLET_FOR_SEND
  };
}

export function hideModalSelectAnotherWalletForSend() {
    return {
      type: actionTypes.HIDE_MODAL_SELECT_ANOTHER_WALLET_FOR_SEND
    };
}

export function showModalSelectAnotherWalletForReceive() {
  return {
    type: actionTypes.SHOW_MODAL_SELECT_ANOTHER_WALLET_FOR_RECEIVE
  };
}

export function hideModalSelectAnotherWalletForReceive() {
    return {
      type: actionTypes.HIDE_MODAL_SELECT_ANOTHER_WALLET_FOR_RECEIVE
    };
}

export function showModalSelectAnotherWalletForHistory() {
  return {
    type: actionTypes.SHOW_MODAL_SELECT_ANOTHER_WALLET_FOR_HISTORY
  };
}

export function hideModalSelectAnotherWalletForHistory() {
    return {
      type: actionTypes.HIDE_MODAL_SELECT_ANOTHER_WALLET_FOR_HISTORY
    };
}

export function showModalChangeDefaultWallet() {
  return {
    type: actionTypes.SHOW_MODAL_CHANGE_DEFAULT_WALLET
  };
}

export function hideModalChangeDefaultWallet() {
    return {
      type: actionTypes.HIDE_MODAL_CHANGE_DEFAULT_WALLET
    };
}

export function showModalConfirmToSendBlc() {
  return {
    type: actionTypes.SHOW_MODAL_CONFIRM_TO_SEND_BLC
  };
}

export function hideModalConfirmToSendBlc() {
    return {
      type: actionTypes.HIDE_MODAL_CONFIRM_TO_SEND_BLC
    };
}

export function showModalConfirmToSendEth() {
  return {
    type: actionTypes.SHOW_MODAL_CONFIRM_TO_SEND_ETH
  };
}

export function hideModalConfirmToSendEth() {
    return {
      type: actionTypes.HIDE_MODAL_CONFIRM_TO_SEND_ETH
    };
}

export function showModalQrCodeScaner() {
  return {
    type: actionTypes.SHOW_MODAL_QR_CODE_SCANER
  };
}

export function hideModalQrCodeScaner() {
    return {
      type: actionTypes.HIDE_MODAL_QR_CODE_SCANER
    };
}

export function showModalInfomation() {
    return {
      type: actionTypes.SHOW_MODAL_INFOMATION
    };
}

export function hideModalInfomation() {
    return {
      type: actionTypes.HIDE_MODAL_INFOMATION
    };
}

export function setModalInfomation(infomation) {
  return {
    type: actionTypes.SET_MODAL_INFOMATION,
    payload: infomation
  };
}

export function setTokenNameForQrCode(name) {
  return {
      type: actionTypes.SET_TOKEN_NAME_FOR_QR_CODE,
      payload: name
  };
}

export function showModalSpinner(message) {
  return {
      type: actionTypes.SHOW_MODAL_SPINNER,
      payload: message
  };
}

export function hideModalSpinner() {
  return {
      type: actionTypes.HIDE_MODAL_SPINNER,
  };
}

export function showModalTransactionHistory() {
  return {
      type: actionTypes.SHOW_MODAL_TRANSACTION_HISTORY,
  };
}

export function hideModalTransactionHistory() {
  return {
      type: actionTypes.HIDE_MODAL_TRANSACTION_HISTORY,
  };
}

export function setModalTransactionHistoryInfomation(infomation) {
  return {
      type: actionTypes.SET_MODAL_TRANSACTION_HISTORY_INFOMATION,
      payload: infomation
  };
}

export function showModalFingerPrintScaner() {
  return {
      type: actionTypes.SHOW_MODAL_FINGER_PRINT_SCANER,
  };
}

export function hideModalFingerPrintScaner() {
  return {
      type: actionTypes.HIDE_MODAL_FINGER_PRINT_SCANER,
  };
}

export function setModalAskFinishProcess(finishProcess) {
  return {
      type: actionTypes.SET_MODAL_ASK_FINISH_PROCESS,
      payload: finishProcess
  };
}

export function setModalAskHeader(header) {
  return {
      type: actionTypes.SET_MODAL_ASK_HEADER,
      payload: header
  };
}

export function setModalAskBody(body) {
  return {
      type: actionTypes.SET_MODAL_ASK_BODY,
      payload: body
  };
}

export function showModalAsk() {
  return {
      type: actionTypes.SHOW_MODAL_ASK,
  };
}

export function hideModalAsk() {
  return {
      type: actionTypes.HIDE_MODAL_ASK,
  };
}

export function setModalFingerPrintScanerFinishProcess(finishProcess) {
  return {
      type: actionTypes.SET_MODAL_FINGER_PRINT_SCANER_FINISH_PROCESS,
      payload: finishProcess
  };
}

export function setSkipFingerPrintScan(skip) {
  return {
      type: actionTypes.SET_SKIP_FINGER_PRINT_SCAN,
      payload: skip
  };
}

export function setModalAddWalletFinishProcess(finishProcess) {
  return {
      type: actionTypes.SET_MODAL_ADD_WALLET_FINISH_PROCESS,
      payload: finishProcess
  };
}

export function showModalPincode() {
  return {
      type: actionTypes.SHOW_MODAL_PINCODE,
  };
}

export function hideModalPincode() {
  return {
      type: actionTypes.HIDE_MODAL_PINCODE,
  };
}

export function setModalPincodeFinishProcess(finishProcess) {
  return {
      type: actionTypes.SET_MODAL_PINCODE_FINISH_PROCESS,
      payload: finishProcess
  };
}

export function showModalWalletInfomation() {
  return {
      type: actionTypes.SHOW_MODAL_WALLET_INFOMATION,
  };
}

export function hideModalWalletInfomation() {
  return {
      type: actionTypes.HIDE_MODAL_WALLET_INFOMATION,
  };
}





