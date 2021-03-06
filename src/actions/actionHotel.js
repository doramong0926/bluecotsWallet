import actionTypes from './actionTypes';

export function addHotelInfoList(hotelInfo) {
    return {
        type: actionTypes.ADD_HOTEL_INFO_LIST,
        payload: hotelInfo
    };
}

export function removeHotelInfoList(hotelInfo) {
    return {
        type: actionTypes.REMOVE_HOTEL_INFO_LIST,
        payload: hotelInfo
    };
}

export function setCalendarMarkedDates(markedDates) {
    return {
        type: actionTypes.SET_CALENDAR_MARKED_DATES,
        payload: markedDates
    };
}