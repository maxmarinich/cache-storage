export interface Options {
  onSave?: (key: string, value: any) => any;
  onReceive?: (key: string) => any;
  onInvalidate?: (key: string) => any;
  logger?: (message: string) => any;
  responseParser?: (response: any) => any;
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
