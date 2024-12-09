import { onRequest } from "firebase-functions/https";
import { adminDb } from "./firebaseAdminConfig";
import generateIdArr from "./generateIdArr";
import * as cors from "cors";

//  Not really a user profile, should be associationId instead of assciationName
type User = {
    userId: string,
    username: string,
    associationName: string,
    email: string,
    role: string
}

const corsMiddleware = cors({ origin: "http://localhost:3000" });

export const handleAdminSignUp = onRequest({ region: "europe-north1" }, async (request, response) => {
    corsMiddleware(request, response, async () => {
        if (request.method != "POST") {
            response.status(400).send("Method not allowed");
            return;
        }

        const { userId, username, associationName, email, role }: User = request.body;
        if (!userId || !role) {
            console.error("userId or role was not specified");
            response.send("Something was wrong, sorry...");
            return;
        }

        if (role != "admin") {
            console.log("User registered was not asigned admin");
        }

        try {
            const associationDocRef = await createAssociation(associationName, userId);
            if (!associationDocRef) {
                throw new Error("Error creating assocition");
            }

            const userRef = adminDb.collection("allUsers").doc(userId);
            await userRef.set({
                email: email,
                username: username,
                associationId: associationDocRef.id,
                role: role,
            }, { merge: true });
            console.log("user added to allUsers");

            const subcollections = await createAssociationSubCollections(
                associationDocRef,
                userRef,
                email,
                username,
                role
            );

            if (!subcollections) {
                throw new Error("Error creating subcollections to association");
            }

            await createCells(subcollections.tablesColRef);
            console.log("Successfully handled admin sign up");
            response.send("Sucessfully handled admin sign up");
            return;
        } catch (error) {
            console.error("Error setting user reference in allUser collection");
            response.status(500).send("Internal Server Error");
            return;
        }
    });
});

async function createAssociation(associationName: string, adminId: string) {
    try {
        const associationDocRef = adminDb.collection("associations").doc();
        await associationDocRef.set({
            admin: adminId,
            name: associationName,
        });
        console.log("assoction was completed successfully");
        return associationDocRef;
    } catch (error) {
        console.log("error creating association, error: ", error);
        return null;
    }
}

function getISOWeek(date: any) {
    const firstThursday: any = new Date(date.getFullYear(), 0, 1 + (4 - new Date(date.getFullYear(), 0, 1).getDay()) % 7);
    return Math.ceil((((date - firstThursday) / 86400000) + 1) / 7);
}

async function createAssociationSubCollections(
    associationDocRef: FirebaseFirestore.DocumentReference,
    userRef: FirebaseFirestore.DocumentReference,
    email: string,
    username: string,
    role: string
) {
    try {
        const usersColRef = associationDocRef.collection("users");
        const adminUserDocRef = usersColRef.doc(userRef.id);
        await adminUserDocRef.set({
            email: email,
            username: username,
            associationId: associationDocRef.id,
            role: role,
        }, { merge: true });
        console.log("Created users collection successfully");

        const tablesColRef = associationDocRef.collection("tables");
        for (let i = 0; i < 4; i++) {
            tablesColRef.doc(`week${i}`).set({});
        }
        console.log("Created tables collection successfully");

        return ({ usersColRef: usersColRef, tablesColRef: tablesColRef });
    } catch (error) {
        console.log("Error creating associations subcollections, error: ", error);
        return null;
    }
}

async function createCells(tablesColRef: FirebaseFirestore.CollectionReference) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentWeek = getISOWeek(today);


    for (let i = 0; i < 4; i++) {
        const cellsColRef = tablesColRef.doc(`week${i}`).collection("cells");
        const cellIds = generateIdArr(currentYear, currentWeek + i);

        for (let i = 0; i < cellIds.length; i++) {
            try {
                const cellDocRef = cellsColRef.doc(cellIds[i]);
                await cellDocRef.set({
                    reserved: false,
                    userId: "",
                });
            } catch (error) {
                console.error("Error setting celldocs, error: ", error);
            }
        }
    }
}

