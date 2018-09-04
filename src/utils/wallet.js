
import EthereumJsWallet from 'ethereumjs-wallet';
import EthUtil from 'ethereumjs-util';
import Web3 from 'web3';
import ProviderEngine from 'web3-provider-engine';
import WalletSubprovider from 'web3-provider-engine/subproviders/wallet';
import ProviderSubprovider from 'web3-provider-engine/subproviders/provider';
import { store } from '../config/store';
import { 
	ETHERSCAN_API_KEY,
	INFURA_API_KEY ,
	SEGMENT_API_KEY,
	NETWORK,
	DEFAULT_TOKEN_NAME,
	DEFAULT_TOKEN_SYMBOL,
	DEFAULT_TOKEN_CONTRACT_ADDRESS,
	DEFAULT_TOKEN_DECIMALS,
	WALLET_VERSION
 } from './../config/constants';

//import AnalyticsUtils from './analytics';
import { erc20Abi } from './../config/constants';


export default class WalletUtils {
  
  static generateWallet() {
      return EthereumJsWallet.generate();
  }

  static addressIsValid = (addr) => {
    return /^0x([A-Fa-f0-9]{40})$/.test(addr);
  }

  static getWeb3HTTPProvider() {
    switch (store.getState().config.network) {
      case 'ropsten':
        return new Web3.providers.HttpProvider(
          `https://ropsten.infura.io/${INFURA_API_KEY}`,
        );
      case 'kovan':
        return new Web3.providers.HttpProvider(
          `https://kovan.infura.io/${INFURA_API_KEY}`,
        );
      case 'rinkeby':
        return new Web3.providers.HttpProvider(
          `https://rinkeby.infura.io/${INFURA_API_KEY}`,
        );
      default:
        return new Web3.providers.HttpProvider(
          `https://mainnet.infura.io/${INFURA_API_KEY}`,
        );
    }
  }

  static getEtherscanApiSubdomain() {
    switch (store.getState().config.network) {
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
  static getWeb3Instance(fromWallet) {
    const wallet = EthereumJsWallet.fromPrivateKey(Buffer.from(fromWallet.privateKey, 'hex'));

    const engine = new ProviderEngine();

    engine.addProvider(new WalletSubprovider(wallet, {}));
    engine.addProvider(new ProviderSubprovider(this.getWeb3HTTPProvider()));

    engine.start();

    const web3 = new Web3(engine);

    web3.eth.defaultAccount = fromWallet.walletAddress;

    return web3;
  }


  /**
   * Fetch a list of transactions for the user's wallet concerning the given token
   *
   * @param {Object} token
   */
  static getTransactions({ contractAddress, walletAddress, decimals, symbol }) {
    if (symbol === 'ETH') {
      return this.getEthTransactions();
    }

    return this.getERC20Transactions(contractAddress, walletAddress, decimals);
  }

  /**
   * Fetch a list of ETH transactions for the user's wallet
   */
  static getEthTransactions(walletAddress) {
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
  static async getERC20Transactions(contractAddress, walletAddress, decimals) {
    return fetch(
      `https://${this.getEtherscanApiSubdomain()}.etherscan.io/api?module=account&action=tokentx&contractaddress=${contractAddress}&address=${walletAddress}&sort=desc&apikey=${
        ETHERSCAN_API_KEY
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
      } else {
          return this.getERC20Balance(walletAddress, contractAddress, decimals);
      }
  }

  /**
   * Get the user's wallet ETH balance
   */
  static getEthBalance(walletAddress) {
    const web3 = new Web3(this.getWeb3HTTPProvider());
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

  static getGasPrice(){
    const web3 = new Web3(this.getWeb3HTTPProvider());
    return new Promise((resolve, reject) => {
      web3.eth.getGasPrice((error, data) => {
          if (error) {
            console.log("error : " + error );
            reject(error);
          }
          const gasPrice = web3.fromWei(data, 'ether');
          resolve(gasPrice);
        });
    });
  }

  static getEstimateGasForErc20(contractAddress, decimals, fromAddress, toAddress, value){
    const web3 = new Web3(this.getWeb3HTTPProvider());
    return new Promise((resolve, reject) => {
      web3.eth
      .contract(erc20Abi)
      .at(contractAddress)
      .transfer.estimateGas(
          toAddress,
          value * Math.pow(10, decimals),
          {from: fromAddress}, (error, data) => {
          if (error) {
            console.log("error : " + error );
            reject(error);
          }
          const weiPrice = web3.toWei(data, 'gwei');
          const gasLimit = {
              wei: data,
              eth: web3.fromWei(weiPrice, 'ether')
          };
          resolve(gasLimit);
        });
    });
  }

  static getEstimateGasForEth(fromAddress, toAddress, value){
    const web3 = new Web3(this.getWeb3HTTPProvider());
    return new Promise((resolve, reject) => {
      web3.eth
        .estimateGas({ to: toAddress, 
            from: fromAddress, 
            value: web3.toWei(value, 'ether')
          }, (error, data) => {
            if (error) {
              console.log("error : " + error );
              reject(error);
            }
            const weiPrice = web3.toWei(data, 'gwei');
            const gasLimit = {
                wei: data,
                eth: web3.fromWei(weiPrice, 'ether')
            };
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
    fromWallet,
    toAddress,
    amount,
  ) {
    if (symbol === 'ETH') {
      return this.sendETHTransaction(fromWallet, toAddress, amount);
    }

    return this.sendERC20Transaction(
      contractAddress,
      decimals,
      fromWallet,
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
  static sendETHTransaction(fromWallet, toAddress, amount) {
    const web3 = this.getWeb3Instance(fromWallet);

    
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
  static sendERC20Transaction(contractAddress, decimals, fromWallet, toAddress, amount) {
    const web3 = this.getWeb3Instance(fromWallet);

    // AnalyticsUtils.trackEvent('Send ERC20 transaction', {
    //   contractAddress,
    //   value: amount,
    // });
    console.log('====================================');
    console.log('test send tr : ' + fromWallet.walletAddress + ' toAddress : ' + toAddress + ' amount : ' + amount);
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

