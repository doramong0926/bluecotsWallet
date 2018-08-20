import { combineReducers } from 'redux';
import reducerModal from './reducerModal';
import reducerConfig from './reducerConfig';
import reducerWallet from './reducerWallet';

export default combineReducers({
  modal: reducerModal,
  config: reducerConfig,
  wallet: reducerWallet,
});