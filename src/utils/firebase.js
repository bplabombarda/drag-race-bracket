import * as firebase from 'firebase/app';
import 'firebase/firestore';

// These environment variables are replaced by
// Webpack's DefinePlugin as time of build.
const app = firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  appId: process.env.FIREBASE_APP_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
});

export default app;
