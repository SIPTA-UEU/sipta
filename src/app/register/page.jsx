"use client";
import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import styles from "./register.module.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

// Komponen Formulir Mahasiswa
const MahasiswaForm = ({
  onSubmit,
  nim,
  email,
  password,
  confirmPassword,
  setNim,
  setEmail,
  setPassword,
  setConfirmPassword,
  nama,
  jurusan,
  angkatan,
  cabangKampus,
  error,
}) => (
  <form onSubmit={onSubmit} className={styles.formContainer}>
    <h2>Formulir Registrasi</h2>
    <input
      type="text"
      className={styles.inputField}
      value={nim}
      onChange={(e) => setNim(e.target.value)}
      placeholder="Masukkan NIM"
      required
    />
    <input
      type="text"
      className={styles.inputField}
      value={nama}
      placeholder="Nama"
      readOnly
    />
    <input
      type="text"
      className={styles.inputField}
      value={jurusan}
      placeholder="Jurusan"
      readOnly
    />
    <input
      type="text"
      className={styles.inputField}
      value={angkatan}
      placeholder="Angkatan"
      readOnly
    />
    <input
      type="text"
      className={styles.inputField}
      value={cabangKampus}
      placeholder="Cabang Kampus"
      readOnly
    />
    <input
      type="email"
      className={styles.inputField}
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Masukkan Email"
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
    <input
      type="password"
      className={styles.inputField}
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      placeholder="Konfirmasi Password"
      required
    />
    {error && <p className={styles.error}>{error}</p>}
    <button type="submit" className={styles.button}>
      Register
    </button>
  </form>
);

