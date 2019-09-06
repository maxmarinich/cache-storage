import { NAMESPACE } from "../constants";
import { Data, Options } from "../types";
import { parse, createKey, createExpirationDate, isExpired } from "../services";

export default async (data: Data, options: Options): Promise<any> => {
  const key = createKey(data);
  const { onSave, onReceive, onInvalidate, logger, responseParser } = options;

  try {
    const value = onReceive && (await onReceive(key));
    const invalidate = data.invalidate || (value && isExpired(value.expire));

    if (invalidate) {
      onInvalidate && (await onInvalidate(key));
      logger && logger(`${NAMESPACE} -> cache is invalidated: ${key}`);
    }

    if (value) {
      logger && logger(`${NAMESPACE} -> retrieved from cache: ${value}`);

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

  return responseParsed;
};
