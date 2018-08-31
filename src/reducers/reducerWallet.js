import actionTypes from './../actions/actionTypes';
import { defaultWallet } from './../config/constants';

const initialState = {
    walletList: [
        {
            name: '',
            nickName : '',
            id: '',
            symbol: '',
            walletAddress: '',
            privateKey: '',
        },
    ],
    defaultWallet: defaultWallet,
    ethBalance: 0,
    blcBalance: 0,
};  

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_WALLET:
            return Object.assign({}, state, {
                walletList: state.walletList.concat(action.payload),
            });
            
        case actionTypes.REMOVE_WALLET:
            // need to implement
            return Object.assign({}, state, {
                walletList: state.walletList.concat(action.payload),
            });

        case actionTypes.SET_DEFAULT_WALLET:
            return Object.assign({}, state, {
                defaultWallet: action.payload,
            });

        case actionTypes.REMOVE_DEFAULT_WALLET:
            return Object.assign({}, state, {
                defaultWallet: '',
            });
        
        case actionTypes.SET_ETH_BALANCE:
            return Object.assign({}, state, {
                ethBalance: action.payload,
            });

        case actionTypes.SET_BLC_BALANCE:
            return Object.assign({}, state, {
                blcBalance: action.payload,
            });

        default:
            return state;
    }
};