"use client";

import { useState } from "react";
import Link from "next/link";
import api from "@/services/api";

export default function SearchPage() {

  const [query, setQuery] = useState("");

  const [users, setUsers] = useState<any[]>([]);

  const handleSearch = async () => {

    try {

      const response = await api.get(
        `/search-users?query=${query}`
      );

      setUsers(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleFollow = async (followingId: number) => {

    try {

        const currentUser = JSON.parse(
        localStorage.getItem("user") || "{}"
        );

        await api.post("/follow/toggle", {
        follower_id: currentUser.id,
        following_id: followingId,
        });

        alert("Berhasil");

    } catch (error) {

        console.log(error);
    }
    };

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      <h1 className="text-3xl font-bold text-white">
        Search Users
      </h1>

      <div className="flex gap-3">

        <input
          type="text"
          placeholder="Cari mahasiswa..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-500 transition px-6 rounded-xl text-white"
        >
          Search
        </button>

      </div>

      <div className="space-y-4">

        {
          users.map((user, index) => (

            <div
              key={index}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
            >

              <h1 className="text-white font-semibold text-xl">
                {user.name}
              </h1>

              <p className="text-zinc-400 mt-2">
                {user.prodi}
              </p>

              <p className="text-zinc-500 text-sm mt-1">
                Angkatan {user.angkatan}
              </p>

              <button
                onClick={() => handleFollow(user.id)}
                className="mt-4 bg-blue-600 hover:bg-blue-500 transition px-5 py-2 rounded-xl text-white"
                >
                Follow
              </button>

              <Link
                href={`/chat/${user.id}`}
                className="mt-3 inline-block bg-zinc-700 hover:bg-zinc-600 transition px-5 py-2 rounded-xl text-white"
                >
                Message
              </Link>

            </div>

          ))
        }

      </div>

    </div>
  );
}