/**
 * @param {object} passwordData - The password data to hash
 * @param {string} username - The username of the user
 * @returns {string} The hashed password
 * @description This function hashes the password data and returns the hash
 **/

export const getPasswordHash = (passwordData: any, username: string): string => {
  let dataToHash = '';
  for (const obj of passwordData) {
    if (obj.imageSrc) {
      dataToHash += JSON.stringify(obj.imageSrc);
    } else {
      dataToHash += username;
    }
  }

  const sha256 = (message: string): number[] => {
    function rotateRight(n: number, x: number): number {
      return ((x >>> n) | (x << (32 - n))) >>> 0;
    }

    function choose(x: number, y: number, z: number): number {
      return (x & y) ^ (~x & z);
    }

    function majority(x: number, y: number, z: number): number {
      return (x & y) ^ (x & z) ^ (y & z);
    }

    function sigma0(x: number): number {
      return rotateRight(2, x) ^ rotateRight(13, x) ^ rotateRight(22, x);
    }

    function sigma1(x: number): number {
      return rotateRight(6, x) ^ rotateRight(11, x) ^ rotateRight(25, x);
    }

    function gamma0(x: number): number {
      return rotateRight(7, x) ^ rotateRight(18, x) ^ (x >>> 3);
    }

    function gamma1(x: number): number {
      return rotateRight(17, x) ^ rotateRight(19, x) ^ (x >>> 10);
    }

    const K: number[] = [
      0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98,
      0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
      0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8,
      0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
      0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819,
      0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
      0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7,
      0xc67178f2,
    ];

    const stringToWords = (str: string): number[] => {
      const words: number[] = [];
      for (let i = 0; i < str.length * 8; i += 8) {
        words[i >> 5] |= (String(str).charCodeAt(i / 8) & 0xff) << (24 - (i % 32));
      }
      return words;
    };

    // const wordsToString = (words: number[]): string => {
    //   const str: string[] = [];
    //   for (let i = 0; i < words.length * 32; i += 8) {
    //     str.push(String.fromCharCode((words[i >> 5] >>> (24 - (i % 32))) & 0xff));
    //   }
    //   return str.join('');
    // };

    // const bytesToWords = (bytes: number[]): number[] => {
    //   const words: number[] = [];
    //   for (let i = 0; i < bytes.length * 8; i += 8) {
    //     words[i >> 5] |= (bytes[i / 8] & 0xff) << (24 - (i % 32));
    //   }
    //   return words;
    // };

    const wordsToBytes = (words: number[]): number[] => {
      const bytes: number[] = [];
      for (let i = 0; i < words.length * 32; i += 8) {
        bytes.push((words[i >> 5] >>> (24 - (i % 32))) & 0xff);
      }
      return bytes;
    };

    const processBlock = (words: number[], blockStart: number): void => {
      const w: number[] = new Array(64);
      let a = hash[0];
      let b = hash[1];
      let c = hash[2];
      let d = hash[3];
      let e = hash[4];
      let f = hash[5];
      let g = hash[6];
      let h = hash[7];

      for (let i = 0; i < 16; i++) {
        w[i] = words[blockStart + i];
      }

      for (let i = 16; i < 64; i++) {
        const s0 = gamma0(w[i - 15]);
        const s1 = gamma1(w[i - 2]);
        w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
      }

      for (let i = 0; i < 64; i++) {
        const s1 = sigma1(e);
        const ch = choose(e, f, g);
        const temp1 = (h + s1 + ch + K[i] + w[i]) >>> 0;
        const s0 = sigma0(a);
        const maj = majority(a, b, c);
        const temp2 = (s0 + maj) >>> 0;

        h = g;
        g = f;
        f = e;
        e = (d + temp1) >>> 0;
        d = c;
        c = b;
        b = a;
        a = (temp1 + temp2) >>> 0;
      }

      hash[0] = (hash[0] + a) >>> 0;
      hash[1] = (hash[1] + b) >>> 0;
      hash[2] = (hash[2] + c) >>> 0;
      hash[3] = (hash[3] + d) >>> 0;
      hash[4] = (hash[4] + e) >>> 0;
      hash[5] = (hash[5] + f) >>> 0;
      hash[6] = (hash[6] + g) >>> 0;
      hash[7] = (hash[7] + h) >>> 0;
    };

    const update = (message: number[], messageLength: number): void => {
      const blockCount = ((messageLength + 9) >> 6) + 1;
      const words: number[] = new Array(blockCount * 16);

      for (let i = 0; i < blockCount * 16; i++) {
        words[i] = 0;
      }

      for (let i = 0; i < messageLength; i++) {
        words[i >> 2] |= message[i] << (24 - (i % 4) * 8);
      }

      words[(messageLength >> 2) | 15] |= messageLength << 3;

      for (let i = 0; i < blockCount; i++) {
        processBlock(words, i * 16);
      }
    };

    const finalize = (): number[] => {
      const hashBits = hash.slice();
      const totalLength = data.length * 8;

      data.push(0x80);

      const messageLength = data.length + 8;

      let paddingBytes = ((messageLength + 64) >>> 9) << 4;
      paddingBytes -= messageLength;

      for (let i = 0; i < paddingBytes; i++) {
        data.push(0);
      }

      data.push((totalLength / 0x100000000) | 0);
      data.push(totalLength | 0);

      update(data, messageLength);

      const hashBytes = [];
      for (let i = 0; i < 8; i++) {
        hashBytes.push((hashBits[i] >> 24) & 0xff);
        hashBytes.push((hashBits[i] >> 16) & 0xff);
        hashBytes.push((hashBits[i] >> 8) & 0xff);
        hashBytes.push(hashBits[i] & 0xff);
      }
      return hashBytes;
    };

    const data = stringToWords(message);
    const hash = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];

    const hashBytes = finalize();
    return wordsToBytes(hashBytes);
  };

  const dataToHashBytes: any = new TextEncoder().encode(dataToHash);
  const hashedBytes = sha256(dataToHashBytes);
  return Array.from(hashedBytes, (byte) => ('0' + (byte & 0xff).toString(16)).slice(-2)).join('');
};
