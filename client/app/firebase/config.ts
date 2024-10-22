import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyCdgdhyA8_JIc2bZsWgKROLYHnn0JcQm6k",
    authDomain: "job-club-5f5bb.firebaseapp.com",
    projectId: "job-club-5f5bb",
    storageBucket: "job-club-5f5bb.appspot.com",
    messagingSenderId: "15783840151",
    appId: "1:15783840151:web:3713e6cad3f756a4be9cd2",
    measurementId: "G-PK7WH3YYCY"
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth

//config and export in main.js no need to wrap then go to signup page and get from firebase/auth