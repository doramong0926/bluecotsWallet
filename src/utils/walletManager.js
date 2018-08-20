import { Alert } from 'react-native';
import WalletUtil from './../utils/wallet'
import { store } from '../config/store';
import actionTypes from './../actions/actionTypes';


export default class WalletManager {
    static setWalletList = async () => {
        var walletList = this.getRegistedWalletList('BLC');
        console.log('walletList : ' + walletList);
        store.dispatch({
            type: actionTypes.SET_WALLET_LIST,
            walletList: walletList,
        });
    }
    
    static updateWalletBalance = async () => {
        console.log('defaultWallet : ' + this.props.defaultWallet);
        if (this.props.defaultWallet.walletAddress) {
            const currentETHBalance = await WalletUtil.getBalance({
                walletAddress: this.props.defaultWallet.walletAddress,
                contractAddress:'', 
                symbol:'ETH', 
                decimals:0
            });
            const currentBLCBalance = await WalletUtil.getBalance({
                walletAddress: this.props.defaultWallet.walletAddress,
                contractAddress: process.env.DEFAULT_TOKEN_CONTRACT_ADDRESS,
                symbol: process.env.DEFAULT_TOKEN_SYMBOL, 
                decimals: process.env.DEFAULT_TOKEN_DECIMALS, 
            });
            this.props.setEthBalance(currentETHBalance); 
            this.props.setBlcBalance(currentBLCBalance);
        }
    }

    static getRegistedWalletList = (symbol) => {
        const registedWalletList = this.props.walletList
            .filter(wallet => wallet.symbol == symbol)
        return registedWalletList;
    }
    
    static addWallet(nickName, walletInput) {
        var ret = false;
        const wallet = {
            id : uuid.v4(),
            nickName: nickName,
            name: 'Bluecots',
            symbol: 'BLC',
            walletAddress: walletInput.getAddressString(),
            privateKey: walletInput.getPrivateKey().toString('hex') 
        }
        const registedWalletList1 = this.props.walletList
            .filter(wallet => wallet.symbol == 'BLC')
            .map(wallet => wallet.walletAddress);

        const registedWalletList2 = this.props.walletList
            .filter(wallet => wallet.symbol == 'BLC')
            .map(wallet => wallet.nickName);
        
        if (registedWalletList1.includes(walletInput.getAddressString())) {
            Alert.alert(
                'This address is already registed',
                wallet.walletAddress,
                [
                    {
                        text: 'OK', onPress: () => {
                        console.log('====================================');
                        console.log('wallet address is already added.');
                        console.log('====================================');
                        }
                    }
                ]
            );
            ret = false;
        }else if (registedWalletList2.includes(nickName)) {
            Alert.alert(
                'This nickName is already registed',
                wallet.nickName,
                [
                    {
                        text: 'OK', onPress: () => {
                        console.log('====================================');
                        console.log('wallet nickName is already added.');
                        console.log('====================================');
                        }
                    }
                ]
            );
            ret = false;
        } else {
            this.props.addWallet(wallet);
        
            console.log('====================================');
            console.log('addWallet() id : ' + wallet.id);
            console.log('addWallet() nickName : ' + wallet.nickName);
            console.log('addWallet() walletAddress : ' + wallet.walletAddress);
            console.log('addWallet() privateKey : ' + wallet.privateKey);
            console.log('====================================');
        
            this.setDefaultWallet(wallet);
            ret = true;
        }
        return ret;
    }

    static removeWallet(wallet) {
        if (this.props.defaultWallet.id == wallet.id)
        {
            this.props.removeDefaultWallet()
        }
        this.props.removeWallet(wallet);

        console.log('====================================');
        console.log('removeWallet() : ' + this.props.walletList);
        console.log('====================================');
    }

    static setDefaultWallet(wallet) {
        this.props.setDefaultWallet(wallet);
        console.log('====================================');
        console.log('setDefaultWallet id : ' + wallet.id);
        console.log('setDefaultWallet nickName : ' + wallet.nickName);
        console.log('setDefaultWallet privateKey : ' + wallet.privateKey);
        console.log('setDefaultWallet address : ' + wallet.walletAddress);
        console.log('====================================');
    }

    static generateWallet(nickName) {
        const wallet = WalletUtil.generateWallet();
        // AnalyticsUtils.trackEvent('Generate wallet', {
        //   walletAddress: wallet.getAddressString(),
        // });
        if (this.addWallet(nickName, wallet)) {
            Alert.alert(
                'Success to generate wallet',
                this.props.defaultWallet.walletAddress,
                [
                    {
                        text: 'OK', onPress: () => {
                        console.log('====================================');
                        console.log('generateWallet() : nickName : ' + this.props.defaultWallet.nickName);
                        console.log('generateWallet() : privateKey : ' + wallet.getPrivateKey().toString('hex'));
                        console.log('generateWallet() : address : ' + wallet.getAddressString());
                        console.log('====================================');
                        }
                    }
                ]
            );
            return true;
        }  
        else {
            return false;
        }  
    }

    static restoreWallet(nickName, privateKey) {
        const wallet = EthereumJsWallet.fromPrivateKey(
            Buffer.from(privateKey, 'hex'),
        );
        if (!walletUtil.addressIsValid(wallet.getAddressString())) {
            Alert.alert(
                'Fail to restore wallet from PrivateKey',
                'please check your privateKey',
                [
                {text: 'OK', onPress: () => console.log('wallet address is wrong : '+ wallet.getAddressString())},
                ]
            );
            return false;
        }

        if (this.addWallet(nickName, wallet)) {
            Alert.alert(
                'Success to restore wallet from PrivateKey',
                this.props.defaultWallet.walletAddress,
                [
                    {
                        text: 'OK', onPress: () => {
                        console.log('====================================');
                        console.log('restoreWallet() : privateKey : ' + wallet.getPrivateKey().toString('hex'));
                        console.log('restoreWallet() : address : ' + wallet.getAddressString());
                        console.log('====================================');
                        }
                    }
                ]
            );
            return true;
        }    
        return false;
    }
}

