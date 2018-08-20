import './shim';
import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/config/store';
import mainScreen from './src/screens/main/mainScreen'

import ModalCreateWallet from './src/modals/modalCreateWallet';
import ModalSelectAnotherWallet from './src/modals/modalSelectAnotherWallet';
import ModalDefaultWalletSettings from './src/modals/modalDefaultWalletSettings';
import ModalGenerateWallet from './src/modals/modalGenerateWallet';
import ModalRestoreWallet from './src/modals/modalRestoreWallet';


export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <AppStackNavigator />
                    <ModalCreateWallet />
                    <ModalSelectAnotherWallet />
                    <ModalDefaultWalletSettings />
                    <ModalGenerateWallet />
                    <ModalRestoreWallet />
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