import actionTypes from './actionTypes';

export function setNetwork(networkType) {
    return {
        type: actionTypes.SET_NETWORK,
        payload: networkType,
    };
}