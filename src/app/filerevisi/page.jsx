// 'use client'
// import { useState, useEffect } from "react";
// import { db } from "../../firebase";
// import { collection, getDocs, setDoc, doc as firestoreDoc, getDoc } from "firebase/firestore"; 
// import styles from "./filerevisi.module.css";
// import Navbar from "../navbar/Navbar";

// export default function ListAllUsersSempro() {
//   const [usersSemproList, setUsersSemproList] = useState([]);
//   const [pengujiList, setPengujiList] = useState([]); // Daftar penguji
//   const [selectedPenguji, setSelectedPenguji] = useState({}); // Selected penguji
//   const [selectedDate, setSelectedDate] = useState({}); // Selected date for each user

//   // Fetch semua data dari usersSempro collection
//   const fetchAllUsersSemproData = async () => {
//     try {
//       const usersSemproCollection = collection(db, "usersSempro");
//       const usersSemproSnapshot = await getDocs(usersSemproCollection);
//       const usersSemproData = await Promise.all(
//         usersSemproSnapshot.docs.map(async (doc) => {
//           const userData = { id: doc.id, ...doc.data() };

//           const jadwalSemproDocRef = firestoreDoc(db, "revisiMahasiswaSempro", doc.id);
//           const jadwalSemproDocSnap = await getDoc(jadwalSemproDocRef);
//           if (jadwalSemproDocSnap.exists()) {
//             const jadwalSemproData = jadwalSemproDocSnap.data();
//             userData.penguji = jadwalSemproData.penguji || null;
//             userData.penguji2 = jadwalSemproData.penguji2 || null;
//             userData.revisi = jadwalSemproData.revisi || {};
//             userData.tanggalSidang = jadwalSemproData.tanggalSidang || null;  // Add tanggalSidang here
//           }
//           return userData;
//         })
//       );
//       setUsersSemproList(usersSemproData);
//     } catch (error) {
//       console.error("Error fetching usersSempro data: ", error);
//     }
//   };

//   // Fetch data penguji dari koleksi 'penguji'
//   const fetchPengujiData = async () => {
//     try {
//       const pengujiCollection = collection(db, "penguji");
//       const pengujiSnapshot = await getDocs(pengujiCollection);
//       const pengujiData = pengujiSnapshot.docs
//         .filter((doc) => doc.data().role === "penguji")
//         .map((doc) => ({
//           id: doc.id,
//           nama: doc.data().nama,
//           jurusan: doc.data().jurusan,
//           cabangKampus: doc.data().cabangKampus,
//         }));
//       setPengujiList(pengujiData);
//     } catch (error) {
//       console.error("Error fetching penguji data: ", error);
//     }
//   };

//   const handleDateChange = (userId, date) => {
//     setSelectedDate((prevState) => ({
//       ...prevState,
//       [userId]: date,
//     }));
//   };

//   const handleSubmitPenguji = async (userId) => {
//     const selectedPengujiName = selectedPenguji[userId];
//     const selectedUserDate = selectedDate[userId];
    
//     if (!selectedPengujiName || !selectedUserDate) {
//       alert("Silakan pilih penguji dan tanggal terlebih dahulu.");
//       return;
//     }
  
//     const user = usersSemproList.find((user) => user.id === userId);
    
//     const dataToSave = {
//       ...user,
//       penguji: selectedPengujiName,
//       tanggalSidang: selectedUserDate,
//     };
  
//     try {
//       const jadwalPengujiDocRef = firestoreDoc(db, "jadwalPenguji2", userId);
//       await setDoc(jadwalPengujiDocRef, dataToSave, { merge: true });
//       alert("Data berhasil dikirim ke jadwalPenguji2.");
//     } catch (error) {
//       console.error("Error saving data:", error);
//       alert("Terjadi kesalahan saat menyimpan data.");
//     }
//   };

//   useEffect(() => {
//     fetchAllUsersSemproData();
//     fetchPengujiData();
//   }, []);

