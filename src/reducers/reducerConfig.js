import actionTypes from './../actions/actionTypes';
import { 
	ETHERSCAN_API_KEY,
	INFURA_API_KEY ,
	SEGMENT_API_KEY,
	NETWORK,
	DEFAULT_TOKEN_NAME,
	DEFAULT_TOKEN_SYMBOL,
	DEFAULT_TOKEN_CONTRACT_ADDRESS,
	DEFAULT_TOKEN_DECIMALS,
	WALLET_VERSION
 } from './../config/constants';

const initialState = {  
    network: NETWORK,
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
