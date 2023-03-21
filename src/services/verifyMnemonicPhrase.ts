/**
 * @param {string} username
 * @param {string} mnemonicPhrase
 *  @param {string} walletAddress
 * @param {string} privateKey
 * @returns {object} resultObj
 * @returns {string} resultObj.message
 * @returns {boolean} resultObj.status
 * @returns {boolean} resultObj.result
 */

export const verifyMnemonicPhrase = async (
  username: string,
  mnemonicPhrase: string,
  contract: any,
  setLoader: (value: boolean) => void
) => {
  try {
    setLoader(true);
    const result = await contract.methods
      .verifyMnemonicPhrase(username, mnemonicPhrase)
      .call();
    const resultObj = {
      message: result.message,
      status: result.status,
      isMnemonicPhraseValid: result.result,
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
