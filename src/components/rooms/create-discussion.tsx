"use client";

import { useState } from "react";

import api from "@/services/api";

export default function CreateDiscussion() {

  const [content, setContent] = useState("");

  const [category, setCategory] = useState("");

  const handlePost = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      await api.post("/posts", {
        user_id: user.id,
        content,
        type: "discussion",
        category,
      });

      window.location.reload();

    } catch (error) {

      console.log(error);

      alert("Gagal membuat diskusi");
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white mb-4"
      >

        <option value="">
          Pilih Kategori Diskusi
        </option>

        <option value="Pengumuman">
          Pengumuman
        </option>

        <option value="Event">
          Event
        </option>

        <option value="Teknologi">
          Teknologi
        </option>

        <option value="Organisasi">
          Organisasi
        </option>

        <option value="Random">
          Random
        </option>

      </select>

      <textarea
        placeholder="Mulai diskusi..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white h-32"
      />

      <button
        onClick={handlePost}
        className="mt-4 bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-xl text-white"
      >
        Posting
      </button>

    </div>
  );
}