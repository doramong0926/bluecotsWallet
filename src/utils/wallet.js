// import Config from 'react-native-config';
import { Alert } from 'react-native';
import EthereumJsWallet from 'ethereumjs-wallet';
import EthUtil from 'ethereumjs-util';
import Web3 from 'web3';
import ProviderEngine from 'web3-provider-engine';
import WalletSubprovider from 'web3-provider-engine/subproviders/wallet';
import ProviderSubprovider from 'web3-provider-engine/subproviders/provider';
import { store } from '../config/store';
const uuid = require('uuid')

import {
  ADD_WALLET,
  REMOVE_WALLET,
  SET_DEFAULT_WALLET,
} from '../config/actionTypes';
//import AnalyticsUtils from './analytics';
import { erc20Abi } from './constants';

export default class WalletUtils {

  static addressIsValid = (addr) => {
    return /^0x([A-Fa-f0-9]{40})$/.test(addr);
  }

  static getRegistedWalletList = (symbol) => {
    const { walletList } = store.getState();
    const registedWalletList = walletList
        .filter(wallet => wallet.symbol == symbol)
    return registedWalletList;
  }

   /**
   * Given an EthereumJSWallet instance, store both address and private key
   * in Redux store
   *
   * @param {Object} wallet
   */
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
    const { walletList } = store.getState();
    const registedWalletList1 = walletList
      .filter(wallet => wallet.symbol == 'BLC')
      .map(wallet => wallet.walletAddress);

    const registedWalletList2 = walletList
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
      store.dispatch({
        type: ADD_WALLET,
        wallet: wallet,
      });
  
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
    const { walletList, defaultWallet } = store.getState();
    // if (!walletList.includes(wallet.walletAddress))
    // {
    //   console.log('====================================');
    //   console.log('wallet address is not exist.');
    //   console.log('====================================');
    //   return;
    // }

    if (defaultWallet.id == wallet.id)
    {
      store.dispatch({
        type: SET_DEFAULT_WALLET,
        wallet: {
          id: "",
          walletAddress: "",
          privateKey: "",
        }
      });
    }

    store.dispatch({
      type: REMOVE_WALLET,
      wallet: wallet,
    });

