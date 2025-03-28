"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./page.module.css";

export default function Home() {
  return (
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

      {/* Tombol Navigasi */}
      <motion.div
        className={styles.buttons}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Link href="/login">
          <button className={`${styles.btn} ${styles.btnPrimary}`}>
            Login
          </button>
        </Link>
        <Link href="/register">
          <button className={`${styles.btn} ${styles.btnOutline}`}>
            Registrasi
          </button>
        </Link>
        <Link href="/adminLogin">
          <button className={`${styles.btn} ${styles.btnAdmin}`}>Admin</button>
        </Link>
      </motion.div>
    </div>
  );
}
