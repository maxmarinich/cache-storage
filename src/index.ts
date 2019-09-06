import { Data, Options } from "./types";
import instance from "./instance";

let options = {};

const configure = (props: Options): void => {
  options = { ...props };
};

const cacheStorage = (data: Data) => {
  return instance(data, options);
};

export { cacheStorage as default, configure };
