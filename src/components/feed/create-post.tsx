"use client";

import { useState } from "react";

import api from "@/services/api";

interface Props {
  type?: string;
}

export default function CreatePost({
  type = "report",
}: Props) {

  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [image, setImage] = useState<any>(null);
  const [location, setLocation] = useState("");
  const locationCoordinates: any = {

    "Gedung A": {
      latitude: -6.200000,
      longitude: 106.816666,
    },

    "Gedung B": {
      latitude: -6.201000,
      longitude: 106.817000,
    },

    "Perpustakaan": {
      latitude: -6.202000,
      longitude: 106.818000,
    },

    "Parkiran Timur": {
      latitude: -6.203000,
      longitude: 106.819000,
    },

    "Lab Komputer": {
      latitude: -6.204000,
      longitude: 106.820000,
    },

    "Kantin": {
      latitude: -6.205000,
      longitude: 106.821000,
    },

  };


  const handlePost = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      const formData = new FormData();

      formData.append("user_id", user.id);
      formData.append("content", content);
      formData.append("type", type);
      if (type === "report") {

        formData.append("category", category);
        formData.append("priority", priority);
        formData.append("status", "Pending");
        formData.append("location", location);
        formData.append(
          "latitude",
          locationCoordinates[location]?.latitude
        );

        formData.append(
          "longitude",
          locationCoordinates[location]?.longitude
        );

      }

      if (image) {
        formData.append("image", image);
      }

      await api.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Posting berhasil");

      window.location.reload();

    } catch (error) {

      console.log(error);

      alert("Gagal membuat posting");
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
      {
        type === "report" && (

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white mb-4"
          >

            <option value="">
              Pilih Kategori Laporan
            </option>

            <option value="Fasilitas">
              Fasilitas
            </option>

            <option value="Keamanan">
              Keamanan
            </option>

            <option value="Kebersihan">
              Kebersihan
            </option>

            <option value="Akademik">
              Akademik
            </option>

            <option value="Parkir">
              Parkir
            </option>

          </select>
        )
      }

      {
        type === "report" && (

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white mb-4"
          >

            <option value="Low">
              Low Priority
            </option>

            <option value="Medium">
              Medium Priority
            </option>

            <option value="High">
              High Priority
            </option>

            <option value="Urgent">
              Urgent
            </option>

          </select>
        )
      }

      {
        type === "report" && (

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white mb-4"
          >

            <option value="">
              Pilih Lokasi Kampus
            </option>

            <option value="Gedung A">
              Gedung A
            </option>

            <option value="Gedung B">
              Gedung B
            </option>

            <option value="Perpustakaan">
              Perpustakaan
            </option>

            <option value="Parkiran Timur">
              Parkiran Timur
            </option>

            <option value="Lab Komputer">
              Lab Komputer
            </option>

            <option value="Kantin">
              Kantin
            </option>

          </select>
        )
      }
      <textarea
        placeholder="Apa yang ingin kamu bagikan?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full bg-zinc-800 rounded-2xl p-4 text-white outline-none resize-none"
      />

      <input
        type="file"
        onChange={(e: any) =>
          setImage(e.target.files[0])
        }
        className="mt-4 text-white"
      />

      <div className="flex justify-end mt-5">

        <button
          onClick={handlePost}
          className="bg-blue-600 hover:bg-blue-500 transition px-5 py-2 rounded-xl text-white"
        >
          Posting
        </button>

      </div>

    </div>
  );
}