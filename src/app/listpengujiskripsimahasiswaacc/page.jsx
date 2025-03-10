<<<<<<< HEAD
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
=======
// "use client";
// import { useState, useEffect } from 'react';
// import { db } from '../../firebase';
// import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
// import styles from './listpengujisempromahasiswaacc.module.css';
// import NavbarPenguji from '../navbarpenguji/page';

// export default function ListAllUsersSempro({ userNim }) {
//   const [usersSemproList, setUsersSemproList] = useState([]);
//   const [pengujiName, setPengujiName] = useState("");

//   // Fetch penguji name based on userNim
//   useEffect(() => {
//     const fetchPengujiName = async () => {
//       try {
//         const userDoc = await getDoc(doc(db, "users", userNim));
//         if (userDoc.exists() && userDoc.data().role === "penguji") {
//           setPengujiName(userDoc.data().nama); // Assuming "nama" holds the penguji's name
//         }
//       } catch (error) {
//         console.error("Error fetching penguji name:", error);
//       }
//     };

//     if (userNim) {
//       fetchPengujiName();
//     }
//   }, [userNim]);

//   // Fetch data from usersSempro collection and filter by penguji name
//   useEffect(() => {
//     const fetchAllUsersSemproData = async () => {
//       try {
//         const usersSemproCollection = collection(db, "usersSempro");
//         const usersSemproSnapshot = await getDocs(usersSemproCollection);
//         const usersSemproData = usersSemproSnapshot.docs
//           .map((doc) => ({ id: doc.id, ...doc.data() }))
//           .filter((data) => data.penguji === pengujiName); // Filter for specific penguji's data
//         setUsersSemproList(usersSemproData);
//       } catch (error) {
//         console.error("Error fetching usersSempro data: ", error);
//       }
//     };

//     if (pengujiName) {
//       fetchAllUsersSemproData();
//     }
//   }, [pengujiName]);

//   return (
//     <div>
//       <NavbarPenguji />
//       <h2 className={styles.subTitle}>Data Mahasiswa untuk Penguji: {pengujiName}</h2>
//       <ul className={styles.list}>
//         {usersSemproList.map((user) => (
//           <li key={user.id} className={styles.listItem}>
//             <p><strong>Nama:</strong> {user.nama}</p>
//             <p><strong>Jurusan:</strong> {user.jurusan}</p>
//             <p><strong>Angkatan:</strong> {user.angkatan}</p>
//             <p><strong>Cabang Kampus:</strong> {user.cabangKampus}</p>
//             <p><strong>Nomor WhatsApp:</strong> {user.noWhatsapp}</p>
//             <p><strong>Status:</strong> {user.status || "Belum diverifikasi"}</p>
//             {user.penguji && <p><strong>Dosen Penguji:</strong> {user.penguji}</p>}
//             <p>File Pengajuan: <a href={user.pengajuanSidangUrl} target="_blank" rel="noopener noreferrer">Download</a></p>
//             <p>File KRS: <a href={user.krsUrl} target="_blank" rel="noopener noreferrer">Download</a></p>
//             <p>File Daftar Nilai: <a href={user.daftarNilaiUrl} target="_blank" rel="noopener noreferrer">Download</a></p>
//             <p>File TA1: <a href={user.fileTA1Url} target="_blank" rel="noopener noreferrer">Download</a></p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }



// "use client";
// import { useState, useEffect } from 'react';
// import { db } from '../../firebase';
// import { collection, getDocs } from 'firebase/firestore';
// import styles from './listpengujisempromahasiswaacc.module.css';
// import NavbarPenguji from '../navbarpenguji/page';
// // import Navbar from '../navbar/page';

// export default function ListAllUsersSempro() {
//   const [usersSemproList, setUsersSemproList] = useState([]);

//   // Fetch all data from usersSempro collection
//   const fetchAllUsersSemproData = async () => {
//     try {
//       const usersSemproCollection = collection(db, "usersSempro");
//       const usersSemproSnapshot = await getDocs(usersSemproCollection);
//       const usersSemproData = usersSemproSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setUsersSemproList(usersSemproData);
//     } catch (error) {
//       console.error("Error fetching usersSempro data: ", error);
//     }
//   };

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchAllUsersSemproData();
//   }, []);

