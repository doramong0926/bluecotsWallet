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

export function setModalConfirmFinishProcess(finishProcess) {
  return {
      type: actionTypes.SET_MODAL_CONFIRM_FINISH_PROCESS,
      payload: finishProcess
  };
}

export function setModalConfirmHeader(header) {
  return {
      type: actionTypes.SET_MODAL_CONFIRM_HEADER,
      payload: header
  };
}

export function setModalConfirmBody(body) {
  return {
      type: actionTypes.SET_MODAL_CONFIRM_BODY,
      payload: body
  };
}

export function showModalConfirm() {
  return {
      type: actionTypes.SHOW_MODAL_CONFIRM,
  };
}

export function hideModalConfirm() {
  return {
      type: actionTypes.HIDE_MODAL_CONFIRM,
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

export function showModalReceive() {
  return {
      type: actionTypes.SHOW_MODAL_RECEIVE,
  };
}

export function hideModalReceive() {
  return {
      type: actionTypes.HIDE_MODAL_RECEIVE,
  };
}

export function showModalSend() {
  return {
      type: actionTypes.SHOW_MODAL_SEND,
  };
}

export function setModalSendTokenName(tokenName) {
  return {
      type: actionTypes.SET_MODAL_SEND_TOKEN_NAME,
      payload: tokenName
  };
}

export function hideModalSend() {
  return {
      type: actionTypes.HIDE_MODAL_SEND,
  };
}

export function setModalAddressToSend(address) {
  return {
      type: actionTypes.SET_MODAL_ADDRESS_TO_SEND,
      payload: address
  };
}

export function setModalAmountToSend(amount) {
  return {
      type: actionTypes.SET_MODAL_AMOUNT_TO_SEND,
      payload: amount
  };
}
export function showModalRemoveWallet() {
  return {
      type: actionTypes.SHOW_MODAL_REMOVE_WALLET,
  };
}

export function hideModalRemoveWallet() {
  return {
      type: actionTypes.HIDE_MODAL_REMOVE_WALLET,
  };
}

export function showModalWalletListForChangeNickName() {
  return {
      type: actionTypes.SHOW_MODAL_WALLET_LIST_FOR_CHANGE_NICKNAME,
  };
}

export function hideModalWalletListForChangeNickName() {
  return {
      type: actionTypes.HIDE_MODAL_WALLET_LIST_FOR_CHANGE_NICKNAME,
  };
}

export function showModalChangeNickName() {
  return {
      type: actionTypes.SHOW_MODAL_CHANGE_NICKNAME,
  };
}

export function hideModalChangeNickName() {
  return {
      type: actionTypes.HIDE_MODAL_CHANGE_NICKNAME,
  };
}

export function showModalBackupWallet() {
  return {
      type: actionTypes.SHOW_MODAL_BACKUP_WALLET,
  };
}

export function hideModalBackupWallet() {
  return {
      type: actionTypes.HIDE_MODAL_BACKUP_WALLET,
  };
}

export function showModalWalletListForBackup() {
  return {
      type: actionTypes.SHOW_MODAL_WALLET_LIST_FOR_BACKUP,
  };
}

export function hideModalWalletListForBackup() {
  return {
      type: actionTypes.HIDE_MODAL_WALLET_LIST_FOR_BACKUP,
  };
}

export function showModalPayment() {
  return {
      type: actionTypes.SHOW_MODAL_PAYMENT,
  };
}

export function hideModalPayment() {
  return {
      type: actionTypes.HIDE_MODAL_PAYMENT,
  };
}













