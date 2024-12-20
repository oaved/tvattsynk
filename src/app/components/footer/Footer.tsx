import styles from "./Footer.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Footer() {
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const currentUserRole = localStorage.getItem("userRole");
        if (currentUserRole) {
            setUserRole(currentUserRole);
        }
    }, []);

    const menuItems = userRole ? (
        <>
            <li className={styles.li}><Link href="/">Hem</Link></li>
            <li className={styles.li}><Link href="/about">Om oss</Link></li>
            <li className={styles.li}><Link href="/contact">Kontakt</Link></li>
            <li className={styles.li}><Link href="/account">Konto</Link></li>
            <li className={styles.li}><Link href="/booking">Boka tvättid</Link></li>
        </>
    ) : (
        <>
            <li className={styles.li}><Link href="/">Hem</Link></li>
            <li className={styles.li}><Link href="/about">Om oss</Link></li>
            <li className={styles.li}><Link href="/contact">Kontakt</Link></li>
            <li className={styles.li}><Link href="/signin">Logga in</Link></li>
            <li className={styles.li}><Link href="/signup">Kom igång</Link></li>
        </>
    );

    return (
        <div className={styles.footer}>
            <div className={styles.leftGroup}>
                <span className={styles.logo}>TvättSynk</span>
                <p>
                    TvättSynk är ett digitalt molnbaset bokningssystem specialiserat för tvättidsbokning.
                </p>
            </div>

            <div className={styles.rightGroup}>
                <ul>
                    {menuItems}
                </ul>
            </div>
        </div>
    );
}