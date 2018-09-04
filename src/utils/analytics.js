import { AsyncStorage } from 'react-native';
// import Config from 'react-native-config';
import Analytics from 'analytics-react-native';
import { store } from '../config/store';
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

const analytics = new Analytics(SEGMENT_API_KEY);

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

export default class AnalyticsUtils {
  static async getAnalyticsUserId() {
    const userId = store.getState().walletAddress;

    if (userId) {
      return {
        userId,
      };
    }

    let anonymousId = await AsyncStorage.getItem('@BLCWALLET:anonymousId');

    if (anonymousId) {
      return {
        anonymousId,
      };
    }

    anonymousId = guid();

    await AsyncStorage.setItem('@BLCWALLET:anonymousId', anonymousId);

    return {
      anonymousId,
    };
  }

  static async trackEvent(event, properties) {
    const userId = await this.getAnalyticsUserId();

    analytics.track(
      Object.assign(
        {
          event,
          properties,
        },
        userId,
      ),
    );
  }

  static async trackScreen(name) {
    const userId = await this.getAnalyticsUserId();

    analytics.screen(
      Object.assign(
        {
          name,
        },
        userId,
      ),
    );
  }
}
