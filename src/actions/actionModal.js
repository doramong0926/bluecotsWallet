import actionTypes from './actionTypes';

export function showModalCreateWallet() {
  return {
    type: actionTypes.SHOW_MODAL_CREATE_WALLET
  };
}

export function hideModalCreateWallet() {
    return {
      type: actionTypes.HIDE_MODAL_CREATE_WALLET
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

export function showModalSuccess() {
  return {
    type: actionTypes.SHOW_MODAL_SUCCESS
  };
}

export function hideModalSuccess() {
    return {
      type: actionTypes.HIDE_MODAL_SUCCESS
    };
}

export function showModalFail() {
  return {
    type: actionTypes.SHOW_MODAL_FAIL
  };
}

export function hideModalFail() {
    return {
      type: actionTypes.HIDE_MODAL_FAIL
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

export function showModalCopyAddressToClipboard() {
  return {
    type: actionTypes.SHOW_MODAL_COPY_ADDRESS_TO_CLIPBOARD
  };
}

export function hideModalCopyAddressToClipboard() {
    return {
      type: actionTypes.HIDE_MODAL_COPY_ADDRESS_TO_CLIPBOARD
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