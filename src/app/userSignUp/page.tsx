"use client";

import Header from "../components/header/Header";
import Button from "../components/button/Button";
import styles from "./userSignUp.module.scss";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense, ChangeEvent } from "react";
import userSignUp from "../../lib/userSignUp";

//  Test URL: localhost:3000/userSignUp?id=TUwFpBmgcLloBf1S9MnY
//  Registrering för glunten

function UserSignUpForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const associationId = searchParams?.get("id");

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }
    function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }
    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    async function handleClick() {
        try {
            if (associationId) {
                await userSignUp(email, password, username, associationId);
                router.push("/account");
            }
        } catch (error) {
            console.error("Error signing up admin, error:", error);
        }
    }

    if (!associationId) {
        return (
            <div className={styles.body}>
                <Header />
                <h2 className={styles.heading}>Kunde inte detektera någon förening i länken, testa att:</h2>
                <ul>
                    <li>Ladda om sidan</li>
                    <li>Kopiera länken igen</li>
                    <li>Prata med den ansvariga för din förening</li>
                </ul>
            </div>
        );
    }

    return (
        <div className={styles.body}>
            <Header />
            <h2 className={styles.heading}>Registrera dig till din förening</h2>
            <p>Kul att du vill göra skillnad och gå med i framtiden!</p>
            <div className={styles.container}>
                <label className={styles.label} htmlFor="email">Mejladress</label>
                <input className={styles.input} type="email" id="email" onChange={handleEmailChange} />
                <label className={styles.label} htmlFor="username">Användarnamn</label>
                <input className={styles.input} type="text" id="username" onChange={handleUsernameChange} />
                <label className={styles.label} htmlFor="password">Lösenord</label>
                <input className={styles.input} type="password" id="password" onChange={handlePasswordChange} />
                <Button onClick={handleClick} className={styles.button}>Registrera</Button>
            </div>
        </div>
    );
}

export default function UserSignUp() {

    return (
        <Suspense fallback={<div>Laddar...</div>}>
            <UserSignUpForm />
        </Suspense>
    );
}
