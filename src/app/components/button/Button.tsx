"use client";
import styles from "./Button.module.scss"

type Props = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
    className?: string,
    children: React.ReactNode
}

export default function Button({onClick, className, children}: Props) {
    return(
        <button onClick={onClick} className={`${styles.button} ${className || ''}`}>
            {children}
        </button>
    );
}
