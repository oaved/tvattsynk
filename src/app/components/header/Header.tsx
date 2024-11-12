"use client";
import styles from "./header.module.scss";
import Button from "../button/Button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();
    const [userRole, setUserRole] = useState<string | null>(null);
    useEffect(() => {
        const currentUserRole = localStorage.getItem("userRole");
        if (currentUserRole) {
            setUserRole(currentUserRole);
        }
    })

    function handleBookingClick() {
        router.push("/booking");
    }
    function handleSignUpClick() {
        router.push("/adminSignUp")
    }

    if (userRole) {
            return (
                <div className={styles.body}>
                <span className={styles.logo}>TvättSynk</span>
                <nav className={styles.navbar}>
                    <ul className={styles.ul}>
                        <li className={styles.li}><Link href="/">Hem</Link></li>
                        <li className={styles.li}><Link href="/about">Om oss</Link></li>
                        <li className={styles.li}><Link href="/contact">Kontakt</Link></li>
                        <li className={styles.li}><Link href="/account">Konto</Link></li>
                    </ul>
                    <Button onClick={handleBookingClick} className={styles.button}>Boka tvättid</Button>
                </nav>
            </div>
            );  

        } else {
        return (
            <div className={styles.body}>
                <span className={styles.logo}>TvättSynk</span>
                <nav className={styles.navbar}>
                    <ul className={styles.ul}>
                        <li className={styles.li}><Link href="/">Hem</Link></li>
                        <li className={styles.li}><Link href="/about">Om oss</Link></li>
                        <li className={styles.li}><Link href="/contact">Kontakt</Link></li>
                        <li className={styles.li}><Link href="/signin">Logga in</Link></li>
                    </ul>
                    <Button onClick={handleSignUpClick} className={styles.button}>Kom igång</Button>
                </nav>
            </div>
        );
    }
}
