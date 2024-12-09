import { Request, Response } from "@google-cloud/functions-framework";
import { adminDb } from "./firebaseAdminConfig";
import generateIdArr from "./generateIdArr";
import { onRequest } from "firebase-functions/https";

function getISOWeek(date: any) {
    const firstThursday: any = new Date(date.getFullYear(), 0, 1 + (4 - new Date(date.getFullYear(), 0, 1).getDay()) % 7);
    return Math.ceil((((date - firstThursday) / 86400000) + 1) / 7);
}

export const updateCells = onRequest({ region: "europe-north1" }, async (request: Request, response: Response) => {
    try {
        const rawBody = request.body;
        const parsedBody = JSON.parse(rawBody.toString("utf-8"));

        if (parsedBody.source as string !== "cloud-scheduler") {
            console.log("Request didn't come from scheduler, I won't update the cells");
            response.status(400).send("Invalid request source");
            return;
        }

        const associationsColRef = adminDb.collection("associations");
        const associationsSnapshot = await associationsColRef.get();

        for (const associationDoc of associationsSnapshot.docs) {
            const tablesColRef = associationDoc.ref.collection("tables");

            for (let i = 0; i < 3; i++) {
                const prevWeekDocRef = tablesColRef.doc(`week${i}`);
                const currWeekDocRef = tablesColRef.doc(`week${i + 1}`);

                // Delete all cells in prevWeek
                const prevWeekCellsSnapshot = await prevWeekDocRef.collection("cells").get();
                for (const cell of prevWeekCellsSnapshot.docs) {
                    await cell.ref.delete();
                }

                // Copy all cells from currWeek to prevWeek
                const currWeekCellsSnapshot = await currWeekDocRef.collection("cells").get();
                for (const cell of currWeekCellsSnapshot.docs) {
                    await prevWeekDocRef.collection("cells").doc(cell.id).set(cell.data());
                }
            }

            // Clear week3's cells after shifting
            const week3CellsColRef = tablesColRef.doc("week3").collection("cells");
            const week3CellsSnapshot = await week3CellsColRef.get();
            for (const cell of week3CellsSnapshot.docs) {
                await cell.ref.delete();
            }
            await createNewWeek(tablesColRef);
        }

        console.log("success updating cells");
        response.status(200).send("Sucessful update");
        return;
    } catch (error) {
        console.error("Error occured updating cells, error: ", error);
        response.status(400).send("Bad request, something went wrong");
        return;
    }
});

async function createNewWeek(tablesColRef: FirebaseFirestore.CollectionReference) {
    const today = new Date();
    const week3 = getISOWeek(today) + 3;
    const cellsColRef = tablesColRef.doc("week3").collection("cells");
    const cellIds = generateIdArr(today.getFullYear(), week3);

    for (const cellId of cellIds) {
        try {
            const cellDocRef = cellsColRef.doc(cellId);
            await cellDocRef.set({
                reserved: false,
                userId: "",
            });
        } catch (error) {
            console.error("Error creating new week3 cells:", error);
        }
    }
}

