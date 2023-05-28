# Visual-D-Auth

The NPM package for your projects decentralised graphical password authentication.

[![Version](https://img.shields.io/badge/version-1.0.28-blue.svg)](https://github.com/your_username/your_project)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/your_username/your_project/blob/master/LICENSE)

[github-build]: [https://github.com/rdshinde/Visual-D-Auth]
[github-build-url]: [https://github.com/rdshinde/Visual-D-Auth]
[npm-typescript]: [https://img.shields.io/npm/types/react-visual-d-auth]
[github-license]: [https://img.shields.io/github/license/rdshinde/Visual-D-Auth]


## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage in React](#usage-in-react)
  - [1. publicKey](#1-publickey)
  - [2.privateKey](#2privatekey)
  - [3.mode](#3mode)
  - [3.useWindowWallet](#3usewindowwallet)
  - [4.onErrorHandler](#4onerrorhandler)
  - [5.onSuccessHandler](#5onsuccesshandler)
- [Instructions for AuthButton props](#instructions-for-authbutton-props)
  - [1.styles](#1styles)
  - [2.className](#2classname)

## Introduction

Visual-D-Auth is a NPM package that allows you to use your wallet to authenticate your users in your projects. It uses the wallet you are using to sign a message and send it to the VisualDAuth contract. The contract then verifies the signature and returns the result. The result is then passed to the onSuccessHandler function. If there is an error in the process, the error is passed to the onErrorHandler function.

## Installation

```bash
npm install react-visual-d-auth
```

## Usage in React

Step 1: Import the package in your project and wrap your app with the VisualDAuthProvider. You need to also pass in the following props:

- publicKey: The public key of your wallet
- privateKey: The private key of your wallet
- mode: The mode of the wallet. Can be either "Development" or "Production"
- useWindowWallet: Whether to use the wallet in the window object or not
- onErrorHandler: A function to handle errors
- onSuccessHandler: A function to handle success

```tsx
import React, { useState } from 'react'
import { VisualDAuthProvider } from 'react-visual-d-auth'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <VisualDAuthProvider
    publicKey={WALLET_ADDRESS}
    privateKey={WALLET_PRIVATE_KEY}
    mode={'Development'}
    useWindowWallet={false}
    onErrorHandler={handleError(result)}
    onSuccessHandler={handleSuccess(result)}
  >
    <App />
  </VisualDAuthProvider>,
)
```

Step 2: Import the AuthButton component and use it in your project. You need to pass in the following props:

- styles: The styles of the button (optional)
- className: The class name of the button (optional)

```tsx
import React from 'react'
import { AuthButton } from 'react-visual-d-auth'

const App = () => {
  return (
    <div>
      <AuthButton />
    </div>
  )
}

export default App
```

## OR

```tsx
import React from 'react'
import { AuthButton } from 'react-visual-d-auth'

const App = () => {
  return (
    <div>
      <AuthButton>
        <div>Custom Button</div>
      </AuthButton>
    </div>
  )
}

export default App
```

Thats it! You are now ready to use the package in your react project. You can also check out the example project in the examples folder.

## Instructions for VisualDAuthProvider props

### 1. publicKey

- The public key of your wallet. This is the address of your wallet. You can get this from the wallet you are using. For example, if you are using Metamask, you can get this from the Metamask extension. If you are using the wallet in the window object, you can get this from the window object.

- For Development mode, VisualDAuthProvider is using the Goerli testnet. You can get a testnet wallet from [here](https://goerli-faucet.slock.it/), and get some testnet ETH from [here](https://goerli-faucet.slock.it/).

- For Production mode, VisualDAuthProvider is using the Ethereum mainnet. You can get a mainnet wallet from [here](https://metamask.io/), and get some mainnet ETH from [here](https://faucet.metamask.io/).

### 2.privateKey

- The private key of your wallet. You can get this from the wallet you are using. For example, if you are using Metamask, you can get this from the Metamask extension. If you are using the wallet in the window object, you can get this from the window object.

- For Development mode, VisualDAuthProvider is using the Goerli testnet. You can get a testnet wallet from [here](https://goerli-faucet.slock.it/), and get some testnet ETH from [here](https://goerli-faucet.slock.it/).

- For Production mode, VisualDAuthProvider is using the Ethereum mainnet. You can get a mainnet wallet from [here](https://metamask.io/), and get some mainnet ETH from [here](https://faucet.metamask.io/).

### 3.mode

- The mode of the wallet. Can be either "Development" or "Production".

- Provide the public and private keys of your wallet according to the mode you are using. For example, if you are using the Development mode, provide the public and private keys of your wallet in the Goerli testnet. If you are using the Production mode, provide the public and private keys of your wallet in the Ethereum mainnet.

### 3.useWindowWallet

- Whether to use the wallet in the window object or not. If set to true, VisualDAuthProvider will use the wallet in the window object. If set to false, VisualDAuthProvider will use the wallet passed in the publicKey and privateKey props.

### 4.onErrorHandler

- A function to handle errors. This function will be called when there is an error in the authentication process. The function will be passed the error object as a parameter.

### 5.onSuccessHandler

- A function to handle success. This function will be called when the authentication process is successful. The function will be passed the result object as a parameter.

## Instructions for AuthButton props

### 1.styles

- The styles of the button. You can pass in the styles as an object. For example, if you want to change the background color of the button, you can pass in the following object:

```tsx
const styles = {
  backgroundColor: 'red',
}
```

### 2.className

- The class name of the button. You can pass in the class name as a string. For example, if you want to add a class name to the button, you can pass in the following string:

```tsx
const className = 'my-class-name'
```

## Support

If you like this project, please consider supporting it by giving it a star ⭐️.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Acknowledgements

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Web3js](https://web3js.readthedocs.io/en/v1.3.4/)

## Disclaimer

This project is not affiliated with VisualD in any way. It is a personal project.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Author

[Rishikesh Shinde](https://github.com/rdshinde)

## Closing Notes

If you have any questions, feel free to reach out to me on [Twitter](https://twitter.com/RD__Shinde). I would love to hear from you.

If you like this project, please consider supporting it by giving it a star ⭐️.

Thank you!
