import actionTypes from '../actions/actionTypes';

import HOTEL1_MAIN from './../cards/images/hotel1_main.jpg';
import HOTEL1_SUB1 from './../cards/images/hotel1_sub1.jpg';
import HOTEL1_SUB2 from './../cards/images/hotel1_sub2.jpg';

const initialState = {
    hotelInfoList: [],
};  

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_HOTEL_INFO_LIST:
            return Object.assign({}, state, {
                hotelInfoList: state.hotelInfoList.concat(action.payload),
        });

        case actionTypes.REMOVE_HOTEL_INFO_LIST:
            return Object.assign({}, state, {
                hotelInfoList: state.hotelInfoList.filter(t=>{return (t.name !== action.payload.name)}),
        });

        default:
            return state;
    }
};