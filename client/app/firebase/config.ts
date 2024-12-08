import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { APIKEY,AUTHDOMAIN,PROJECT_ID,MESSAGINGSENDER_ID,APP_ID,MEASUREMENT_ID } from "@/utils/constants";
import 'firebase/storage'


const firebaseConfig = {
    apiKey: APIKEY,
    authDomain: AUTHDOMAIN,
    projectId: PROJECT_ID,
    storageBucket:'job-club-5f5bb.appspot.com',
    messagingSenderId: MESSAGINGSENDER_ID,
    appId: APP_ID,
    measurementId:MEASUREMENT_ID 
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth



