/**
 * @param {string} username
 * @param {string} walletAddress
 * @param {string} privateKey
 * @returns {object} resultObj
 * @returns {string} resultObj.message
 * @returns {boolean} resultObj.status
 * @returns {string} resultObj.result
 */

export const getMnemonicPhrase = async (
  username: string,
  contract: any,
  setLoader: (value: boolean) => void
) => {
  try {
    setLoader(true);
    const result = await contract.methods.getMnemonicPhrase(username).call();
    const resultObj = {
      message: result.message,
      status: result.status,
      mnemonicPhrase: result.result,
    };
    return resultObj;
  } catch (err: any) {
    console.log(err.message);
    const resultObj = {
      message: err.message,
      status: false,
      result: null,
    };
    return resultObj;
  } finally {
    setLoader(false);
  }
};
