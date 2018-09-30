

import actionTypes from './../actions/actionTypes';

const initialState = {  
    visibleModalPayment: false,
    visibleModalWalletListForBackup: false,
    visibleModalBackupWallet: false,
    visibleModalChangeNickName: false,
    visibleModalWalletListForChangeNickName: false,
    visibleModalRemoveWallet: false,
    visibleModalSend: false,
    visibleModalFingerPrintScaner: false,
    visibleModalPincode: false,
    visibleModalAddWallet: false,
    visibleModalDefaultWalletSettings: false,
    visibleModalRestoreWallet: false,
    visibleModalGenerateWallet: false,
    visibleModalChangeDefaultWallet: false,
    visibleModalQrCodeScaner: false,
    visibleModalSpinner: false,
    visibleModalInfomation: false,
    visibleModalConfirm: false,
    visibleModalReceive: false,
    modalInfomationText: {title: '', message1: '', message2: '', message3: '', transactionId: ''},    
    visibleModalTransactionHistory: false,
    modalTransactionHistoryInfomation: {
        blockNumber: '',
        timeStamp: '',
        hash : '',
        from: '',
        value: '',
        to: '',
        gasUsed: '',
        symbol: '',
        status: '',
    },
    tokenNameForQrCode: '',
    spinnerText: '',  
    modalConfirmHeader: {
        text: null,
    },
    modalConfirmBody: [
        {
            text: null,
        }
    ],
    modalFingerPrintScanerFinishProcess: undefined,
    skipFingerPrintScan: false,
    modalAddWalletFinishProcess: undefined,
    modalPincodeFinishProcess: undefined,
    modalSendTokenName: undefined,
    addressToSend: null,
    amountToSend: null,

};  
 
