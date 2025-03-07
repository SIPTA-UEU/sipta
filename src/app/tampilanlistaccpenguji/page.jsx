// DosenList.js
"use client";
import { useEffect, useState } from "react";
import { db } from "../../firebase"; // Adjust path as needed
import { collection, getDocs } from "firebase/firestore";
<<<<<<< HEAD
=======
// import styles from "../userlist/userList.module.css"; // Use the same CSS file
import Navbar from "../navbar/Navbar";
import NavbarKaprodi from "../navbarkaprodi/page";
import DosenListPenguji from "../pengujilist/page";
import ListPengujiSemproMahasiswaAcc from "../listpengujisempromahasiswaacc/page";
>>>>>>> 686f11d5d4b1969ada7f2d1f90da6af832616387
import ListAllUsersSempro from "../listpengujisempromahasiswaacc/page";

export default function TampilanListAccPenguji() {
  const [dosen, setDosen] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch all dosen from Firestore
  const fetchDosen = async () => {
    try {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const dosenList = usersSnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((user) => user.role === "kaprodi"); // Filter for dosen role
      setDosen(dosenList);
    } catch (error) {
      console.error("Error fetching dosen: ", error);
      setError("Error fetching dosen");
    }
  };

  useEffect(() => {
    fetchDosen();
  }, []);

  return (
  

    <div >
        <ListAllUsersSempro/>
    </div>
  );
}