    console.log('====================================');
    console.log('removeWallet() : ' + store.getState().WalletList);
    console.log('====================================');
  }

  static setDefaultWallet(wallet) {
    // if (!walletList.includes(wallet.walletAddress))
    // {
    //   console.log('====================================');
    //   console.log('wallet address is not exist.');
    //   console.log('====================================');
    //   return;
    // }
    store.dispatch({
      type: SET_DEFAULT_WALLET,
      wallet: wallet,
    });

    console.log('====================================');
    console.log('setDefaultWallet id : ' + wallet.id);
    console.log('setDefaultWallet nickName : ' + wallet.nickName);
    console.log('setDefaultWallet privateKey : ' + wallet.privateKey);
    console.log('setDefaultWallet address : ' + wallet.walletAddress);
    console.log('====================================');
  }

  /**
   * Generate an Ethereum wallet
   */
  static generateWallet(nickName) {
    const wallet = EthereumJsWallet.generate();

    // AnalyticsUtils.trackEvent('Generate wallet', {
    //   walletAddress: wallet.getAddressString(),
    // });
    if (this.addWallet(nickName, wallet)) {
      const { defaultWallet } = store.getState();  
      Alert.alert(
          'Success to generate wallet',
          defaultWallet.walletAddress,
          [
            {
              text: 'OK', onPress: () => {
              console.log('====================================');
              console.log('generateWallet() : nickName : ' + defaultWallet.nickName);
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

  /**
   * Store a wallet in Redux store given a private key
   *
   * @param {String} privateKey
   */
  static restoreWallet(nickName, privateKey) {
    const wallet = EthereumJsWallet.fromPrivateKey(
      Buffer.from(privateKey, 'hex'),
    );
    if (!this.addressIsValid(wallet.getAddressString())) {
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
      const { defaultWallet } = store.getState();  
      Alert.alert(
          'Success to restore wallet from PrivateKey',
          defaultWallet.walletAddress,
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


  static getWeb3HTTPProvider() {
    switch (store.getState().network) {
      case 'ropsten':
        return new Web3.providers.HttpProvider(
          `https://ropsten.infura.io/${process.env.INFURA_API_KEY}`,
        );
      case 'kovan':
        return new Web3.providers.HttpProvider(
          `https://kovan.infura.io/${process.env.INFURA_API_KEY}`,
        );
      case 'rinkeby':
        return new Web3.providers.HttpProvider(
          `https://rinkeby.infura.io/${process.env.INFURA_API_KEY}`,
        );
      default:
        return new Web3.providers.HttpProvider(
          `https://mainnet.infura.io/${process.env.INFURA_API_KEY}`,
        );
    }
  }

  static getEtherscanApiSubdomain() {
    switch (store.getState().network) {
      case 'ropsten':
        return 'api-ropsten';
      case 'kovan':
        return 'api-kovan';
      case 'rinkeby':
        return 'api-rinkeby';
      default:
        return 'api';
    }
  }

  /**
   * Returns a web3 instance with the user's wallet
   */
  static getWeb3Instance() {
    const { defaultWallet } = store.getState();  
    const wallet = EthereumJsWallet.fromPrivateKey(Buffer.from(defaultWallet.privateKey, 'hex'));

    const engine = new ProviderEngine();

    engine.addProvider(new WalletSubprovider(wallet, {}));
    engine.addProvider(new ProviderSubprovider(this.getWeb3HTTPProvider()));

    engine.start();

    const web3 = new Web3(engine);

    web3.eth.defaultAccount = defaultWallet.walletAddress;

    return web3;
  }

  /**
   * Fetch a list of transactions for the user's wallet concerning the given token
   *
   * @param {Object} token
   */
  static getTransactions({ contractAddress, decimals, symbol }) {
    if (symbol === 'ETH') {
      return this.getEthTransactions();
    }

    return this.getERC20Transactions(contractAddress, decimals);
  }

  /**
   * Fetch a list of ETH transactions for the user's wallet
   */
  static getEthTransactions() {
    const { walletAddress } = store.getState();

    return fetch(
      `https://${this.getEtherscanApiSubdomain()}.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&sort=desc&apikey=${
        process.env.ETHERSCAN_API_KEY
      }`,
    )
      .then(response => response.json())
      .then(data => {
        if (data.message !== 'OK') {
          return [];
        }

        return data.result.filter(t => t.value !== '0').map(t => ({
          from: t.from,
          timestamp: t.timeStamp,
          transactionHash: t.hash,
          value: (parseInt(t.value, 10) / 1e18).toFixed(2),
        }));
      });
  }

  /**
   * Fetch a list of a given token transactions for the user's wallet
   *
   * @param {String} contractAddress
   */
  static async getERC20Transactions(contractAddress, decimals) {
    const { walletAddress } = store.getState();

    return fetch(
      `https://${this.getEtherscanApiSubdomain()}.etherscan.io/api?module=account&action=tokentx&contractaddress=${contractAddress}&address=${walletAddress}&sort=desc&apikey=${
        process.env.ETHERSCAN_API_KEY
      }`,
    )
      .then(response => response.json())
      .then(data => {
        if (data.message !== 'OK') {
          return [];
        }

        return data.result.map(t => ({
          from: t.from,
          timestamp: t.timeStamp,
          transactionHash: t.hash,
          value: (parseInt(t.value, 10) / Math.pow(10, decimals)).toFixed(2),
        }));
      });
  }

  /**
   * Get the user's wallet balance of a given token
   *
   * @param {Object} token
   */
  static getBalance({ walletAddress, contractAddress, symbol, decimals }) {
    if (symbol === 'ETH') {
      return this.getEthBalance(walletAddress);
    }

    return this.getERC20Balance(walletAddress, contractAddress, decimals);
  }

  /**
   * Get the user's wallet ETH balance
   */
  static getEthBalance(walletAddress) {
    const web3 = new Web3(this.getWeb3HTTPProvider());
    console.log('====================================');
    console.log("getEtherBalnace wallet : " + walletAddress);
    console.log('====================================');

    return new Promise((resolve, reject) => {
      web3.eth.getBalance(walletAddress, (error, weiBalance) => {
        if (error) {
          reject(error);
        }

        const balance = weiBalance / Math.pow(10, 18);

        // AnalyticsUtils.trackEvent('Get ETH balance', {
        //   balance,
        // });

        resolve(balance);
      });
    });
  }

  /**
   * Get the user's wallet balance of a specific ERC20 token
   *
   * @param {String} contractAddress
   * @param {Number} decimals
   */
  static getERC20Balance(walletAddress, contractAddress, decimals) {

    const web3 = new Web3(this.getWeb3HTTPProvider());

    console.log('====================================');
    console.log("getERC20Balance wallet : " + walletAddress);
    console.log('====================================');

    return new Promise((resolve, reject) => {
      web3.eth
        .contract(erc20Abi)
        .at(contractAddress)
        .balanceOf(walletAddress, (error, decimalsBalance) => {
          if (error) {
            reject(error);
          }

          const balance = decimalsBalance / Math.pow(10, decimals);
          // AnalyticsUtils.trackEvent('Get ERC20 balance', {
          //   balance,
          //   contractAddress,
          // });
          resolve(balance);
        });
    });
  }

  static getEstimateGas(fromAddress, toAddress, value){
    return new Promise((resolve, reject) => {
      web3.eth
        .estimateGas(
          { to: toAddress, 
            from: fromAddress, 
            value: value }, (error, data) => {
          if (error) {
            reject(error);
          }
          const gasLimit = data;
          resolve(gasLimit);
        });
    });
  }

  /**
   * Send a transaction from the user's wallet
   *
   * @param {Object} token
   * @param {String} toAddress
   * @param {String} amount
   */
  static sendTransaction(
    { contractAddress, symbol, decimals },
    toAddress,
    amount,
  ) {
    if (symbol === 'ETH') {
      return this.sendETHTransaction(toAddress, amount);
    }

    return this.sendERC20Transaction(
      contractAddress,
      decimals,
      toAddress,
      amount,
    );
  }

  /**
   * Send an ETH transaction to the given address with the given amount
   *
   * @param {String} toAddress
   * @param {String} amount
   */
  static sendETHTransaction(toAddress, amount) {
    const web3 = this.getWeb3Instance();

    
    // AnalyticsUtils.trackEvent('Send ETH transaction', {
    //   value: amount,
    // });

    return new Promise((resolve, reject) => {
      web3.eth.sendTransaction(
        {
          to: toAddress,
          value: web3.toWei(amount),
        },
        (error, transaction) => {
          if (error) {
            reject(error);
          }

          resolve(transaction);
        },
      );
    });
  }

  /**
   * Send an ETH transaction to the given address with the given amount
   *
   * @param {String} toAddress
   * @param {String} amount
   */
  static sendERC20Transaction(contractAddress, decimals, toAddress, amount) {
    const web3 = this.getWeb3Instance();

    // AnalyticsUtils.trackEvent('Send ERC20 transaction', {
    //   contractAddress,
    //   value: amount,
    // });
    console.log('====================================');
    console.log('test send tr : ' + contractAddress + ' toAddress : ' + toAddress + ' amount : ' + amount);
    console.log('====================================');
    return new Promise((resolve, reject) => {
      web3.eth
        .contract(erc20Abi)
        .at(contractAddress)
        .transfer(
          toAddress,
          amount * Math.pow(10, decimals),
          (error, transaction) => {
            if (error) {
              reject(error);
            }

            resolve(transaction);
          },
        );
    });
  }
}
