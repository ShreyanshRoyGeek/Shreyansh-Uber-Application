import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth, } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyDvUgu43k82iAZBcjDZ1brK4yoA_8Fc_4k",
  authDomain: "shreyansh-uber.firebaseapp.com",
  projectId: "shreyansh-uber",
  storageBucket: "shreyansh-uber.appspot.com",
  messagingSenderId: "804894604999",
  appId: "1:804894604999:web:a0617051565bf68cb208e2",
  measurementId: "G-GXEL2E6V8H"
};


const app = initializeApp(firebaseConfig)
const provider = new GoogleAuthProvider()
const auth = getAuth()

export { app, provider, auth}