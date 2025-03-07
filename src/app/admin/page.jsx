"use client";
import { useState, useEffect } from 'react';
import { db } from '../../firebase'; 
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import styles from './AdminRegis.module.css'; // Import CSS Module
import NavbarAdmin from '../navbaradmin/page';

const UserForm = ({ title, onSubmit, fields }) => (
  <>
    <h1 className={styles.title}>{title}</h1>
    <form onSubmit={onSubmit} className={styles.form}>
      {fields.map(({ placeholder, value, onChange }) => (
        <input
          key={placeholder}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={styles.input}
        />
      ))}
      <button type="submit" className={styles.button}>{`Registrasi ${title}`}</button>
    </form>
    <hr className={styles.separator} />
  </>
);

export default function AdminRegis() {
  const [nama, setNama] = useState('');
  const [jurusan, setJurusan] = useState('');
  const [angkatan, setAngkatan] = useState('');
  const [cabangKampus, setCabangKampus] = useState('');
  const [noWhatsapp, setNoWhatsapp] = useState('');
  
  const [namaDosen, setNamaDosen] = useState('');
  const [jurusanDosen, setJurusanDosen] = useState('');
  const [cabangKampusDosen, setCabangKampusDosen] = useState('');
  const [noWhatsappDosen, setNoWhatsappDosen] = useState('');

  const [namaKaprodi, setNamaKaprodi] = useState('');
  const [jurusanKaprodi, setJurusanKaprodi] = useState('');
  const [cabangKampusKaprodi, setCabangKampusKaprodi] = useState('');
  const [noWhatsappKaprodi, setNoWhatsappKaprodi] = useState('');

  const [namaPenguji, setNamaPenguji] = useState('');
  const [jurusanPenguji, setJurusanPenguji] = useState('');
  const [cabangKampusPenguji, setCabangKampusPenguji] = useState('');
  const [noWhatsappPenguji, setNoWhatsappPenguji] = useState('');

  const [formIndex, setFormIndex] = useState(0); // 0 for Mahasiswa, 1 for Dosen, 2 for Kaprodi, 3 for Penguji
  const router = useRouter();

  let swipeStart = 0; // Store the swipe start position

  // Function to generate NIM for Mahasiswa
  const generateNim = () => {
    const jurusanCode = jurusan === "TI" ? "10" : "11";
    const cabangKampusCode = cabangKampus === "Harapan Indah" ? "02" : cabangKampus === "Kebon Jeruk" ? "01" : "03";
    return `${angkatan}${jurusanCode}${cabangKampusCode}`;
  };

  // Function to generate NIM for Dosen
  const generateNimDosen = () => {
    const dosenNamaLength = namaDosen.replace(/\s/g, '').length;
    const dosenJurusanCode = jurusanDosen === "TI" ? "10" : "11";
    const dosenCabangKampusCode = cabangKampusDosen === "Harapan Indah" ? "02" : cabangKampusDosen === "Kebon Jeruk" ? "01" : "03";
    return `${dosenNamaLength}${dosenCabangKampusCode}${dosenJurusanCode}`;
  };

  // Function to generate NIM for Kaprodi
  const generateNimKaprodi = () => {
    const timestamp = Date.now().toString();
    return `KAPRODI-${timestamp}`; // Example format
  };

  // Function to generate NIM for Penguji
  const generateNimPenguji = () => {
    const timestamp = Date.now().toString();
    return `PENGUJI-${timestamp}`; // Example format
  };

  // Handle touch start and mouse down
  const handleStart = (e) => {
    swipeStart = e.touches ? e.touches[0].clientX : e.clientX; // For touch or mouse
  };

  // Handle touch end and mouse up
  const handleEnd = (e) => {
    const swipeEnd = e.changedTouches ? e.changedTouches[0].clientX : e.clientX; // For touch or mouse
    if (swipeStart - swipeEnd > 50) {
      setFormIndex((prev) => Math.min(prev + 1, 3)); // Swipe left: move to next form
    } else if (swipeEnd - swipeStart > 50) {
      setFormIndex((prev) => Math.max(prev - 1, 0)); // Swipe right: move to previous form
    }
  };

  // Submit Mahasiswa
  const handleSubmitMahasiswa = async (e) => {
    e.preventDefault();
    try {
      const nim = generateNim();
      await setDoc(doc(db, "users", nim), {
        nama,
        jurusan,
        angkatan,
        cabangKampus,
        noWhatsapp,
        nim,
        role: "mahasiswa"
      });
      alert("Registrasi Mahasiswa berhasil! NIM mahasiswa: " + nim);
      router.push("/login"); 
    } catch (error) {
      alert("Terjadi kesalahan saat registrasi mahasiswa: " + error.message);
    }
  };

  // Submit Dosen
  const handleSubmitDosen = async (e) => {
    e.preventDefault();
    try {
      const nimDosen = generateNimDosen();
      await setDoc(doc(db, "users", nimDosen), {
        nama: namaDosen,
        jurusan: jurusanDosen,
        cabangKampus: cabangKampusDosen,
        nim: nimDosen,
        role: "dosen"
      });
      alert("Registrasi Dosen berhasil! NIM dosen: " + nimDosen);
      router.push("/login"); 
    } catch (error) {
      alert("Terjadi kesalahan saat registrasi dosen: " + error.message);
    }
  };

  // Submit Kaprodi
  const handleSubmitKaprodi = async (e) => {
    e.preventDefault();
    try {
      const nimKaprodi = generateNimKaprodi();
      await setDoc(doc(db, "users", nimKaprodi), {
        nama: namaKaprodi,
        jurusan: jurusanKaprodi,
        cabangKampus: cabangKampusKaprodi,
        nim: nimKaprodi,
        role: "kaprodi"
      });
      alert("Registrasi Kaprodi berhasil! NIM kaprodi: " + nimKaprodi);
      router.push("/login"); 
    } catch (error) {
      alert("Terjadi kesalahan saat registrasi kaprodi: " + error.message);
    }
  };

  // Submit Penguji
  const handleSubmitPenguji = async (e) => {
    e.preventDefault();
    try {
      const nimPenguji = generateNimPenguji();
      await setDoc(doc(db, "users", nimPenguji), {
        nama: namaPenguji,
        jurusan: jurusanPenguji,
        cabangKampus: cabangKampusPenguji,
        nim: nimPenguji,
        role: "penguji"
      });
      alert("Registrasi Penguji berhasil! NIM penguji: " + nimPenguji);
      router.push("/login"); 
    } catch (error) {
      alert("Terjadi kesalahan saat registrasi penguji: " + error.message);
    }
  };

  return (
    <>
      <NavbarAdmin />
      <div 
        className={styles.container} 
        onTouchStart={handleStart} 
        onTouchEnd={handleEnd}
        onMouseDown={handleStart} // For mouse event
        onMouseUp={handleEnd}     // For mouse event
      >
        {formIndex === 0 && (
          <UserForm
            title="Mahasiswa"
            onSubmit={handleSubmitMahasiswa}
            fields={[
              { placeholder: "Nama Mahasiswa", value: nama, onChange: (e) => setNama(e.target.value) },
              { placeholder: "Jurusan (TI atau SI)", value: jurusan, onChange: (e) => setJurusan(e.target.value) },
              { placeholder: "Angkatan", value: angkatan, onChange: (e) => setAngkatan(e.target.value) },
              { placeholder: "Cabang Kampus (Harapan Indah, Kebon Jeruk, Citra Raya)", value: cabangKampus, onChange: (e) => setCabangKampus(e.target.value) },
              { placeholder: "Nomor WhatsApp", value: noWhatsapp, onChange: (e) => setNoWhatsapp(e.target.value) },
            ]}
          />
        )}
        
        {formIndex === 1 && (
          <UserForm
            title="Dosen"
            onSubmit={handleSubmitDosen}
            fields={[
              { placeholder: "Nama Dosen", value: namaDosen, onChange: (e) => setNamaDosen(e.target.value) },
              { placeholder: "Jurusan (TI atau SI)", value: jurusanDosen, onChange: (e) => setJurusanDosen(e.target.value) },
              { placeholder: "Cabang Kampus (Harapan Indah, Kebon Jeruk, Citra Raya)", value: cabangKampusDosen, onChange: (e) => setCabangKampusDosen(e.target.value) },
              { placeholder: "Nomor WhatsApp", value: noWhatsappDosen, onChange: (e) => setNoWhatsappDosen(e.target.value) },
            ]}
          />
        )}
        
        {formIndex === 2 && (
          <UserForm
            title="Kaprodi"
            onSubmit={handleSubmitKaprodi}
            fields={[
              { placeholder: "Nama Kaprodi", value: namaKaprodi, onChange: (e) => setNamaKaprodi(e.target.value) },
              { placeholder: "Jurusan (TI atau SI)", value: jurusanKaprodi, onChange: (e) => setJurusanKaprodi(e.target.value) },
              { placeholder: "Cabang Kampus (Harapan Indah, Kebon Jeruk, Citra Raya)", value: cabangKampusKaprodi, onChange: (e) => setCabangKampusKaprodi(e.target.value) },
              { placeholder: "Nomor WhatsApp", value: noWhatsappKaprodi, onChange: (e) => setNoWhatsappKaprodi(e.target.value) },
            ]}
          />
        )}
        
        {formIndex === 3 && (
          <UserForm
            title="Penguji"
            onSubmit={handleSubmitPenguji}
            fields={[
              { placeholder: "Nama Penguji", value: namaPenguji, onChange: (e) => setNamaPenguji(e.target.value) },
              { placeholder: "Jurusan (TI atau SI)", value: jurusanPenguji, onChange: (e) => setJurusanPenguji(e.target.value) },
              { placeholder: "Cabang Kampus (Harapan Indah, Kebon Jeruk, Citra Raya)", value: cabangKampusPenguji, onChange: (e) => setCabangKampusPenguji(e.target.value) },
              { placeholder: "Nomor WhatsApp", value: noWhatsappPenguji, onChange: (e) => setNoWhatsappPenguji(e.target.value) },
            ]}
          />
        )}
      </div>
    </>
  );
}
