import { Data, Options, Result } from './types';
import instance from './instance';

let options = {};

const configure = (props: Options): void => {
  options = { ...props };
};

const ms = (data: Data): Promise<Result> => {
  return instance(data, options);
};

export { ms as default, configure };
