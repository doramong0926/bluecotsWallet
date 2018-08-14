// import uuid from 'react-native-uuid';
const uuid = require('uuid')

const defaultTokens = [
  {
    id: uuid.v4(),
    name: process.env.DEFAULT_TOKEN_NAME,    
    symbol: process.env.DEFAULT_TOKEN_SYMBOL,
    contractAddress: process.env.BLC_CONTRACT_ADDRESS,
    decimals: process.env.BLC_DECIMALS,
  },
  {
    id: uuid.v4(),
    name: 'Ethereum',    
    symbol: 'ETH',    
  },
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

export { defaultTokens, erc20Abi };
