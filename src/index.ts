import { Data, Options } from './types';
import { cache } from './instance';

let options = {};

const configure = (params: Options) => {
  options = params || {};
};

const restCache = (data: Data) => cache(data, options);

export { restCache as default, configure };
