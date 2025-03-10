// "use client";
// import { useState, useEffect } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "../../firebase"; // Assuming you have initialized Firebase
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { useRouter } from "next/navigation";
// import { onAuthStateChanged } from "firebase/auth"; // Import the method to check auth state

// import styles from "./dashboardskripsi.module.css"; // Import CSS untuk styling
// import Navbar from "../navbar/Navbar";

// export default function DashboardSkripsi() {
//   const [nim, setNim] = useState("");
//   const [sksditempuh, setSksditempuh] = useState("");
//   const [sksberjalan, setSksberjalan] = useState("");
//   const [nama, setNama] = useState("");
//   const [jurusan, setJurusan] = useState("");
//   const [angkatan, setAngkatan] = useState("");
//   const [cabangKampus, setCabangKampus] = useState("");
//   const [role, setRole] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false); // Loading state during Firestore checks
//   const [message, setMessage] = useState(null); // For success or error messages
//   const router = useRouter();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Fungsi untuk mengambil data berdasarkan NIM dari Firestore
//   const fetchUserDataByNim = async (nim) => {
//     if (nim) {
//       try {
//         const docRef = doc(db, "users", nim);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           const userData = docSnap.data();
//           setNama(userData.nama || ""); // Isi nama
//           setJurusan(userData.jurusan || ""); // Isi jurusan
//           setAngkatan(userData.angkatan || ""); // Isi angkatan
//           setCabangKampus(userData.cabangKampus || ""); // Isi cabang kampus
//           setRole(userData.role || "");
//         } else {
//           // Reset jika NIM tidak ditemukan
//           setNama("");
//           setJurusan("");
//           setAngkatan("");
//           setCabangKampus("");
//           setRole("");
//         }
//       } catch (error) {
//         console.error("Error fetching NIM data: ", error);
//         setError("Error fetching NIM data");
//       }
//     }
//   };

//   // Panggil fetchUserDataByNim setiap kali nim berubah
//   useEffect(() => {
//     fetchUserDataByNim(nim);
//   }, [nim]);

//   // Function to handle registration
//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError(null); // Reset error sebelum proses
//     try {
//       const email = `${nim}@university.edu`; // Generate email based on NIM (you can customize this)
//       const password = nim; // Use NIM as the password (or any secure password logic you prefer)

//       // Membuat akun pengguna baru di Firebase Authentication
//       await createUserWithEmailAndPassword(auth, email, password);

//       // Menyimpan data tambahan ke Firestore
//       await setDoc(doc(db, "usersSkripsi", nim), {
//         sksditempuh,
//         sksberjalan,
//         nama,
//         jurusan,
//         angkatan,
//         cabangKampus,
//         role,
//       });
//       setMessage({ type: "success", text: "Registration successful!" });
//       router.push("/dashboard"); // Redirect to login page after successful registration
//       alert("form berhasilk dikirim")
//     } catch (error) {
//       console.error("Registrasi gagal: ", error.message);
//       setError("Registrasi gagal: " + error.message);
//     }
//   };

//   // Check authentication state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setIsLoggedIn(true); // User is signed in
//       } else {
//         setIsLoggedIn(false); // No user is signed in
//       }
//     });

//     return () => unsubscribe(); // Cleanup subscription on unmount
//   }, []);

//   return (
//     <>
//       <Navbar isLoggedIn={isLoggedIn} />
//       <div className={styles.container}>
//         <h1 className={styles.title}>Pengajuan Skripsi</h1>

//         {/* Form to fetch NIM */}
//         <form onSubmit={(e) => { e.preventDefault(); fetchUserDataByNim(nim); }} className={styles.form}>
//           <input
//             type="text"
//             value={nim}
//             onChange={(e) => setNim(e.target.value)}
//             placeholder="Masukkan NIM"
//             className={styles.inputField}
//           />
//           <button type="submit" className={styles.button}>
//             Cek NIM
//           </button>
//         </form>

//         {/* Display auto-filled data if NIM is found */}
//         {nama && (
//           <form onSubmit={handleRegister} className={styles.formContainer}>
//             <input
//               type="text"
//               className={styles.inputField}
//               value={nim}
//               readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={nama}
//               readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={jurusan}
//               readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={angkatan}
//               readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={cabangKampus}
//               readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={role}
//               readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={sksditempuh}
//               onChange={(e) => setSksditempuh(e.target.value)}
//               placeholder="Masukkan SKS Ditempuh"
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={sksberjalan}
//               onChange={(e) => setSksberjalan(e.target.value)}
//               placeholder="Masukkan SKS Berjalan"
//             />
//             {error && <p className={styles.error}>{error}</p>}
//             <button type="submit" className={styles.button}>
//               Register
//             </button>
//           </form>
//         )}

//         {/* Display success or error messages */}
//         {message && (
//           <p className={message.type === "success" ? styles.success : styles.error}>
//             {message.text}
//           </p>
//         )}
//       </div>
//     </>
//   );
// }



//tgl 19 november 2024
// "use client";
// import { useState, useEffect } from "react";
// import { createUserWithEmailAndPassword, onAuthStateChanged, fetchSignInMethodsForEmail } from "firebase/auth"; // Import the required functions
// import { auth, db } from "../../firebase"; // Assuming you have initialized Firebase
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { useRouter } from "next/navigation";

// import styles from "./dashboardskripsi.module.css"; // Import CSS untuk styling
// import Navbar from "../navbar/Navbar";

// export default function DashboardSkripsi() {
//   const [nim, setNim] = useState("");
//   const [sksditempuh, setSksditempuh] = useState("");
//   const [sksberjalan, setSksberjalan] = useState("");
//   const [nama, setNama] = useState("");
//   const [jurusan, setJurusan] = useState("");
//   const [angkatan, setAngkatan] = useState("");
//   const [cabangKampus, setCabangKampus] = useState("");
//   const [role, setRole] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false); // Loading state during Firestore checks
//   const [message, setMessage] = useState(null); // For success or error messages
//   const router = useRouter();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Fungsi untuk mengambil data berdasarkan NIM dari Firestore
//   const fetchUserDataByNim = async (nim) => {
//     if (nim) {
//       try {
//         const docRef = doc(db, "users", nim);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           const userData = docSnap.data();
//           setNama(userData.nama || ""); // Isi nama
//           setJurusan(userData.jurusan || ""); // Isi jurusan
//           setAngkatan(userData.angkatan || ""); // Isi angkatan
//           setCabangKampus(userData.cabangKampus || ""); // Isi cabang kampus
//           setRole(userData.role || "");
//         } else {
//           // Reset jika NIM tidak ditemukan
//           setNama("");
//           setJurusan("");
//           setAngkatan("");
//           setCabangKampus("");
//           setRole("");
//         }
//       } catch (error) {
//         console.error("Error fetching NIM data: ", error);
//         setError("Error fetching NIM data");
//       }
//     }
//   };

//   // Panggil fetchUserDataByNim setiap kali nim berubah
//   useEffect(() => {
//     fetchUserDataByNim(nim);
//   }, [nim]);

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError(null); // Reset error before the process
//     const email = `${nim}@university.edu`; // Generate email based on NIM
//     const password = nim; // Use NIM as the password

//     try {
//         // Check if the email is already in use
//         const signInMethods = await fetchSignInMethodsForEmail(auth, email);
//         if (signInMethods.length > 0) {
//             setError("Email is already in use. Please use a different email.");
//             return;
//         }

//         // Create a new user in Firebase Authentication
//         await createUserWithEmailAndPassword(auth, email, password);

//         // Save additional data to Firestore
//         await setDoc(doc(db, "usersSkripsi", nim), {
//             sksditempuh,
//             sksberjalan,
//             nama,
//             jurusan,
//             angkatan,
//             cabangKampus,
//             role,
//         });
        
//         setMessage({ type: "success", text: "Registration successful!" });
//         router.push("/dashboard"); // Redirect after successful registration
//     } catch (error) {
//         console.error("Registration failed: ", error.message);
//         setError("Registration failed: " + error.message);
//     }
// };


//   // Check authentication state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setIsLoggedIn(true); // User is signed in
//       } else {
//         setIsLoggedIn(false); // No user is signed in
//       }
//     });

//     return () => unsubscribe(); // Cleanup subscription on unmount
//   }, []);

//   return (
//     <>
//       <Navbar isLoggedIn={isLoggedIn} />
//       <div className={styles.container}>
//         <h1 className={styles.title}>Pengajuan Skripsi</h1>

