export interface Options {
  onSave?: (key: string, value: any) => any;
  onReceive?: (key: string) => any;
  onInvalidate?: (key: string) => any;
  logger?: Function;
  responseParser?: Function;
}

export interface Data {
  method: Function;
  params?: Array<any>;
  key?: string;
  expire?: number;
  invalidate?: boolean;
}

export interface Value {
  data: any;
  expire: number;
}
