const ETHERSCAN_API_KEY = 'ZGZW3C6175M2MNQTS14HDDIGBYFDHEMXBR';
const INFURA_API_KEY = '23663b17c0d34893bfc81542034aac9e';
const SEGMENT_API_KEY = 'secret';
const NETWORK = 'ropsten';
const DEFAULT_TOKEN_NAME = 'Bluecots';
const DEFAULT_TOKEN_SYMBOL = 'BLC';
const DEFAULT_TOKEN_CONTRACT_ADDRESS = '0x0cd4bf09b96d308dafa18d5d6b62d7eb5d774396';
const DEFAULT_TOKEN_DECIMALS = 18;
const WALLET_VERSION = '0.0.1.180724';

const defaultWallet = {
    name: '',
    nickName : '',
    id: '',
    symbol: '',
    walletAddress: '',
    privateKey: '',
};

const defaultTransactionData = [
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

const erc20Abi = [
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

export { 
  defaultWallet, 
  erc20Abi,
  ETHERSCAN_API_KEY,
	INFURA_API_KEY ,
	SEGMENT_API_KEY,
	NETWORK,
	DEFAULT_TOKEN_NAME,
	DEFAULT_TOKEN_SYMBOL,
	DEFAULT_TOKEN_CONTRACT_ADDRESS,
	DEFAULT_TOKEN_DECIMALS,
  WALLET_VERSION,
  defaultTransactionData,
 };
