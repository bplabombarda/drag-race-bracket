import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';

// These environment variables are replaced by
// Webpack's DefinePlugin as time of build.
const app = firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  appId: process.env.FIREBASE_APP_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  measurementId: "G-9F82WEFYWX"//process.env.FIREBASE_MEASUREMENT_ID,
});

firebase.analytics(app);

export default app;
