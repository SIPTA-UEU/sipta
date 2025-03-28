"use client";
import React, { useState, useEffect } from "react";
import { storage, db } from "../../firebase"; // Import Firebase Storage and Firestore
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";

const NilaiFormSkripsi = ({ item, nilaiData, handleNilaiChange, handleSaveNilaiSkripsi }) => {
  const [imageFiles, setImageFiles] = useState({
    PEBIMBING: null,
    KETUA_PENGUJI: null,
    ANGGOTA_PENGUJI: null,
  });
  const [imageUrls, setImageUrls] = useState({
    PEBIMBING: "",
    KETUA_PENGUJI: "",
    ANGGOTA_PENGUJI: "",
  });
  const [localNilaiData, setLocalNilaiData] = useState({
    PEBIMBING: { text: "", imageUrl: "" },
    KETUA_PENGUJI: { text: "", imageUrl: "" },
    ANGGOTA_PENGUJI: { text: "", imageUrl: "" },
  });
  const [averageNilai, setAverageNilai] = useState(0);
  const [letterGrade, setLetterGrade] = useState("");

  // Load existing revisi data from Firestore and persist the state even after refresh
  useEffect(() => {
    const loadNilaiData = async () => {
      try {
        const docRef = doc(db, "nilaiSkripsi", item.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setLocalNilaiData({
            PEBIMBING: data.PEBIMBING || { text: "", imageUrl: "" },
            KETUA_PENGUJI: data.KETUA_PENGUJI || { text: "", imageUrl: "" },
            ANGGOTA_PENGUJI: data.ANGGOTA_PENGUJI || { text: "", imageUrl: "" },
          });
          setImageUrls({
            PEBIMBING: data.PEBIMBING?.imageUrl || "",
            KETUA_PENGUJI: data.KETUA_PENGUJI?.imageUrl || "",
            ANGGOTA_PENGUJI: data.ANGGOTA_PENGUJI?.imageUrl || "",
          });
        }
      } catch (error) {
        console.error("Error loading revisi data: ", error);
      }
    };

    loadNilaiData();
  }, [item.id]);

  // Handle image file change
  const handleImageChange = (role, event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFiles((prev) => ({ ...prev, [role]: file }));
    }
  };

  // Upload image to Firebase Storage and get the URL
  const uploadImage = (role) => {
    const file = imageFiles[role];
    if (!file) return null;

    const storageRef = ref(storage, `nilaiSkripsiImages/${item.id}_${role}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImageUrls((prev) => ({ ...prev, [role]: url }));
            resolve(url);
          });
        }
      );
    });
  };

  // Function to calculate the total score and average score
  const calculateScores = () => {
    const getScoreFromText = (text) => {
      const score = parseFloat(text);
      return isNaN(score) ? 0 : score;
    };

    const PEBIMBING_SCORE = getScoreFromText(localNilaiData.PEBIMBING.text);
    const KETUA_PENGUJI_SCORE = getScoreFromText(localNilaiData.KETUA_PENGUJI.text);
    const ANGGOTA_PENGUJI_SCORE = getScoreFromText(localNilaiData.ANGGOTA_PENGUJI.text);

    const totalScore = PEBIMBING_SCORE + KETUA_PENGUJI_SCORE + ANGGOTA_PENGUJI_SCORE;
    const averageScore = totalScore / 3;

    // Calculate letter grade based on average score
    let grade = "";
    if (averageScore >= 80) {
      grade = "A";
    } else if (averageScore >= 77) {
      grade = "A-";
    } else if (averageScore >= 74) {
      grade = "B+";
    } else if (averageScore >= 68) {
      grade = "B";
    } else if (averageScore >= 65) {
      grade = "B-";
    } else {
      grade = "TIDAK LULUS";
    }

    setAverageNilai(averageScore);
    setLetterGrade(grade);
  };

  const handleSaveNilaiWithImageAndMerge = async () => {
    try {
      // Upload each image and retrieve its URL
      const PEBIMBING_URL = await uploadImage("PEBIMBING");
      const KETUA_PENGUJI_URL = await uploadImage("KETUA_PENGUJI");
      const ANGGOTA_PENGUJI_URL = await uploadImage("ANGGOTA_PENGUJI");
      
      // Prepare the updated revisi data with images
      const updatedNilaiData = {
        revisi: {
          PEBIMBING: {
            text: localNilaiData.PEBIMBING.text,
            imageUrl: PEBIMBING_URL || localNilaiData.PEBIMBING.imageUrl,
          },
          KETUA_PENGUJI: {
            text: localNilaiData.KETUA_PENGUJI.text,
            imageUrl: KETUA_PENGUJI_URL || localNilaiData.KETUA_PENGUJI.imageUrl,
          },
          ANGGOTA_PENGUJI: {
            text: localNilaiData.ANGGOTA_PENGUJI.text,
            imageUrl: ANGGOTA_PENGUJI_URL || localNilaiData.ANGGOTA_PENGUJI.imageUrl,
          },
        },
        totalNilai: averageNilai, // Store the totalNilai based on averageNilai
        letterGrade: letterGrade, // Store the letter grade (A, B, etc.)
      };
  
      // Prepare the full data structure to be saved to Firestore
      const fullData = {
        id: item.id,
        angkatan: "2024", // Example static value
        cabangKampus: "Harapan Indah", // Example static value
        daftarNilaiUrl: "https://example.com/daftarNilai.pdf", // Example file URL
        dosen: "Adi Widianto", // Example static value
        fileTA1Url: "https://example.com/fileTA1.pdf", // Example file URL
        jurusan: "TI", // Example static value
        krsUrl: "https://example.com/krs.pdf", // Example file URL
        nama: "Raden", // Example static value
        noWhatsapp: "089769759759", // Example static value
        pengajuanSidangUrl: "https://example.com/pengajuanSidang.pdf", // Example file URL
        penguji: "Nixon", // Example static value
        penguji1: "Bambang", // Example static value
        penguji2: "Nixon", // Example static value
        rataRata: averageNilai, // Store the calculated average score
        revisi: updatedNilaiData.revisi,
        totalNilai: averageNilai * 3, // Calculate total based on average score
        status: "Data Dikirim Ke Penguji", // Example static value
        statusJadwalSidangSempro: "acc", // Example static value
        tanggalSidang: "2024-12-23", // Example static value
        sksberjalan: "130", // Example static value
        sksditempuh: "120", // Example static value
        role: "mahasiswa", // Example static value
        letterGrade: letterGrade, // Save the letter grade (A, B, etc.)
      }; 
  
      // Save to Firestore
      await setDoc(doc(db, "nilaiMahasiswaSkripsi", item.id), fullData);
    
      alert("Nilai dan ttd telah disimpan.");
      handleSaveNilaiSkripsi(item.id);
    } catch (error) {
      console.error("Error saving revisi with image: ", error);
      alert("Terjadi kesalahan saat menyimpan revisi.");
    }
  };
  

  return (
    <div style={{ marginTop: "10px", padding: "50px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
      <h3>Nilai Jadwal Penguji</h3>
      <p>Berikan nilai pada jadwal penguji ini jika diperlukan.</p>
      <div>
        <h3>PEBIMBING</h3>
        <textarea
          rows="4"
          style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
          value={localNilaiData.PEBIMBING.text}
          onChange={(e) => setLocalNilaiData((prev) => ({ ...prev, PEBIMBING: { ...prev.PEBIMBING, text: e.target.value } }))}
        />
        <input type="file" onChange={(e) => handleImageChange("PEBIMBING", e)} />
        {imageUrls.PEBIMBING && <img src={imageUrls.PEBIMBING} alt="PEBIMBING" style={{ width: "100px", height: "100px" }} />}
      </div>

      <div>
        <h3>KETUA PENGUJI</h3>
        <textarea
          rows="4"
          style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
          value={localNilaiData.KETUA_PENGUJI.text}
          onChange={(e) => setLocalNilaiData((prev) => ({ ...prev, KETUA_PENGUJI: { ...prev.KETUA_PENGUJI, text: e.target.value } }))}
        />
        <input type="file" onChange={(e) => handleImageChange("KETUA_PENGUJI", e)} />
        {imageUrls.KETUA_PENGUJI && <img src={imageUrls.KETUA_PENGUJI} alt="KETUA_PENGUJI" style={{ width: "100px", height: "100px" }} />}
      </div>

      <div>
        <h3>ANGGOTA PENGUJI</h3>
        <textarea
          rows="4"
          style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
          value={localNilaiData.ANGGOTA_PENGUJI.text}
          onChange={(e) => setLocalNilaiData((prev) => ({ ...prev, ANGGOTA_PENGUJI: { ...prev.ANGGOTA_PENGUJI, text: e.target.value } }))}
        />
        <input type="file" onChange={(e) => handleImageChange("ANGGOTA_PENGUJI", e)} />
        {imageUrls.ANGGOTA_PENGUJI && <img src={imageUrls.ANGGOTA_PENGUJI} alt="ANGGOTA_PENGUJI" style={{ width: "100px", height: "100px" }} />}
      </div>

      <button onClick={calculateScores}>Hitung Nilai</button>
      <div>
        <h3>Rata-rata Nilai: {averageNilai}</h3>
        <h3>Grade: {letterGrade}</h3>
      </div>

      <button onClick={handleSaveNilaiWithImageAndMerge}>Simpan Nilai</button>
    </div>
  );
};

export default NilaiFormSkripsi;