//   return (
//     <div>
//       <NavbarPenguji />
//       <h2 className={styles.subTitle}>Daftar Semua Data usersSempro</h2>
//       <ul className={styles.list}>
//         {usersSemproList.map((user) => (
//           <li key={user.id} className={styles.listItem}>
//             <p><strong>Nama:</strong> {user.nama}</p>
//             <p><strong>Jurusan:</strong> {user.jurusan}</p>
//             <p><strong>Angkatan:</strong> {user.angkatan}</p>
//             <p><strong>Cabang Kampus:</strong> {user.cabangKampus}</p>
//             <p><strong>Nomor WhatsApp:</strong> {user.noWhatsapp}</p>
//             <p><strong>Status:</strong> {user.status || "Belum diverifikasi"}</p>
//             {user.penguji && <p><strong>Dosen Penguji:</strong> {user.penguji}</p>}
//             <p>File Pengajuan: <a href={user.pengajuanSidangUrl} target="_blank" rel="noopener noreferrer">Download</a></p>
//             <p>File KRS: <a href={user.krsUrl} target="_blank" rel="noopener noreferrer">Download</a></p>
//             <p>File Daftar Nilai: <a href={user.daftarNilaiUrl} target="_blank" rel="noopener noreferrer">Download</a></p>
//             <p>File TA1: <a href={user.fileTA1Url} target="_blank" rel="noopener noreferrer">Download</a></p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


//update tgl 8 november 2024
// "use client";
// import { useState, useEffect } from 'react';
// import { db } from '../../firebase';
// import { collection, getDocs, addDoc } from 'firebase/firestore';
// import styles from './listpengujisempromahasiswaacc.module.css';
// import NavbarPenguji from '../navbarpenguji/page';

// export default function ListAllUsersSempro() {
//   const [usersSemproList, setUsersSemproList] = useState([]);
//   const [selectedOption, setSelectedOption] = useState({});
//   const [formValues, setFormValues] = useState({});

//   // Fetch all data from usersSempro collection
//   const fetchAllUsersSemproData = async () => {
//     try {
//       const usersSemproCollection = collection(db, "usersSempro");
//       const usersSemproSnapshot = await getDocs(usersSemproCollection);
//       const usersSemproData = usersSemproSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setUsersSemproList(usersSemproData);
//     } catch (error) {
//       console.error("Error fetching usersSempro data: ", error);
//     }
//   };

//   // Handle scheduling option change
//   const handleOptionChange = (userId, option) => {
//     setSelectedOption((prev) => ({ ...prev, [userId]: option }));
//   };

//   // Handle form value change
//   const handleInputChange = (userId, field, value) => {
//     setFormValues((prev) => ({
//       ...prev,
//       [userId]: { ...prev[userId], [field]: value },
//     }));
//   };

//   // Submit schedule to Firebase
//   const handleSubmit = async (userId) => {
//     const scheduleData = {
//       ...formValues[userId],
//       userId,
//       mode: selectedOption[userId],
//     };

//     try {
//       await addDoc(collection(db, "jadwalSempro"), scheduleData);
//       alert("Jadwal sidang sempro berhasil disimpan");
//     } catch (error) {
//       console.error("Error adding schedule to Firebase:", error);
//       alert("Terjadi kesalahan saat menyimpan jadwal");
//     }
//   };

//   // Generate WhatsApp message link
//   const handleSendWhatsApp = (userId) => {
//     const userValues = formValues[userId];
//     let message = `Halo, berikut adalah informasi untuk sidang sempro Anda:\n\n`;

//     if (selectedOption[userId] === "online") {
//       message += `Mode: Online\nLink GMeet: ${userValues.gmeetLink}\nNomor WhatsApp: ${userValues.noWhatsapp}`;
//     } else if (selectedOption[userId] === "offline") {
//       message += `Mode: Offline\nJam: ${userValues.jam}\nTanggal: ${userValues.tanggal} ${userValues.bulan} ${userValues.tahun}\nRuangan: ${userValues.ruangan}\nKampus: ${userValues.kampus}\nNomor WhatsApp: ${userValues.noWhatsapp}`;
//     }

