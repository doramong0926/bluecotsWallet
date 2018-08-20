
import * as actionModal from './actionModal';
import * as actionConfig from './actionConfig';
import * as actionWallet from './actionWallet';

const ActionCreators = Object.assign({},
    actionModal,
    actionConfig,
    actionWallet,
);

export default ActionCreators;