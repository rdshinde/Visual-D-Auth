export type ResultObj = {
  message: string
  status: boolean
  result: boolean | null
}

/**
 * @param {string} username
 * @param {object} contract
 * @param {function} setLoader
 * @returns {object} resultObj
 * @returns {string} resultObj.message
 * @returns {boolean} resultObj.status
 * @returns {boolean} resultObj.result
 * @description Checks if the username is already taken
 */

export const isUsernameTaken = async (username: string, contract: any, setLoader: (value: boolean) => void) => {
  try {
    setLoader(true)
    const result = await contract.methods.isUserAlreadyRegistered(username).call()
    const resultObj = {
      message: result.message,
      status: result.status,
      isUsernameTaken: result.result,
    }
    // console.log(resultObj);
    return resultObj
  } catch (err: any) {
    console.log(err.message)
    const resultObj = {
      message: err.message,
      status: false,
      result: null,
    }
    return resultObj
  } finally {
    setLoader(false)
  }
}