//     const whatsappUrl = `https://wa.me/${userValues.noWhatsapp}?text=${encodeURIComponent(message)}`;
//     window.open(whatsappUrl, "_blank");
//   };

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchAllUsersSemproData();
//   }, []);

//   return (
//     <div>
//       <NavbarPenguji />
//       <h2 className={styles.subTitle}>Daftar Semua Data usersSempro</h2>
//       <ul className={styles.list}>
//         {usersSemproList.map((user) => (
//           <li key={user.id} className={styles.listItem}>
//             <p><strong>Nama:</strong> {user.nama}</p>
//             <p><strong>Jurusan:</strong> {user.jurusan}</p>
//             <p><strong>Angkatan:</strong> {user.angkatan}</p>
//             <p><strong>Cabang Kampus:</strong> {user.cabangKampus}</p>
//             <p><strong>Nomor WhatsApp:</strong> {user.noWhatsapp}</p>
//             <p><strong>Status:</strong> {user.status || "Belum diverifikasi"}</p>
//             {user.penguji && <p><strong>Dosen Penguji:</strong> {user.penguji}</p>}
//             <p>File Pengajuan: <a href={user.pengajuanSidangUrl} target="_blank" rel="noopener noreferrer">Download</a></p>
//             <p>File KRS: <a href={user.krsUrl} target="_blank" rel="noopener noreferrer">Download</a></p>
//             <p>File Daftar Nilai: <a href={user.daftarNilaiUrl} target="_blank" rel="noopener noreferrer">Download</a></p>
//             <p>File TA1: <a href={user.fileTA1Url} target="_blank" rel="noopener noreferrer">Download</a></p>

//             {user.status === "Data Dikirim Ke Penguji" && (
//               <div>
//                 <label>Mode Sidang:</label>
//                 <select
//                   value={selectedOption[user.id] || ""}
//                   onChange={(e) => handleOptionChange(user.id, e.target.value)}
//                 >
//                   <option value="">Pilih Mode</option>
//                   <option value="online">Online</option>
//                   <option value="offline">Offline</option>
//                 </select>

//                 {selectedOption[user.id] === "online" && (
//                   <div>
//                     <input
//                       type="text"
//                       placeholder="Masukkan Link GMeet"
//                       onChange={(e) => handleInputChange(user.id, "gmeetLink", e.target.value)}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Masukkan Nomor WhatsApp"
//                       onChange={(e) => handleInputChange(user.id, "noWhatsapp", e.target.value)}
//                     />
//                   </div>
//                 )}

//                 {selectedOption[user.id] === "offline" && (
//                   <div>
//                     <input
//                       type="text"
//                       placeholder="Masukkan Jam"
//                       onChange={(e) => handleInputChange(user.id, "jam", e.target.value)}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Masukkan Tanggal"
//                       onChange={(e) => handleInputChange(user.id, "tanggal", e.target.value)}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Masukkan Bulan"
//                       onChange={(e) => handleInputChange(user.id, "bulan", e.target.value)}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Masukkan Tahun"
//                       onChange={(e) => handleInputChange(user.id, "tahun", e.target.value)}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Ruangan"
//                       onChange={(e) => handleInputChange(user.id, "ruangan", e.target.value)}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Kampus"
//                       onChange={(e) => handleInputChange(user.id, "kampus", e.target.value)}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Masukkan Nomor WhatsApp"
//                       onChange={(e) => handleInputChange(user.id, "noWhatsapp", e.target.value)}
//                     />
//                   </div>
//                 )}

//                 <button onClick={() => handleSubmit(user.id)}>Simpan Jadwal</button>
//                 <button onClick={() => handleSendWhatsApp(user.id)}>Kirim Info ke WhatsApp</button>
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


