import './shim';
import React from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator } from 'react-navigation';

import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/config/store';
import mainScreen from './src/screens/main/mainScreen'
import ModalCreateWallet from './src/modals/modalCreateWallet';
import ModalSelectAnotherWallet from './src/modals/modalSelectAnotherWallet';
import ModalDefaultWalletSettings from './src/modals/modalDefaultWalletSettings';
import ModalGenerateWallet from './src/modals/modalGenerateWallet';
import ModalRestoreWallet from './src/modals/modalRestoreWallet';
import ModalChangeDefaultWallet from './src/modals/modalChangeDefaultWallet';

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <AppStackNavigator />                    
                    <ModalCreateWallet />
                    <ModalDefaultWalletSettings />
                    <ModalGenerateWallet />
                    <ModalRestoreWallet /> 
                    <ModalSelectAnotherWallet />
                    <ModalChangeDefaultWallet />
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