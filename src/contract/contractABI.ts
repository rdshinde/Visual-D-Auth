// import env from 'react-dotenv'

export const developmentContractAddress = '0x8F012FEB22850CcF7785429F0214e8ad0A5c3EEA'

export const productionContractAddress = '0xA40566f39ca3ad0281E8952226fF3e6918274394'
export const contractABI: any = [
  {
    inputs: [
      {
        internalType: 'string',
        name: 'username',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'password',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'mnemonicPhrase',
        type: 'string',
      },
    ],
    name: 'addNewUser',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'username',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'newUsername',
        type: 'string',
      },
    ],
    name: 'changeUsername',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'message',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'status',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'userId',
        type: 'bytes32',
      },
    ],
    name: 'ChangeUsername',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'userCount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'userId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'username',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'message',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'status',
        type: 'bool',
      },
    ],
    name: 'NewUserAdded',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'username',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'newPassword',
        type: 'string',
      },
    ],
    name: 'resetUserPassword',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'username',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'message',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'status',
        type: 'bool',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'result',
        type: 'bool',
      },
    ],
    name: 'ResetUserPwd',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'username',
        type: 'string',
      },
    ],
    name: 'getMnemonicPhrase',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'message',
            type: 'string',
          },
          {
            internalType: 'bool',
            name: 'status',
            type: 'bool',
          },
          {
            internalType: 'string',
            name: 'result',
            type: 'string',
          },
        ],
        internalType: 'struct Users.GetMnemonicMsg',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'username',
        type: 'string',
      },
    ],
    name: 'isUserAlreadyRegistered',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'message',
            type: 'string',
          },
          {
            internalType: 'bool',
            name: 'status',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'result',
            type: 'bool',
          },
        ],
        internalType: 'struct Users.IsUsernameAvailable',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'username',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'password',
        type: 'string',
      },
    ],
    name: 'loginRegisteredUser',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'message',
            type: 'string',
          },
          {
            internalType: 'bool',
            name: 'result',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'status',
            type: 'bool',
          },
        ],
        internalType: 'struct Users.LoginUserMsg',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'username',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'mnemonicPhrase',
        type: 'string',
      },
    ],
    name: 'verifyMnemonicPhrase',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'message',
            type: 'string',
          },
          {
            internalType: 'bool',
            name: 'status',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'result',
            type: 'bool',
          },
        ],
        internalType: 'struct Users.VerifyMnemonicMsg',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]
