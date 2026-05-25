"use client";

import { useState } from "react";

import api from "@/services/api";

interface Props {
  postId: number;
}

export default function CommentSection({
  postId,
}: Props) {

  const [content, setContent] = useState("");

  const handleComment = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      await api.post("/comments", {
        post_id: postId,
        user_id: user.id,
        content,
      });

      alert("Komentar berhasil");

      window.location.reload();

    } catch (error) {

      console.log(error);

      alert("Gagal komentar");
    }
  };

  return (
    <div className="mt-5 border-t border-zinc-800 pt-5">

      <textarea
        placeholder="Tulis komentar..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full bg-zinc-800 rounded-2xl p-4 text-white outline-none resize-none"
      />

      <div className="flex justify-end mt-4">

        <button
          onClick={handleComment}
          className="bg-blue-600 hover:bg-blue-500 transition px-5 py-2 rounded-xl text-white"
        >
          Kirim
        </button>

      </div>

    </div>
  );
}