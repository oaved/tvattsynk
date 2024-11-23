import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, onAuthStateChanged, setPersistence } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASURMENT_ID
};

const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app)
const auth = getAuth(app)

async function mySetPersistence() {
    try {
        await setPersistence(auth, browserLocalPersistence)
    } catch (error) {
        console.error("Error setting auth persitance, error: ", error);
    }
}

mySetPersistence();


let currentUserUsername = null;
let currentUserRole = null;
let currentUserAssociationId = null;
let currentUserdId = null;
const unsub = onAuthStateChanged(auth, async (user) => {
    if (typeof window !== "undefined") { // Only if client side
        if (user) {
            const userDocRef = doc(firestore, "allUsers", user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                currentUserUsername = userDoc.data().username;
                localStorage.setItem("userUsername", currentUserUsername);
                currentUserRole = userDoc.data().role;
                localStorage.setItem("userRole", currentUserRole)
                currentUserAssociationId = userDoc.data().associationId;
                localStorage.setItem("userAssociationId", currentUserAssociationId);
                currentUserdId = userDoc.id;
                localStorage.setItem("userId", currentUserdId);

                const associationDocRef = doc(firestore, `associations/${currentUserAssociationId}`);
                const associationSnapshot = await getDoc(associationDocRef);
                if (associationSnapshot.exists()) {
                    localStorage.setItem("userAssociationName", associationSnapshot.data().name);
                }
            }
        } else {
            localStorage.removeItem("userUsername");
            localStorage.removeItem("userRole");
            localStorage.removeItem("userAssociationId");
            localStorage.removeItem("userAssociationName");
        }
    }
});




export { auth, firestore }