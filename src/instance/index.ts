import { NAMESPACE } from '../constants';
import { Data, Options, Result } from '../types';
import { parse, createKey, createExpirationDate, isExpired } from '../services';

export default async (data: Data, options: Options): Promise<Result> => {
  const key = createKey(data);
  const { onSave, onReceive, onInvalidate, logger, responseParser } = options;

  try {
    const value = onReceive && (await onReceive(key));
    const invalidate = data.invalidate || (value && isExpired(value.expire));

    if (invalidate) {
      logger && logger(`${NAMESPACE} -> cache is invalidated: ${key}`);

      onInvalidate && (await onInvalidate(key));
    } else if (value) {
      logger && logger(`${NAMESPACE} -> retrieved from cache ${key}: `, value);

      return value;
    }
  } catch (e) {
    logger && logger(`${NAMESPACE} -> error: ${e.message}`);
  }

  const { method, params = [], expire } = data;

  const response = await method(...params);
  const responseParsed = parse(response, responseParser);
  const value = { data: responseParsed, expire: createExpirationDate(expire) };

  onSave && (await onSave(key, value));

  return value;
};
