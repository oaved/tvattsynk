"use client";

import Header from "../components/header/Header";
import Button from "../components/button/Button";
import styles from "./userSignUp.module.scss"
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

//  test URL: localhost:3000/userSignUp?id=TUwFpBmgcLloBf1S9MnY
//  registrering för glunten

export default function UserSignUp() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const associationId = searchParams.get("id");

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    function handleEmailChange(event: any) {
        setEmail(event.target.value);
    }
    function handleUsernameChange(event: any) {
        setUsername(event.target.value);  
    }
    function handlePasswordChange(event: any) {
        setPassword(event.target.value);
    }

    function handleClick() {

    }

    return (
        <div className={styles.body}>
            <Header />
            <h2 className={styles.heading}>Registrera din till din förening</h2>
            <p>Kul att du vill göra skillnad och gå med i framtiden!</p>
            <div className={styles.container}>
                <label className={styles.label} htmlFor="email">Mejladress</label>
                <input className={styles.input} type="email" id="email" onChange={handleEmailChange}/>
                <label className={styles.label} htmlFor="username">Användarnamn</label>
                <input className={styles.input} type="text" id="username" onChange={handleUsernameChange} />
                <label className={styles.label} htmlFor="password">Lösenord</label>
                <input className={styles.input} type="password" id="password" onChange={handlePasswordChange}/>
                <Button onClick={handleClick} className={styles.button}>Registrera</Button>
            </div>
        </div>
    );
}