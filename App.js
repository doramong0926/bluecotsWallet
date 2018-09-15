import './shim';
import React from 'react';
import { Provider } from 'react-redux';
import { createStackNavigator, StackNavigator } from 'react-navigation';

import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/config/store';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

import VerificationPincodeScreen from './src/screens/verification/verificationPincodeScreen';
import mainScreen from './src/screens/main/mainScreen';

import ModalAddWallet from './src/modals/modalAddWallet';
import ModalSelectAnotherWalletForSend from './src/modals/modalSelectAnotherWalletForSend';
import ModalSelectAnotherWalletForReceive from './src/modals/modalSelectAnotherWalletForReceive';
import ModalSelectAnotherWalletForHistory from './src/modals/modalSelectAnotherWalletForHistory';
import ModalDefaultWalletSettings from './src/modals/modalDefaultWalletSettings';
import ModalGenerateWallet from './src/modals/modalGenerateWallet';
import ModalRestoreWallet from './src/modals/modalRestoreWallet';
import ModalChangeDefaultWallet from './src/modals/modalChangeDefaultWallet';
import ModalConfirmToSendBlc from './src/modals/modalConfirmToSendBlc';
import ModalConfirmToSendEth from './src/modals/modalConfirmToSendEth';
import ModalQrCodeScaner from './src/modals/modalQrCodeScaner';
import ModalTransactionHistory from './src/modals/modalTransactionHistory';
import ModalInfomation from './src/modals/modalInfomation';
import ModalSpinner from './src/modals/modalSpinner'

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
                    <ModalSelectAnotherWalletForHistory />
                    <ModalChangeDefaultWallet />
                    <ModalConfirmToSendBlc />
                    <ModalConfirmToSendEth />
                    <ModalQrCodeScaner />
                    <ModalTransactionHistory />
                    <ModalInfomation />                    
                    <ModalSpinner />
                </PersistGate>
            </Provider>    
        );
    }
}

const AppStackNavigator = createStackNavigator({
        VerificationPincode:{
            screen: VerificationPincodeScreen
        },
        Main:{
            screen: mainScreen
        },
    },
    {
        transitionConfig: getSlideFromRightTransition
    }
);