//update terbaru tgl 8 november 2024
// "use client";
// import { useState, useEffect } from 'react';
// import { db } from '../../firebase';
// // import { collection, getDocs, addDoc, doc, getDoc } from 'firebase/firestore';
// import { collection, getDocs, setDoc, doc as firestoreDoc, getDoc } from "firebase/firestore";
// import styles from './listpengujiskripsimahasiswaacc.module.css';
// import NavbarPenguji from '../navbarpenguji/page';

// export default function ListAllUsersSkripsi() {
//   const [usersSemproList, setUsersSemproList] = useState([]);
//   const [selectedOption, setSelectedOption] = useState({});
//   const [formValues, setFormValues] = useState({});
//   const [pengujiList, setPengujiList] = useState([]); // Daftar penguji
//   const [selectedPenguji, setSelectedPenguji] = useState({}); // Selected penguji
//   const [selectedDate, setSelectedDate] = useState({}); // Selected date for each user


//   // Fetch all data from usersSempro collection
//   // const fetchAllUsersSemproData = async () => {
//   //   try {
//   //     const usersSemproCollection = collection(db, "usersSkripsi");
//   //     const usersSemproSnapshot = await getDocs(usersSemproCollection);
//   //     const usersSemproData = usersSemproSnapshot.docs.map((doc) => ({
//   //       id: doc.id,
//   //       ...doc.data(),
//   //     }));
//   //     setUsersSemproList(usersSemproData);
//   //   } catch (error) {
//   //     console.error("Error fetching usersSempro data: ", error);
//   //   }
//   // };

//     // Fetch data penguji dari koleksi 'penguji'
//     const fetchPengujiData = async () => {
//       try {
//         const pengujiCollection = collection(db, "penguji");
//         const pengujiSnapshot = await getDocs(pengujiCollection);
//         const pengujiData = pengujiSnapshot.docs
//           .filter((doc) => doc.data().role === "penguji")
//           .map((doc) => ({
//             id: doc.id,
//             nama: doc.data().nama,
//             jurusan: doc.data().jurusan,
//             cabangKampus: doc.data().cabangKampus,
//           }));
//         setPengujiList(pengujiData);
//       } catch (error) {
//         console.error("Error fetching penguji data: ", error);
//       }
//     };

    
//   const fetchAllUsersSemproData = async () => {
//     try {
//       const usersSemproCollection = collection(db, "usersSkripsi");
//       const usersSemproSnapshot = await getDocs(usersSemproCollection);
//       const usersSemproData = await Promise.all(
//         usersSemproSnapshot.docs.map(async (doc) => {
//           const userData = { id: doc.id, ...doc.data() };

//           const jadwalSemproDocRef = firestoreDoc(db, "jadwalSkripsi", doc.id);
//           const jadwalSemproDocSnap = await getDoc(jadwalSemproDocRef);
//           if (jadwalSemproDocSnap.exists()) {
//             const jadwalSemproData = jadwalSemproDocSnap.data();
//             userData.penguji = jadwalSemproData.penguji || null;
//             userData.penguji2 = jadwalSemproData.penguji2 || null;
//           }
//           return userData;
//         })
//       );
//       setUsersSemproList(usersSemproData);
//     } catch (error) {
//       console.error("Error fetching usersSempro data: ", error);
//     }
//   };

//   // Handle scheduling option change
//   const handleOptionChange = (userId, option) => {
//     setSelectedOption((prev) => ({ ...prev, [userId]: option }));
//   };

//   // Handle form value change
//   const handleInputChange = (userId, field, value) => {
//     setFormValues((prev) => ({
//       ...prev,
//       [userId]: { ...prev[userId], [field]: value },
//     }));
//   };

//   // Submit schedule to Firebase with userSempro data included
//   const handleSubmit = async (userId) => {
//     try {
//       const userDocRef = doc(db, "usersSkripsi", userId);
//       const userDocSnap = await getDoc(userDocRef);

//       if (userDocSnap.exists()) {
//         const userSemproData = userDocSnap.data();
//         const scheduleData = {
//           ...formValues[userId],
//           userId,
//           mode: selectedOption[userId],
//           ...userSemproData // Include all data from userSempro in jadwalSempro
//         };

