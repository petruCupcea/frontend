export class Environment {

  production: boolean;
  perfErrorsToConsole: boolean;
  perfLogErrorsFromRequest: boolean;
  preloadAllModules: boolean;
  defaultLang: string;
  lang: Array<string>;
  apiBaseUrl: string;
  pollingIntervalInMs: number;
  updatePollingIntervalInMs: number;
  version: string;
  appName: string;
  defaultRoutes: Array<string>;
  acceptCallback: boolean;
  defaultCurrency: string;
  downloadPollingIntervalInMs: number;
  downloadTimeoutInMs: number;
  mobileVersionLink: string;
  googleAnalyticsApiKey: string;
  googleTagManagerKey: string;
  captchaId?: string;
  useHashedPassword?: boolean;
  demo?: boolean;
  foreignIbanDebounceTime: number;
  [property: string]: any;


  constructor(environment: any) {
    this.production = environment.production;
    this.perfErrorsToConsole = environment.perfErrorsToConsole;
    this.perfLogErrorsFromRequest = environment.perfLogErrorsFromRequest;
    this.preloadAllModules = environment.preloadAllModules;
    this.defaultLang = environment.defaultLang;
    this.lang = environment.lang;
    this.apiBaseUrl = environment.apiBaseUrl;
    this.pollingIntervalInMs = environment.pollingIntervalInMs;
    this.updatePollingIntervalInMs = environment.updatePollingIntervalInMs;
    this.version = environment.version;
    this.appName = environment.appName;
    this.defaultRoutes = environment.defaultRoutes;
    this.acceptCallback = environment.acceptCallback;
    this.defaultCurrency = environment.defaultCurrency;
    this.downloadPollingIntervalInMs = environment.downloadPollingIntervalInMs;
    this.downloadTimeoutInMs = environment.downloadTimeoutInMs;
    this.mobileVersionLink = environment.mobileVersionLink;
    this.googleAnalyticsApiKey = environment.googleAnalyticsApiKey;
    this.captchaId = environment.captchaId;
    this.useHashedPassword = environment.useHashedPassword;
    this.demo = environment.demo;
    this.googleTagManagerKey = environment.googleTagManagerKey;
    this.foreignIbanDebounceTime = environment.foreignIbanDebounceTime;
  }

}
