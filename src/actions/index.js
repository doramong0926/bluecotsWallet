
import * as actionModal from './actionModal';
import * as actionConfig from './actionConfig';
import * as actionWallet from './actionWallet';
import * as actionWalletTemp from './actionWalletTemp';

const ActionCreators = Object.assign({},
    actionModal,
    actionConfig,
    actionWallet,
    actionWalletTemp,
);

export default ActionCreators;