//         await addDoc(collection(db, "jadwalSkripsi"), scheduleData);
//         alert("Jadwal sidang sempro berhasil disimpan dan data pengguna disalin ke jadwalSempro.");
//       } else {
//         console.error("User data not found in usersSempro.");
//       }
//     } catch (error) {
//       console.error("Error adding schedule to Firebase:", error);
//       alert("Terjadi kesalahan saat menyimpan jadwal");
//     }
//   };

//   // Generate WhatsApp message link
//   const handleSendWhatsApp = (userId) => {
//     const userValues = formValues[userId];
//     let message = `Halo, berikut adalah informasi untuk sidang skripsi Anda:\n\n`;

//     if (selectedOption[userId] === "online") {
//       message += `Mode: Online\nLink GMeet: ${userValues.gmeetLink}\nNomor WhatsApp: ${userValues.noWhatsapp}`;
//     } else if (selectedOption[userId] === "offline") {
//       message += `Mode: Offline\nJam: ${userValues.jam}\nTanggal: ${userValues.tanggal} ${userValues.bulan} ${userValues.tahun}\nRuangan: ${userValues.ruangan}\nKampus: ${userValues.kampus}\nNomor WhatsApp: ${userValues.noWhatsapp}`;
//     }

//     const whatsappUrl = `https://wa.me/${userValues.noWhatsapp}?text=${encodeURIComponent(message)}`;
//     window.open(whatsappUrl, "_blank");
//   };


//   const handleSubmitPenguji = async (userId) => {
//     const selectedPengujiName = selectedPenguji[userId];
//     const selectedUserDate = selectedDate[userId];
    
//     if (!selectedPengujiName || !selectedUserDate) {
//       alert("Silakan pilih penguji dan tanggal terlebih dahulu.");
//       return;
//     }
  
//     // Cari data pengguna berdasarkan userId
//     const user = usersSemproList.find((user) => user.id === userId);
    
//     // Tambahkan semua data user ke dalam dataToSave, lalu tambahkan penguji dan tanggal
//     const dataToSave = {
//       ...user, // Semua data pengguna (id, nama, jurusan, dll)
//       penguji: selectedPengujiName, // Menambahkan/Override penguji
//       tanggalSidang: selectedUserDate, // Menambahkan tanggal
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

//   const handleDateChange = (userId, date) => {
//     setSelectedDate((prevState) => ({
//       ...prevState,
//       [userId]: date,
//     }));
//   };

  
//   useEffect(() => {
//     fetchAllUsersSemproData();
//     fetchPengujiData();
//   }, []);

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchAllUsersSemproData();
//   }, []);

//   return (
//     <div>
//       <NavbarPenguji />
//       <h2 className={styles.subTitle}>Daftar Semua Data usersSkripsi</h2>
//       <ul className={styles.list}>
//         {usersSemproList.map((user) => (
//           <li key={user.id} className={styles.listItem}>
//             <p><strong>Nama:</strong> {user.nama}</p>
//             <p><strong>Jurusan:</strong> {user.jurusan}</p>
//             <p><strong>Angkatan:</strong> {user.angkatan}</p>
//             <p><strong>Cabang Kampus:</strong> {user.cabangKampus}</p>
//             <p><strong>Nomor WhatsApp:</strong> {user.noWhatsapp}</p>
//             <p><strong>Penguji 1:</strong> {user.penguji1}</p>
//             <p><strong>Penguji 2:</strong> {user.penguji2}</p>
//             <p><strong>Status:</strong> {user.status || "Belum diverifikasi"}</p>
//             {user.penguji && <p><strong>Dosen Penguji:</strong> {user.penguji}</p>}
//             <p>File Pengajuan: <a href={user.pengajuanSidangUrl} target="_blank" rel="noopener noreferrer">Download</a></p>
//             <p>File KRS: <a href={user.krsUrl} target="_blank" rel="noopener noreferrer">Download</a></p>
//             <p>File Daftar Nilai: <a href={user.daftarNilaiUrl} target="_blank" rel="noopener noreferrer">Download</a></p>
//             <p>File TA1: <a href={user.fileTA1Url} target="_blank" rel="noopener noreferrer">Download</a></p>

