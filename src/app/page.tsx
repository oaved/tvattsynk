"use client"

import styles from "./page.module.scss";
import Button from "./components/button/Button";
import Header from "./components/header/Header";
import adminSignUp from "../lib/adminSignUp";
import { useState } from "react";

export default function Home() {

  const [assocationName, setAssociationName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  function handleNameChange(event:any) {
    setAssociationName(event.target.value);
  }
  function handleEmailChange(event:any) {
    setAdminEmail(event.target.value);
  }
  function handleUsernameChange(event:any) {
    setAdminUsername(event.target.value);
  }
  function handlePasswordChange(event:any) {
    setAdminPassword(event.target.value)
  }

  async function handleClick() {
    console.log("Hello from inside handle click")
    const userCred = await adminSignUp(assocationName, adminEmail, adminUsername, adminPassword);
  }

  return (
    <div className={styles.body} role="body">
      <Header />

      <p>test admin sign up</p>
      <label htmlFor="associationName">assocationName</label>
      <input type="text" id="assocationName" onChange={(event) => handleNameChange(event)}/><br /><br />
      <label htmlFor="adminEmail">adminEmail</label>
      <input type="text" id="adminEmail" onChange={(event) => handleEmailChange(event)} /><br /><br />
      <label htmlFor="adminUsername">adminUsername</label>
      <input type="text" id="adminUsername"  onChange={(event) => handleUsernameChange(event)}/><br /><br />
      <label htmlFor="adminPassword">adminPassword</label>
      <input type="text" id="adminPassword" onChange={(event) => handlePasswordChange(event)} /><br /><br />
      <Button onClick={handleClick}>Registrera föreningen</Button>

    </div>
  );
}
