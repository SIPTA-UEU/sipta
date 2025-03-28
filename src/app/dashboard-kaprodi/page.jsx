"use client";
import { useState, useEffect } from "react";
import { auth, db } from "../../firebase"; // Assuming you have initialized Firebase
import { onAuthStateChanged } from "firebase/auth"; // Import the method to check auth state
import { motion } from "framer-motion";
// import styles from "./dashboard.module.css"; // Import CSS untuk styling
import Navbar from "../navbar/Navbar";
import Link from 'next/link';
import styles from '../page.module.css';
import NavbarKaprodi from "../navbarkaprodi/page";

export default function DashboardKaprodi() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication state
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
      <NavbarKaprodi isLoggedIn={isLoggedIn} />
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