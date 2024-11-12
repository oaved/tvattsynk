"use client";

import styles from "./SignIn.module.scss";
import Header from "../components/header/Header";
import Button from "../components/button/Button";
import signIn from "@/lib/signIn";
import { useState } from "react";
import { useRouter } from "next/navigation";



export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleEmailChange(event: any) {
        setEmail(event.target.value);
    }
    function handlePasswordChange(event: any) {
        setPassword(event.target.value);
    }
    
    function handleClick() {
        signIn(email, password);
        router.refresh();
        setTimeout(() => {
            router.push("/account");
        }, 1000);
        
        
    }

    return (
        <div className={styles.body} role="body">
            <Header />
            <div className={styles.container}>
                <h2 className={styles.heading}>Logga in</h2>
                <label className={styles.label} htmlFor="email">Mejladress</label>
                <input className={styles.input} type="email" id="email" onChange={handleEmailChange}/>
                <label className={styles.label} htmlFor="password">Lösenord</label>
                <input className={styles.input} type="password" id="password" onChange={handlePasswordChange}/>
                <Button onClick={handleClick} className={styles.button}>Logga in</Button>
            </div>
        </div>
    );
}