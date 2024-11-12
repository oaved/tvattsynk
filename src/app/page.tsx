"use client"

import styles from "./Home.module.scss";
import Header from "./components/header/Header";

export default function Home() {

  return (
    <div className={styles.body} role="body">
      <Header />
    </div>
  );
}
