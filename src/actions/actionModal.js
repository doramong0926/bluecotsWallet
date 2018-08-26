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

export function showModalSelectAnotherWallet() {
  return {
    type: actionTypes.SHOW_MODAL_SELECT_ANOTHER_WALLET
  };
}

export function hideModalSelectAnotherWallet() {
    return {
      type: actionTypes.HIDE_MODAL_SELECT_ANOTHER_WALLET
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

export function showModalConfirmToSend() {
  return {
    type: actionTypes.SHOW_MODAL_CONFIRM_TO_SEND
  };
}

export function hideModalConfirmToSend() {
    return {
      type: actionTypes.HIDE_MODAL_CONFIRM_TO_SEND
    };
}