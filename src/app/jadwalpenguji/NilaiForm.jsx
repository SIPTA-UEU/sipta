"use client";
import React, { useState, useEffect } from "react";
import { storage, db } from "../../firebase"; // Import Firebase Storage and Firestore
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";

const NilaiForm = ({ item, handleSaveNilai }) => {
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

  // Load existing revisi data from Firestore
  useEffect(() => {
    const loadNilaiData = async () => {
      try {
        const docRef = doc(db, "nilaiMahasiswaSempro", item.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data().revisi || {};
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
        console.error("Error loading nilai data: ", error);
      }
    };

    loadNilaiData();
  }, [item.id]);

  const handleImageChange = (role, event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFiles((prev) => ({ ...prev, [role]: file }));
    }
  };

  const uploadImage = (role) => {
    const file = imageFiles[role];
    if (!file) return null;

    const storageRef = ref(storage, `nilaiImages/${item.id}_${role}`);
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

  const calculateScores = () => {
    const getScoreFromText = (text) => {
      const score = parseFloat(text);
      return isNaN(score) ? 0 : score;
    };

    const PEBIMBING_SCORE = getScoreFromText(localNilaiData.PEBIMBING.text);
    const KETUA_PENGUJI_SCORE = getScoreFromText(
      localNilaiData.KETUA_PENGUJI.text
    );
    const ANGGOTA_PENGUJI_SCORE = getScoreFromText(
      localNilaiData.ANGGOTA_PENGUJI.text
    );

    const totalScore =
      PEBIMBING_SCORE + KETUA_PENGUJI_SCORE + ANGGOTA_PENGUJI_SCORE;
    const averageScore = totalScore / 3;

    let grade = "";
    if (averageScore >= 80) grade = "A";
    else if (averageScore >= 77) grade = "A-";
    else if (averageScore >= 74) grade = "B+";
    else if (averageScore >= 68) grade = "B";
    else if (averageScore >= 65) grade = "B-";
    else grade = "TIDAK LULUS";

    setAverageNilai(averageScore);
    setLetterGrade(grade);
  };

  const handleSaveNilaiWithImageAndMerge = async () => {
    try {
      const PEBIMBING_URL = await uploadImage("PEBIMBING");
      const KETUA_PENGUJI_URL = await uploadImage("KETUA_PENGUJI");
      const ANGGOTA_PENGUJI_URL = await uploadImage("ANGGOTA_PENGUJI");

      const updatedNilaiData = {
        revisi: {
          PEBIMBING: {
            text: localNilaiData.PEBIMBING.text,
            imageUrl: PEBIMBING_URL || localNilaiData.PEBIMBING.imageUrl,
          },
          KETUA_PENGUJI: {
            text: localNilaiData.KETUA_PENGUJI.text,
            imageUrl:
              KETUA_PENGUJI_URL || localNilaiData.KETUA_PENGUJI.imageUrl,
          },
          ANGGOTA_PENGUJI: {
            text: localNilaiData.ANGGOTA_PENGUJI.text,
            imageUrl:
              ANGGOTA_PENGUJI_URL || localNilaiData.ANGGOTA_PENGUJI.imageUrl,
          },
        },
        totalNilai: averageNilai,
        letterGrade: letterGrade,
      };

      await setDoc(
        doc(db, "nilaiMahasiswaSempro", item.id),
        {
          nama: item.nama, // Menggunakan nama dari data dinamis
          revisi: updatedNilaiData.revisi,
          rataRataNilai: averageNilai, // Menyimpan rata-rata nilai ke database
          totalNilai: averageNilai * 3,
          letterGrade,
        },
        { merge: true }
      );

      alert("Nilai telah disimpan.");
      handleSaveNilai(item.id);
    } catch (error) {
      console.error("Error saving nilai: ", error);
      alert("Terjadi kesalahan saat menyimpan nilai.");
    }
  };

  return (
    <div
      style={{
        marginTop: "10px",
        padding: "50px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
      }}
    >
      <h3>Nilai Jadwal Penguji</h3>
      <p>Berikan nilai pada jadwal penguji ini jika diperlukan.</p>

      {["PEBIMBING", "KETUA_PENGUJI", "ANGGOTA_PENGUJI"].map((role) => (
        <div key={role}>
          <h3>{role}</h3>
          <textarea
            rows="4"
            style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
            value={localNilaiData[role].text}
            onChange={(e) =>
              setLocalNilaiData((prev) => ({
                ...prev,
                [role]: { ...prev[role], text: e.target.value },
              }))
            }
          />
          <input type="file" onChange={(e) => handleImageChange(role, e)} />
          {imageUrls[role] && (
            <img
              src={imageUrls[role]}
              alt={role}
              style={{ width: "100px", height: "100px" }}
            />
          )}
        </div>
      ))}

      <button onClick={calculateScores}>Hitung Nilai</button>
      <div>
        <h3>Rata-rata Nilai: {averageNilai}</h3>
        <h3>Grade: {letterGrade}</h3>
      </div>

      <button onClick={handleSaveNilaiWithImageAndMerge}>Simpan Nilai</button>
    </div>
  );
};

export default NilaiForm;
