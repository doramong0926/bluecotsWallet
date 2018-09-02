import './shim';
import React from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator } from 'react-navigation';

import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/config/store';
import mainScreen from './src/screens/main/mainScreen';
import ModalAddWallet from './src/modals/modalAddWallet';
import ModalSelectAnotherWalletForSend from './src/modals/modalSelectAnotherWalletForSend';
import ModalSelectAnotherWalletForReceive from './src/modals/modalSelectAnotherWalletForReceive';
import ModalDefaultWalletSettings from './src/modals/modalDefaultWalletSettings';
import ModalGenerateWallet from './src/modals/modalGenerateWallet';
import ModalRestoreWallet from './src/modals/modalRestoreWallet';
import ModalChangeDefaultWallet from './src/modals/modalChangeDefaultWallet';
import ModalConfirmToSendBlc from './src/modals/modalConfirmToSendBlc';
import ModalConfirmToSendEth from './src/modals/modalConfirmToSendEth';
import ModalSuccess from './src/modals/modalSuccess';
import ModalFail from './src/modals/modalFail';
import ModalCopyAddressToClipboard from './src/modals/modalCopyAddressToClipboard';
import ModalQrCodeScaner from './src/modals/modalQrCodeScaner';
import ModalInfomation from './src/modals/modalInfomation';


export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <AppStackNavigator />                    
                    <ModalAddWallet />
                    <ModalDefaultWalletSettings />
                    <ModalGenerateWallet />
                    <ModalRestoreWallet /> 
                    <ModalSelectAnotherWalletForSend />
                    <ModalSelectAnotherWalletForReceive />
                    <ModalChangeDefaultWallet />
                    <ModalConfirmToSendBlc />
                    <ModalConfirmToSendEth />
                    <ModalCopyAddressToClipboard />
                    <ModalQrCodeScaner />
                    <ModalSuccess />
                    <ModalFail /> 
                    <ModalInfomation />                   
                </PersistGate>
            </Provider>    
        );
    }
}

const AppStackNavigator = createStackNavigator({
    Main:{
        screen: mainScreen
    }
});