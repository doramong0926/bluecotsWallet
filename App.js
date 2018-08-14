import './shim';
import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/config/store';
import mainScreen from './src/screens/main/mainScreen'

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <AppStackNavigator />
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