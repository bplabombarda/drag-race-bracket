import { initializeApp } from 'firebase/app';

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
});

export default app;
