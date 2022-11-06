import CryptoJS from 'crypto-js';

export const encrypt = (target: string, secretKey: string) => CryptoJS.AES.encrypt(target, secretKey).toString();

export const decrypt = (encodedTarget: string, secretKey: string) => CryptoJS.AES.decrypt(encodedTarget, secretKey).toString(CryptoJS.enc.Utf8);

export const makeCustomKey = (targetKey: string) => {
  const startIndex = 10;
  const endIndex = 17;
  return `SEC_${targetKey.slice(startIndex, endIndex)}`;
};

// export const ENCODED_REFRESH_TOKEN_KEY = encrypt(`${process.env.SECURE_TOKEN}`, `${process.env.SECURE_TOKEN_KEY}`);
// export const ENCODED_MEMBER_ID_KEY = encrypt(`${process.env.SECURE_ID_KEY}`, `${process.env.SECURE_ID_KEY_KEY}`);
// export const ENCODED_NICKNAME_KEY = encrypt(`${process.env.SECURE_IDENTIFI_KEY}`, `${process.env.SECURE_IDENTIFI_KEY_KEY}`);
// export const ENCODED_NOTIFICATION_READ_KEY = encrypt(`${process.env.SECURE_ALARM_KEY}`, `${process.env.SECURE_ALARM_KEY_KEY}`);
// export const ENCODED_PROFILE_IMAGE_KEY = encrypt(`${process.env.SECURE_IDENTIFI_KEY}`, `${process.env.SECURE_IDENTIFI_KEY_KEY}`);

// export const ENCODED_REFRESH_TOKEN_KEY = makeCustomKey(encrypt(`${process.env.SECURE_TOKEN}`, `${process.env.SECURE_TOKEN_KEY}`));
// export const ENCODED_MEMBER_ID_KEY = makeCustomKey(encrypt(`${process.env.SECURE_ID_KEY}`, `${process.env.SECURE_ID_KEY_KEY}`));
// export const ENCODED_NICKNAME_KEY = makeCustomKey(encrypt(`${process.env.SECURE_IDENTIFI_KEY}`, `${process.env.SECURE_IDENTIFI_KEY_KEY}`));
// export const ENCODED_NOTIFICATION_READ_KEY = encrypt(`${process.env.SECURE_ALARM_KEY}`, `${process.env.SECURE_ALARM_KEY_KEY}`);
// export const ENCODED_PROFILE_IMAGE_KEY = makeCustomKey(encrypt(`${process.env.SECURE_IDENTIFI_KEY}`, `${process.env.SECURE_IDENTIFI_KEY_KEY}`));
