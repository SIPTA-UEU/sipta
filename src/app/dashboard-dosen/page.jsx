"use client";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import NavbarDosen from "../navbardosen/page";
import { motion } from "framer-motion";
import styles from '../page.module.css';
import { onAuthStateChanged } from "firebase/auth";


export default function DashboardDosen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); // User is signed in
      } else {
        setIsLoggedIn(false); // No user is signed in
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <>
      <NavbarDosen isLoggedIn={isLoggedIn} />
      <div className={styles.container}>
      {/* Konten */}
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <img src="\image\sipta.png" alt="SIPTA" className={styles.image} />
      </motion.div>

      {/* Header */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>Selamat Datang</h1>
        <p>Sistem Informasi Pengelolaan Sidang - Universitas Esa Unggul</p>
      </motion.div>
    </div>
    </>
  );
}
