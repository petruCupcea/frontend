// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appVersion: 1,
  sslCertMode: 'nocheck',
  backendUrl: 'http://localhost:3000',
  systemDownUrl: 'http://localhost:3000/mentenanta.txt',
  sessionInterval: 30 * 60 * 1000,
  pollingIntervalInMs: 3000,
  searchDelayInMs: 700,
  defaultLang: 'ro',
  languages: [{
    language: 'ro',
    translation: 'RO_SHORT',
  }, {
    language: 'en',
    translation: 'EN_SHORT',
  }],
  firstTimeStorageKey: 'launchAppDev',
  storageAlias: 'shop--dev--storage',
  hashLoginPassword: false,
  defaultCurrency: 'RON',
  defaultTranslates: {
    ro: {
      NETWORK_CONNECTION_ERROR_MESSAGE: 'Eroare de rețea! Vă rugăm verificați conexiunea la internet.',
      UNTRUSTED_SERVER_CERTIFICATE_MESSAGE: 'Certificatul serverului nu este recunoscut. Vă rugăm să actualizați aplicația!',
      DEVICE_IS_ROOTED_MSG_ANDROID: 'Aplicația nu poate fi utilizată pe un dispozitiv cu root.',
      DEVICE_IS_ROOTED_MSG_IOS: 'Aplicația nu poate fi utilizată pe un dispozitiv cu jailbroken.',
      UPDATE_MESSAGE: 'Vă rugăm să actualizați aplicația!',
      UPDATE_SOON_MESSAGE: 'Versiunea curentă a aplicației expiră în curând. Te rugăm să o actualizezi!',
    },
    en: {
      NETWORK_CONNECTION_ERROR_MESSAGE: 'Network error! Please check your internet connection.',
      UNTRUSTED_SERVER_CERTIFICATE_MESSAGE: 'Untrusted server certificate. Please update the application!',
      DEVICE_IS_ROOTED_MSG_ANDROID: 'The application cannot be used on a rooted device.',
      DEVICE_IS_ROOTED_MSG_IOS: 'The application cannot be used on a jailbroken device.',
      UPDATE_MESSAGE: 'Please update your application!',
      UPDATE_SOON_MESSAGE: 'The current version of your application will expire soon. Please update!',
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
