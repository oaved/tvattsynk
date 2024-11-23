"use client";

import styles from "./Account.module.scss";
import Header from "../components/header/Header";
import Button from "../components/button/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

export default function Account() {
    const router = useRouter();
    const [role, setRole] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [associationId, setAssociationId] = useState<string | null>(null)
    const [associationName, setAssociationName] = useState<string | null>(null);

    useEffect(() => {
        const userRole = localStorage.getItem("userRole");
        setRole(userRole);

        let userUsername = localStorage.getItem("userUsername");
        if (userUsername) {
            userUsername = userUsername.charAt(0).toUpperCase() + userUsername.slice(1).toLowerCase();
        }
        setUsername(userUsername);

        const userAssociationId = localStorage.getItem("userAssociationId");
        setAssociationId(userAssociationId);

        let userAssociation = localStorage.getItem("userAssociationName");
        if (userAssociation) {
            userAssociation = userAssociation.charAt(0).toUpperCase() + userAssociation.slice(1).toLowerCase();
        }
        setAssociationName(userAssociation);
    })

    async function handleClick() {
        try {
            await signOut(auth);
            router.push("/");
        } catch (error) {
            console.error("Error signing out user, error: ", error);
        }
        
    }
    if (role === "admin") {
        return (
            <div className={styles.page}>
                <Header />
                <div className={styles.body} role="body">
                    <h1 className={styles.greeting}>Hej {username}!</h1>
                    <p>{associationName}</p>
                    <p>Det är en bra dag att tvätta</p>
                    <p>Vill du bjuda in en medlem från din förening?</p>
                    <p>Kopiera denna länk och skicka den till personen, då kommer den kunna skapa ett konto och registrera sig mot din förening</p>
                    <p>https://tvattsynk.se/login?id={associationId}</p>
                    
                <Button onClick={handleClick} className={styles.button}>Logga ut</Button>
            </div>
            </div>
            
        );
    } else {
        return (
            <div className={styles.page}>
                <Header />
                <div className={styles.body} role="body">
                    <h1 className={styles.greeting}>Hej {username}!</h1>
                    <p>{associationName}</p>
                    <p>Det är en bra dag att tvätta</p>
                <Button onClick={handleClick} className={styles.button}>Logga ut</Button>
            </div>
            </div>
            
        );
    }

}