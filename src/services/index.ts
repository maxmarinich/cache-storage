import { Parameters } from '../types';

const getKey = (parameters: Parameters) => {
  const { key, method } = parameters;

  return key || (method && method.name) || '';
};

export const isExpired = (expire: number = 0): boolean => {
  return Date.now() > expire;
};

export const createKey = (parameters: Parameters): string => {
  return `${getKey(parameters)}#${generateHash(parameters.params)}`;
};

export const createExpirationDate = (expire: number = 0): number => {
  return Date.now() + expire;
};

export const parse = (response: any, cb?: Function): any => {
  if (cb) return cb(response);

  return response;
};

export const generateHash = (params: any): number => {
  let hash = 0;
  const string = JSON.stringify(params) || '';

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
