import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";


export default async function userSignUp(email: string, password: string, username: string, associationId: string) {
    try {
        //  auth
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCred.user;

    //  firestore
    const response = await fetch(process.env.NEXT_PUBLIC_USER_SIGN_UP_URL as string, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: user.uid,
            email: email,
            username: username,
            associationId: associationId,
            role: "user"
        }),
    });

    if (!response.ok) {
        console.log("response was not okay");
        throw new Error("Error during user sign up");
    }

    console.log("User sign up was successfull");
    return userCred
    } catch (error) {
        console.log("Error signing up user, error: ", error);
        return error;
    }

}
