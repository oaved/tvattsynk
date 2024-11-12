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
    const [association, setAssociation] = useState<string | null>(null);

    useEffect(() => {
        const userRole = localStorage.getItem("userRole");
        setRole(userRole);

        let userUsername = localStorage.getItem("userUsername");
        if (userUsername) {
            userUsername = userUsername.charAt(0).toUpperCase() + userUsername.slice(1).toLowerCase();
        }
        setUsername(userUsername);

        let userAssociation = localStorage.getItem("userAssociation");
        if (userAssociation) {
            userAssociation = userAssociation.charAt(0).toUpperCase() + userAssociation.slice(1).toLowerCase();
        }
        setAssociation(userAssociation);
    })

    async function handleClick() {
        try {
            await signOut(auth);
            router.push("/");
        } catch (error) {
            console.error("Error signing out user, error: ", error);
        }
        
    }

    return (
        <div className={styles.page}>
            <Header />
            <div className={styles.body} role="body">
                <h1 className={styles.greeting}>Hej {username}!</h1>
                <p>Det är en bra dag att tvätta</p>
            <Button onClick={handleClick} className={styles.button}>Logga ut</Button>
        </div>
        </div>
        
    );
}