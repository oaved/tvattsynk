import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";



export default async function signIn(email: string, password: string) {

    try {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error("Error signing in user, error: ", error);
    }
}