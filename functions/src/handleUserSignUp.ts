import { onRequest } from "firebase-functions/https";
import { adminDb } from "./firebaseAdminConfig";
import * as cors from "cors";

type User = {
    userId: string,
    username: string,
    associationId: string,
    email: string,
    role: string
}

const corsMiddleware = cors( {origin: "http://localhost:3000"});

export const handleUserSignUp = onRequest({ region: "europe-north1" }, async (request, response) => {
    corsMiddleware(request, response, async () => {
        if (request.method !== "POST") {
            response.status(405).send("method not allowed");
            return;
        }

        const { userId, username, associationId, email, role}: User = request.body;
        if (!userId || !username || !associationId || !email || !role) {
            console.log("Hello 5 from inside if statement about req.body");
            console.log(`
                userId: ${userId}, 
                username: ${username}, 
                associationId: ${associationId}, 
                email: ${email}, 
                role: ${role}`
            );
        }

        if (role === "admin") {
            console.log("User role was admin during user sign up, something wrong");
            response.status(400).send("bad request");
            return;
        }

        try {
            const allUsersUserRef = adminDb.collection("allUsers").doc(userId);
            await allUsersUserRef.set({
                email: email,
                username: username,
                associationId: associationId,
                role: role,
            }, { merge: true });
            console.log("user added to allUsers");

            const associationUserRef = adminDb.collection(`associations/${associationId}/users`).doc(userId);
            await associationUserRef.set({
                email: email,
                username: username,
                associationId: associationId,
                role: role,
            }, { merge: true });
            console.log("user added to assocation");

            console.log("successfully handled user sign up");
            response.status(200).send("successfully handled user sign up");
            return;
        } catch (error) {
            console.log("Error handling user sign up. Error: ", error);
            response.send(500).send("Internal server error, whoopsie");
            return;
        }
    });
});

