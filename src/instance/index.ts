import { Data, Options } from '../types';
import { getHash, getExpire, isExpired } from '../services';

export const cache = async (data: Data, options: Options): Promise<any> => {
  const { onSave, onReceive, onInvalidate } = options;
  const hash = getHash(data);

  try {
    const result = onReceive && (await onReceive(hash));

    if (isExpired(result.expires) || data.invalidate) {
      onInvalidate && (await onInvalidate(hash));
      console.debug(`Cache-storage: cache is invalidated -> ${hash}`);
    }

    if (result) {
      console.debug(`Cache-storage: retrieved from cache -> ${result}`);

      return { data: result.data };
    }
  } catch (e) {
    console.error(`Cache-storage: error -> ${e.message}`);
  }

  const { method, params = [], expire = 0 } = data;
  const response = (await method(...params)) || {};
  const value = { data: response.data, expire: getExpire(expire) };

  onSave && (await onSave(hash, value));

  return { data: response.data };
};
