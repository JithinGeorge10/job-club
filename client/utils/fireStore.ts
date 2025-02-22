import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../app/firebase/config";
import { getFirestore } from '@firebase/firestore'



// import { UPLOAD_URL } from "./Constants";
const db = getFirestore(app);

export async function uploadImagesToFireStore( file: any) {
    try {
        const storage = getStorage();
        const storageRef = ref(storage, `resume/${file.name}`)
        
            await uploadBytes(storageRef, file).then((snapshot) => {
                console.log('Uploaded a blob or file!');
            });
        let url = await getDownloadURL(storageRef);
        return url
        
    } catch (error) {
        console.log(error);

    }
}


