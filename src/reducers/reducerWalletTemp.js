import actionTypes from './../actions/actionTypes';
import { defaultWallet, defaultPaymentInfomation } from './../config/constants';

const initialState = {
    isLoadingTxData: true,
    tempWallet: defaultWallet,
    paymentInfomation: defaultPaymentInfomation,
};  

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_IS_LOADING_TX_DATA:
            return Object.assign({}, state, {
                isLoadingTxData: action.payload,
        });

        case actionTypes.SET_TEMP_WALLET:
            return Object.assign({}, state, {
                tempWallet: action.payload,
        });

        case actionTypes.SET_PAYMENT_INFOMATION:
            return Object.assign({}, state, {
                paymentInfomation: action.payload,
        });

        default:
            return state;
    }
};