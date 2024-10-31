import styles from "./header.module.scss";
import Button from "../button/Button";

export default function Header() {


    return (
        <div className={styles.body}>
            <span className={styles.logo}>TvättSynk</span>
            <nav className={styles.navbar}>
                <ul className={styles.ul}>
                    <li className={styles.li}>Hem</li>
                    <li className={styles.li}>Om oss</li>
                    <li className={styles.li}>Kontakt</li>
                    <li className={styles.li}>Logga in</li>
                </ul>
                <Button>Kom igång</Button>
            </nav>
        </div>
    );
}