//         {/* Form to fetch NIM */}
//         <form onSubmit={(e) => { e.preventDefault(); fetchUserDataByNim(nim); }} className={styles.form}>
//           <input
//             type="text"
//             value={nim}
//             onChange={(e) => setNim(e.target.value)}
//             placeholder="Masukkan NIM"
//             className={styles.inputField}
//           />
//           <button type="submit" className={styles.button}>
//             Cek NIM
//           </button>
//         </form>

//         {/* Display auto-filled data if NIM is found */}
//         {nama && (
//           <form onSubmit={handleRegister} className={styles.formContainer}>
//             <input
//               type="text"
//               className={styles.inputField}
//               value={nim}
//               readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={nama}
//               readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={jurusan}
//               readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={angkatan}
//               readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={cabangKampus}
//               readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={role}
//               readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={sksditempuh}
//               onChange={(e) => setSksditempuh(e.target.value)}
//               placeholder="Masukkan SKS Ditempuh"
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={sksberjalan}
//               onChange={(e) => setSksberjalan(e.target.value)}
//               placeholder="Masukkan SKS Berjalan"
//             />
//             {error && <p className={styles.error}>{error}</p>}
//             <button type="submit" className={styles.button}>
//               Register
//             </button>
//           </form>
//         )}

//         {/* Display success or error messages */}
//         {message && (
//           <p className={message.type === "success" ? styles.success : styles.error}>
//             {message.text}
//           </p>
//         )}
//       </div>
//     </>
//   );
// }

//tgl 21 november 2024
// "use client";
// import { useState, useEffect } from "react";
// import { createUserWithEmailAndPassword, onAuthStateChanged, fetchSignInMethodsForEmail, signInWithEmailAndPassword, updatePassword } from "firebase/auth"; // Import the required functions
// import { auth, db } from "../../firebase"; // Assuming you have initialized Firebase
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { useRouter } from "next/navigation";

// import styles from "./dashboardskripsi.module.css"; // Import CSS untuk styling
// import Navbar from "../navbar/Navbar";

// export default function DashboardSkripsi() {
//   const [nim, setNim] = useState("");
//   const [sksditempuh, setSksditempuh] = useState("");
//   const [sksberjalan, setSksberjalan] = useState("");
//   const [nama, setNama] = useState("");
//   const [jurusan, setJurusan] = useState("");
//   const [angkatan, setAngkatan] = useState("");
//   const [cabangKampus, setCabangKampus] = useState("");
//   const [role, setRole] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false); // Loading state during Firestore checks
//   const [message, setMessage] = useState(null); // For success or error messages
//   const router = useRouter();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isReset, setIsReset] = useState(false); // State for showing reset password form
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   // Fungsi untuk mengambil data berdasarkan NIM dari Firestore
//   const fetchUserDataByNim = async (nim) => {
//     if (nim) {
//       try {
//         const docRef = doc(db, "users", nim);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           const userData = docSnap.data();
//           setNama(userData.nama || ""); // Isi nama
//           setJurusan(userData.jurusan || ""); // Isi jurusan
//           setAngkatan(userData.angkatan || ""); // Isi angkatan
//           setCabangKampus(userData.cabangKampus || ""); // Isi cabang kampus
//           setRole(userData.role || "");
//         } else {
//           // Reset jika NIM tidak ditemukan
//           setNama("");
//           setJurusan("");
//           setAngkatan("");
//           setCabangKampus("");
//           setRole("");
//         }
//       } catch (error) {
//         console.error("Error fetching NIM data: ", error);
//         setError("Error fetching NIM data");
//       }
//     }
//   };

//   // Panggil fetchUserDataByNim setiap kali nim berubah
//   useEffect(() => {
//     fetchUserDataByNim(nim);
//   }, [nim]);

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError(null); // Reset error before the process
//     const email = `${nim}@university.edu`; // Generate email based on NIM
//     const password = nim; // Use NIM as the password

//     try {
//         // Check if the email is already in use
//         const signInMethods = await fetchSignInMethodsForEmail(auth, email);
//         if (signInMethods.length > 0) {
//             setError("Email is already in use. Please use a different email.");
//             setIsReset(true); // Set the reset password form visible
//             return;
//         }

//         // Create a new user in Firebase Authentication
//         await createUserWithEmailAndPassword(auth, email, password);

//         // Save additional data to Firestore
//         await setDoc(doc(db, "usersSkripsi", nim), {
//             sksditempuh,
//             sksberjalan,
//             nama,
//             jurusan,
//             angkatan,
//             cabangKampus,
//             role,
//         });
        
//         setMessage({ type: "success", text: "Registration successful!" });
//         router.push("/dashboard"); // Redirect after successful registration
//     } catch (error) {
//         console.error("Registration failed: ", error.message);
//         setError("Registration failed: " + error.message);
//         if (error.message.includes("email-already-in-use")) {
//           setIsReset(true); // Trigger reset password form if email is in use
//         }
//     }
// };

//   const handlePasswordReset = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setMessage(null);
//     setLoading(true);

//     // Validasi input password
//     if (password !== confirmPassword) {
//       setError("Password dan konfirmasi password tidak cocok.");
//       return;
//     }

//     try {
//       const email = `${nim}@university.edu`; // Email pengguna berdasarkan NIM
//       const user = await signInWithEmailAndPassword(auth, email, nim); // Login dulu untuk otentikasi
//       await updatePassword(user.user, password); // Update password di Firebase

//       setMessage({
//         type: "success",
//         text: "Password berhasil diubah. Silakan login kembali untuk mengisi data.",
//       });

//       // Reset all the input fields and states
//       setNim(""); 
//       setSksditempuh("");
//       setSksberjalan("");
//       setNama("");
//       setJurusan("");
//       setAngkatan("");
//       setCabangKampus("");
//       setRole("");
      
//       setIsReset(false); // Tutup form reset password
//     } catch (error) {
//       setError("Gagal mengubah password: " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Check authentication state
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setIsLoggedIn(true); // User is signed in
//       } else {
//         setIsLoggedIn(false); // No user is signed in
//       }
//     });

//     return () => unsubscribe(); // Cleanup subscription on unmount
//   }, []);

//   return (
//     <>
//       <Navbar isLoggedIn={isLoggedIn} />
//       <div className={styles.container}>
//         <h1 className={styles.title}>Pengajuan Skripsi</h1>

//         {/* Form to fetch NIM */}
//         <form onSubmit={(e) => { e.preventDefault(); fetchUserDataByNim(nim); }} className={styles.form}>
//           <input
//             type="text"
//             value={nim}
//             onChange={(e) => setNim(e.target.value)}
//             placeholder="Masukkan NIM"
//             className={styles.inputField}
//           />
//           <button type="submit" className={styles.button}>
//             Cek NIM
//           </button>
//         </form>

//         {/* Display auto-filled data if NIM is found */}
//         {nama && (
//           <form onSubmit={handleRegister} className={styles.formContainer}>
//             <input
//               type="text"
//               className={styles.inputField}
//               value={nim}
//               readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={nama}
//               readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={jurusan}
//               readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={angkatan}
//               readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={cabangKampus}
//               readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={role}
//               readOnly // Set input menjadi hanya baca (auto-fill dari Firestore)
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={sksditempuh}
//               onChange={(e) => setSksditempuh(e.target.value)}
//               placeholder="Masukkan SKS Ditempuh"
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={sksberjalan}
//               onChange={(e) => setSksberjalan(e.target.value)}
//               placeholder="Masukkan SKS Berjalan"
//             />
//             {error && <p className={styles.error}>{error}</p>}
//             <button type="submit" className={styles.button}>
//               Register
//             </button>
//           </form>
//         )}

//         {/* Form Reset Password (Only shown if email is already in use) */}
//         {isReset && (
//           <form onSubmit={handlePasswordReset} className={styles.formContainer}>
//             <p>Silakan masukkan password baru Anda:</p>
//             <input
//               type="password"
//               className={styles.inputField}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password Baru"
//             />
//             <input
//               type="password"
//               className={styles.inputField}
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               placeholder="Konfirmasi Password Baru"
//             />
//             {error && <p className={styles.error}>{error}</p>}
//             <button type="submit" className={styles.button} disabled={loading}>
//               {loading ? "Mengubah Password..." : "Simpan Password Baru"}
//             </button>
//           </form>
//         )}

