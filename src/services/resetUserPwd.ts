/**
  * @param {string} username
  * @param {string} newPassword
  * @param {string} walletAddress
  * @param {string} privateKey
  * @returns {object} resultObj
  * @returns {string} resultObj.message
  * @returns {boolean} resultObj.status
  * @returns {boolean} resultObj.result
  * @returns {string} resultObj.transactionHash
  * @returns {string} resultObj.userName

*/

export const resetUserPwd = async (
  username: string,
  newPassword: string,
  privateKey: string,
  contract: any,
  transactionObj: any,
  web3: any,
  useWindowWallet: boolean,
  setLoader: (value: boolean) => void,
): Promise<any> => {
  const transaction = {
    ...transactionObj,
    data: contract.methods.resetUserPassword(username, newPassword).encodeABI(),
  };
  try {
    setLoader(true);
    if (privateKey && !useWindowWallet) {
      // If a private key is provided, sign the transaction with it
      const signedTx: any = await web3.eth.accounts.signTransaction(transaction, privateKey);
      const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

      if (txReceipt.status) {
        const events = await contract.getPastEvents('ResetUserPwd', {
          fromBlock: txReceipt.blockNumber,
          toBlock: txReceipt.blockNumber,
        });

        const { username, message, status, result } = events[0].returnValues;
        const resultObj = {
          userName: username,
          message: message,
          status: status,
          isResetSuccessful: result,
          transactionHash: txReceipt.transactionHash,
        };
        console.log(`User added: username=${username}, username=${username}, message=${message}`);
        return resultObj;
      } else {
        console.log('Transaction Failed');
      }
    } else {
      // Otherwise, prompt the user to sign the transaction with their browser wallet
      const tx = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transaction],
      });
      const txReceipt = await web3.eth.getTransactionReceipt(tx);
      if (txReceipt.status) {
        const events = await contract.getPastEvents('ResetUserPwd', {
          fromBlock: txReceipt.blockNumber,
          toBlock: txReceipt.blockNumber,
        });
        const { username, message, status, result } = events[0].returnValues;
        const resultObj = {
          userName: username,
          message: message,
          status: status,
          isResetSuccessful: result,
          transactionHash: txReceipt.transactionHash,
        };
        return resultObj;
      } else {
        console.log('Transaction Failed');
      }
    }
  } catch (error: any) {
    console.error(error);
    const resultObj = {
      message: error.message,
      result: false,
      status: false,
    };
    return resultObj;
  } finally {
    setLoader(false);
  }
};
