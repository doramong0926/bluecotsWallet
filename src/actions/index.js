
import * as actionModal from './actionModal';
import * as actionConfig from './actionConfig';
import * as actionWallet from './actionWallet';
import * as actionWalletTemp from './actionWalletTemp';
import * as actionHotel from './actionHotel';

const ActionCreators = Object.assign({},
    actionModal,
    actionConfig,
    actionWallet,
    actionWalletTemp,
    actionHotel,
);

export default ActionCreators;