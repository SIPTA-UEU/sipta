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

  useEffect(() => {
    fetchUsers();
    fetchPenguji();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersRef = collection(db, "usersSkripsi");
      const snapshot = await getDocs(
        usersRef,
        // Mengurutkan berdasarkan tanggal pengajuan atau timestamp, misalnya field 'tanggal' atau 'timestamp'
        orderBy("tanggal", "desc") // Mengurutkan berdasarkan field 'tanggal' secara menurun (desc)
      );
      const users = snapshot.docs.map(async (doc) => {
        const userData = { id: doc.id, ...doc.data() };
        const jadwalRef = firestoreDoc(db, "jadwalSkripsi", doc.id);
        const jadwalSnap = await getDoc(jadwalRef);
        if (jadwalSnap.exists()) {
          userData.jadwal = jadwalSnap.data();
        }
        return userData;
      });
      const fetchedUsers = await Promise.all(users);
      setUsersList(fetchedUsers.reverse()); // Membalik urutan array untuk menampilkan data terbaru di atas
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchPenguji = async () => {
    try {
      const pengujiRef = collection(db, "penguji");
      const snapshot = await getDocs(pengujiRef);
      setPengujiList(
        snapshot.docs
          .filter((doc) => doc.data().role === "penguji")
          .map((doc) => ({
            id: doc.id,
            nama: doc.data().nama,
            jurusan: doc.data().jurusan,
            cabangKampus: doc.data().cabangKampus,
          }))
      );
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

  const handleSubmit = async (userId) => {
    // Ambil data penguji dan tanggal yang dipilih
    const selectedPengujiName = selectedPenguji[userId];
    const selectedUserDate = selectedDate[userId];

    // Validasi apakah penguji dan tanggal sudah dipilih
    if (!selectedPengujiName || !selectedUserDate) {
      alert("Silakan pilih penguji dan tanggal terlebih dahulu.");
      return;
    }

    // Konversi tanggal ke format "YYYY-MM-DD"
    const formattedDate =
      selectedUserDate instanceof Date
        ? selectedUserDate.getFullYear() +
          "-" +
          String(selectedUserDate.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(selectedUserDate.getDate()).padStart(2, "0")
        : selectedUserDate;

    // Cari user berdasarkan ID
    const user = usersList.find((user) => user.id === userId);

    // Data yang akan disimpan ke Firebase
    const dataToSave = {
      ...user, // Data user
      penguji: selectedPengujiName, // Menambahkan penguji
      tanggalSidang: formattedDate, // Menyimpan tanggal dalam format "YYYY-MM-DD"
    };

    // Simpan ke koleksi 'jadwalSkripsi'
    try {
      const data = {
        ...formValues[userId],
        mode: selectedOption[userId],
        tanggal: formattedDate, // Pastikan tanggal juga diformat di sini
        penguji: selectedPenguji[userId],
      };
      await setDoc(firestoreDoc(db, "jadwalSkripsi", userId), data, {
        merge: true,
      });
      alert("Jadwal berhasil disimpan.");
    } catch (error) {
      console.error("Error saving jadwal:", error);
    }

    // Simpan ke koleksi 'jadwalPenguji3'
    try {
      const jadwalPengujiDocRef = firestoreDoc(db, "jadwalPenguji3", userId);
      await setDoc(jadwalPengujiDocRef, dataToSave, { merge: true });
      alert("Data berhasil dikirim ke jadwal Penguji 1.");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

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
                <strong>Penguji 1:</strong> {user.penguji1}
              </p>
              <p>
                <strong>Penguji 2:</strong> {user.penguji2}
              </p>
              <p>
                <strong>Status:</strong> {user.status || "Belum diverifikasi"}
              </p>
              {user.penguji && (
                <p>
                  <strong>Dosen Penguji:</strong> {user.penguji}
                </p>
              )}
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
              <label>Mode Sidang:</label>
              <select
                className={styles.dropdown}
                value={selectedOption[user.id] || ""}
                onChange={(e) => handleOptionChange(user.id, e.target.value)}
              >
                <option value="">Pilih Mode</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>

              {selectedOption[user.id] === "online" && (
                <>
                  <input
                    type="text"
                    placeholder="Masukkan Link GMeet"
                    onChange={(e) =>
                      handleInputChange(user.id, "gmeetLink", e.target.value)
                    }
                  />
                </>
              )}

              {selectedOption[user.id] === "offline" && (
                <>
                  <input
                    type="text"
                    placeholder="Ruangan"
                    onChange={(e) =>
                      handleInputChange(user.id, "ruangan", e.target.value)
                    }
                  />
                </>
              )}

              <DatePicker
                selected={selectedDate[user.id] || null}
                onChange={(date) => handleDateChange(user.id, date)}
                dateFormat="dd/MM/yyyy"
                className={styles.datepicker}
                placeholderText="Pilih Tanggal"
              />

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

              <button
                className={styles.button}
                onClick={() => handleSubmit(user.id)}
              >
                Simpan Jadwal
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
