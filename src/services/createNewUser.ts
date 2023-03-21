
/**
 * @param {string} userName
 * @param {string} password
 * @param {string} mnemonicPhrase
 * @param {string} privateKey
 * @param {boolean} useWindowWallet
 * @param {object} contract
 * @param {object} web3
 * @param {object} transactionObj
 * @param {function} setLoader
 * @returns {object} resultObj
 * @returns {object} resultObj.result
 * @returns {number} resultObj.result.userCount
 * @returns {string} resultObj.result.userId
 * @returns {string} resultObj.result.userName
 * @returns {string} resultObj.result.message
 * @returns {boolean} resultObj.status
 * @returns {string} resultObj.transactionHash
 * @description Creates a new user in the blockchain
 */

export const createNewUser = async (
  userName: string,
  password: string,
  mnemonicPhrase: string,
  privateKey: string,
  useWindowWallet: boolean,
  contract: any,
  web3: any,
  transactionObj: any,
  setLoader: (value: boolean) => void
) => {
  const transaction = {
    ...transactionObj,
    data: contract.methods
      .addNewUser(userName, password, mnemonicPhrase)
      .encodeABI(),
  };
  try {
    setLoader(true);
    if (privateKey && !useWindowWallet) {
      // If a private key is provided, sign the transaction with it
      const signedTx: any = await web3.eth.accounts.signTransaction(
        transaction,
        privateKey
      );
      const txReceipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );

      if (txReceipt.status) {
        const events = await contract.getPastEvents("NewUserAdded", {
          fromBlock: txReceipt.blockNumber,
          toBlock: txReceipt.blockNumber,
        });

        const { userCount, userId, username, message } = events[0].returnValues;
        const resultObj = {
          userCount: userCount,
          userId: userId,
          userName: username,
          message: message,
          status: true,
          transactionHash: txReceipt.transactionHash,
        };
        return resultObj;
      } else {
        const resultObj = {
          message: "Transaction Failed",
          status: false,
        };
        return resultObj;
      }
    } else {
      // Otherwise, prompt the user to sign the transaction with their browser wallet
      const tx = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transaction],
      });
      const txReceipt = await web3.eth.getTransactionReceipt(tx);
      if (txReceipt.status) {
        const events = await contract.getPastEvents("NewUserAdded", {
          fromBlock: txReceipt.blockNumber,
          toBlock: txReceipt.blockNumber,
        });
        const { userCount, userId, username, message } = events[0].returnValues;
        const resultObj = {
          userCount: userCount,
          userId: userId,
          userName: username,
          message: message,
          status: true,
          transactionHash: txReceipt.transactionHash,
        };
        return resultObj;
      } else {
        const resultObj = {
          message: "Transaction Failed",
          status: false,
        };
        return resultObj;
      }
    }
  } catch (error: any) {
    const resultObj = {
      message: error.message,
      status: false,
    };
    return resultObj;
  } finally {
    setLoader(false);
  }
};
