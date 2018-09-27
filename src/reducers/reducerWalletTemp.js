import actionTypes from './../actions/actionTypes';

const initialState = {
    isLoadingTxData: true,
};  

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_IS_LOADING_TX_DATA:
            return Object.assign({}, state, {
                isLoadingTxData: action.payload,
        });

        default:
            return state;
    }
};