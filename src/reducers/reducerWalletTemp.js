import actionTypes from './../actions/actionTypes';
import { defaultWallet } from './../config/constants';

const initialState = {
    isLoadingTxData: true,
    tempWallet: defaultWallet,
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

        default:
            return state;
    }
};