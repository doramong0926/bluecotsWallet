import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk'
import { createLogger } from 'redux-logger';
import { createMigrate, persistReducer, persistStore, persistCombineReducers } from 'redux-persist';
//import createSensitiveStorage from 'redux-persist-sensitive-storage';
import createSensitiveStorage from 'redux-persist-expo-securestore';
// import uuid from 'react-native-uuid';
const uuid = require('uuid')
import reducers from './../reducers';

const migrations = {
  0: state => ({
      ...state,
      walletList: state.wallet.map(walletList => ({
          ...walletList,
          id: uuid.v4(),
      })),
      defaultWallet: state.wallet.defaultWallet,
  }),
};

// const storage = createSensitiveStorage({
//   encrypt: true,
//   keychainService: 'bluecotsWallet',
//   sharedPreferencesName: 'bluecotsWallet',
// });

const storage = createSensitiveStorage();

const persistConfig = {
    key: "bluecotsWallet",
    version: 1,
    storage,
    //migrate: createMigrate(migrations, { debug: false }),
    blacklist: ['modal', 'walletTemp']
};

const store = createStore(
    persistCombineReducers(persistConfig, reducers),
    process.env.NODE_ENV === 'production'
        ? applyMiddleware(ReduxThunk)
        // : applyMiddleware(ReduxThunk),
        : applyMiddleware(ReduxThunk, createLogger()),
);


const persistor = persistStore(store);
// persistor.purge();

export { persistor, store };
