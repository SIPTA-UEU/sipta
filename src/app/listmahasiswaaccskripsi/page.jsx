"use client";
import { useState, useEffect } from 'react';
import { db } from '../../firebase'; 
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import styles from './listmahasiswaaccskripsi.module.css'; // Import CSS Module
import NavbarKaprodi from '../navbarkaprodi/page';

export default function ListMahasiswaAccSkripsi() {
  const [mahasiswaList, setMahasiswaList] = useState([]); // State for Mahasiswa list
  const [pengujiList, setPengujiList] = useState([]); // State for Dosen (Penguji) list
  const [selectedPenguji, setSelectedPenguji] = useState({}); // State to track selected penguji for each mahasiswa
  const router = useRouter();

  // Fetch Mahasiswa data from Firestore
  const fetchMahasiswaData = async () => {
    try {
      const mahasiswaCollection = collection(db, "usersSkripsi");
      const mahasiswaSnapshot = await getDocs(mahasiswaCollection);
      const mahasiswaData = mahasiswaSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMahasiswaList(mahasiswaData);
    } catch (error) {
      console.error("Error fetching mahasiswa data: ", error);
    }
  };

  // Fetch Dosen (Penguji) data from Firestore
  const fetchDosenData = async () => {
    try {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const dosenList = usersSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => user.role === "penguji"); // Filter for penguji role
      setPengujiList(dosenList);
    } catch (error) {
      console.error("Error fetching dosen: ", error);
    }
  };

  // Fetch Mahasiswa and Dosen data on component mount
  useEffect(() => {
    fetchMahasiswaData();
    fetchDosenData();
  }, []);

  // Function to update status and selected penguji
  const updateStatusAndPenguji = async (id) => {
    try {
      const numbers = prompt(
        "Masukkan dua WhatsApp Dosen Penguji, pisahkan dengan koma:"
      );
      if (!numbers) return;
  
      const numberList = numbers.split(",").map((num) => num.trim());
  
      // Ambil data mahasiswa yang sesuai dengan ID yang diklik
      const selectedMahasiswa = mahasiswaList.find(
        (mahasiswa) => mahasiswa.id === id
      );
  
      if (!selectedMahasiswa) {
        alert("Data mahasiswa tidak ditemukan.");
        return;
      }
  
      // Get the selected penguji names
      const penguji1Name = pengujiList.find(
        (penguji) => penguji.id === selectedPenguji[id]?.penguji1
      )?.nama;
      const penguji2Name = pengujiList.find(
        (penguji) => penguji.id === selectedPenguji[id]?.penguji2
      )?.nama;
  
      // Membuat pesan WhatsApp hanya untuk mahasiswa yang diklik
      const mahasiswaData = `
  **MAHASISWA SKRIPSI**
  ID: ${selectedMahasiswa.id}
  Nama: ${selectedMahasiswa.nama}
  Jurusan: ${selectedMahasiswa.jurusan}
  Angkatan: ${selectedMahasiswa.angkatan}
  Cabang Kampus: ${selectedMahasiswa.cabangKampus}
  Dosen: ${selectedMahasiswa.dosen}
  Judul Seminar Proposal: ${selectedMahasiswa.judul || "Belum ada judul"}
  File Pengajuan: ${selectedMahasiswa.pengajuanSidangUrl}
  File KRS: ${selectedMahasiswa.krsUrl}
  File Daftar Nilai: ${selectedMahasiswa.daftarNilaiUrl}
  File TA1: ${selectedMahasiswa.fileTA1Url}
  `;
  
      const message = `Yth, Dosen Penguji 1 ${penguji1Name} dan Dosen Penguji 2 ${penguji2Name}\n\n` +
                      `Dengan hormat, berikut adalah informasi terkait mahasiswa yang akan mengikuti Sidang Skripsi:\n\n` +
                      `Semua dokumen telah sesuai dan lengkap.\n\n` +
                      `${mahasiswaData}` +
                      `\n\nTerima kasih atas perhatian Anda.\n`;
  
      // Kirim ke dua nomor WhatsApp dengan kompatibilitas untuk semua browser
      numberList.forEach((number, index) => {
        setTimeout(() => {
          const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(
            message
          )}`;
          window.open(whatsappUrl, "_blank");
        }, index * 500);
      });
  
      // Update Firestore with the selected penguji names and new status
      await setDoc(
        doc(db, "usersSkripsi", id),
        {
          status: "Data Dikirim Ke Penguji",
          penguji1: penguji1Name,
          penguji2: penguji2Name,
        },
        { merge: true }
      );
  
      // Update local state to reflect changes
      setMahasiswaList((prevList) =>
        prevList.map((mahasiswa) =>
          mahasiswa.id === id
            ? {
                ...mahasiswa,
                penguji1: penguji1Name,
                penguji2: penguji2Name,
                status: "Data Dikirim Ke Penguji",
              }
            : mahasiswa
        )
      );
  
      alert("Status and penguji updated successfully!");
    } catch (error) {
      console.error("Error updating status: ", error);
      alert("Failed to update status.");
    }
  };

  return (
    <div>
      <NavbarKaprodi />
      <h2 className={styles.subTitle}>Daftar Mahasiswa Dokumen Lengkap</h2>
      <ul className={styles.list}>
        {mahasiswaList.filter(mahasiswa => mahasiswa.status === "Semua dokumen sesuai dan lengkap" || mahasiswa.status === "Data Dikirim Ke Penguji").map((mahasiswa) => (
          <li key={mahasiswa.id} className={styles.listItem}>
            <p><strong>Nama:</strong> {mahasiswa.nama}</p>
            <p><strong>Jurusan:</strong> {mahasiswa.jurusan}</p>
            <p><strong>Angkatan:</strong> {mahasiswa.angkatan}</p>
            <p><strong>Cabang Kampus:</strong> {mahasiswa.cabangKampus}</p>
            <p><strong>Nomor WhatsApp:</strong> {mahasiswa.noWhatsapp}</p>
            <p><strong>Judul Skripsi:</strong> {mahasiswa.judul}</p>
            <p><strong>Status:</strong> {mahasiswa.status || "Belum diverifikasi"}</p>

            {mahasiswa.penguji1 && mahasiswa.penguji2 ? ( 
              <div>
                <p><strong>Dosen Penguji 1:</strong> {mahasiswa.penguji1}</p>
                <p><strong>Dosen Penguji 2:</strong> {mahasiswa.penguji2}</p>
              </div>
            ) : (
              <div className={styles.buttonContainer}>
                <select className={styles.dropdownSelect}
                  onChange={(e) => setSelectedPenguji(prev => ({ ...prev, [mahasiswa.id]: { ...prev[mahasiswa.id], penguji1: e.target.value } }))}
                >
                  <option value="">Select Penguji 1</option>
                  {pengujiList.map(penguji => (
                    <option key={penguji.id} value={penguji.id}>{penguji.nama}</option>
                  ))}
                </select>
                <select className={styles.dropdownSelect}
                  onChange={(e) => setSelectedPenguji(prev => ({ ...prev, [mahasiswa.id]: { ...prev[mahasiswa.id], penguji2: e.target.value } }))}
                >
                  <option value="">Select Penguji 2</option>
                  {pengujiList.map(penguji => (
                    <option key={penguji.id} value={penguji.id}>{penguji.nama}</option>
                  ))}
                </select>
                <button 
                  className={styles.button} 
                  onClick={() => updateStatusAndPenguji(mahasiswa.id)}
                  disabled={!selectedPenguji[mahasiswa.id]?.penguji1 || !selectedPenguji[mahasiswa.id]?.penguji2}
                >
                  Send
                </button>
              </div>
            )}

            <p>File Pengajuan: <a href={mahasiswa.pengajuanSidangUrl} target="_blank" rel="noopener noreferrer">Download</a></p>
            <p>File KRS: <a href={mahasiswa.krsUrl} target="_blank" rel="noopener noreferrer">Download</a></p>
            <p>File Daftar Nilai: <a href={mahasiswa.daftarNilaiUrl} target="_blank" rel="noopener noreferrer">Download</a></p>
            <p>File TA2: <a href={mahasiswa.fileTA1Url} target="_blank" rel="noopener noreferrer">Download</a></p>
            <p>File Jurnal: <a href={mahasiswa.fileJurnalUrl} target="_blank" rel="noopener noreferrer">Download</a></p>
            <p>File Bukti Submit Jurnal: <a href={mahasiswa.fileBuktiSubmitJurnalUrl} target="_blank" rel="noopener noreferrer">Download</a></p>
            <p>File Sertifikat BNSP: <a href={mahasiswa.fileBNSPUrl} target="_blank" rel="noopener noreferrer">Download</a></p>
          </li>
        ))}
      </ul>
    </div>
  );
}
