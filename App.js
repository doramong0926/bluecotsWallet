import './shim';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/config/store';

import MainEntry from './mainEntry'


export default class App extends React.Component {
    render() {        
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <MainEntry />
                </PersistGate>
            </Provider>    
        );
    }
}
