// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDFcoePGsyuWtpOI2Xn3O1kJBLcVObxuxI',
  authDomain: 'todo-app-6e2e7.firebaseapp.com',
  projectId: 'todo-app-6e2e7',
  storageBucket: 'todo-app-6e2e7.appspot.com',
  messagingSenderId: '844328423075',
  appId: '1:844328423075:web:27d9189a958fb59b32f916',
  measurementId: 'G-WG56BBGZGW',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default app;

export { app, analytics, db, auth };