//             {user.status === "Data Dikirim Ke Penguji" && (
//               <div>
//                 <label>Mode Sidang:</label>
//                 <select
//                   value={selectedOption[user.id] || ""}
//                   onChange={(e) => handleOptionChange(user.id, e.target.value)}
//                 >
//                   <option value="">Pilih Mode</option>
//                   <option value="online">Online</option>
//                   <option value="offline">Offline</option>
//                 </select>

//                 {selectedOption[user.id] === "online" && (
//                   <div>
//                     <input
//                       type="text"
//                       placeholder="Masukkan Link GMeet"
//                       onChange={(e) => handleInputChange(user.id, "gmeetLink", e.target.value)}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Masukkan Nomor WhatsApp"
//                       onChange={(e) => handleInputChange(user.id, "noWhatsapp", e.target.value)}
//                     />
//                   </div>
//                 )}

//                 {selectedOption[user.id] === "offline" && (
//                   <div>
//                     <input
//                       type="text"
//                       placeholder="Masukkan Jam"
//                       onChange={(e) => handleInputChange(user.id, "jam", e.target.value)}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Masukkan Tanggal"
//                       onChange={(e) => handleInputChange(user.id, "tanggal", e.target.value)}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Masukkan Bulan"
//                       onChange={(e) => handleInputChange(user.id, "bulan", e.target.value)}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Masukkan Tahun"
//                       onChange={(e) => handleInputChange(user.id, "tahun", e.target.value)}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Ruangan"
//                       onChange={(e) => handleInputChange(user.id, "ruangan", e.target.value)}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Kampus"
//                       onChange={(e) => handleInputChange(user.id, "kampus", e.target.value)}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Masukkan Nomor WhatsApp"
//                       onChange={(e) => handleInputChange(user.id, "noWhatsapp", e.target.value)}
//                     />
//                   </div>
//                 )}

//                 <button onClick={() => handleSubmit(user.id)}>Simpan Jadwal</button>
//                 <button onClick={() => handleSendWhatsApp(user.id)}>Kirim Info ke WhatsApp</button>
//                 <ul className={styles.list}>
                  
//                 <label>Pilih Penguji:</label>
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
//             <button onClick={() => handleSubmitPenguji(user.id)}>Kirim Jadwal</button>
//             </ul>
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


//update tgl 18 januari 2025
"use client";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, setDoc, doc as firestoreDoc, orderBy ,getDoc } from "firebase/firestore";
import styles from "./listpengujiskripsimahasiswaacc.module.css";
import NavbarPenguji from "../navbarpenguji/page";
>>>>>>> 686f11d5d4b1969ada7f2d1f90da6af832616387

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

<<<<<<< HEAD
=======
  // const fetchUsers = async () => {
  //   try {
  //     const usersRef = collection(db, "usersSkripsi");
  //     const snapshot = await getDocs(
  //       usersRef, 
  //       // Mengurutkan berdasarkan tanggal pengajuan atau timestamp, misalnya field 'tanggal' atau 'timestamp'
  //       orderBy("tanggal", "desc") // Mengurutkan berdasarkan field 'tanggal' secara menurun (desc)
  //     );
  //     const users = snapshot.docs.map(async (doc) => {
  //       const userData = { id: doc.id, ...doc.data() };
  //       const jadwalRef = firestoreDoc(db, "jadwalSkripsi", doc.id);
  //       const jadwalSnap = await getDoc(jadwalRef);
  //       if (jadwalSnap.exists()) {
  //         userData.jadwal = jadwalSnap.data();
  //       }
  //       return userData;
  //     });
  
  //     // Urutkan hasil berdasarkan tanggal jika perlu
  //     const sortedUsers = await Promise.all(users);
  //     sortedUsers.sort((a, b) => new Date(b.jadwal?.tanggal || 0) - new Date(a.jadwal?.tanggal || 0));
      
  //     setUsersList(sortedUsers);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };
  

  // const fetchUsers = async () => {
  //   try {
  //     const usersRef = collection(db, "usersSkripsi");
  //     const snapshot = await getDocs(
  //       usersRef, 
  //       // Mengurutkan berdasarkan tanggal pengajuan atau timestamp, misalnya field 'tanggal' atau 'timestamp'
  //       orderBy("tanggal", "desc") // Mengurutkan berdasarkan field 'tanggal' secara menurun (desc)
  //     );
  //     const users = snapshot.docs.map(async (doc) => {
  //       const userData = { id: doc.id, ...doc.data() };
  //       const jadwalRef = firestoreDoc(db, "jadwalSkripsi", doc.id);
  //       const jadwalSnap = await getDoc(jadwalRef);
  //       if (jadwalSnap.exists()) {
  //         userData.jadwal = jadwalSnap.data();
  //       }
  //       return userData;
  //     });
  //     const fetchedUsers = await Promise.all(users);
  //     setUsersList(fetchedUsers.reverse()); // Membalik urutan array untuk menampilkan data terbaru di atas
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // };
  

