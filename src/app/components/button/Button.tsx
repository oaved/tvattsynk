import styles from "./Button.module.scss"

type Props = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
    children: React.ReactNode
}

export default function Button({onClick, children}: Props) {
    return(
        <button onClick={onClick} className={styles.button}>
            {children}
        </button>
    );
}
