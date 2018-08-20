import actionTypes from './../actions/actionTypes';

const initialState = {  
    network: process.env.NETWORK,
};  

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_NETWORK:
            return Object.assign({}, state, {
                network: action.payload,
            });

        default:
            return state;
    }
};