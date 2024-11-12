"use client";

import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Button from "../components/button/Button";
import styles from "./Booking.module.scss";
import { collection, QuerySnapshot, getDocs, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { auth, firestore } from "@/lib/firebaseConfig";
import { Unsubscribe } from "firebase/auth";

type Cell = {
    id: string,
    reserved: boolean,
    userId: string
}

export default function Booking() {
    const [error, setError] = useState<string | null>(null);
    const [cellDocsArr, setCellDocsArr] = useState<Cell[][]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [associationId, setAssociationId] = useState("");
    const [weekSelected, setWeekSelected] = useState<number>(0);
    const [currentWeek, setCurrentWeek] = useState<number>(0);

    function getISOWeek(date: any) {
        const firstThursday:any = new Date(date.getFullYear(), 0, 1 + (4 - new Date(date.getFullYear(), 0, 1).getDay()) % 7);
        return Math.ceil((((date - firstThursday) / 86400000) + 1) / 7);
    }

    //  Laddar in alla docs, kan vara bättre att ladda in en för sig för att minimera reads
    useEffect(() => {
        const currentUserId = localStorage.getItem("userId");
        setUserId(currentUserId);
        
        const currentAssociationId = localStorage.getItem("userAssociationId");
        if (currentAssociationId) {
            setAssociationId(currentAssociationId);
        }

        const today = new Date();
        const ISOWeek = getISOWeek(today);
        setCurrentWeek(ISOWeek);
    }, []);

    useEffect(() => {
        if (!associationId) return;
        
        setLoading(true);
        const unsubscribeFunctions: Unsubscribe[] = [];
    
        for (let i = 0; i < 4; i++) {
            const cellsColRef = collection(firestore, `associations/${associationId}/tables/week${i}/cells`);
            
            const unsub = onSnapshot(cellsColRef, (snapshot) => {
                const cellDocs: Cell[] = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                } as Cell));
    
                setCellDocsArr(prevArr => {
                    const newArr = [...prevArr];
                    newArr[i] = cellDocs;
                    return newArr;
                });
    
                if (i === 3) {
                    setLoading(false); 
                }
            });
    
            unsubscribeFunctions.push(unsub);
        }
    
        return () => {
            unsubscribeFunctions.forEach((unsub) => unsub());
        };
    }, [associationId]);
    

    function incrementWeek() {
        if (weekSelected < 3) {
            setWeekSelected(prevWeek => prevWeek + 1);
        }
    }
    function decrementWeek() {
        if (weekSelected > 0) {
            setWeekSelected(prevWeek => prevWeek - 1);
        }
    }

    async function toggleReserved(cellId: string, state: string) {
        const cellDocRef = doc(firestore, `associations/${associationId}/tables/week${weekSelected}/cells/${cellId}`)
        try {
            if (state === "free") {
                await updateDoc(cellDocRef, { reserved: true, userId: userId });
                console.log("Reserved time")
            } else if (state === "reserved") {
                await updateDoc(cellDocRef, { reserved: false, userId: "" });
                console.log("Unreserved time")
            } else if (state === "occupied") {
                console.log(state)
                console.log("Cell occupied");
            }

        } catch (error) {
            console.error("Error toggling state of cell, error: ", error);
        }
    }

    const renderTable = () => {
        if (!cellDocsArr[weekSelected]) {
            setError("cellError");
            return null;
        }
    
        const times = ["06-10", "10-14", "14-18", "18-22"];
        const cells = cellDocsArr[weekSelected];
        const numRows = 4;
        const numCols = 7;
    
        const table = [
            <div key="header" className={styles.row}>
                <div className={styles.infoCell}></div>
                <div className={styles.infoCell}>Måndag</div>
                <div className={styles.infoCell}>Tisdag</div>
                <div className={styles.infoCell}>Onsdag</div>
                <div className={styles.infoCell}>Torsdag</div>
                <div className={styles.infoCell}>Fredag</div>
                <div className={styles.infoCell}>Lördag</div>
                <div className={styles.infoCell}>Söndag</div>
            </div>
        ];
    
        for (let row = 0; row < numRows; row++) {
            const rowCells = cells.slice(row * numCols, row * numCols + numCols);
    
            const rowCellDivs = rowCells.map((cell) => {
                const userId = cell.userId;
                const state = cell.reserved
                    ? cell.userId === userId ? "reserved" : "occupied"
                    : "free";
                
                return (
                    <div
                        key={cell.id}
                        className={styles.cell}
                        data-cell-state={state}
                        data-user-id={userId}
                        onClick={() => toggleReserved(cell.id, state)}
                    ></div>
                );
            });
    
            table.push(
                <div key={row} className={styles.row}>
                    <div className={styles.infoCell}>{times[row]}</div>
                    {rowCellDivs}
                </div>
            );
        }
    
        return table;
    };
    
    if (loading) {
        return (
            <div>
                <Header />
                <h1>Loading...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Header />
                <h1>{error}</h1>
                <h1>cellDocsArr lenght{cellDocsArr.length}</h1>
            </div>
        );
    }

    return (
        <div className={styles.body}>
            <Header />
            <div className={styles.bookingContainer}>
                <div className={styles.weekSelectorContainer}>
                    <Button onClick={decrementWeek} className={styles.weekSelectorButton}>Veckan innan</Button>
                    <span className={styles.weekNumber}>{currentWeek as number + weekSelected}</span>
                    <Button onClick={incrementWeek} className={styles.weekSelectorButton}>Veckan efter</Button>
                </div>
                <div className={styles.table} role="table">
                    {renderTable()}
                </div>
            </div>
        </div>
    );
}