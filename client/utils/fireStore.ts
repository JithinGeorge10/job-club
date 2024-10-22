import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../app/firebase/config";
import { getFirestore } from '@firebase/firestore'
import { USER_SERVICE_URL } from "./constants";
import axios from "axios";
// import { apiClient } from "../lib/api-client";
// import { UPLOAD_URL } from "./Constants";
const db = getFirestore(app);

export async function uploadImagesToFireStore( file: any) {
    try {
        console.log(file)
        const storage = getStorage();
        const storageRef = ref(storage, `resume/${file.name}`)
        console.log(storageRef);
        
            await uploadBytes(storageRef, file).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });
        let url = await getDownloadURL(storageRef);
        console.log(url)
        return url
        
    } catch (error) {
        console.log(error);

    }
}


