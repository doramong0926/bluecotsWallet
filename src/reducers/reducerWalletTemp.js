import actionTypes from './../actions/actionTypes';
import { defaultWallet } from './../config/constants';

const initialState = {
    isLoadingTxData: true,
    walletForChange: defaultWallet,
};  

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_IS_LOADING_TX_DATA:
            return Object.assign({}, state, {
                isLoadingTxData: action.payload,
        });

        case actionTypes.SET_WALLET_FOR_CHNAGE:
            return Object.assign({}, state, {
                walletForChange: action.payload,
        });

        default:
            return state;
    }
};