export interface Options {
  onSave?: (key: string, value: any) => any;
  onReceive?: (key: string) => any;
  onInvalidate?: (key: string) => any;
  responseParser?: (response: any) => any;
  logger?: Function;
}

export interface Parameters {
  method: Function;
  params?: Array<any>;
  key?: string;
  expire?: number;
  invalidate?: boolean;
}

export interface Result {
  data: any;
  expire: number;
}
