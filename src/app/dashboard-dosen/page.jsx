"use client";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, query, getDocs } from "firebase/firestore";
import NavbarDosen from "../navbardosen/page";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import styles from "./dashboardDosen.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { enUS, id } from "date-fns/locale";


export default function DashboardDosen() {
  const [jadwalSemproList, setJadwalSemproList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchJadwalSemproData = async () => {
      try {
        const jadwalSemproCollection = collection(db, "jadwalSempro");
        const jadwalSemproSnapshot = await getDocs(jadwalSemproCollection);
        const jadwalSemproData = jadwalSemproSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setJadwalSemproList(jadwalSemproData);
      } catch (error) {
        console.error("Error fetching jadwalSempro data:", error);
      }
    };
    fetchJadwalSemproData();
  }, []);

  const filteredJadwal = selectedDate
    ? jadwalSemproList.filter((jadwal) => {
        const jadwalDate = new Date(jadwal.date);
        return jadwalDate.toDateString() === selectedDate.toDateString();
      })
    : [];

  return (
    <>
      <NavbarDosen isLoggedIn={isLoggedIn} />
      <div className={styles.container}>
        <h1 className={styles.title}>Dashboard Dosen</h1>

        <h2 className={styles.subTitle}>Pilih Tanggal Sidang Sempro</h2>
        <Calendar onChange={setSelectedDate} value={selectedDate} />

        {selectedDate && (
          <div className={styles.selectedDateContainer}>
            <h3>Jadwal Sidang pada {selectedDate.toDateString()}</h3>
            {filteredJadwal.length > 0 ? (
              <ul className={styles.list}>
                {filteredJadwal.map((jadwal) => (
                  <li key={jadwal.id} className={styles.listItem}>
                    <p><strong>Nama:</strong> {jadwal.nama}</p>
                    <p><strong>Jurusan:</strong> {jadwal.jurusan}</p>
                    <p><strong>Mode:</strong> {jadwal.mode}</p>
                    {jadwal.mode === "online" && (
                      <p><strong>Link GMeet:</strong> <a href={jadwal.gmeetLink}>{jadwal.gmeetLink}</a></p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Tidak ada jadwal sidang untuk tanggal ini.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}
