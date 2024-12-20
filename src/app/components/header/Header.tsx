"use client";
import styles from "./Header.module.scss";
import Button from "../button/Button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();
    const [userRole, setUserRole] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const currentUserRole = localStorage.getItem("userRole");
        if (currentUserRole) {
            setUserRole(currentUserRole);
        }

        updateMenuType();
        window.addEventListener("resize", updateMenuType);
        return (() => {
            window.removeEventListener("resize", updateMenuType);
        })
    }, []);

    function handleBookingClick() {
        router.push("/booking");
    }
    function handleSignUpClick() {
        router.push("/adminSignUp")
    }
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }
    const closeMenu = () => {
        setMenuOpen(false);
    };
    const updateMenuType = () => {
        setIsMobile(window.innerWidth <= 880); //55em = 880px
    };

    const menuItems = userRole ? (
        <>
            <li className={styles.li}><Link href="/">Hem</Link></li>
            <li className={styles.li}><Link href="/about">Om oss</Link></li>
            <li className={styles.li}><Link href="/contact">Kontakt</Link></li>
            <li className={styles.li}><Link href="/account">Konto</Link></li>
        </>
    ) : (
        <>
            <li className={styles.li}><Link href="/">Hem</Link></li>
            <li className={styles.li}><Link href="/about">Om oss</Link></li>
            <li className={styles.li}><Link href="/contact">Kontakt</Link></li>
            <li className={styles.li}><Link href="/signin">Logga in</Link></li>
        </>
    );

    return (
        <div className={styles.body}>
            <span className={styles.logo}>TvättSynk</span>
            <nav className={styles.navbar}>
                <button className={styles.menuToggle} onClick={toggleMenu}>
                    ☰
                </button>
                {menuOpen && (
                    <div className={styles.menuBackdrop} onClick={closeMenu}></div>
                )}
                <ul className={`${styles.ul} ${menuOpen ? styles.open : ""}`}>
                    {menuItems}
                    <li>
                        <Button 
                            className={`${styles.button} ${styles.menuButton}`} 
                            onClick={userRole ? handleBookingClick : handleSignUpClick}
                        >
                            {userRole ? "Boka tvättid" : "Kom igång"}
                        </Button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