// Halaman Registrasi
export default function Register() {
  const [nim, setNim] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nama, setNama] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [cabangKampus, setCabangKampus] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);
  const [activeForm, setActiveForm] = useState("usersSempro"); // Form aktif: "usersSempro" atau "usersSkripsi"
  const [formChangeMessage, setFormChangeMessage] = useState(""); // State for feedback message
  const router = useRouter();

  // Fetch data mahasiswa berdasarkan NIM
  useEffect(() => {
    const fetchUserDataByNim = async () => {
      if (nim) {
        try {
          const docRef = doc(db, "users", nim.trim());
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setNama(userData.nama || "");
            setJurusan(userData.jurusan || "");
            setAngkatan(userData.angkatan || "");
            setCabangKampus(userData.cabangKampus || "");
            setRole(userData.role || "");
          } else {
            setNama("");
            setJurusan("");
            setAngkatan("");
            setCabangKampus("");
            setRole("");
          }
        } catch (error) {
          setError("Error fetching NIM data: " + error.message);
        }
      }
    };
    fetchUserDataByNim();
  }, [nim]);

  // Fungsi untuk registrasi pengguna
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }
    const collectionName = activeForm === "usersSempro" ? "usersSempro" : "usersSkripsi";
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        setError("Email sudah digunakan.");
        return;
      }
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      await setDoc(doc(db, collectionName, nim.trim()), {
        email: email.trim(),
        nama,
        jurusan,
        angkatan,
        cabangKampus,
        role: activeForm === "usersSempro" ? "mahasiswa_sempro" : "mahasiswa_skripsi",
      });
      alert("Registrasi berhasil!");
      router.push("/login");
    } catch (error) {
      setError("Registrasi gagal: " + error.message);
    }
  };

  const handleRegisterKaryawan = async (e) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }
    const collectionName = activeForm === "dosen" ? "dosen" : "penguji";
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        setError("Email sudah digunakan.");
        return;
      }
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      await setDoc(doc(db, collectionName, nim.trim()), {
        email: email.trim(),
        nama,
        jurusan,
        angkatan,
        cabangKampus,
        role: activeForm === "dosen" ? "dosen" : "penguji",
      });
      alert("Registrasi berhasil!");
      router.push("/login");
    } catch (error) {
      setError("Registrasi gagal: " + error.message);
    }
  };

  const handleRegisterKaprodi = async (e) => {
    e.preventDefault();
    setError(null);
  
    // Validasi kecocokan password
    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }
  
    try {
      // Mengecek apakah email sudah terdaftar
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        setError("Email sudah digunakan.");
        return;
      }
  
      // Membuat akun baru
      await createUserWithEmailAndPassword(auth, email.trim(), password);
  
      // Menyimpan data kaprodi ke Firestore
      await setDoc(doc(db, "kaprodi", nim.trim()), {
        email: email.trim(),
        nama,
        jurusan,
        angkatan,
        cabangKampus,
        role: "kaprodi",
      });
  
      // Menampilkan notifikasi sukses
      alert("Registrasi kaprodi berhasil!");
      router.push("/login");
    } catch (error) {
      // Menampilkan error jika registrasi gagal
      setError("Registrasi gagal: " + error.message);
    }
  };
  

  const navigateForm = (direction) => {
    let newForm = activeForm;
    if (direction === "right") {
      if (activeForm === "usersSempro") newForm = "usersSkripsi";
      if (activeForm === "usersSkripsi") newForm = "dosen";
      if (activeForm === "dosen") newForm = "penguji";
      if (activeForm === "penguji") newForm = "kaprodi";
    } else if (direction === "left") {
      if (activeForm === "kaprodi") newForm = "penguji";
      if (activeForm === "penguji") newForm = "dosen";
      if (activeForm === "dosen") newForm = "usersSkripsi";
      if (activeForm === "usersSkripsi") newForm = "usersSempro";
    }
    setActiveForm(newForm);
  };

  // Effect when form changes
  useEffect(() => {
    setFormChangeMessage(`You have switched to the ${activeForm} form!`);
    const timer = setTimeout(() => {
      setFormChangeMessage(""); // Clear the message after 2 seconds
    }, 2000);
    return () => clearTimeout(timer); // Cleanup timeout on form change
  }, [activeForm]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Registrasi Mahasiswa</h1>
      {activeForm === "usersSempro" && (
        <MahasiswaForm
          onSubmit={handleRegister}
          nim={nim}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          setNim={setNim}
          setEmail={setEmail}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          nama={nama}
          jurusan={jurusan}
          angkatan={angkatan}
          cabangKampus={cabangKampus}
          error={error}
        />
      )}
      {activeForm === "usersSkripsi" && (
        <MahasiswaForm
          onSubmit={handleRegister}
          nim={nim}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          setNim={setNim}
          setEmail={setEmail}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          nama={nama}
          jurusan={jurusan}
          angkatan={angkatan}
          cabangKampus={cabangKampus}
          error={error}
        />
      )}
      {activeForm === "dosen" && (
        <MahasiswaForm
          onSubmit={handleRegisterKaryawan}
          nim={nim}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          setNim={setNim}
          setEmail={setEmail}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          nama={nama}
          jurusan={jurusan}
          angkatan={angkatan}
          cabangKampus={cabangKampus}
          error={error}
        />
      )}
      {activeForm === "penguji" && (
        <MahasiswaForm
          onSubmit={handleRegisterKaryawan}
          nim={nim}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          setNim={setNim}
          setEmail={setEmail}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          nama={nama}
          jurusan={jurusan}
          angkatan={angkatan}
          cabangKampus={cabangKampus}
          error={error}
        />
      )}
      {activeForm === "kaprodi" && (
        <MahasiswaForm
          onSubmit={handleRegisterKaprodi}
          nim={nim}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          setNim={setNim}
          setEmail={setEmail}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          nama={nama}
          jurusan={jurusan}
          angkatan={angkatan}
          cabangKampus={cabangKampus}
          error={error}
        />
      )}
      <div className={styles.navigationButtons}>
        <FaArrowLeft
          className={styles.icon}
          onClick={() => navigateForm("left")}
        />
        <FaArrowRight
          className={styles.icon}
          onClick={() => navigateForm("right")}
        />
      </div>
      {formChangeMessage && <p className={styles.formChangeMessage}>{formChangeMessage}</p>}
    </div>
  );
}
