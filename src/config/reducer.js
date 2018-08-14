// import uuid from 'react-native-uuid';
const uuid = require('uuid')
import {
  LOGOUT,
  SET_CALL_TO_ACTION_DISMISSED,
  SET_NETWORK,
  SET_PIN_CODE,
  ADD_WALLET,
  REMOVE_WALLET,
  SET_DEFAULT_WALLET,
} from './actionTypes';
import { defaultTokens } from '../utils/constants';
// import AnalyticsUtils from '../utils/analytics';

const defaultState = {  
  callToActionDismissed: false,
  network: process.env.NETWORK,
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
  defaultWallet: '',
};

const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CALL_TO_ACTION_DISMISSED:
      return {
        ...state,
        callToActionDismissed: true,
      };
    case SET_NETWORK:
      // AnalyticsUtils.trackEvent('Set network', {
      //   network: action.network,
      // });
      return {
        ...state,
        network: action.network,
      };
    case SET_PIN_CODE:
      return {
        ...state,
        pinCode: action.pinCode,
      };
    case ADD_WALLET:
      return {
        ...state,
        walletList: state.walletList.concat([
          Object.assign(
            action.wallet,
          ),
        ]),
      };
    case REMOVE_WALLET:
      return {
        ...state,
        walletList: state.walletList.filter(
          wallet => wallet.id !== action.wallet.id,
        ),
      };
    case SET_DEFAULT_WALLET:
      return {
        ...state,
        defaultWallet: action.wallet,
      };  
    default:
      return state;
  }
};

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    // eslint-disable-next-line no-param-reassign
    state = undefined;
  }

  return appReducer(state, action);
};

export { defaultState, rootReducer };
