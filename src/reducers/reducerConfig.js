import actionTypes from './../actions/actionTypes';
import { 
	NETWORK,
 } from './../config/constants';

const initialState = {  
    network: NETWORK,
    pincode: '',
    useFingerPrint: undefined,
};  

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_NETWORK:
            return Object.assign({}, state, {
                network: action.payload,
            });

        case actionTypes.SET_PINCODE:
            return Object.assign({}, state, {
                pincode: action.payload,
            });

        case actionTypes.SET_USE_FINGER_PRINT:
            return Object.assign({}, state, {
                useFingerPrint: action.payload,
            });



        default:
            return state;
    }
};
