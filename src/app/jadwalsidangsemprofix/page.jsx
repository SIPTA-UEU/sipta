"use client";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  serverTimestamp,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import styles from "./jadwalsidangsemprofix.module.css";
import NavbarPenguji from "../navbarpenguji/page";

export default function JadwalSidangSemproFix() {
  const [usersSemproList, setUsersSemproList] = useState([]);
  const [usersSkripsiList, setUsersSkripsiList] = useState([]);
  const [selectedOption, setSelectedOption] = useState({});
  const [formValues, setFormValues] = useState({});

  // Fetch all data from usersSempro collection
  const fetchAllUsersSemproData = async () => {
    try {
      const usersSemproCollection = collection(db, "usersSempro");
      const usersSemproSnapshot = await getDocs(usersSemproCollection);
      const usersSemproData = usersSemproSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsersSemproList(usersSemproData);
    } catch (error) {
      console.error("Error fetching usersSempro data: ", error);
    }
  };

  const fetchAllUsersSkripsiData = async () => {
    try {
      const usersSkripsiCollection = collection(db, "usersSkripsi");
      const usersSkripsiSnapshot = await getDocs(usersSkripsiCollection);

      // Map data dan urutkan berdasarkan createdAt descending
      const usersSkripsiData = usersSkripsiSnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt || serverTimestamp(), // Ensure createdAt is a Timestamp
        }))
        .sort((a, b) => {
          // Jika createdAt tidak ada atau bukan Timestamp, jadikan nilai default (misalnya: 0)
          const timeA =
            a.createdAt instanceof Timestamp ? a.createdAt.toMillis() : 0;
          const timeB =
            b.createdAt instanceof Timestamp ? b.createdAt.toMillis() : 0;
          return timeB - timeA; // Descending order
        });

      // Prepend new data (i.e., add new items at the beginning of the list)
      setUsersSkripsiList((prevData) => [...usersSkripsiData, ...prevData]);
      setUsersSkripsiList(usersSkripsiData.reverse());
    } catch (error) {
      console.error("Error fetching usersSkripsi data: ", error);
    }
  };

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

  // Handle scheduling option change
  const handleOptionChange = (userId, option) => {
    setSelectedOption((prev) => ({ ...prev, [userId]: option }));
  };

  // Handle form value change
  const handleInputChange = (userId, field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [userId]: { ...prev[userId], [field]: value },
    }));
  };

  const handleSubmit = async (userId) => {
    try {
      const userDocRef = doc(db, "usersSempro", userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userSemproData = userDocSnap.data();

        const jadwalFixSempro = formValues[userId]?.jadwalFixSempro || null;

        const scheduleData = {
          ...formValues[userId],
          userId,
          mode: selectedOption[userId] || "defaultMode",
          jadwalFixSempro,
          ...userSemproData,
        };

        await addDoc(collection(db, "jadwalSempro"), scheduleData);
        alert("Jadwal sidang sempro berhasil disimpan");
      } else {
        console.error("User data not found in usersSempro.");
        alert("Data pengguna tidak ditemukan.");
      }
    } catch (error) {
      console.error("Error adding schedule to Firebase:", error);
      alert("Terjadi kesalahan saat menyimpan jadwal.");
    }
  };

  const handleSubmitSkripsi = async (userId) => {
    try {
      const userDocRef = doc(db, "usersSkripsi", userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userSemproData = userDocSnap.data();

        const jadwalFixSempro = formValues[userId]?.jadwalFixSempro || null;

        const scheduleData = {
          ...formValues[userId],
          userId,
          mode: selectedOption[userId] || "defaultMode",
          jadwalFixSempro,
          ...userSemproData,
        };

        await addDoc(collection(db, "jadwalSkripsi"), scheduleData);
        alert("Jadwal sidang skripsi berhasil disimpan");
      } else {
        console.error("User data not found in usersSempro.");
        alert("Data pengguna tidak ditemukan.");
      }
    } catch (error) {
      console.error("Error adding schedule to Firebase:", error);
      alert("Terjadi kesalahan saat menyimpan jadwal.");
    }
  };

  const handleSendWhatsApp = (userId) => {
    const userValues = formValues[userId];
    let message =
      `Yth. Mahasiswa,\n\n` +
      `Dengan hormat, berikut adalah informasi terkait sidang TA Anda:\n\n`;

    if (selectedOption[userId] === "online") {
      message +=
        `Mode: **Online**\n` +
        `Link GMeet: ${userValues.gmeetLink}\n` +
        `Nomor WhatsApp: ${userValues.noWhatsapp}`;
    } else if (selectedOption[userId] === "offline") {
      message +=
        `Mode: **Offline**\n` +
        `Jam: ${userValues.jam}\n` +
        `Tanggal: ${userValues.jadwalFixSempro}\n` +
        `Ruangan: ${userValues.ruangan}\n` +
        `Kampus: ${userValues.kampus}\n` +
        `Nomor WhatsApp: ${userValues.noWhatsapp}`;
    }

    message += `\n\nTerima kasih atas perhatian Anda.\n`;

    const whatsappUrl = `https://wa.me/${
      userValues.noWhatsapp
    }?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  useEffect(() => {
    fetchAllUsersSemproData();
    fetchAllUsersSkripsiData();
  }, []);

  return (
    <div>
      <NavbarPenguji />
      <h2 className={styles.subTitle}>Pemberitahuan Mahasiswa Sempro</h2>
      <div>
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
            {user.penguji && (
              <p>
                <strong>Dosen Penguji:</strong> {user.penguji}
              </p>
            )}
            <p>
              File Pengajuan:{" "}
              <a
              className={styles.link}
                href={user.pengajuanSidangUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </p>
            <p>
              File KRS:{" "}
              <a className={styles.link} href={user.krsUrl} target="_blank" rel="noopener noreferrer">
                View
              </a>
            </p>
            <p>
              File Daftar Nilai:{" "}
              <a
              className={styles.link}
                href={user.daftarNilaiUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </p>
            <p>
              File TA1:{" "}
              <a
              className={styles.link}
                href={user.fileTA1Url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </p>

            {user.status === "Data Dikirim Ke Penguji" && (
              <div>
                <label className={styles.label}>Mode Sidang:</label>
                <select
                className={styles.select}
                  value={selectedOption[user.id] || ""}
                  onChange={(e) => handleOptionChange(user.id, e.target.value)}
                >
                  <option value="">Pilih Mode</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>

                {selectedOption[user.id] === "online" && (
                  <div>
                    <input
                    className={styles.inputField}
                      type="text"
                      placeholder="Masukkan Link GMeet"
                      onChange={(e) =>
                        handleInputChange(user.id, "gmeetLink", e.target.value)
                      }
                    />
                    <input
                    className={styles.inputField}
                      type="text"
                      placeholder="Masukkan Nomor WhatsApp"
                      onChange={(e) =>
                        handleInputChange(user.id, "noWhatsapp", e.target.value)
                      }
                    />
                  </div>
                )}

                {selectedOption[user.id] === "offline" && (
                  <div>
                    <input
                    className={styles.inputField}
                      type="text"
                      placeholder="Masukkan Jam"
                      onChange={(e) =>
                        handleInputChange(user.id, "jam", e.target.value)
                      }
                    />
                    <label className={styles.label}>Masukkan Tanggal Sidang:</label>
                    <input
                    className={styles.inputField}
                      type="date"
                      onChange={(e) =>
                        handleInputChange(
                          user.id,
                          "jadwalFixSempro",
                          e.target.value
                        )
                      }
                    />
                    <input
                    className={styles.inputField}
                      type="text"
                      placeholder="Ruangan"
                      onChange={(e) =>
                        handleInputChange(user.id, "ruangan", e.target.value)
                      }
                    />
                    <input
                    className={styles.inputField}
                      type="text"
                      placeholder="Kampus"
                      onChange={(e) =>
                        handleInputChange(user.id, "kampus", e.target.value)
                      }
                    />
                    <input
                    className={styles.inputField}
                      type="text"
                      placeholder="Masukkan Nomor WhatsApp"
                      onChange={(e) =>
                        handleInputChange(user.id, "noWhatsapp", e.target.value)
                      }
                    />
                  </div>
                )}

                <button className={styles.button} onClick={() => handleSubmit(user.id)}>
                  Simpan Jadwal
                </button>
                <button className={styles.button} onClick={() => handleSendWhatsApp(user.id)}>
                  Kirim Info ke WhatsApp
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      </div>

      <h2 className={styles.subTitle}>Pemberitahuan Mahasiswa Skripsi</h2>
      <ul className={styles.list}>
        {usersSkripsiList.map((user) => (
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
              className={styles.link}
                href={user.pengajuanSidangUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </p>
            <p>
              File KRS:{" "}
              <a className={styles.link} href={user.krsUrl} target="_blank" rel="noopener noreferrer">
                View
              </a>
            </p>
            <p>
              File Daftar Nilai:{" "}
              <a
              className={styles.link}
                href={user.daftarNilaiUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </p>
            <p>
              File TA2:{" "}
              <a
              className={styles.link}
                href={user.fileTA2Url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </p>
            <p>
              File Jurnal:{" "}
              <a
              className={styles.link}
                href={user.fileJurnalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </p>
            <p>
              File Bukti Submit Jurnal:{" "}
              <a
              className={styles.link}
                href={user.fileBuktiSubmitJurnalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </p>
            <p>
              File Sertifikat BNSP:{" "}
              <a
              className={styles.link}
                href={user.fileBNSPUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </p>

            {user.status === "Data Dikirim Ke Penguji" && (
              <div>
                <label className={styles.label}>Mode Sidang:</label>
                <select
                className={styles.select}
                  value={selectedOption[user.id] || ""}
                  onChange={(e) => handleOptionChange(user.id, e.target.value)}
                >
                  <option value="">Pilih Mode</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>

                {selectedOption[user.id] === "online" && (
                  <div>
                    <input
                    className={styles.inputField}
                      type="text"
                      placeholder="Masukkan Link GMeet"
                      onChange={(e) =>
                        handleInputChange(user.id, "gmeetLink", e.target.value)
                      }
                    />
                    <input
                    className={styles.inputField}
                      type="text"
                      placeholder="Masukkan Nomor WhatsApp"
                      onChange={(e) =>
                        handleInputChange(user.id, "noWhatsapp", e.target.value)
                      }
                    />
                  </div>
                )}

                {selectedOption[user.id] === "offline" && (
                  <div>
                    <input
                    className={styles.inputField}
                      type="text"
                      placeholder="Masukkan Jam"
                      onChange={(e) =>
                        handleInputChange(user.id, "jam", e.target.value)
                      }
                    />
                    <label className={styles.label}>Masukkan Tanggal Sidang:</label>
                    <input
                    className={styles.inputField}
                      type="date"
                      onChange={(e) =>
                        handleInputChange(
                          user.id,
                          "jadwalFixSempro",
                          e.target.value
                        )
                      }
                    />
                    <input
                    className={styles.inputField}
                      type="text"
                      placeholder="Ruangan"
                      onChange={(e) =>
                        handleInputChange(user.id, "ruangan", e.target.value)
                      }
                    />
                    <input
                    className={styles.inputField}
                      type="text"
                      placeholder="Kampus"
                      onChange={(e) =>
                        handleInputChange(user.id, "kampus", e.target.value)
                      }
                    />
                    <input
                    className={styles.inputField}
                      type="text"
                      placeholder="Masukkan Nomor WhatsApp"
                      onChange={(e) =>
                        handleInputChange(user.id, "noWhatsapp", e.target.value)
                      }
                    />
                  </div>
                )}

                <button className={styles.button} onClick={() => handleSubmitSkripsi(user.id)}>
                  Simpan Jadwal
                </button>
                <button className={styles.button} onClick={() => handleSendWhatsApp(user.id)}>
                  Kirim Info ke WhatsApp
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
