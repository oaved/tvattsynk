"use client";

import Header from "../components/header/Header";
import Button from "../components/button/Button";
import adminSignUp from "@/lib/adminSignUp";
import styles from "./AdminSignUp.module.scss"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminSignUp() {
    const router = useRouter();
    const [associationName, setAssociationName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    
    function handleAssociationNameChange(event: any) {
        setAssociationName(event.target.value);  
    }
    function handleEmailChange(event: any) {
        setEmail(event.target.value);
    }
    function handleUsernameChange(event: any) {
        setAssociationName(event.target.value);  
    }
    function handlePasswordChange(event: any) {
        setPassword(event.target.value);
    }

    async function handleClick() {
        try {
            await adminSignUp(associationName, email, username, password);
            router.push("/account");
        } catch (error) {
            console.error("Error signing up admin, error: ", error);
        }
        
    }

    return (
        <div className={styles.body}>
            <Header />
            <h2 className={styles.heading}>Registrera din förening</h2>
            <p>Kul att du vill göra skillnad och gå med i framtiden!</p>
            <p>Här registrerar en person sig som kommer att agera som ansvarig för systemet</p>
            <div className={styles.container}>
                <label className={styles.label} htmlFor="associationName">Föreningens namn</label>
                <input className={styles.input} type="text" id="assocationName" onChange={handleAssociationNameChange} />
                <label className={styles.label} htmlFor="email">Mejladress</label>
                <input className={styles.input} type="email" id="email" onChange={handleEmailChange}/>
                <label className={styles.label} htmlFor="username">Ditt användarnamn som ansvarig</label>
                <input className={styles.input} type="text" id="username" onChange={handleUsernameChange} />
                <label className={styles.label} htmlFor="password">Lösenord</label>
                <input className={styles.input} type="password" id="password" onChange={handlePasswordChange}/>
                <Button onClick={handleClick} className={styles.button}>Logga in</Button>
            </div>
        </div>
    );
}