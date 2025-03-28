"use client";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, getDoc, doc as firestoreDoc } from "firebase/firestore"; 
import styles from "./filenilai.module.css";
import Navbar from "../navbar/Navbar";
export default function ListAllUsersSempro() {
  const [usersSemproList, setUsersSemproList] = useState([]);
  const [usersSkripsiList, setUsersSkripsiList] = useState([]);

  // Fetch data for usersSempro and nilaiMahasiswaSempro
  useEffect(() => {
    const fetchUsersSemproData = async () => {
      try {
        const usersSemproCollection = collection(db, "usersSempro");
        const usersSemproSnapshot = await getDocs(usersSemproCollection);
        const usersSemproData = await Promise.all(
          usersSemproSnapshot.docs.map(async (doc) => {
            const userData = { id: doc.id, ...doc.data() };

            const jadwalSemproDocRef = firestoreDoc(db, "nilaiMahasiswaSempro", doc.id);
            const jadwalSemproDocSnap = await getDoc(jadwalSemproDocRef);
            if (jadwalSemproDocSnap.exists()) {
              const jadwalSemproData = jadwalSemproDocSnap.data();
              userData.penguji = jadwalSemproData.penguji || null;
              userData.penguji2 = jadwalSemproData.penguji2 || null;
              userData.revisi = jadwalSemproData.revisi || {};
              userData.tanggalSidang = jadwalSemproData.tanggalSidang || null;
              userData.letterGrade = jadwalSemproData.letterGrade || null;
              userData.totalNilai = jadwalSemproData.totalNilai || null;
              userData.rataRataNilai = jadwalSemproData.rataRataNilai || null;
              userData.statusJadwalSidangSempro = jadwalSemproData.statusJadwalSidangSempro || null;
              userData.images = jadwalSemproData.images || [];  // Menambahkan data gambar
            }
            return userData;
          })
        );
        setUsersSemproList(usersSemproData);
      } catch (error) {
        console.error("Error fetching usersSempro data: ", error);
      }
    };

    fetchUsersSemproData();
  }, []);

  // Fetch data for usersSkripsi and nilaiMahasiswaSkripsi
  useEffect(() => {
    const fetchUsersSkripsiData = async () => {
      try {
        const usersSkripsiCollection = collection(db, "usersSkripsi");
        const usersSkripsiSnapshot = await getDocs(usersSkripsiCollection);
        const usersSkripsiData = await Promise.all(
          usersSkripsiSnapshot.docs.map(async (doc) => {
            const userData = { id: doc.id, ...doc.data() };

            const jadwalSkripsiDocRef = firestoreDoc(db, "nilaiMahasiswaSkripsi", doc.id);
            const jadwalSkripsiDocSnap = await getDoc(jadwalSkripsiDocRef);
            if (jadwalSkripsiDocSnap.exists()) {
              const jadwalSkripsiData = jadwalSkripsiDocSnap.data();
              userData.penguji = jadwalSkripsiData.penguji || null;
              userData.penguji2 = jadwalSkripsiData.penguji2 || null;
              userData.revisi = jadwalSkripsiData.revisi || {};
              userData.tanggalSidang = jadwalSkripsiData.tanggalSidang || null;
              userData.letterGrade = jadwalSkripsiData.letterGrade || null;
              userData.totalNilai = jadwalSkripsiData.totalNilai || null;
              userData.rataRata = jadwalSkripsiData.rataRata || null;
              userData.rataRataNilai = jadwalSkripsiData.rataRataNilai || null;
              userData.statusJadwalSidangSempro = jadwalSkripsiData.statusJadwalSidangSempro || null;
              userData.images = jadwalSkripsiData.images || [];  // Menambahkan data gambar
            }
            return userData;
          })
        );
        setUsersSkripsiList(usersSkripsiData);
      } catch (error) {
        console.error("Error fetching usersSkripsi data: ", error);
      }
    };

    fetchUsersSkripsiData();
  }, []);

  return (
    <div>
      <Navbar />
      <h2>Lembar Acara Sempro Mahasiswa</h2>
      <ul className={styles.list}>
        {usersSemproList.map((user) => (
          <li key={user.id} className={styles.listItem}>
            <table className={styles.table}>
              <tbody>
                <tr><td><strong>Nama</strong></td><td>{user.nama}</td></tr>
                <tr><td><strong>NIM</strong></td><td>{user.id || "N/A"}</td></tr>
                <tr><td><strong>Judul</strong></td><td>{user.judul || "N/A"}</td></tr>
                <tr><td><strong>Pembimbing</strong></td><td>{user.pembimbing || "Belum dipilih"}</td></tr>
                <tr><td><strong>Hari/Tanggal</strong></td><td>{user.tanggalSidang || "Belum tersedia"}</td></tr>
                <tr><td><strong>Angkatan</strong></td><td>{user.angkatan || "N/A"}</td></tr>
                <tr><td><strong>Cabang Kampus</strong></td><td>{user.cabangKampus || "N/A"}</td></tr>
                <tr><td><strong>Jurusan</strong></td><td>{user.jurusan || "N/A"}</td></tr>
                <tr><td><strong>Daftar Nilai</strong></td><td><a href={user.daftarNilaiUrl || "#"} target="_blank">Link</a></td></tr>
                <tr><td><strong>Nilai Huruf</strong></td><td>{user.letterGrade || "N/A"}</td></tr>
                <tr><td><strong>No. Whatsapp</strong></td><td>{user.noWhatsapp || "N/A"}</td></tr>
                <tr><td><strong>KRS</strong></td><td><a href={user.krsUrl || "#"} target="_blank">Link</a></td></tr>
                <tr><td><strong>Pengajuan Sidang</strong></td><td><a href={user.pengajuanSidangUrl || "#"} target="_blank">Link</a></td></tr>
                <tr><td><strong>Rata-rata Nilai</strong></td><td>{user.rataRataNilai || "N/A"}</td></tr>
                <tr><td><strong>Status</strong></td><td>{user.status || "N/A"}</td></tr>
                <tr><td><strong>Status Jadwal Sidang Sempro</strong></td><td>{user.statusJadwalSidangSempro || "N/A"}</td></tr>
                <tr><td><strong>Total Nilai</strong></td><td>{user.totalNilai || "N/A"}</td></tr>
                <tr><td><strong>SKS Ditempuh</strong></td><td>{user.sksditempuh || "N/A"}</td></tr>
                <tr><td><strong>SKS Berjalan</strong></td><td>{user.sksberjalan || "N/A"}</td></tr>
              </tbody>
            </table>

            <h4>Nilai</h4>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td><strong>Pembimbing</strong></td>
                  <td>
                    {user.revisi?.PEBIMBING?.text || "Tidak ada nilai"}
                    {user.revisi?.PEBIMBING?.imageUrl && (
                      <img
                        src={user.revisi.PEBIMBING.imageUrl}
                        alt="Nilai Pembimbing"
                        style={{ width: "100px" }}
                      />
                    )}
                  </td>
                </tr>
                <tr>
                  <td><strong>Ketua Penguji</strong></td>
                  <td>
                    {user.revisi?.KETUA_PENGUJI?.text || "Tidak ada nilai"}
                    {user.revisi?.KETUA_PENGUJI?.imageUrl && (
                      <img
                        src={user.revisi.KETUA_PENGUJI.imageUrl}
                        alt="Nilai Ketua Penguji"
                        style={{ width: "100px" }}
                      />
                    )}
                  </td>
                </tr>
                <tr>
                  <td><strong>Anggota Penguji</strong></td>
                  <td>
                    {user.revisi?.ANGGOTA_PENGUJI?.text || "Tidak ada nilai"}
                    {user.revisi?.ANGGOTA_PENGUJI?.imageUrl && (
                      <img
                        src={user.revisi.ANGGOTA_PENGUJI.imageUrl}
                        alt="Nilai Anggota Penguji"
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

      <h2>Lembar Acara Skripsi Mahasiswa</h2>
      <ul className={styles.list}>
        {usersSkripsiList.map((user) => (
          <li key={user.id} className={styles.listItem}>
            <table className={styles.table}>
              <tbody>
                <tr><td><strong>Nama</strong></td><td>{user.nama}</td></tr>
                <tr><td><strong>NIM</strong></td><td>{user.id || "N/A"}</td></tr>
                <tr><td><strong>Judul</strong></td><td>{user.judul || "N/A"}</td></tr>
                <tr><td><strong>Pembimbing</strong></td><td>{user.dosen || "Belum dipilih"}</td></tr>
                <tr><td><strong>Hari/Tanggal</strong></td><td>{user.tanggalSidang || "Belum tersedia"}</td></tr>
                <tr><td><strong>Angkatan</strong></td><td>{user.angkatan || "N/A"}</td></tr>
                <tr><td><strong>Cabang Kampus</strong></td><td>{user.cabangKampus || "N/A"}</td></tr>
                <tr><td><strong>Jurusan</strong></td><td>{user.jurusan || "N/A"}</td></tr>
                <tr><td><strong>Daftar Nilai</strong></td><td><a href={user.daftarNilaiUrl || "#"} target="_blank">Link</a></td></tr>
                <tr><td><strong>Nilai Huruf</strong></td><td>{user.letterGrade || "N/A"}</td></tr>
                <tr><td><strong>No. Whatsapp</strong></td><td>{user.noWhatsapp || "N/A"}</td></tr>
                <tr><td><strong>KRS</strong></td><td><a href={user.krsUrl || "#"} target="_blank">Link</a></td></tr>
                <tr><td><strong>Pengajuan Sidang</strong></td><td><a href={user.pengajuanSidangUrl || "#"} target="_blank">Link</a></td></tr>
                <tr><td><strong>Rata-rata Nilai</strong></td><td>{user.rataRataNilai || "N/A"}</td></tr>
                <tr><td><strong>Status</strong></td><td>{user.status || "N/A"}</td></tr>
                <tr><td><strong>Status Jadwal Sidang Sempro</strong></td><td>{user.statusJadwalSidangSempro || "N/A"}</td></tr>
                <tr><td><strong>Total Nilai</strong></td><td>{user.totalNilai || "N/A"}</td></tr>
                <tr><td><strong>SKS Ditempuh</strong></td><td>{user.sksditempuh || "N/A"}</td></tr>
                <tr><td><strong>SKS Berjalan</strong></td><td>{user.sksberjalan || "N/A"}</td></tr>
              </tbody>
            </table>

            <h4>Nilai</h4>
            <table className={styles.table}>
              <tbody>
                <tr>
                  <td><strong>Pembimbing</strong></td>
                  <td>
                    {user.revisi?.PEBIMBING?.text || "Tidak ada nilai"}
                    {user.revisi?.PEBIMBING?.imageUrl && (
                      <img
                        src={user.revisi.PEBIMBING.imageUrl}
                        alt="Nilai Pembimbing"
                        style={{ width: "100px" }}
                      />
                    )}
                  </td>
                </tr>
                <tr>
                  <td><strong>Ketua Penguji</strong></td>
                  <td>
                    {user.revisi?.KETUA_PENGUJI?.text || "Tidak ada nilai"}
                    {user.revisi?.KETUA_PENGUJI?.imageUrl && (
                      <img
                        src={user.revisi.KETUA_PENGUJI.imageUrl}
                        alt="Nilai Ketua Penguji"
                        style={{ width: "100px" }}
                      />
                    )}
                  </td>
                </tr>
                <tr>
                  <td><strong>Anggota Penguji</strong></td>
                  <td>
                    {user.revisi?.ANGGOTA_PENGUJI?.text || "Tidak ada nilai"}
                    {user.revisi?.ANGGOTA_PENGUJI?.imageUrl && (
                      <img
                        src={user.revisi.ANGGOTA_PENGUJI.imageUrl}
                        alt="Nilai Anggota Penguji"
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

