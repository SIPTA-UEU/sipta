// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from 'firebase/firestore'; // Jangan lupa import getFirestore

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBL2NXrr2njwpLghztSKa_zsLiVpHPHPdA",
//   authDomain: "sidangmahasiswa-20520.firebaseapp.com",
//   projectId: "sidangmahasiswa-20520",
//   storageBucket: "sidangmahasiswa-20520.appspot.com",
//   messagingSenderId: "185323809855",
//   appId: "1:185323809855:web:3895dd2c4f44114ab55c8a",
//   measurementId: "G-ZJYZ4SZ8MY"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// const db = getFirestore(app); // Pastikan ini menginisialisasi Firestore dengan app yang benar


// export { db };



// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore'; // Jangan lupa import getFirestore
// import { getAuth } from "firebase/auth";
// const firebaseConfig = {
//   apiKey: "AIzaSyBL2NXrr2njwpLghztSKa_zsLiVpHPHPdA",
//   authDomain: "sidangmahasiswa-20520.firebaseapp.com",
//   projectId: "sidangmahasiswa-20520",
//   storageBucket: "sidangmahasiswa-20520.appspot.com",
//   messagingSenderId: "185323809855",
//   appId: "1:185323809855:web:3895dd2c4f44114ab55c8a"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app); // Pastikan ini menginisialisasi Firestore dengan app yang benar
// const auth = getAuth(app);
// export { db, auth };

//update tgl 9 februari 2025 ini koneksi database sebelum dijadiin ke env
// firebase.js
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore'; // Import Firestore
// import { getAuth } from 'firebase/auth'; // Import Authentication
// import { getStorage } from 'firebase/storage'; // Import Firebase Storage

// // Your Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBL2NXrr2njwpLghztSKa_zsLiVpHPHPdA",
//   authDomain: "sidangmahasiswa-20520.firebaseapp.com",
//   projectId: "sidangmahasiswa-20520",
//   storageBucket: "sidangmahasiswa-20520.appspot.com", // This is important for Firebase Storage
//   messagingSenderId: "185323809855",
//   appId: "1:185323809855:web:3895dd2c4f44114ab55c8a"
// };

// // Initialize Firebase App
// const app = initializeApp(firebaseConfig);

// // Initialize Firestore
// const db = getFirestore(app);

// // Initialize Firebase Authentication
// const auth = getAuth(app);

// // Initialize Firebase Storage
// const storage = getStorage(app); // Initialize Storage service for handling file uploads

// // Export initialized services
// export { db, auth, storage };


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Konfigurasi Firebase dari .env.local
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Pastikan tidak ada `undefined` dalam konfigurasi
console.log("Firebase Config:", firebaseConfig);

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Ekspor Firebase services
export { db, auth, storage };




// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
// import { getStorage } from 'firebase/storage';

// // Firebase configuration with environment variables
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firestore, Auth, and Storage
// const db = getFirestore(app);
// const auth = getAuth(app);
// const storage = getStorage(app);

// export { db, auth, storage };





// firebase.js
// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';

// // Firebase konfigurasi proyek Anda
// const firebaseConfig = {
//   apiKey: "AIzaSyBL2NXrr2njwpLghztSKa_zsLiVpHPHPdA",
//   authDomain: "sidangmahasiswa-20520.firebaseapp.com",
//   projectId: "sidangmahasiswa-20520",
//   storageBucket: "sidangmahasiswa-20520.appspot.com",
//   messagingSenderId: "185323809855",
//   appId: "1:185323809855:web:3895dd2c4f44114ab55c8a"
// };

// // Inisialisasi Firebase
// let app;
// if (typeof window !== "undefined") {
//   app = initializeApp(firebaseConfig);
// } else {
//   console.log("Firebase tidak diinisialisasi di lingkungan server-side");
// }

// const db = getFirestore(app);

// export { db };
