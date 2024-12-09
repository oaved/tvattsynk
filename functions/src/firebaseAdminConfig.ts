import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";


const admin = initializeApp({
    credential: applicationDefault(),
});
const adminDb = getFirestore(admin);

export { adminDb };