//         {/* Display success or error messages */}
//         {message && (
//           <p className={message.type === "success" ? styles.success : styles.error}>
//             {message.text}
//           </p>
//         )}
//       </div>
//     </>
//   );
// }


// "use client";
// import { useState, useEffect } from "react";
// // import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, db, storage } from "../../firebase"; // Ensure Firebase storage is initialized
// import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
// import { useRouter } from "next/navigation";
// // import { onAuthStateChanged } from "firebase/auth";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase Storage methods

// import styles from "./dashboardskripsi.module.css";
// import Navbar from "../navbar/Navbar";

// export default function DashboardSkripsi() {
//   const [nim, setNim] = useState("");
//   const [sksditempuh, setSksditempuh] = useState("");
//   const [sksberjalan, setSksberjalan] = useState("");
//   const [nama, setNama] = useState("");
//   const [jurusan, setJurusan] = useState("");
//   const [angkatan, setAngkatan] = useState("");
//   const [cabangKampus, setCabangKampus] = useState("");
//   const [noWhatsapp, setNoWhatsapp] = useState("");
//   const [role, setRole] = useState("");
//   const [files, setFiles] = useState({
//     pengajuanSidang: null,
//     krs: null,
//     daftarNilai: null,
//     fileTA1: null,
//   });
//   const [fileUrls, setFileUrls] = useState({
//     pengajuanSidangUrl: "",
//     krsUrl: "",
//     daftarNilaiUrl: "",
//     fileTA1Url: "",
//   });
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [dosenList, setDosenList] = useState([]); // State for storing list of dosen
//   const [selectedDosen, setSelectedDosen] = useState(""); // State for selected dosen
//   const router = useRouter();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Function to fetch dosen list from Firestore
//   const fetchDosenList = async () => {
//     try {
//       const dosenCollection = collection(db, "users");
//       const dosenSnapshot = await getDocs(dosenCollection);
//       const dosen = dosenSnapshot.docs
//         .map((doc) => ({ id: doc.id, ...doc.data() }))
//         .filter((user) => user.role === "dosen");
//       setDosenList(dosen);
//     } catch (error) {
//       console.error("Error fetching dosen list: ", error);
//       setError("Error fetching dosen list");
//     }
//   };

//   // Fetch dosen list when component mounts
//   useEffect(() => {
//     fetchDosenList();
//   }, []);

//   // Fungsi untuk mengambil data berdasarkan NIM dari Firestore
//   const fetchUserDataByNim = async (nim) => {
//     if (nim) {
//       try {
//         const docRef = doc(db, "users", nim);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           const userData = docSnap.data();
//           setNama(userData.nama || "");
//           setJurusan(userData.jurusan || "");
//           setAngkatan(userData.angkatan || "");
//           setCabangKampus(userData.cabangKampus || "");
//           setRole(userData.role || "");
//         } else {
//           setNama("");
//           setJurusan("");
//           setAngkatan("");
//           setCabangKampus("");
//           setRole("");
//         }
//       } catch (error) {
//         console.error("Error fetching NIM data: ", error);
//         setError("Error fetching NIM data");
//       }
//     }
//   };

//   // Panggil fetchUserDataByNim setiap kali nim berubah
//   useEffect(() => {
//     fetchUserDataByNim(nim);
//   }, [nim]);

//   const handleFileChange = (e) => {
//     const { name, files: selectedFiles } = e.target;
//     const selectedFile = selectedFiles[0];

//     if (selectedFile.size > 5000000) { // Example: 5MB limit
//       setError("File size exceeds the limit (5MB)");
//       return;
//     }

//     setFiles((prevFiles) => ({ ...prevFiles, [name]: selectedFile }));
//   };

//   const uploadFiles = async () => {
//     const uploadTasks = Object.keys(files).map(async (fileKey) => {
//       const file = files[fileKey];
//       if (file) {
//         try {
//           const storageRef = ref(storage, `files/${nim}/${file.name}`);
//           const snapshot = await uploadBytes(storageRef, file);
//           const downloadURL = await getDownloadURL(snapshot.ref);
//           return { fileKey, downloadURL };
//         } catch (error) {
//           console.error(`File upload failed for ${fileKey}: `, error);
//           throw new Error(`File upload failed for ${fileKey}`);
//         }
//       }
//       return null;
//     });

