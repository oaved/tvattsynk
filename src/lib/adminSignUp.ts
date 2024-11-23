import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default async function adminSignUp(associationName: string, adminEmail:string, adminUsername: string, adminPassword: string) {
    try {
        const userCred = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
        console.log("I get here in adminSignUp");
        console.log(process.env.NEXT_PUBLIC_ADMIN_SIGN_UP_API_KEY as string)
        const user = userCred.user;

        const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_SIGN_UP_API_KEY as string, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: user.uid,
                email: adminEmail,
                username: adminUsername,
                associationName: associationName,
                role: "admin"
            }),
        });
        console.log("And i get here, point 2")
        console.log(response)
        console.log(await response.text());

        if (!response.ok) {
            console.log("response was not ok")
            throw new Error("Error during admin signup");
        }

        console.log("Admin sign up successful");
        return userCred;
    } catch (error) {
        console.log("I am inside the catch error block")
        return (error);
    }
}