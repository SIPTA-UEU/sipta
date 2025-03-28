//tanggal 25 januari 2025
"use client";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  setDoc,
  doc as firestoreDoc,
  getDoc,
} from "firebase/firestore";
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

          const jadwalSemproDocRef = firestoreDoc(
            db,
            "revisiMahasiswaSempro",
            doc.id
          );
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

          const jadwalSkripsiDocRef = firestoreDoc(
            db,
            "revisiMahasiswaSkripsi",
            doc.id
          );
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
                  <td>
                    <strong>Nama</strong>
                  </td>
                  <td>{user.nama}</td>
                </tr>
                <tr>
                  <td>
                    <strong>NIM</strong>
                  </td>
                  <td>{user.id || "N/A"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Judul</strong>
                  </td>
                  <td>{user.judul || "N/A"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Pembimbing</strong>
                  </td>
                  <td>{user.dosen || "Belum dipilih"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Penguji 1</strong>
                  </td>
                  <td>{user.penguji1 || "Belum dipilih"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Penguji 2</strong>
                  </td>
                  <td>{user.penguji2 || "Belum dipilih"}</td>
                </tr>

                <tr>
                  <td>
                    <strong>Hari/Tanggal</strong>
                  </td>
                  <td>{user.tanggalSidang || "Belum tersedia"}</td>
                </tr>
              </tbody>
            </table>

            <h4>Revisi dan Masukan</h4>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td>
                    <strong>Pembimbing</strong>
                  </td>
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
                  <td>
                    <strong>Ketua Penguji</strong>
                  </td>
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
                  <td>
                    <strong>Anggota Penguji</strong>
                  </td>
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
                  <td>
                    <strong>Nama</strong>
                  </td>
                  <td>{user.nama}</td>
                </tr>
                <tr>
                  <td>
                    <strong>NIM</strong>
                  </td>
                  <td>{user.id || "N/A"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Judul</strong>
                  </td>
                  <td>{user.judul || "N/A"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Pembimbing</strong>
                  </td>
                  <td>{user.dosen || "Belum dipilih"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Penguji 1</strong>
                  </td>
                  <td>{user.penguji1 || "Belum dipilih"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Penguji 2</strong>
                  </td>
                  <td>{user.penguji2 || "Belum dipilih"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Hari/Tanggal</strong>
                  </td>
                  <td>{user.tanggalSidang || "Belum tersedia"}</td>
                </tr>
              </tbody>
            </table>

            <h4>Revisi dan Masukan</h4>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td>
                    <strong>Pembimbing</strong>
                  </td>
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
                  <td>
                    <strong>Ketua Penguji</strong>
                  </td>
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
                  <td>
                    <strong>Anggota Penguji</strong>
                  </td>
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
