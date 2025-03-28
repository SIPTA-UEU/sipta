"use client";
import React, { useState, useEffect } from "react";
import { storage, db } from "../../firebase"; // Import Firebase Storage dan Firestore
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

const RevisiFormSkripsi = ({
  item,
  revisiData,
  handleRevisiChange,
  handleSaveRevisi,
}) => {
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
  const [localRevisiData, setLocalRevisiData] = useState({
    PEBIMBING: { text: "", imageUrl: "" },
    KETUA_PENGUJI: { text: "", imageUrl: "" },
    ANGGOTA_PENGUJI: { text: "", imageUrl: "" },
  });

  // Load existing revisi data from Firestore
  useEffect(() => {
    const loadRevisiData = async () => {
      try {
        const docRef = doc(db, "revisiSkripsi", item.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setLocalRevisiData({
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

    loadRevisiData();
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

    const storageRef = ref(storage, `revisiImages/${item.id}_${role}`);
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

  // Save revisions including images
  const handleSaveRevisiWithImage = async () => {
    try {
      // Upload each image and retrieve its URL
      const PEBIMBING_URL = await uploadImage("PEBIMBING");
      const KETUA_PENGUJI_URL = await uploadImage("KETUA_PENGUJI");
      const ANGGOTA_PENGUJI_URL = await uploadImage("ANGGOTA_PENGUJI");

      // Prepare data to save to Firestore
      const updatedRevisiData = {
        PEBIMBING: {
          text: localRevisiData.PEBIMBING.text,
          imageUrl: PEBIMBING_URL || localRevisiData.PEBIMBING.imageUrl,
        },
        KETUA_PENGUJI: {
          text: localRevisiData.KETUA_PENGUJI.text,
          imageUrl: KETUA_PENGUJI_URL || localRevisiData.KETUA_PENGUJI.imageUrl,
        },
        ANGGOTA_PENGUJI: {
          text: localRevisiData.ANGGOTA_PENGUJI.text,
          imageUrl:
            ANGGOTA_PENGUJI_URL || localRevisiData.ANGGOTA_PENGUJI.imageUrl,
        },
      };

      // Save to Firestore
      await setDoc(doc(db, "revisiSkripsi", item.id), updatedRevisiData);
      alert("Revisi dan gambar telah disimpan.");
      handleSaveRevisi(item.id);
    } catch (error) {
      console.error("Error saving revisi with image: ", error);
      alert("Terjadi kesalahan saat menyimpan revisi.");
    }
  };

  // Listener untuk auto-update data
  const subscribeToRealtimeUpdates = (itemId, setUpdatedData) => {
    const revisiDocRef = doc(db, "revisiMahasiswaSkripsi", itemId);

    // Pasang listener ke Firestore
    const unsubscribe = onSnapshot(revisiDocRef, (snapshot) => {
      if (snapshot.exists()) {
        const newData = snapshot.data();
        console.log("Data terbaru dari Firestore:", newData);
        setUpdatedData(newData); // Update state atau variabel lokal dengan data terbaru
      } else {
        console.log("Dokumen tidak ditemukan.");
      }
    });

    // Kembalikan fungsi untuk menghentikan listener
    return unsubscribe;
  };

  // Fungsi utama
  const handleSaveRevisiWithImageAndMerge = async () => {
    try {
      // Upload setiap gambar dan dapatkan URL-nya
      const PEBIMBING_URL = await uploadImage("PEBIMBING");
      const KETUA_PENGUJI_URL = await uploadImage("KETUA_PENGUJI");
      const ANGGOTA_PENGUJI_URL = await uploadImage("ANGGOTA_PENGUJI");

      console.log("PEBIMBING_URL:", PEBIMBING_URL);
      console.log("KETUA_PENGUJI_URL:", KETUA_PENGUJI_URL);
      console.log("ANGGOTA_PENGUJI_URL:", ANGGOTA_PENGUJI_URL);

      const updatedRevisiData = {
        revisi: {
          PEBIMBING: {
            text:
              revisiData[item.id]?.PEBIMBING || localRevisiData.PEBIMBING.text,
            imageUrl: PEBIMBING_URL || localRevisiData.PEBIMBING.imageUrl,
          },
          KETUA_PENGUJI: {
            text:
              revisiData[item.id]?.KETUA_PENGUJI ||
              localRevisiData.KETUA_PENGUJI.text,
            imageUrl:
              KETUA_PENGUJI_URL || localRevisiData.KETUA_PENGUJI.imageUrl,
          },
          ANGGOTA_PENGUJI: {
            text:
              revisiData[item.id]?.ANGGOTA_PENGUJI ||
              localRevisiData.ANGGOTA_PENGUJI.text,
            imageUrl:
              ANGGOTA_PENGUJI_URL || localRevisiData.ANGGOTA_PENGUJI.imageUrl,
          },
        },
      };

      const revisiDocRef = doc(db, "revisiMahasiswaSkripsi", item.id);
      const jadwalDocRef = doc(db, "jadwalPenguji2", item.id);

      const revisiDoc = await getDoc(revisiDocRef);
      const jadwalDoc = await getDoc(jadwalDocRef);

      let finalData = updatedRevisiData;

      if (revisiDoc.exists() && jadwalDoc.exists()) {
        const revisiData = revisiDoc.data();
        const jadwalData = jadwalDoc.data();

        finalData = {
          ...jadwalData,
          ...revisiData,
          revisi: {
            ...jadwalData.revisi,
            ...finalData.revisi,
          },
        };
      } else if (jadwalDoc.exists()) {
        finalData = {
          ...finalData,
          ...jadwalDoc.data(),
        };
      } else if (revisiDoc.exists()) {
        finalData = {
          ...finalData,
          ...revisiDoc.data(),
        };
      }

      console.log("Final merged data:", finalData);

      // Simpan data ke Firestore
      await setDoc(doc(db, "revisiMahasiswaSkripsi", item.id), finalData);

      alert("Revisi dan gambar telah disimpan.");
      handleSaveRevisi(item.id);
    } catch (error) {
      console.error("Error saving revisi with image: ", error);
      alert("Terjadi kesalahan saat menyimpan revisi.");
    }
  };

  // Panggil auto-update setelah penyimpanan
  const handleRealtimeUpdate = (itemId) => {
    const unsubscribe = subscribeToRealtimeUpdates(itemId, (newData) => {
      // Lakukan sesuatu dengan data terbaru
      console.log("Data terbaru diterima:", newData);
    });

    return unsubscribe;
  };

  // Contoh penggunaan
  const itemId = "id_dokumen";
  const unsubscribe = handleRealtimeUpdate(itemId); // Mulai mendengarkan update

  // Hentikan listener ketika tidak diperlukan
  // unsubscribe();

  return (
    <div
      style={{
        marginTop: "10px",
        padding: "10px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
      }}
    >
      <h3>Revisi Jadwal Penguji</h3>
      <p>Berikan revisi pada jadwal penguji ini jika diperlukan.</p>
      <div>
        <h3>PEBIMBING</h3>
        <textarea
          rows="4"
          style={{ width: "100%", padding: "10px", borderRadius: "4px" }}
          placeholder="Masukkan komentar revisi..."
          value={localRevisiData.PEBIMBING.text}
          onChange={(e) =>
            setLocalRevisiData((prev) => ({
              ...prev,
              PEBIMBING: { ...prev.PEBIMBING, text: e.target.value },
            }))
          }
        />
        <br />
        <input
          type="file"
          onChange={(e) => handleImageChange("PEBIMBING", e)}
          style={{ marginTop: "10px" }}
        />
        {imageUrls.PEBIMBING && (
          <div>
            <img
              src={imageUrls.PEBIMBING}
              alt="PEBIMBING"
              style={{ width: "100px", marginTop: "10px" }}
            />
          </div>
        )}
        <br />

        <h3>KETUA PENGUJI</h3>
        <textarea
          rows="4"
          style={{ width: "100%", padding: "10px", borderRadius: "4px" }}
          placeholder="Masukkan komentar revisi..."
          value={localRevisiData.KETUA_PENGUJI.text}
          onChange={(e) =>
            setLocalRevisiData((prev) => ({
              ...prev,
              KETUA_PENGUJI: { ...prev.KETUA_PENGUJI, text: e.target.value },
            }))
          }
        />
        <br />
        <input
          type="file"
          onChange={(e) => handleImageChange("KETUA_PENGUJI", e)}
          style={{ marginTop: "10px" }}
        />
        {imageUrls.KETUA_PENGUJI && (
          <div>
            <img
              src={imageUrls.KETUA_PENGUJI}
              alt="KETUA PENGUJI"
              style={{ width: "100px", marginTop: "10px" }}
            />
          </div>
        )}
        <br />

        <h3>ANGGOTA PENGUJI</h3>
        <textarea
          rows="4"
          style={{ width: "100%", padding: "10px", borderRadius: "4px" }}
          placeholder="Masukkan komentar revisi..."
          value={localRevisiData.ANGGOTA_PENGUJI.text}
          onChange={(e) =>
            setLocalRevisiData((prev) => ({
              ...prev,
              ANGGOTA_PENGUJI: {
                ...prev.ANGGOTA_PENGUJI,
                text: e.target.value,
              },
            }))
          }
        />
        <br />
        <input
          type="file"
          onChange={(e) => handleImageChange("ANGGOTA_PENGUJI", e)}
          style={{ marginTop: "10px" }}
        />
        {imageUrls.ANGGOTA_PENGUJI && (
          <div>
            <img
              src={imageUrls.ANGGOTA_PENGUJI}
              alt="ANGGOTA PENGUJI"
              style={{ width: "100px", marginTop: "10px" }}
            />
          </div>
        )}
        <br />

        <button
          onClick={handleSaveRevisiWithImage}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Simpan Revisi
        </button>

        {/* Button to Save Revisi Mahasiswa */}
        <button
          onClick={handleSaveRevisiWithImageAndMerge}
          style={{
            backgroundColor: "#008CBA",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            marginTop: "10px",
            marginRight: "10px",
          }}
        >
          Simpan Revisi Mahasiswa
        </button>
      </div>
    </div>
  );
};

export default RevisiFormSkripsi;
