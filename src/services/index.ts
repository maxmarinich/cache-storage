import { Data } from '../types';

const getKey = (data: Data) => {
  const { key, method } = data;

  return key || (method && method.name) || '';
};

export const isExpired = (expire: number = 0): boolean => {
  return Date.now() > expire;
};

export const createKey = (data: Data): string => {
  return `${getKey(data)}#${generateHash(data.params)}`;
};

export const createExpirationDate = (expire: number = 0): number => {
  return Date.now() + expire;
};

export const parse = (response: any, cb?: Function): any => {
  if (cb) return cb(response);

  return response;
};

export const generateHash = (data: any): number => {
  let hash = 0;
  const string = JSON.stringify(data) || '';

  if (string.length) {
    let i, l, char;

    for (i = 0, l = string.length; i < l; i++) {
      char = string.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash | 0;
    }
  }

  return hash;
};
