// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDpk_mUoasb8wKKG5PQsGxXlmzkSPHSqE",
  authDomain: "rideshare-buddy-5d50f.firebaseapp.com",
  projectId: "rideshare-buddy-5d50f",
  storageBucket: "rideshare-buddy-5d50f.appspot.com",
  messagingSenderId: "564464497103",
  appId: "1:564464497103:web:6e48eed25143b3559422ba",
  measurementId: "G-2CGD5RDYWD"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };