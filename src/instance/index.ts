import { NAMESPACE } from '../constants';
import { Parameters, Options, Result } from '../types';
import { parse, createKey, createExpirationDate, isExpired } from '../services';

export default async (parameters: Parameters, options: Options): Promise<Result> => {
  const key = createKey(parameters);
  const { onSave, onReceive, onInvalidate, logger, responseParser } = options;

  try {
    const result = onReceive && (await onReceive(key));
    const invalidate = parameters.invalidate || (result && isExpired(result.expire));

    if (invalidate) {
      logger && logger(`${NAMESPACE} -> cache is invalidated: ${key}`);

      onInvalidate && (await onInvalidate(key));
    } else if (result) {
      logger && logger(`${NAMESPACE} -> retrieved from cache ${key}: `, result);

      return result;
    }
  } catch (e) {
    logger && logger(`${NAMESPACE} -> error: ${e.message}`);
  }

  const { method, params = [], expire } = parameters;

  const response = await method(...params);
  const responseParsed = parse(response, responseParser);
  const result = { data: responseParsed, expire: createExpirationDate(expire) };

  onSave && (await onSave(key, result));

  return result;
};