//     try {
//       const uploadedFiles = await Promise.all(uploadTasks);
//       const newFileUrls = {};
//       uploadedFiles.forEach((uploadedFile) => {
//         if (uploadedFile) {
//           newFileUrls[`${uploadedFile.fileKey}Url`] = uploadedFile.downloadURL;
//         }
//       });
//       return newFileUrls;
//     } catch (error) {
//       setError("File uploads failed");
//       return null;
//     }
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);

//     try {
//       const email = `${nim}@university.edu`;
//       const password = nim;

//       // Create a new user in Firebase Authentication
//       await createUserWithEmailAndPassword(auth, email, password);

//       // Upload files and get their URLs
//       const uploadedFileUrls = await uploadFiles();

//       if (!uploadedFileUrls) {
//         setError("File uploads failed");
//         setLoading(false);
//         return;
//       }

//       // Save additional data to Firestore, including the selected dosen and file URLs
//       await setDoc(doc(db, "usersSkripsi", nim), {
//         sksditempuh,
//         sksberjalan,
//         nama,
//         jurusan,
//         angkatan,
//         cabangKampus,
//         noWhatsapp,
//         role,
//         dosen: selectedDosen, // Save selected dosen to Firestore
//         ...uploadedFileUrls, // Save uploaded file URLs to Firestore
//       });

//       setMessage({ type: "success", text: "Registration successful!" });
//       router.push("/dashboard");
//       alert("Form and files successfully submitted");
//     } catch (error) {
//       console.error("Registration failed: ", error.message);
//       setError("Registration failed: " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setIsLoggedIn(!!user);
//     });
//     return () => unsubscribe();
//   }, []);

//   return (
//     <>
//       <Navbar isLoggedIn={isLoggedIn} />
//       <div className={styles.container}>
//         <h1 className={styles.title}>Pengajuan Skripsi</h1>

//         {/* Form to fetch NIM */}
//         <form onSubmit={(e) => { e.preventDefault(); fetchUserDataByNim(nim); }} className={styles.form}>
//           <input
//             type="text"
//             value={nim}
//             onChange={(e) => setNim(e.target.value)}
//             placeholder="Masukkan NIM"
//             className={styles.inputField}
//           />
//           <button type="submit" className={styles.button}>
//             Cek NIM
//           </button>
//         </form>

//         {/* Display auto-filled data if NIM is found */}
//         {nama && (
//           <form onSubmit={handleRegister} className={styles.formContainer}>
//             <input
//               type="text"
//               className={styles.inputField}
//               value={nim}
//               readOnly
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={nama}
//               readOnly
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={jurusan}
//               readOnly
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={angkatan}
//               readOnly
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={cabangKampus}
//               readOnly
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={role}
//               readOnly
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={sksditempuh}
//               onChange={(e) => setSksditempuh(e.target.value)}
//               placeholder="Masukkan SKS Ditempuh"
//             />
//             <input
//               type="text"
//               className={styles.inputField}
//               value={sksberjalan}
//               onChange={(e) => setSksberjalan(e.target.value)}
//               placeholder="Masukkan SKS Berjalan"
//             />

//             <input
//               type="text"
//               className={styles.inputField}
//               value={noWhatsapp}
//               onChange={(e) => setNoWhatsapp(e.target.value)}
//               placeholder="Masukkan No WhatsApp"
//             />

//             {/* File inputs for multiple files */}
//             <label>Lembar Pengajuan Sidang</label>
//             <input
//               type="file"
//               name="pengajuanSidang"
//               onChange={handleFileChange}
//               className={styles.inputField}
//             />

//             <label>KRS</label>
//             <input
//               type="file"
//               name="krs"
//               onChange={handleFileChange}
//               className={styles.inputField}
//             />

//             <label>Daftar Nilai</label>
//             <input
//               type="file"
//               name="daftarNilai"
//               onChange={handleFileChange}
//               className={styles.inputField}
//             />

//             <label>File TA1 (SEMPRO)</label>
//             <input
//               type="file"
//               name="fileTA1"
//               onChange={handleFileChange}
//               className={styles.inputField}
//             />

