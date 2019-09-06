import { Data } from "../types";

const getKey = (key?: string, method?: Function) => {
  return key || (method && method.name) || "";
};

export const isExpired = (expire: number): boolean => {
  return Date.now() > expire;
};

export const createKey = (data: Data): string => {
  const { key, method, params } = data;

  return `${getKey(key, method)}#${generateHash(params)}`;
};

export const createExpirationDate = (expire: number = 0): number => {
  return Date.now() + expire;
};

export const parse = (response: any, cb?: Function): any => {
  return (cb && cb(response)) || response;
};

export const generateHash = (data: any): number => {
  let hash = 0;
  const string = JSON.stringify(data) || "";

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
