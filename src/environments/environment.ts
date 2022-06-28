// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  app_version: '1.0.1',
  production: false,
  whiteList: [
    'localhost:44301',
    'mange.sales-portal.com'
  ],
  //firebaseConfig: {
  //  apiKey: 'AIzaSyCOzw1E5T3ZTrt9EyBizJW6eOpiqkMCUSQ',
  //  authDomain: 'a2b-project.firebaseapp.com',
  //  databaseURL: 'https://a2b-project.firebaseio.com',
  //  projectId: 'a2b-project',
  //  storageBucket: 'a2b-project.appspot.com',
  //  messagingSenderId: '593467005661',
  //  appId: '1:593467005661:web:a102d1f57feeebd95d9934',
  //  measurementId: 'G-QTJP56LFSQ'
  //}
};
