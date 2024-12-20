"use client"

import styles from "./Home.module.scss";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Button from "./components/button/Button";

export default function Home() {

  function toSignUp() {

  }
  function toContact() {

  }

  return (
    <div className={styles.body} role="body">
      <Header />

      <section className={styles.hero}>
        <div className={styles.textContainer}>
          <h2>Boka tvättid digitalt</h2>
          <p>
            Modernisera er bostadsrättsförening med ett digitalt
            tvättidsbokningssystem. Med TvättSynk kan alla i din
            förening se, boka och avboka tvättider, från bekvämligheten
            av den egna bostaden.
          </p>
          <div className={styles.heroButtonDiv}>
            <Button className={styles.button} onClick={toSignUp}>Kom igång</Button>
            <Button className={styles.button} onClick={toContact}>Kontakta oss</Button>
          </div>
        </div>
        <img src="images/hero-img-croped-4.3.jpg" alt="" />
      </section>

      <section className={styles.services}>
        <div className={styles.card}>
          <img
            src="images/business.jpg"
            alt="Bild 1"
            className={styles['card-image']}
          />
          <h3 className={styles['card-title']}>Gratis</h3>
          <ul className={styles['card-list']}>
            <li>Boka tvättid digitalt</li>
            <li>Oändligt med medlemmar</li>
            <li>TvättSynks egna bokningssystem</li>
          </ul>
          <span className={styles['card-arrow']}>→</span>
        </div>

        <div className={styles.card}>
          <img
            src="images/fast.jpg"
            alt="Bild 2"
            className={styles['card-image']}
          />
          <h3 className={styles['card-title']}>Premium</h3>
          <ul className={styles['card-list']}>
            <li>Boka tvättid digital</li>
            <li>Oändligt med medlemmar</li>
            <li>Skräddarsy ert bokningssystem efter er bostadsrättsförening</li>
            <li>Reklamfritt</li>
          </ul>
          <span className={styles['card-arrow']}>→</span>
        </div>
      </section>

      <section className={styles.whoWeAre}>
        <img
          src="images/happy-team.jpg"
          alt="Exempelbild"
          className={styles.image}
        />
        <div className={styles.textContainer}>
          <h2 className={styles.title}>Vilka är vi på TvättSynk?</h2>
          <p className={styles.description}>
            Vi på TvättSynk är en grupp studenter som tyckte det var helt befängt att det inte fanns en 
            stilren och smidig digital tjänst för att boka tvättid år 2024. Därför skapade vi ett enkelt 
            digitalt system för att boka tvättid så att övergången från tidigare analoga system till digital 
            tvättidsbokning ska gå så sömlöst som möjligt.
          </p>
        </div>
      </section>

      <section className={styles.cta}>
          <h4>
            Registrera er bostadsrättsförening på en gång eller kontakta oss!
          </h4>
          <p>
          Vi hjälper er mer än gärna personligen i er övergång från det gamla analoga till det nya digitala.
          </p>
        <div className={styles.buttonContainer}>
          <Button className={styles.button} onClick={toContact}>Kontakta oss</Button>
          <Button className={styles.button} onClick={toSignUp}>Kom igång</Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