//   return (
//     <div>
//       <Navbar />
//       <h2 className={styles.subTitle}>Daftar Revisi</h2>
//       <ul className={styles.list}>
//         {usersSemproList.map((user) => (
//           <li key={user.id} className={styles.listItem}>
//             <p><strong>Nama:</strong> {user.nama}</p>
//             <p><strong>Jurusan:</strong> {user.jurusan}</p>
//             <p><strong>Angkatan:</strong> {user.angkatan}</p>
//             <p><strong>Cabang Kampus:</strong> {user.cabangKampus}</p>
//             <p><strong>Nomor WhatsApp:</strong> {user.noWhatsapp}</p>
//             <p><strong>Status:</strong> {user.status || "Belum diverifikasi"}</p>
//             <p><strong>Penguji:</strong> {user.penguji || "Belum dipilih"}</p>
//              {/* Display the tanggalSidang */}
//             <p><strong>Tanggal Sidang:</strong> {user.tanggalSidang || "Tanggal tidak tersedia"}</p>


//             {/* Show additional fields */}
//             <p><strong>Daftar Nilai:</strong> <a href={user.daftarNilaiUrl} target="_blank" rel="noopener noreferrer">Link</a></p>
//             <p><strong>File TA 1:</strong> <a href={user.fileTA1Url} target="_blank" rel="noopener noreferrer">Link</a></p>
//             <p><strong>KRS:</strong> <a href={user.krsUrl} target="_blank" rel="noopener noreferrer">Link</a></p>
//             <p><strong>Pengajuan Sidang:</strong> <a href={user.pengajuanSidangUrl} target="_blank" rel="noopener noreferrer">Link</a></p>

//             {/* Display revisi data */}
//             {user.revisi && (
//               <div>
//                 <h4>Revisi</h4>
//                 {user.revisi.PEBIMBING && (
//                   <div>
//                     <h5>PEBIMBING</h5>
//                     <p>{user.revisi.PEBIMBING.text}</p>
//                     <img src={user.revisi.PEBIMBING.imageUrl} alt="PEBIMBING" style={{ width: "100px" }} />
//                   </div>
//                 )}
//                 {user.revisi.KETUA_PENGUJI && (
//                   <div>
//                     <h5>KETUA PENGUJI</h5>
//                     <p>{user.revisi.KETUA_PENGUJI.text}</p>
//                     <img src={user.revisi.KETUA_PENGUJI.imageUrl} alt="KETUA PENGUJI" style={{ width: "100px" }} />
//                   </div>
//                 )}
//                 {user.revisi.ANGGOTA_PENGUJI && (
//                   <div>
//                     <h5>ANGGOTA PENGUJI</h5>
//                     <p>{user.revisi.ANGGOTA_PENGUJI.text}</p>
//                     <img src={user.revisi.ANGGOTA_PENGUJI.imageUrl} alt="ANGGOTA PENGUJI" style={{ width: "100px" }} />
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Penguji selection
//             <label>Pilih Penguji:</label>
//             <select
//               onChange={(e) => setSelectedPenguji({ ...selectedPenguji, [user.id]: e.target.value })}
//               value={selectedPenguji[user.id] || ""}
//             >
//               <option value="">Pilih Penguji</option>
//               {pengujiList.map((penguji) => (
//                 <option key={penguji.id} value={penguji.nama}>
//                   {penguji.nama} - {penguji.jurusan} ({penguji.cabangKampus})
//                 </option>
//               ))}
//             </select>

//             <label>Pilih Tanggal Sidang:</label>
//             <input
//               type="date"
//               onChange={(e) => handleDateChange(user.id, e.target.value)}
//               value={selectedDate[user.id] || ""}
//             />
//             <button onClick={() => handleSubmitPenguji(user.id)}>Kirim Jadwal</button> */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


//tanggal 25 januari 2025
"use client"
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, setDoc, doc as firestoreDoc, getDoc } from "firebase/firestore"; 
import styles from "./filerevisi.module.css";
import Navbar from "../navbar/Navbar";

export default function ListAllUsersSempro() {
  const [usersSemproList, setUsersSemproList] = useState([]);
  const [usersSkripsiList, setUsersSkripsiList] = useState([]);

  const fetchAllUsersSemproData = async () => {
    try {
      const usersSemproCollection = collection(db, "usersSempro");
      const usersSkripsiCollection = collection(db, "usersSkripsi");
      const usersSemproSnapshot = await getDocs(usersSemproCollection);
      const usersSkripsiSnapshot = await getDocs(usersSkripsiCollection);
      const usersSemproData = await Promise.all(
        usersSemproSnapshot.docs.map(async (doc) => {
          const userData = { id: doc.id, ...doc.data() };

          const jadwalSemproDocRef = firestoreDoc(db, "revisiMahasiswaSempro", doc.id);
          const jadwalSemproDocSnap = await getDoc(jadwalSemproDocRef);
          if (jadwalSemproDocSnap.exists()) {
            const jadwalSemproData = jadwalSemproDocSnap.data();
            userData.penguji = jadwalSemproData.penguji || null;
            userData.penguji2 = jadwalSemproData.penguji2 || null;
            userData.revisi = jadwalSemproData.revisi || {};
            userData.tanggalSidang = jadwalSemproData.tanggalSidang || null;
          }
          return userData;
        })
      );
      const usersSkripsiData = await Promise.all(
        usersSkripsiSnapshot.docs.map(async (doc) => {
          const userData = { id: doc.id, ...doc.data() };

          const jadwalSkripsiDocRef = firestoreDoc(db, "revisiMahasiswaSkripsi", doc.id);
          const jadwalSkripsiDocSnap = await getDoc(jadwalSkripsiDocRef);
          if (jadwalSkripsiDocSnap.exists()) {
            const jadwalSkripsiData = jadwalSkripsiDocSnap.data();
            userData.penguji1 = jadwalSkripsiData.penguji1 || null;
            userData.penguji2 = jadwalSkripsiData.penguji2 || null;
            userData.dosen = jadwalSkripsiData.dosen || null;
            userData.revisi = jadwalSkripsiData.revisi || {};
            userData.tanggalSidang = jadwalSkripsiData.tanggalSidang || null;
          }
          return userData;
        })
      );
      setUsersSemproList(usersSemproData);
      setUsersSkripsiList(usersSkripsiData);
    } catch (error) {
      console.error("Error fetching usersSempro data: ", error);
    }
  };

  useEffect(() => {
    fetchAllUsersSemproData();
  }, []);

  return (
    <div>
      <Navbar />
      <h2 className={styles.subTitle}>Lembar Revisi dan Masukan Sempro</h2>
      <ul className={styles.list}>
        {usersSemproList.map((user) => (
          <li key={user.id} className={styles.listItem}>
            <p>Data</p>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td><strong>Nama</strong></td>
                  <td>{user.nama}</td>
                </tr>
                <tr>
                  <td><strong>NIM</strong></td>
                  <td>{user.id || "N/A"}</td>
                </tr>
                <tr>
                  <td><strong>Judul</strong></td>
                  <td>{user.judul || "N/A"}</td>
                </tr>
                <tr>
                  <td><strong>Pembimbing</strong></td>
                  <td>{user.dosen || "Belum dipilih"}</td>
                </tr>
                <tr>
                  <td><strong>Penguji 1</strong></td>
                  <td>{user.penguji1 || "Belum dipilih"}</td>
                </tr>
                <tr>
                  <td><strong>Penguji 2</strong></td>
                  <td>{user.penguji2 || "Belum dipilih"}</td>
                </tr>
                
                <tr>
                  <td><strong>Hari/Tanggal</strong></td>
                  <td>{user.tanggalSidang || "Belum tersedia"}</td>
                </tr>
              </tbody>
            </table>

            <h4>Revisi dan Masukan</h4>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td><strong>Pembimbing</strong></td>
                  <td>
                    {user.revisi?.PEBIMBING?.text || "Tidak ada revisi"}
                    {user.revisi?.PEBIMBING?.imageUrl && (
                      <img
                        src={user.revisi.PEBIMBING.imageUrl}
                        alt="Revisi Pembimbing"
                        style={{ width: "100px" }}
                      />
                    )}
                  </td>
                </tr>
                <tr>
                  <td><strong>Ketua Penguji</strong></td>
                  <td>
                    {user.revisi?.KETUA_PENGUJI?.text || "Tidak ada revisi"}
                    {user.revisi?.KETUA_PENGUJI?.imageUrl && (
                      <img
                        src={user.revisi.KETUA_PENGUJI.imageUrl}
                        alt="Revisi Ketua Penguji"
                        style={{ width: "100px" }}
                      />
                    )}
                  </td>
                </tr>
                <tr>
                  <td><strong>Anggota Penguji</strong></td>
                  <td>
                    {user.revisi?.ANGGOTA_PENGUJI?.text || "Tidak ada revisi"}
                    {user.revisi?.ANGGOTA_PENGUJI?.imageUrl && (
                      <img
                        src={user.revisi.ANGGOTA_PENGUJI.imageUrl}
                        alt="Revisi Anggota Penguji"
                        style={{ width: "100px" }}
                      />
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
        ))}
      </ul>
      <h2 className={styles.subTitle}>Lembar Revisi dan Masukan Skripsi</h2>
      <ul className={styles.list}>
        {usersSkripsiList.map((user) => (
          <li key={user.id} className={styles.listItem}>
            <p>Data</p>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td><strong>Nama</strong></td>
                  <td>{user.nama}</td>
                </tr>
                <tr>
                  <td><strong>NIM</strong></td>
                  <td>{user.id || "N/A"}</td>
                </tr>
                <tr>
                  <td><strong>Judul</strong></td>
                  <td>{user.judul || "N/A"}</td>
                </tr>
                <tr>
                  <td><strong>Pembimbing</strong></td>
                  <td>{user.dosen || "Belum dipilih"}</td>
                </tr>
                <tr>
                  <td><strong>Penguji 1</strong></td>
                  <td>{user.penguji1 || "Belum dipilih"}</td>
                </tr>
                <tr>
                  <td><strong>Penguji 2</strong></td>
                  <td>{user.penguji2 || "Belum dipilih"}</td>
                </tr>
                <tr>
                  <td><strong>Hari/Tanggal</strong></td>
                  <td>{user.tanggalSidang || "Belum tersedia"}</td>
                </tr>
              </tbody>
            </table>

            <h4>Revisi dan Masukan</h4>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td><strong>Pembimbing</strong></td>
                  <td>
                    {user.revisi?.PEBIMBING?.text || "Tidak ada revisi"}
                    {user.revisi?.PEBIMBING?.imageUrl && (
                      <img
                        src={user.revisi.PEBIMBING.imageUrl}
                        alt="Revisi Pembimbing"
                        style={{ width: "100px" }}
                      />
                    )}
                  </td>
                </tr>
                <tr>
                  <td><strong>Ketua Penguji</strong></td>
                  <td>
                    {user.revisi?.KETUA_PENGUJI?.text || "Tidak ada revisi"}
                    {user.revisi?.KETUA_PENGUJI?.imageUrl && (
                      <img
                        src={user.revisi.KETUA_PENGUJI.imageUrl}
                        alt="Revisi Ketua Penguji"
                        style={{ width: "100px" }}
                      />
                    )}
                  </td>
                </tr>
                <tr>
                  <td><strong>Anggota Penguji</strong></td>
                  <td>
                    {user.revisi?.ANGGOTA_PENGUJI?.text || "Tidak ada revisi"}
                    {user.revisi?.ANGGOTA_PENGUJI?.imageUrl && (
                      <img
                        src={user.revisi.ANGGOTA_PENGUJI.imageUrl}
                        alt="Revisi Anggota Penguji"
                        style={{ width: "100px" }}
                      />
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
        ))}
      </ul>
    </div>
  );
}



