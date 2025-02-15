import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
// import { APIKEY,AUTHDOMAIN,PROJECT_ID,MESSAGINGSENDER_ID,APP_ID,MEASUREMENT_ID } from "@/utils/constants";
import 'firebase/storage'


const firebaseConfig = {
    apiKey: 'AIzaSyCdgdhyA8_JIc2bZsWgKROLYHnn0JcQm6k',
    authDomain: 'job-club-5f5bb.firebaseapp.com',
    projectId: 'job-club-5f5bb',
    storageBucket:'job-club-5f5bb.appspot.com',
    messagingSenderId: '15783840151',
    appId: '1:15783840151:web:3713e6cad3f756a4be9cd2',
    measurementId:'G-PK7WH3YYCY'
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth




// NEXT_PUBLIC_APIKEY=AIzaSyCdgdhyA8_JIc2bZsWgKROLYHnn0JcQm6k
// NEXT_PUBLIC_AUTHDOMAIN=job-club-5f5bb.firebaseapp.com
// NEXT_PUBLIC_PROJECT_ID=job-club-5f5bb
// NEXT_PUBLIC_STORAGEBUCKET=job-club-5f5bb.appspot.com
// NEXT_PUBLIC_MESSAGINGSENDER_ID=15783840151
// NEXT_PUBLIC_APP_ID=1:15783840151:web:3713e6cad3f756a4be9cd2
// NEXT_PUBLIC_MEASUREMENT_ID=G-PK7WH3YYCY

