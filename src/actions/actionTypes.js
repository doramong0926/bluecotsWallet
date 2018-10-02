
const actionTypes = {
    SET_NETWORK: 'SET_NETWORK',
    SET_PINCODE: 'SET_PINCODE',
    SET_USE_FINGER_PRINT: 'SET_USE_FINGER_PRINT',
    ADD_WALLET: 'ADD_WALLET',
    REMOVE_WALLET: 'REMOVE_WALLET',
    SET_DEFAULT_WALLET: 'SET_DEFAULT_WALLET',
    SET_ETH_BALANCE: "SET_ETH_BALANCE",
    SET_BLC_BALANCE: "SET_BLC_BALANCE",
    SET_IS_LOADING_TX_DATA: "SET_IS_LOADING_TX_DATA",
    SET_TEMP_WALLET: "SET_TEMP_WALLET",
    CHANGE_NICKNAME: "CHANGE_NICKNAME",
    SET_PAYMENT_INFOMATION: "SET_PAYMENT_INFOMATION",

    ADD_HOTEL_INFO_LIST: "ADD_HOTEL_INFO_LIST",
    REMOVE_HOTEL_INFO_LIST: "REMOVE_HOTEL_INFO_LIST",
    
    SHOW_MODAL_ADD_WALLET: "SHOW_MODAL_ADD_WALLET",
    HIDE_MODAL_ADD_WALLET: "HIDE_MODAL_ADD_WALLET",  
    SHOW_MODAL_DEFAULT_WALLET_SETTINGS: "SHOW_MODAL_DEFAULT_WALLET_SETTINGS",
    HIDE_MODAL_DEFAULT_WALLET_SETTINGS: "HIDE_MODAL_DEFAULT_WALLET_SETTINGS",  
    SHOW_MODAL_RESTORE_WALLET: "SHOW_MODAL_RESTORE_WALLET",
    HIDE_MODAL_RESTORE_WALLET: "HIDE_MODAL_RESTORE_WALLET",
    SHOW_MODAL_GENERATE_WALLET: "SHOW_MODAL_GENERATE_WALLET",
    HIDE_MODAL_GENERATE_WALLET: "HIDE_MODAL_GENERATE_WALLET",
    SHOW_MODAL_CHANGE_DEFAULT_WALLET: "SHOW_MODAL_CHANGE_DEFAULT_WALLET",
    HIDE_MODAL_CHANGE_DEFAULT_WALLET: "HIDE_MODAL_CHANGE_DEFAULT_WALLET",
    SHOW_MODAL_QR_CODE_SCANER: "SHOW_MODAL_QR_CODE_SCANER",
    HIDE_MODAL_QR_CODE_SCANER: "HIDE_MODAL_QR_CODE_SCANER",
    SHOW_MODAL_INFOMATION: "SHOW_MODAL_INFOMATION",
    HIDE_MODAL_INFOMATION: "HIDE_MODAL_INFOMATION",
    SET_MODAL_INFOMATION: "SET_MODAL_INFOMATION",   
    SET_TOKEN_NAME_FOR_QR_CODE: "SET_TOKEN_NAME_FOR_QR_CODE",
    SHOW_MODAL_SPINNER: "SHOW_MODAL_SPINNER",
    HIDE_MODAL_SPINNER: "HIDE_MODAL_SPINNER",
    SHOW_MODAL_TRANSACTION_HISTORY: "SHOW_MODAL_TRANSACTION_HISTORY",
    HIDE_MODAL_TRANSACTION_HISTORY: "HIDE_MODAL_TRANSACTION_HISTORY",
    SET_MODAL_TRANSACTION_HISTORY_INFOMATION: "SET_MODAL_TRANSACTION_HISTORY_INFOMATION",
    SHOW_MODAL_FINGER_PRINT_SCANER: "SHOW_MODAL_FINGER_PRINT_SCANER",
    HIDE_MODAL_FINGER_PRINT_SCANER: "HIDE_MODAL_FINGER_PRINT_SCANER",
    SET_MODAL_CONFIRM_FINISH_PROCESS: "SET_MODAL_CONFIRM_FINISH_PROCESS",
    SET_MODAL_CONFIRM_HEADER: "SET_MODAL_CONFIRM_HEADER",
    SET_MODAL_CONFIRM_BODY: "SET_MODAL_CONFIRM_BODY",
    SHOW_MODAL_CONFIRM: "SHOW_MODAL_CONFIRM",
    HIDE_MODAL_CONFIRM: "HIDE_MODAL_CONFIRM",
    SET_MODAL_FINGER_PRINT_SCANER_FINISH_PROCESS: "SET_MODAL_FINGER_PRINT_SCANER_FINISH_PROCESS",
    SET_SKIP_FINGER_PRINT_SCAN: "SET_SKIP_FINGER_PRINT_SCAN",
    SET_MODAL_ADD_WALLET_FINISH_PROCESS: "SET_MODAL_ADD_WALLET_FINISH_PROCESS",
    SHOW_MODAL_PINCODE: "SHOW_MODAL_PINCODE",
    HIDE_MODAL_PINCODE: "HIDE_MODAL_PINCODE",
    SET_MODAL_PINCODE_FINISH_PROCESS: "SET_MODAL_PINCODE_FINISH_PROCESS",
    SHOW_MODAL_RECEIVE: "SHOW_MODAL_RECEIVE",
    HIDE_MODAL_RECEIVE: "HIDE_MODAL_RECEIVE",
    SHOW_MODAL_SEND: "SHOW_MODAL_SEND",
    SET_MODAL_SEND_TOKEN_NAME: "SET_MODAL_SEND_TOKEN_NAME",
    HIDE_MODAL_SEND: "HIDE_MODAL_SEND",
    SET_MODAL_ADDRESS_TO_SEND: "SET_MODAL_ADDRESS_TO_SEND",
    SET_MODAL_AMOUNT_TO_SEND: "SET_MODAL_AMOUNT_TO_SEND",
    SHOW_MODAL_REMOVE_WALLET: "SHOW_MODAL_REMOVE_WALLET",
    HIDE_MODAL_REMOVE_WALLET: "HIDE_MODAL_REMOVE_WALLET",
    SHOW_MODAL_WALLET_LIST_FOR_CHANGE_NICKNAME: "SHOW_MODAL_WALLET_LIST_FOR_CHANGE_NICKNAME",
    HIDE_MODAL_WALLET_LIST_FOR_CHANGE_NICKNAME: "HIDE_MODAL_WALLET_LIST_FOR_CHANGE_NICKNAME",
    SHOW_MODAL_CHANGE_NICKNAME: "SHOW_MODAL_CHANGE_NICKNAME",
    HIDE_MODAL_CHANGE_NICKNAME: "HIDE_MODAL_CHANGE_NICKNAME",
    SHOW_MODAL_WALLET_LIST_FOR_BACKUP: "SHOW_MODAL_WALLET_LIST_FOR_BACKUP",
    HIDE_MODAL_WALLET_LIST_FOR_BACKUP: "HIDE_MODAL_WALLET_LIST_FOR_BACKUP",
    SHOW_MODAL_BACKUP_WALLET: "SHOW_MODAL_BACKUP_WALLET",
    HIDE_MODAL_BACKUP_WALLET: "HIDE_MODAL_BACKUP_WALLET",
    SHOW_MODAL_PAYMENT: "SHOW_MODAL_PAYMENT",
    HIDE_MODAL_PAYMENT: "HIDE_MODAL_PAYMENT",
};
    
export default actionTypes;