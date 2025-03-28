"use client";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  setDoc,
  doc as firestoreDoc,
  orderBy,
  getDoc,
} from "firebase/firestore";
import styles from "./listpengujiskripsimahasiswaacc.module.css";
import NavbarPenguji from "../navbarpenguji/page";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ListAllUsersSkripsi() {
  const [usersList, setUsersList] = useState([]);
  const [pengujiList, setPengujiList] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const [formValues, setFormValues] = useState({});
  const [selectedPenguji, setSelectedPenguji] = useState({});
  const [selectedDate, setSelectedDate] = useState({});

  const fetchUsers = async () => {
    try {
      const usersRef = collection(db, "usersSkripsi");
      const snapshot = await getDocs(
        usersRef,
        orderBy("tanggal", "desc")
      );
      const users = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const userData = { id: doc.id, ...doc.data() };
          const jadwalRef = firestoreDoc(db, "jadwalSkripsi", doc.id);
          const jadwalSnap = await getDoc(jadwalRef);
          if (jadwalSnap.exists()) {
            userData.penguji = jadwalSnap.data().penguji || null;
            userData.penguji2 = jadwalSnap.data().penguji2 || null;
          }
          return userData;
        })
      );
      setUsersList(users.reverse());
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchPenguji = async () => {
    try {
      const pengujiRef = collection(db, "penguji");
      const snapshot = await getDocs(pengujiRef);
      const pengujiData = snapshot.docs
        .filter((doc) => doc.data().role === "penguji")
        .map((doc) => ({
          id: doc.id,
          nama: doc.data().nama,
          jurusan: doc.data().jurusan,
          cabangKampus: doc.data().cabangKampus,
        }));
      setPengujiList(pengujiData);
    } catch (error) {
      console.error("Error fetching penguji:", error);
    }
  };

  const handleOptionChange = (userId, value) => {
    setSelectedOption((prev) => ({ ...prev, [userId]: value }));
  };

  const handleInputChange = (userId, field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [userId]: { ...(prev[userId] || {}), [field]: value },
    }));
  };

  const handleDateChange = (userId, date) => {
    setSelectedDate((prev) => ({ ...prev, [userId]: date }));
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
      ? selectedUserDate.toISOString().split("T")[0]
      : selectedUserDate;

    const user = usersList.find((user) => user.id === userId);

    const dataToSave = {
      ...user,
      penguji: selectedPengujiName,
      tanggalSidang: formattedDate,
    };

    try {
      const jadwalPengujiDocRef = firestoreDoc(db, "jadwalPenguji3", userId);
      await setDoc(jadwalPengujiDocRef, dataToSave, { merge: true });
      alert("Data berhasil dikirim ke jadwal Penguji3.");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };
  
  useEffect(() => {
    fetchUsers();
    fetchPenguji();
  }, []);

  return (
    <div className={styles.wrapper}>
      <NavbarPenguji />
      <div className={styles.container}>
        <h2 className={styles.title}>Daftar Data Skripsi Mahasiswa</h2>
        <ul className={styles.list}>
          {usersList.map((user) => (
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
                <strong>Judul Skripsi:</strong> {user.judul}
              </p>
              <p>
                <strong>Penguji 1:</strong> {user.penguji1 || "Belum dipilih"}
              </p>
              <p>
                <strong>Penguji 2:</strong> {user.penguji2 || "Belum dipilih"}
              </p>
              <p>
                <strong>Status:</strong> {user.status || "Belum diverifikasi"}
              </p>
              {/* {user.penguji && (
                <p>
                  <strong>Dosen Penguji:</strong> {user.penguji}
                </p>
              )} */}
              <p>
                File Pengajuan:{" "}
                <a
                  href={user.pengajuanSidangUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
              </p>
              <p>
                File KRS:{" "}
                <a href={user.krsUrl} target="_blank" rel="noopener noreferrer">
                  Download
                </a>
              </p>
              <p>
                File Daftar Nilai:{" "}
                <a
                  href={user.daftarNilaiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
              </p>
              <p>
                File TA1:{" "}
                <a
                  href={user.fileTA1Url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
              </p>
              <p>
                File Jurnal:{" "}
                <a
                  href={user.fileJurnalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
              </p>
              <p>
                File Bukti Submit Jurnal:{" "}
                <a
                  href={user.fileBuktiSubmitJurnalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
              </p>
              <p>
                File Sertifikat BNSP:{" "}
                <a
                  href={user.fileBNSPUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
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
