import Web3 from 'web3'
// import env from 'react-dotenv'

import { contractABI, developmentContractAddress, productionContractAddress } from '../contract/contractABI'

import {
  isUsernameTaken,
  createNewUser,
  getMnemonicPhrase,
  loginRegisteredUser,
  resetUserPwd,
  verifyMnemonicPhrase,
} from '../services'

declare global {
  interface Window {
    ethereum: any
  }
}

// const web3 = new Web3(window.ethereum);
// const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

/**
 * @param {string} contractMethod - Any method from ContractMethods
 * @param {string} mode - "Production" or "Development"
 * @param {string} walletAddress - wallet address of the user who is calling the contract method
 * @param {string} privateKey - private key of the user who is calling the contract method
 * @param {boolean} useWindowWallet - boolean value to determine if the user is using their browser wallet
 * @param {object} methodParams - object containing the parameters required to call the contract method
 * @param {function} setLoader - function to set the loader state
 * @returns {object} contractResponse - object containing the response from the contract method
 * @returns {string} contractResponse.message - message from the contract method
 * @returns {boolean} contractResponse.status - status from the contract method
 * @returns {string} contractResponse.result - result from the contract method
 * @description This function is used to call the contract methods from the services
 */

export enum ContractMethods {
  IS_USERNAME_TAKEN = 'isUsernameTaken',
  CREATE_NEW_USER = 'createNewUser',
  GET_MNEMONIC_PHRASE = 'getMnemonicPhrase',
  LOGIN_REGISTERED_USER = 'loginRegisteredUser',
  RESET_USER_PASSWORD = 'resetUserPwd',
  VERIFY_MNEMONIC_PHRASE = 'verifyMnemonicPhrase',
}

export const fetchContractMethod = async (
  ContractMethod: ContractMethods,
  mode: 'Production' | 'Development',
  walletAddress: string,
  privateKey: string,
  useWindowWallet: boolean,
  methodParams: any | null,
  setLoader: (value: boolean) => void,
): Promise<any> => {
  let web3: any
  let contractAddress: any
  let wallet: any
  if (mode === 'Production' && !useWindowWallet) {
    contractAddress = productionContractAddress
    web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/bcd48c1e38574c1697634dfd5c66edf4'))
  } else if (mode === 'Development' && !useWindowWallet) {
    contractAddress = developmentContractAddress
    web3 = new Web3(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/bcd48c1e38574c1697634dfd5c66edf4'))
    // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  } else if (mode === 'Production' && useWindowWallet) {
    contractAddress = productionContractAddress
    web3 = new Web3(window.ethereum)
  } else if (mode === 'Development' && useWindowWallet) {
    contractAddress = developmentContractAddress
    web3 = new Web3(window.ethereum)
  } else {
    contractAddress = developmentContractAddress
    web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
  }

  const account = await web3.eth.getAccounts().then((accounts: any) => accounts[0])
  const contract: any = new web3.eth.Contract(contractABI, contractAddress)
  if (!walletAddress && !privateKey && account) {
    wallet = account
  } else {
    wallet = walletAddress
  }

  const transaction = {
    from: web3.utils.toChecksumAddress(wallet),
    to: contractAddress,
    gas: '3000000',
  }

  let contractResponse
  switch (ContractMethod) {
    case ContractMethods.IS_USERNAME_TAKEN:
      contractResponse = await isUsernameTaken(methodParams.username, contract, setLoader)
      break
    case ContractMethods.CREATE_NEW_USER:
      contractResponse = await createNewUser(
        methodParams.username,
        methodParams.pwdHash,
        methodParams.mnemonicPhrase,
        privateKey,
        useWindowWallet,
        contract,
        web3,
        transaction,
        setLoader,
      )
      break

    case ContractMethods.LOGIN_REGISTERED_USER:
      contractResponse = await loginRegisteredUser(methodParams.username, methodParams.pwdHash, contract, setLoader)
      break

    case ContractMethods.GET_MNEMONIC_PHRASE:
      contractResponse = await getMnemonicPhrase(methodParams.username, contract, setLoader)
      // console.log("GetMnemonicFetch", { contractResponse });
      break

    case ContractMethods.VERIFY_MNEMONIC_PHRASE:
      contractResponse = await verifyMnemonicPhrase(
        methodParams.username,
        methodParams.mnemonicPhrase,
        contract,
        setLoader,
      )
      break

    case ContractMethods.RESET_USER_PASSWORD:
      contractResponse = await resetUserPwd(
        methodParams.username,
        methodParams.newPassword,
        privateKey,
        contract,
        transaction,
        web3,
        useWindowWallet,
        setLoader,
      )
      break
  }
  return contractResponse
}