//             {/* Select input for Dosen */}
//             <select
//               className={styles.inputField}
//               value={selectedDosen}
//               onChange={(e) => setSelectedDosen(e.target.value)}
//             >
//               <option value="">Pilih Dosen</option>
//               {dosenList.map((dosen) => (
//                 <option key={dosen.id} value={dosen.nama}>
//                   {dosen.nama} ({dosen.jurusan})
//                 </option>
//               ))}
//             </select>

//             {error && <p className={styles.error}>{error}</p>}
//             <button type="submit" className={styles.button} disabled={loading}>
//               {loading ? "Loading..." : "Register"}
//             </button>
//           </form>
//         )}

//         {message && (
//           <p className={message.type === "success" ? styles.success : styles.error}>
//             {message.text}
//           </p>
//         )}
//       </div>
//     </>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { db, storage } from "../../firebase"; // Ensure Firebase storage is initialized
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase Storage methods
import styles from "./dashboardskripsi.module.css";
import Navbar from "../navbar/Navbar";

export default function DashboardSkripsi() {
  const [nim, setNim] = useState("");
  const [sksditempuh, setSksditempuh] = useState("");
  const [sksberjalan, setSksberjalan] = useState("");
  const [nama, setNama] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [cabangKampus, setCabangKampus] = useState("");
  const [noWhatsapp, setNoWhatsapp] = useState("");
  const [role, setRole] = useState("");
  const [judul, setJudul] = useState("");
  const [files, setFiles] = useState({
    pengajuanSidang: null,
    krs: null,
    daftarNilai: null,
    fileTA1: null,
  });
  const [fileUrls, setFileUrls] = useState({
    pengajuanSidangUrl: "",
    krsUrl: "",
    daftarNilaiUrl: "",
    fileTA1Url: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [dosenList, setDosenList] = useState([]); // State for storing list of dosen
  const [selectedDosen, setSelectedDosen] = useState(""); // State for selected dosen
  const router = useRouter();

  // Function to fetch dosen list from Firestore
  const fetchDosenList = async () => {
    try {
      const dosenCollection = collection(db, "users");
      const dosenSnapshot = await getDocs(dosenCollection);
      const dosen = dosenSnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((user) => user.role === "dosen");
      setDosenList(dosen);
    } catch (error) {
      console.error("Error fetching dosen list: ", error);
      setError("Error fetching dosen list");
    }
  };

  // Fetch dosen list when component mounts
  useEffect(() => {
    fetchDosenList();
  }, []);

  // Fungsi untuk mengambil data berdasarkan NIM dari Firestore
  const fetchUserDataByNim = async (nim) => {
    if (nim) {
      try {
        const docRef = doc(db, "users", nim);
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
        console.error("Error fetching NIM data: ", error);
        setError("Error fetching NIM data");
      }
    }
  };

  // Panggil fetchUserDataByNim setiap kali nim berubah
  useEffect(() => {
    fetchUserDataByNim(nim);
  }, [nim]);

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    const selectedFile = selectedFiles[0];

    if (selectedFile.size > 5000000) { // Example: 5MB limit
      setError("File size exceeds the limit (5MB)");
      return;
    }

    setFiles((prevFiles) => ({ ...prevFiles, [name]: selectedFile }));
  };

  const uploadFiles = async () => {
    const uploadTasks = Object.keys(files).map(async (fileKey) => {
      const file = files[fileKey];
      if (file) {
        try {
          const storageRef = ref(storage, `files/${nim}/${file.name}`);
          const snapshot = await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(snapshot.ref);
          return { fileKey, downloadURL };
        } catch (error) {
          console.error(`File upload failed for ${fileKey}: `, error);
          throw new Error(`File upload failed for ${fileKey}`);
        }
      }
      return null;
    });

    try {
      const uploadedFiles = await Promise.all(uploadTasks);
      const newFileUrls = {};
      uploadedFiles.forEach((uploadedFile) => {
        if (uploadedFile) {
          newFileUrls[`${uploadedFile.fileKey}Url`] = uploadedFile.downloadURL;
        }
      });
      return newFileUrls;
    } catch (error) {
      setError("File uploads failed");
      return null;
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Upload files and get their URLs
      const uploadedFileUrls = await uploadFiles();

      if (!uploadedFileUrls) {
        setError("File uploads failed");
        setLoading(false);
        return;
      }

      // Save additional data to Firestore, including the selected dosen and file URLs
      await setDoc(doc(db, "usersSkripsi", nim), {
        sksditempuh,
        sksberjalan,
        judul,
        nama,
        jurusan,
        angkatan,
        cabangKampus,
        noWhatsapp,
        role,
        dosen: selectedDosen, // Save selected dosen to Firestore
        ...uploadedFileUrls, // Save uploaded file URLs to Firestore
      });

      setMessage({ type: "success", text: "Data successfully submitted!" });
      router.push("/dashboard");
      alert("Form and files successfully submitted");
    } catch (error) {
      console.error("Submission failed: ", error.message);
      setError("Submission failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Pengajuan Skripsi</h1>

        {/* Form to fetch NIM */}
        <form onSubmit={(e) => { e.preventDefault(); fetchUserDataByNim(nim); }} className={styles.form}>
          <input
            type="text"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
            placeholder="Masukkan NIM"
            className={styles.inputField}
          />
          <button type="submit" className={styles.button}>
            Cek NIM
          </button>
        </form>

        {/* Display auto-filled data if NIM is found */}
        {nama && (
          <form onSubmit={handleRegister} className={styles.formContainer}>
            <input
              type="text"
              className={styles.inputField}
              value={nim}
              readOnly
            />
            <input
              type="text"
              className={styles.inputField}
              value={nama}
              readOnly
            />
            <input
              type="text"
              className={styles.inputField}
              value={jurusan}
              readOnly
            />
            <input
              type="text"
              className={styles.inputField}
              value={angkatan}
              readOnly
            />
            <input
              type="text"
              className={styles.inputField}
              value={cabangKampus}
              readOnly
            />
            <input
              type="text"
              className={styles.inputField}
              value={role}
              readOnly
            />
                        <input
              type="text"
              className={styles.inputField}
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              placeholder="Masukkan Judul Skripsi"
            />
            <input
              type="text"
              className={styles.inputField}
              value={sksditempuh}
              onChange={(e) => setSksditempuh(e.target.value)}
              placeholder="Masukkan SKS Ditempuh"
            />
            <input
              type="text"
              className={styles.inputField}
              value={sksberjalan}
              onChange={(e) => setSksberjalan(e.target.value)}
              placeholder="Masukkan SKS Berjalan"
            />

            <input
              type="text"
              className={styles.inputField}
              value={noWhatsapp}
              onChange={(e) => setNoWhatsapp(e.target.value)}
              placeholder="Masukkan No WhatsApp"
            />

            {/* File inputs for multiple files */}
            <label>Lembar Pengajuan Sidang</label>
            <input
              type="file"
              name="pengajuanSidang"
              onChange={handleFileChange}
              className={styles.inputField}
            />
            <label>KRS</label>
            <input
              type="file"
              name="krs"
              onChange={handleFileChange}
              className={styles.inputField}
            />
            <label>Daftar Nilai</label>
            <input
              type="file"
              name="daftarNilai"
              onChange={handleFileChange}
              className={styles.inputField}
            />
            <label>File TA 1</label>
            <input
              type="file"
              name="fileTA1"
              onChange={handleFileChange}
              className={styles.inputField}
            />
                        <label>File Jurnal</label>
            <input
              type="file"
              name="fileJurnal"
              onChange={handleFileChange}
              className={styles.inputField}
            />
                        <label>File Bukti Submit Jurnal</label>
            <input
              type="file"
              name="fileBuktiSubmitJurnal"
              onChange={handleFileChange}
              className={styles.inputField}
            />
                        <label>File Sertifikat BNSP</label>
            <input
              type="file"
              name="fileBNSP"
              onChange={handleFileChange}
              className={styles.inputField}
            />

            {/* Dosen selection */}
            <select
              value={selectedDosen}
              onChange={(e) => setSelectedDosen(e.target.value)}
              className={styles.inputField}
            >
              <option value="">Pilih Dosen Pembimbing</option>
              {dosenList.map((dosen) => (
                <option key={dosen.id} value={dosen.id}>
                  {dosen.nama}
                </option>
              ))}
            </select>

            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
            {message && <p className={styles.successMessage}>{message.text}</p>}
            {error && <p className={styles.errorMessage}>{error}</p>}
          </form>
        )}
      </div>
    </>
  );
}

