/**
 * @param {string} username
 * @param {string} password
 * @param {object} contract
 * @param {function} setLoader
 * @returns {object} resultObj
 * @returns {string} resultObj.message
 * @returns {boolean} resultObj.status
 * @returns {boolean} resultObj.result
 * @description Logins a registered user
 */

export const loginRegisteredUser = async (
  username: string,
  password: string,
  contract: any,
  setLoader: (value: boolean) => void,
) => {
  try {
    setLoader(true);
    const result = await contract.methods.loginRegisteredUser(username, password).call();
    const resultObj = {
      message: result.message,
      userLogin: result.result,
      status: result.status,
    };
    return resultObj;
  } catch (err: any) {
    const resultObj = {
      message: err.message,
      result: null,
      status: false,
    };
    return resultObj;
  } finally {
    setLoader(false);
  }
};
