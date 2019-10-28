import { Parameters, Options, Result } from './types';
import instance from './instance';

let options = {};

const configure = (props: Options): void => {
  options = { ...props };
};

const ms = (parameters: Parameters): Promise<Result> => {
  return instance(parameters, options);
};

export { ms as default, configure };
