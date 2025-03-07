"use client";
import { useState, useEffect } from "react";
import { auth } from "../../firebase"; // Assuming you have initialized Firebase
import { onAuthStateChanged, signOut } from "firebase/auth"; // Import Firebase signOut
import { useRouter } from "next/navigation"; // Import router for redirecting
import Navbar from "../navbar/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "../page.module.css";

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

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

  // Function to handle logout and redirect
  const handleSkripsiButtonClick = async () => {
    try {
      await signOut(auth); // Sign out the user
      router.push("/dashboardskripsi"); // Redirect to dashboardskripsi
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
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

        <div className={styles.buttons}>
          <Link href="/dashboardsempro">
            <button className={styles.btn}>Seminar Proposal</button>
          </Link>
          {/* When clicked, sign out and redirect to /dashboardskripsi */}
          <button onClick={handleSkripsiButtonClick} className={styles.btn}>
            Skripsi
          </button>
        </div>
      </div>
    </>
  );
}
