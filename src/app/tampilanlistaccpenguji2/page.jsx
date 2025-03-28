// DosenList.js
"use client";
import { useEffect, useState } from "react";
import { db } from "../../firebase"; // Adjust path as needed
import { collection, getDocs } from "firebase/firestore";
// import styles from "../userlist/userList.module.css"; // Use the same CSS file

import ListAllUsersSkripsi from "../listpengujiskripsimahasiswaacc/page";

export default function TampilanListAccPenguji2() {
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
        <ListAllUsersSkripsi/>
    </div>
  );
}
