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
};  

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_WALLET:
            return Object.assign({}, state, {
                walletList: state.walletList.concat(action.payload),
            });

        case actionTypes.REMOVE_WALLET:
            return Object.assign({}, state, {
                walletList: state.walletList.filter(t=>{return (t.walletAddress !== action.payload.walletAddress)}),
            });

        case actionTypes.SET_DEFAULT_WALLET:
            return Object.assign({}, state, {
                defaultWallet: action.payload,
            });

        case actionTypes.CHANGE_NICKNAME:
            return Object.assign({}, state, {
                walletList: state.walletList.filter(t=>{return (t.walletAddress !== action.payload.walletAddress)}).concat(action.payload),
            });            

        default:
            return state;
    }
};