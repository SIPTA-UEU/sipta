"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function Login() {
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Periksa di koleksi `usersSempro`
      const semproRef = doc(db, "usersSempro", nim.trim());
      const semproSnap = await getDoc(semproRef);

      // Jika ditemukan di `usersSempro`
      if (semproSnap.exists()) {
        const userSemproData = semproSnap.data();

        // Proses login di Firebase Authentication
        await signInWithEmailAndPassword(auth, userSemproData.email, password);
        alert("Login berhasil sebagai Mahasiswa Sempro!");
        router.push("/dashboard");
        return;
      }

      // Periksa di koleksi `usersSkripsi`
      const skripsiRef = doc(db, "usersSkripsi", nim.trim());
      const skripsiSnap = await getDoc(skripsiRef);

      // Jika ditemukan di `usersSkripsi`
      if (skripsiSnap.exists()) {
        const userSkripsiData = skripsiSnap.data();

        // Proses login di Firebase Authentication
        await signInWithEmailAndPassword(auth, userSkripsiData.email, password);
        alert("Login berhasil sebagai Mahasiswa Skripsi!");
        router.push("/dashboardkedua");
        return;
      }

      // Periksa di koleksi `dosen`
      const dosenRef = doc(db, "dosen", nim.trim());
      const dosenSnap = await getDoc(dosenRef);
      
      // Jika ditemukan di `dosen`
      if (dosenSnap.exists()) {
        const dosenData = dosenSnap.data();
      
        // Proses login di Firebase Authentication
        await signInWithEmailAndPassword(auth, dosenData.email, password);
        alert("Login berhasil sebagai Dosen!");
        router.push("/dashboard-dosen");
        return;
      }

      // Periksa di koleksi `kaprodi`
      const kaprodiRef = doc(db, "kaprodi", nim.trim());
      const kaprodiSnap = await getDoc(kaprodiRef);
      
      // Jika ditemukan di `kaprodi`
      if (kaprodiSnap.exists()) {
        const kaprodiData = kaprodiSnap.data();
      
        // Proses login di Firebase Authentication
        await signInWithEmailAndPassword(auth, kaprodiData.email, password);
        alert("Login berhasil sebagai Kaprodi!");
        router.push("/dashboard-kaprodi");
        return;
      }

      // Periksa di koleksi `penguji`
      const pengujiRef = doc(db, "penguji", nim.trim());
      const pengujiSnap = await getDoc(pengujiRef);
      
      // Jika ditemukan di `penguji`
      if (pengujiSnap.exists()) {
        const pengujiData = pengujiSnap.data();
      
        // Proses login di Firebase Authentication
        await signInWithEmailAndPassword(auth, pengujiData.email, password);
        alert("Login berhasil sebagai Penguji!");
        router.push("/dashboard-penguji");
        return;
      }
      // Jika tidak ditemukan di kedua koleksi
      setError("NIM tidak ditemukan di database.");
    } catch (err) {
      setError("Login gagal: " + err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleLogin} className={styles.formContainer}>
        <input
          type="text"
          className={styles.inputField}
          value={nim}
          onChange={(e) => setNim(e.target.value)}
          placeholder="Masukkan NIM"
          required
        />
        <input
          type="password"
          className={styles.inputField}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Masukkan Password"
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}
