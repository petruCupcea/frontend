export class RequestsModuleConfig {

  version: string;
  apiBaseUrl: string;
  customHeaders?: {[headerName: string]: () => string};


  constructor(config: RequestsModuleConfig) {
    this.version = config.version;
    this.apiBaseUrl = config.apiBaseUrl;
    this.customHeaders = (config.customHeaders || {});
  }

}
