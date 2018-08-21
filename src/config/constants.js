import { ListView } from 'react-native';

const initialState = {
    network: process.env.NETWORK,
    walletList: [
        {
            name: '',
            nickName : '',
            id: '',
            symbol: '',
            walletAddress: '',
            privateKey: '',
        },
    ],
    defaultWallet: defaultWallet,
    ethBalance: 0,
    blcBalance: 0,
    visibleModalCreateWallet: false,
    visibleModalDefaultWalletSettings: false,
    visibleModalRestoreWallet: false,
    visibleModalGenerateWallet: false,
    visibleModalSelectAnotherWallet: false,
    dataSourceForWalletList: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
    }),
}


const defaultWallet = {
    name: '',
    nickName : '',
    id: '',
    symbol: '',
    walletAddress: '',
    privateKey: '',
};

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

export { defaultWallet, erc20Abi };
