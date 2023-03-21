import { SHA256 } from 'crypto-js'
/**
 * @param {object} passwordData - The password data to hash
 * @param {string} username - The username of the user
 * @returns {string} The hashed password
 * @description This function hashes the password data and returns the hash
 **/

export const getPasswordHash = (passwordData: any, username: string): string => {
  let dataToHash = ''
  for (const obj of passwordData) {
    if (obj.imageSrc) {
      dataToHash += JSON.stringify(obj.imageSrc)
    } else {
      dataToHash += username
    }
  }

  return SHA256(dataToHash).toString()
}
