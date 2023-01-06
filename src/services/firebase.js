
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCjZ5Zb8V2PYw5aWgdSNP0X68Ss9R__Mf8',
  authDomain: 'drivent-a1270.firebaseapp.com',
  projectId: 'drivent-a1270',
  storageBucket: 'drivent-a1270.appspot.com',
  messagingSenderId: '79520320412',
  appId: '1:79520320412:web:c65906ee1efebf0b189659'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
