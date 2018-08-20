import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise-middleware'
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
      walletList: state.walletList.map(wallet => ({
          ...wallet,
          id: uuid.v4(),
      })),
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
    migrate: createMigrate(migrations, { debug: false }),
};

const store = createStore(
    persistReducer(persistConfig, reducers),
    //initialState,
    process.env.NODE_ENV === 'production'
        ? undefined
        : applyMiddleware(promiseMiddleware(), createLogger()),
);

const persistor = persistStore(store);
persistor.purge();

export { persistor, store };
