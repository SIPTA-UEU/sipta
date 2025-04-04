// Navbar.js
"use client";
import { useState } from "react";
import Link from "next/link"; // Import Link from Next.js
import { auth } from "../../firebase"; // Adjust the path as needed
import { signOut } from "firebase/auth"; // Import signOut from Firebase
import { useRouter } from 'next/navigation'; // Import useRouter
import styles from "./navbaradmin.module.css"; // Create this CSS file for styling

export default function NavbarAdmin({ isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // Create router instance

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      router.push("/"); // Redirect to home page
    } catch (error) {
      console.error("Logout failed: ", error.message);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/admin">Admin</Link> {/* Dashboard link */}
      </div>
      <div className={styles.hamburger} onClick={toggleMenu}>
        {/* Hamburger Icon */}
        <div className={`${styles.bar} ${isOpen ? styles.change : ""}`}></div>
        <div className={`${styles.bar} ${isOpen ? styles.change : ""}`}></div>
        <div className={`${styles.bar} ${isOpen ? styles.change : ""}`}></div>
      </div>
      <ul className={`${styles.menu} ${isOpen ? styles.active : ""}`}>
        <li className={styles.menuItem}>
          <Link href="/admin">Home</Link> {/* Home link */}
        </li>
        <li className={styles.menuItem}>
          <Link href="/dosenlist">Dosen List</Link> {/* Dosen List link */}
        </li>
        <li className={styles.menuItem}>
          <Link href="/mahasiswalist">Mahasiswa List</Link> {/* Mahasiswa List link */}
        </li>
        <li className={styles.menuItem}>
          <Link href="/listmahasiswasempro">List Mahasiswa Sempro</Link> {/* Services link */}
        </li>
        <li className={styles.menuItem}>
          <Link href="/listmahasiswaskripsi">List Mahasiswa Skripsi</Link> {/* Services link */}
        </li>
        <li className={styles.menuItem}>
          <Link href="/filerevisi">Lembar Revisi</Link> 
        </li>
        <li className={styles.menuItem}>
          <Link href="/filenilaisemproakumulasi">Lembar Acara</Link>
        </li>
        <li className={styles.menuItem}>
          <Link href="/">Logout</Link> {/* Contact link */}
        </li>
        {/* Show logout option only if logged in */}
        {isLoggedIn && (
          <li className={styles.menuItem}>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
