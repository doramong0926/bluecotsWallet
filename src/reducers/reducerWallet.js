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
    walletForSend: defaultWallet,
    walletForReceive: defaultWallet,
    ethBalance: 0,
    blcBalance: 0,
    ethBalanceForSend: 0,
    blcBalanceForSend: 0,
    addressToSendBlc: '',
    amountToSendBlc: '',
    addressToSendEth: '',
    amountToSendEth: '',
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

        case actionTypes.SET_WALLET_FOR_SEND:
            return Object.assign({}, state, {
                walletForSend: action.payload,
            });

        case actionTypes.SET_WALLET_FOR_RECEIVE:
            return Object.assign({}, state, {
                walletForReceive: action.payload,
            });
        
        case actionTypes.SET_ETH_BALANCE:
            return Object.assign({}, state, {
                ethBalance: action.payload,
            });

        case actionTypes.SET_BLC_BALANCE:
            return Object.assign({}, state, {
                blcBalance: action.payload,
            });

        case actionTypes.SET_ETH_BALANCE_FOR_SEND:
            return Object.assign({}, state, {
                ethBalanceForSend: action.payload,
            });

        case actionTypes.SET_BLC_BALANCE_FOR_SEND:
            return Object.assign({}, state, {
                blcBalanceForSend: action.payload,
            });

        case actionTypes.SET_ADDRESS_TO_SEND_BLC:
            return Object.assign({}, state, {
                addressToSendBlc: action.payload,
            });

        case actionTypes.SET_AMOUNT_TO_SEND_BLC:
            return Object.assign({}, state, {
                amountToSendBlc: action.payload,
            });

        case actionTypes.SET_ADDRESS_TO_SEND_ETH:
            return Object.assign({}, state, {
                addressToSendEth: action.payload,
            });

        case actionTypes.SET_AMOUNT_TO_SEND_ETH:
            return Object.assign({}, state, {
                amountToSendEth: action.payload,
            });

        default:
            return state;
    }
};