import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyA0urvD4B_pIbx984vTwGpke89cjMVl6rw',
  authDomain: 'cinemapp-auth.firebaseapp.com',
  projectId: 'cinemapp-auth',
  storageBucket: 'cinemapp-auth.appspot.com',
  messagingSenderId: '152185057179',
  appId: '1:152185057179:web:a1d2a303d9d241a6acfb3e',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