>>>>>>> 686f11d5d4b1969ada7f2d1f90da6af832616387
  const fetchUsers = async () => {
    try {
      const usersRef = collection(db, "usersSkripsi");
      const snapshot = await getDocs(
<<<<<<< HEAD
        usersRef,
=======
        usersRef, 
>>>>>>> 686f11d5d4b1969ada7f2d1f90da6af832616387
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
<<<<<<< HEAD
=======
  
  
  
>>>>>>> 686f11d5d4b1969ada7f2d1f90da6af832616387

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

<<<<<<< HEAD
  const handleSubmit = async (userId) => {
    // Ambil data penguji dan tanggal yang dipilih
    const selectedPengujiName = selectedPenguji[userId];
    const selectedUserDate = selectedDate[userId];

    // Validasi apakah penguji dan tanggal sudah dipilih
=======
  // const handleSubmit = async (userId) => {
  //   try {
  //     const data = {
  //       ...formValues[userId],
  //       mode: selectedOption[userId],
  //       tanggal: selectedDate[userId],
  //       penguji: selectedPenguji[userId],
  //     };
  //     await setDoc(firestoreDoc(db, "jadwalSkripsi", userId), data, { merge: true });
  //     alert("Jadwal berhasil disimpan.");
  //   } catch (error) {
  //     console.error("Error saving jadwal:", error);
  //   }
  // };

  const handleSubmit = async (userId) => {
    // Retrieve the selected penguji and date for the user
    const selectedPengujiName = selectedPenguji[userId];
    const selectedUserDate = selectedDate[userId];
    
    // Check if penguji and date are selected
>>>>>>> 686f11d5d4b1969ada7f2d1f90da6af832616387
    if (!selectedPengujiName || !selectedUserDate) {
      alert("Silakan pilih penguji dan tanggal terlebih dahulu.");
      return;
    }
<<<<<<< HEAD

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
=======
  
    // Find the user data based on userId
    const user = usersList.find((user) => user.id === userId);
  
    // Prepare the data to save for the user's jadwal
    const dataToSave = {
      ...user, // All user data (id, name, department, etc.)
      penguji: selectedPengujiName, // Adding/Overriding penguji
      tanggalSidang: selectedUserDate, // Adding the selected date
    };
  
    // First, save the data in the 'jadwalSkripsi' collection
>>>>>>> 686f11d5d4b1969ada7f2d1f90da6af832616387
    try {
      const data = {
        ...formValues[userId],
        mode: selectedOption[userId],
<<<<<<< HEAD
        tanggal: formattedDate, // Pastikan tanggal juga diformat di sini
        penguji: selectedPenguji[userId],
      };
      await setDoc(firestoreDoc(db, "jadwalSkripsi", userId), data, {
        merge: true,
      });
=======
        tanggal: selectedDate[userId],
        penguji: selectedPenguji[userId],
      };
      await setDoc(firestoreDoc(db, "jadwalSkripsi", userId), data, { merge: true });
>>>>>>> 686f11d5d4b1969ada7f2d1f90da6af832616387
      alert("Jadwal berhasil disimpan.");
    } catch (error) {
      console.error("Error saving jadwal:", error);
    }
<<<<<<< HEAD

    // Simpan ke koleksi 'jadwalPenguji3'
    try {
      const jadwalPengujiDocRef = firestoreDoc(db, "jadwalPenguji3", userId);
      await setDoc(jadwalPengujiDocRef, dataToSave, { merge: true });
      alert("Data berhasil dikirim ke jadwal Penguji 1.");
=======
  
    // Then, save the additional user data in 'jadwalPenguji2' collection
    try {
      const jadwalPengujiDocRef = firestoreDoc(db, "jadwalPenguji3", userId);
      await setDoc(jadwalPengujiDocRef, dataToSave, { merge: true });
      alert("Data berhasil dikirim ke jadwalPenguji2.");
>>>>>>> 686f11d5d4b1969ada7f2d1f90da6af832616387
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };
<<<<<<< HEAD

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
=======
  

  return (
    <div>
      <NavbarPenguji />
      <h2 className={styles.subTitle}>Daftar Data Skripsi Mahasiswa</h2>
      <ul className={styles.list}>
        {usersList.map((user) => (
          <li key={user.id} className={styles.listItem}>
             <p><strong>Nama:</strong> {user.nama}</p>
             <p><strong>Jurusan:</strong> {user.jurusan}</p>
             <p><strong>Angkatan:</strong> {user.angkatan}</p>
             <p><strong>Cabang Kampus:</strong> {user.cabangKampus}</p>
             <p><strong>Nomor WhatsApp:</strong> {user.noWhatsapp}</p>
             <p><strong>Judul Skripsi:</strong> {user.judul}</p>
             <p><strong>Penguji 1:</strong> {user.penguji1}</p>
             <p><strong>Penguji 2:</strong> {user.penguji2}</p>
             <p><strong>Status:</strong> {user.status || "Belum diverifikasi"}</p>
             {user.penguji && <p><strong>Dosen Penguji:</strong> {user.penguji}</p>}
             <p>File Pengajuan: <a href={user.pengajuanSidangUrl} target="_blank" rel="noopener noreferrer">Download</a></p>
             <p>File KRS: <a href={user.krsUrl} target="_blank" rel="noopener noreferrer">Download</a></p>
             <p>File Daftar Nilai: <a href={user.daftarNilaiUrl} target="_blank" rel="noopener noreferrer">Download</a></p>
             <p>File TA1: <a href={user.fileTA1Url} target="_blank" rel="noopener noreferrer">Download</a></p>
             <p>File Jurnal: <a href={user.fileJurnalUrl} target="_blank" rel="noopener noreferrer">Download</a></p>
             <p>File Bukti Submit Jurnal: <a href={user.fileBuktiSubmitJurnalUrl} target="_blank" rel="noopener noreferrer">Download</a></p>
             <p>File Sertifikat BNSP: <a href={user.fileBNSPUrl} target="_blank" rel="noopener noreferrer">Download</a></p>
            <label>Mode Sidang:</label>
            <select
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
                  onChange={(e) => handleInputChange(user.id, "gmeetLink", e.target.value)}
                />
              </>
            )}

            {selectedOption[user.id] === "offline" && (
              <>
                <input
                  type="text"
                  placeholder="Ruangan"
                  onChange={(e) => handleInputChange(user.id, "ruangan", e.target.value)}
                />
              </>
            )}

            <label>Tanggal Sidang:</label>
            <input
              type="date"
              onChange={(e) => handleDateChange(user.id, e.target.value)}
              value={selectedDate[user.id] || ""}
            />

            <label>Pilih Penguji:</label>
            <select
              onChange={(e) => setSelectedPenguji({ ...selectedPenguji, [user.id]: e.target.value })}
              value={selectedPenguji[user.id] || ""}
            >
              <option value="">Pilih Penguji</option>
              {pengujiList.map((penguji) => (
                <option key={penguji.id} value={penguji.nama}>
                  {penguji.nama} - {penguji.jurusan} ({penguji.cabangKampus})
                </option>
              ))}
            </select>

            <button onClick={() => handleSubmit(user.id)}>Simpan Jadwal</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

>>>>>>> 686f11d5d4b1969ada7f2d1f90da6af832616387
