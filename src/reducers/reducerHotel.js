import actionTypes from '../actions/actionTypes';

import HOTEL1_MAIN from './../cards/images/hotel1_main.jpg';
import HOTEL1_SUB1 from './../cards/images/hotel1_sub1.jpg';
import HOTEL1_SUB2 from './../cards/images/hotel1_sub2.jpg';
import { defaultHotelInfo, defaultCalendarInfo } from './../config/hotelList';

const initialState = {
    hotelInfoList: [],
    selectHotelInfo: defaultHotelInfo,
    calendarInfo: defaultCalendarInfo,
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

        case actionTypes.SET_SELECT_HOTEL_INFO:
            return Object.assign({}, state, {
                selectHotelInfo: action.payload,
        });

        case actionTypes.SET_CALENDAR_INFO:
            return Object.assign({}, state, {
                calendarInfo: action.payload,
        });

        

        default:
            return state;
    }
};