export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_MODAL_ADD_WALLET:
            return Object.assign({}, state, {
                visibleModalAddWallet: true
            });

        case actionTypes.HIDE_MODAL_ADD_WALLET:
            return Object.assign({}, state, {
                visibleModalAddWallet: false
            });

        case actionTypes.SHOW_MODAL_DEFAULT_WALLET_SETTINGS:
            return Object.assign({}, state, {
                visibleModalDefaultWalletSettings: true
            });

        case actionTypes.HIDE_MODAL_DEFAULT_WALLET_SETTINGS:
            return Object.assign({}, state, {
                visibleModalDefaultWalletSettings: false
            });

        case actionTypes.SHOW_MODAL_RESTORE_WALLET:
            return Object.assign({}, state, {
                visibleModalRestoreWallet: true
            });

        case actionTypes.HIDE_MODAL_RESTORE_WALLET:
            return Object.assign({}, state, {
                visibleModalRestoreWallet: false
            });

        case actionTypes.SHOW_MODAL_GENERATE_WALLET:
            return Object.assign({}, state, {
                visibleModalGenerateWallet: true
            });

        case actionTypes.HIDE_MODAL_GENERATE_WALLET:
            return Object.assign({}, state, {
                visibleModalGenerateWallet: false
            });

        case actionTypes.SHOW_MODAL_CHANGE_DEFAULT_WALLET:
            return Object.assign({}, state, {
                visibleModalChangeDefaultWallet: true
            });

        case actionTypes.HIDE_MODAL_CHANGE_DEFAULT_WALLET:
            return Object.assign({}, state, {
                visibleModalChangeDefaultWallet: false
            });      

        case actionTypes.SHOW_MODAL_QR_CODE_SCANER:
            return Object.assign({}, state, {
                visibleModalQrCodeScaner: true
            });

        case actionTypes.HIDE_MODAL_QR_CODE_SCANER:
            return Object.assign({}, state, {
                visibleModalQrCodeScaner: false
            });

        case actionTypes.SHOW_MODAL_INFOMATION:
            return Object.assign({}, state, {
                visibleModalInfomation: true
            });

        case actionTypes.HIDE_MODAL_INFOMATION:
            return Object.assign({}, state, {
                visibleModalInfomation: false
            });

        case actionTypes.SET_MODAL_INFOMATION:
            return Object.assign({}, state, {
                modalInfomationText: action.payload,
            });

        case actionTypes.SET_TOKEN_NAME_FOR_QR_CODE:
            return Object.assign({}, state, {
                tokenNameForQrCode: action.payload,
            });

        case actionTypes.SHOW_MODAL_SPINNER:
            return Object.assign({}, state, {
                visibleModalSpinner: true,
                spinnerText: action.payload,
            });

        case actionTypes.HIDE_MODAL_SPINNER:
            return Object.assign({}, state, {
                visibleModalSpinner: false,
                spinnerText: '',
            });

        case actionTypes.SHOW_MODAL_TRANSACTION_HISTORY:
            return Object.assign({}, state, {
                visibleModalTransactionHistory: true
            });

        case actionTypes.HIDE_MODAL_TRANSACTION_HISTORY:
            return Object.assign({}, state, {
                visibleModalTransactionHistory: false
            });

        case actionTypes.SET_MODAL_TRANSACTION_HISTORY_INFOMATION:
            return Object.assign({}, state, {
                modalTransactionHistoryInfomation: action.payload,
            });

        case actionTypes.SHOW_MODAL_FINGER_PRINT_SCANER:
            return Object.assign({}, state, {
                visibleModalFingerPrintScaner: true
            });

        case actionTypes.HIDE_MODAL_FINGER_PRINT_SCANER:
            return Object.assign({}, state, {
                visibleModalFingerPrintScaner: false
            });   
            
        case actionTypes.SET_MODAL_CONFIRM_FINISH_PROCESS:
            return Object.assign({}, state, {
                modalConfirmFinishProcess: action.payload,
            });     

        case actionTypes.SET_MODAL_CONFIRM_HEADER:
            return Object.assign({}, state, {
                modalConfirmHeader: action.payload,
            });     

        case actionTypes.SET_MODAL_CONFIRM_BODY:
            return Object.assign({}, state, {
                modalConfirmBody: action.payload,
            });    
             
        case actionTypes.SHOW_MODAL_CONFIRM:
            return Object.assign({}, state, {
                visibleModalConfirm: true
            });

        case actionTypes.HIDE_MODAL_CONFIRM:
            return Object.assign({}, state, {
                visibleModalConfirm: false
            });

        case actionTypes.SET_MODAL_FINGER_PRINT_SCANER_FINISH_PROCESS:
            return Object.assign({}, state, {
                modalFingerPrintScanerFinishProcess: action.payload,
            }); 

        case actionTypes.SET_SKIP_FINGER_PRINT_SCAN:
            return Object.assign({}, state, {
                skipFingerPrintScan: action.payload,
            }); 

        case actionTypes.SET_MODAL_ADD_WALLET_FINISH_PROCESS:
            return Object.assign({}, state, {
                modalAddWalletFinishProcess: action.payload,
            });   
        
        case actionTypes.SHOW_MODAL_PINCODE:
            return Object.assign({}, state, {
                visibleModalPincode: true,
            });       

        case actionTypes.HIDE_MODAL_PINCODE:
            return Object.assign({}, state, {
                visibleModalPincode: false,
            });

        case actionTypes.SET_MODAL_PINCODE_FINISH_PROCESS:
            return Object.assign({}, state, {
                modalPincodeFinishProcess: action.payload,
            }); 

        case actionTypes.SHOW_MODAL_RECEIVE:
            return Object.assign({}, state, {
                visibleModalReceive: true,
            });       

        case actionTypes.HIDE_MODAL_RECEIVE:
            return Object.assign({}, state, {
                visibleModalReceive: false,
            });   

        case actionTypes.SHOW_MODAL_SEND:
            return Object.assign({}, state, {
                visibleModalSend: true,
            });       

        case actionTypes.HIDE_MODAL_SEND:
            return Object.assign({}, state, {
                visibleModalSend: false,
            });   

        case actionTypes.SET_MODAL_SEND_TOKEN_NAME:
            return Object.assign({}, state, {
                modalSendTokenName: action.payload,
            });
            
        case actionTypes.SET_MODAL_ADDRESS_TO_SEND:
            return Object.assign({}, state, {
                addressToSend: action.payload,
            });   

        case actionTypes.SET_MODAL_AMOUNT_TO_SEND:
            return Object.assign({}, state, {
                amountToSend: action.payload,
            });   

        case actionTypes.SHOW_MODAL_REMOVE_WALLET:
            return Object.assign({}, state, {
                visibleModalRemoveWallet: true,
            });       

        case actionTypes.HIDE_MODAL_REMOVE_WALLET:
            return Object.assign({}, state, {
                visibleModalRemoveWallet: false,
            });   

        case actionTypes.SHOW_MODAL_WALLET_LIST_FOR_CHANGE_NICKNAME:
            return Object.assign({}, state, {
                visibleModalWalletListForChangeNickName: true,
            });       

        case actionTypes.HIDE_MODAL_WALLET_LIST_FOR_CHANGE_NICKNAME:
            return Object.assign({}, state, {
                visibleModalWalletListForChangeNickName: false,
            });   

        case actionTypes.SHOW_MODAL_CHANGE_NICKNAME:
            return Object.assign({}, state, {
                visibleModalChangeNickName: true,
            });       

        case actionTypes.HIDE_MODAL_CHANGE_NICKNAME:
            return Object.assign({}, state, {
                visibleModalChangeNickName: false,
            }); 
            
        case actionTypes.SHOW_MODAL_BACKUP_WALLET:
            return Object.assign({}, state, {
                visibleModalBackupWallet: true,
            });       

        case actionTypes.HIDE_MODAL_BACKUP_WALLET:
            return Object.assign({}, state, {
                visibleModalBackupWallet: false,
            }); 
            
        case actionTypes.SHOW_MODAL_WALLET_LIST_FOR_BACKUP:
            return Object.assign({}, state, {
                visibleModalWalletListForBackup: true,
            });       

        case actionTypes.HIDE_MODAL_WALLET_LIST_FOR_BACKUP:
            return Object.assign({}, state, {
                visibleModalWalletListForBackup: false,
            });  

        case actionTypes.SHOW_MODAL_PAYMENT:
            return Object.assign({}, state, {
                visibleModalPayment: true,
            });       

        case actionTypes.HIDE_MODAL_PAYMENT:
            return Object.assign({}, state, {
                visibleModalPayment: false,
            });  

                        
        default:
            return state;
    }
};

