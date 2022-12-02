import CryptoJS from 'crypto-js';

export const encrypt = (target: string, secretKey: string) => CryptoJS.AES.encrypt(target, secretKey).toString();

export const decrypt = (encodedTarget: string, secretKey: string) => CryptoJS.AES.decrypt(encodedTarget, secretKey).toString(CryptoJS.enc.Utf8);

export const makeCustomKey = (targetKey: string) => {
  const startIndex = 10;
  const endIndex = 17;
  return `SEC_${targetKey.slice(startIndex, endIndex)}`;
};

export const getHeaders = () => {
  const token = localStorage.getItem('accessToken');

  return {
    Authorization: `Bearer ${token}`,
  };
};
