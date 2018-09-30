import { defaultHotelInfo } from './hotelList'

export const ETHERSCAN_API_KEY = 'ZGZW3C6175M2MNQTS14HDDIGBYFDHEMXBR';
export const INFURA_API_KEY = '23663b17c0d34893bfc81542034aac9e';
export const SEGMENT_API_KEY = 'secret';
export const NETWORK = 'ropsten';
export const DEFAULT_TOKEN_NAME = 'Bluecots';
export const DEFAULT_TOKEN_SYMBOL = 'BLC';
export const DEFAULT_TOKEN_CONTRACT_ADDRESS = '0x0cd4bf09b96d308dafa18d5d6b62d7eb5d774396';
export const DEFAULT_TOKEN_DECIMALS = 18;
export const WALLET_VERSION = '0.0.1.180724';

export const defaultWallet = {
    name: '',
    nickName : '',
    id: '',
    symbol: '',
    walletAddress: '',
    privateKey: '',
};

export const defaultPaymentInfomation = {
    orderNumber: null,
    roomType: {
        avaliableRoom: null,
        price: {
            adult: null,
            kid: null,
            baby: null,
        },
        avaliableService: {
            dryer: null,
            parking: null,
            internet: null,
        },
        bedType: null,
    },
    numOfPeople: {
        adult: null,
        kid: null,
        baby: null,
    },
    tokenSymbolForPayment: null,
    date: {
        begin: null,
        end: null,
    },
    tokenPrice: null,
    hotelInfo: defaultHotelInfo,
}

export const defaultTransactionData = [
  {
    blockNumber: '',
    timeStamp: '',
    hash : '',
    from: '',
    value: '',
    to: '',
    gasUsed: '',
    isError: '',
    txreceipt_status: '',
  }
];

export const erc20Abi = [
    {
      name: 'balanceOf',
      type: 'function',
      constant: true,
      payable: false,
      inputs: [
        {
          name: '_owner',
          type: 'address',
        },
      ],
      outputs: [
        {
          name: 'balance',
          type: 'uint256',
        },
      ],
    },
    {
      name: 'transfer',
      type: 'function',
      constant: false,
      payable: false,
      inputs: [
        {
          name: '_to',
          type: 'address',
        },
        {
          name: '_value',
          type: 'uint256',
        },
      ],
      outputs: [
        {
          name: 'success',
          type: 'bool',
        },
      ],
    },
  ];
  