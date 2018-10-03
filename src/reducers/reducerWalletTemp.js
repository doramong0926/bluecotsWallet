import actionTypes from './../actions/actionTypes';
import { defaultWallet, } from './../config/constants';

const initialState = {
    isLoadingTxData: true,
    tempWallet: defaultWallet,
    paymentInfomation: {
        hotelName: '',
        orderNumber: 0,
        selectedRoomType: '',
        numOfPeople: {
            adult: 0,
            kid: 0,
            baby: 0,
        },
        tokenSymbol: 'BLC',
        addressToSend: '',
        amountToSend: 0,
        date: {
            checkIn: '',
            checkOut: '',
        },
        tokenPrice: 0.01,
        totalPrice: 0,
        totalAmount: 0,
    },
    ethBalance: 0,
    blcBalance: 0,
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