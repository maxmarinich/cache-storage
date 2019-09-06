import { Data } from '../types';

export const isExpired = (expire: number): boolean => {
  return Date.now() > expire;
};

export const getHash = (data: Data): string => {
  const { key, method, params } = data;

  return `${getKey(key, method)}#${createHash(params)}`;
};

export const getKey = (key?: string, method?: Function) => {
  return key || (method && method.name) || '';
};

export const getExpire = (expire: number): number => {
  return Date.now() + expire;
};

export const createHash = (data: any): number => {
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
