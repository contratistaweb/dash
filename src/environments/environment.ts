// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlDB: 'https://dash-proyect-default-rtdb.firebaseio.com',
  firebaseConfig : {
    apiKey: "AIzaSyBNhQwkPkPILc7id_h5D11XV8_YXbboiKM",
    authDomain: "dash-proyect.firebaseapp.com",
    projectId: "dash-proyect",
    storageBucket: "dash-proyect.appspot.com",
    messagingSenderId: "955823278471",
    appId: "1:955823278471:web:d09ecf19e2e4e943ceab22"
  },
  unplash:{
    url: 'https://api.unsplash.com',
    accesskey: 'wu8eoz0D0L9KavouaQ1Fs8wakVF2wjI0TSGiHvJAxhc'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
