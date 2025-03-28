"use client";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  setDoc,
  doc as firestoreDoc,
  getDoc,
} from "firebase/firestore";
import styles from "./listpengujisempromahasiswaacc.module.css";
import NavbarPenguji from "../navbarpenguji/page";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ListAllUsersSempro() {
  const [usersSemproList, setUsersSemproList] = useState([]);
  const [pengujiList, setPengujiList] = useState([]); // Daftar penguji
  const [selectedOption, setSelectedOption] = useState({}); // Mode Sidang
  const [formValues, setFormValues] = useState({}); // Data Input Form
  const [selectedPenguji, setSelectedPenguji] = useState({}); // Selected penguji
  const [selectedDate, setSelectedDate] = useState({}); // Selected date for each user

  // Fetch semua data dari usersSempro collection
  const fetchAllUsersSemproData = async () => {
    try {
      const usersSemproCollection = collection(db, "usersSempro");
      const usersSemproSnapshot = await getDocs(usersSemproCollection);
      const usersSemproData = await Promise.all(
        usersSemproSnapshot.docs.map(async (doc) => {
          const userData = { id: doc.id, ...doc.data() };

          const jadwalSemproDocRef = firestoreDoc(db, "jadwalSempro", doc.id);
          const jadwalSemproDocSnap = await getDoc(jadwalSemproDocRef);
          if (jadwalSemproDocSnap.exists()) {
            const jadwalSemproData = jadwalSemproDocSnap.data();
            userData.penguji = jadwalSemproData.penguji || null;
            userData.penguji2 = jadwalSemproData.penguji2 || null;
          }
          return userData;
        })
      );
      setUsersSemproList(usersSemproData);
    } catch (error) {
      console.error("Error fetching usersSempro data: ", error);
    }
  };

  // Fetch data penguji dari koleksi 'penguji'
  const fetchPengujiData = async () => {
    try {
      const pengujiCollection = collection(db, "penguji");
      const pengujiSnapshot = await getDocs(pengujiCollection);
      const pengujiData = pengujiSnapshot.docs
        .filter((doc) => doc.data().role === "penguji")
        .map((doc) => ({
          id: doc.id,
          nama: doc.data().nama,
          jurusan: doc.data().jurusan,
          cabangKampus: doc.data().cabangKampus,
        }));
      setPengujiList(pengujiData);
    } catch (error) {
      console.error("Error fetching penguji data: ", error);
    }
  };

  const handleOptionChange = (userId, value) => {
    setSelectedOption((prevState) => ({
      ...prevState,
      [userId]: value,
    }));
  };

  const handleInputChange = (userId, field, value) => {
    setFormValues((prevState) => ({
      ...prevState,
      [userId]: { ...(prevState[userId] || {}), [field]: value },
    }));
  };

  const handleDateChange = (userId, date) => {
    setSelectedDate((prevState) => ({
      ...prevState,
      [userId]: date,
    }));
  };

  const handleSubmit = async (userId) => {
    const userFormData = formValues[userId];
    if (!userFormData) {
      alert("Form data is incomplete.");
      return;
    }
    const user = usersSemproList.find((user) => user.id === userId);
    if (user && user.nama) userFormData.nama = user.nama;

    try {
      const jadwalSemproDocRef = firestoreDoc(db, "jadwalSempro", userId);
      await setDoc(jadwalSemproDocRef, userFormData, { merge: true });
      alert("Data berhasil disimpan.");
    } catch (error) {
      console.error("Error saving schedule data:", error);
      alert("Error saving data.");
    }
  };

  const handleSubmitPenguji = async (userId) => {
    const selectedPengujiName = selectedPenguji[userId];
    const selectedUserDate = selectedDate[userId];
    if (!selectedPengujiName || !selectedUserDate) {
      alert("Silakan pilih penguji dan tanggal terlebih dahulu.");
      return;
    }
  
    // Konversi tanggal ke format "YYYY-MM-DD"
    const formattedDate = selectedUserDate instanceof Date
      ? selectedUserDate.toISOString().split("T")[0] // Mengambil bagian "YYYY-MM-DD"
      : selectedUserDate;
  
    const user = usersSemproList.find((user) => user.id === userId);
  
    const dataToSave = {
      ...user,
      penguji: selectedPengujiName,
      tanggalSidang: formattedDate, // Simpan dalam format yang diinginkan
    };
  
    try {
      const jadwalPengujiDocRef = firestoreDoc(db, "jadwalPenguji2", userId);
      await setDoc(jadwalPengujiDocRef, dataToSave, { merge: true });
      alert("Data berhasil dikirim ke jadwalPenguji2.");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };
  
  useEffect(() => {
    fetchAllUsersSemproData();
    fetchPengujiData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <NavbarPenguji />
      <div className={styles.container}>
        <h2 className={styles.title}>Daftar Data Sempro Mahasiswa</h2>
        <ul className={styles.list}>
          {usersSemproList.map((user) => (
            <li key={user.id} className={styles.listItem}>
              <p>
                <strong>Nama:</strong> {user.nama}
              </p>
              <p>
                <strong>Jurusan:</strong> {user.jurusan}
              </p>
              <p>
                <strong>Angkatan:</strong> {user.angkatan}
              </p>
              <p>
                <strong>Cabang Kampus:</strong> {user.cabangKampus}
              </p>
              <p>
                <strong>Nomor WhatsApp:</strong> {user.noWhatsapp}
              </p>
              <p>
                <strong>Judul Seminar Proposal:</strong> {user.judul}
              </p>
              <p>
                <strong>Status:</strong> {user.status || "Belum diverifikasi"}
              </p>
              <p>
                <strong>Penguji1:</strong> {user.penguji1 || "Belum dipilih"}
              </p>
              <p>
                <strong>Penguji2:</strong> {user.penguji2 || "Belum dipilih"}
              </p>

              <label>Pilih Penguji:</label>
              <select
                className={styles.dropdown}
                onChange={(e) =>
                  setSelectedPenguji({
                    ...selectedPenguji,
                    [user.id]: e.target.value,
                  })
                }
                value={selectedPenguji[user.id] || ""}
              >
                <option value="">Pilih Penguji</option>
                {pengujiList.map((penguji) => (
                  <option key={penguji.id} value={penguji.nama}>
                    {penguji.nama} - {penguji.jurusan} ({penguji.cabangKampus})
                  </option>
                ))}
              </select>

              <DatePicker
                selected={selectedDate[user.id] || null}
                onChange={(date) => handleDateChange(user.id, date)}
                dateFormat="dd/MM/yyyy"
                className={styles.datepicker}
                placeholderText="Pilih Tanggal"
              />
              
              <button
                className={styles.button}
                onClick={() => handleSubmitPenguji(user.id)}
              >
                Kirim Jadwal
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
