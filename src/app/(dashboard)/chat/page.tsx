"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import api from "@/services/api";

export default function ChatInboxPage() {

  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {

    fetchChats();

  }, []);

  const fetchChats = async () => {

    try {

      const currentUser = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      const response = await api.get(
        `/chat-list/${currentUser.id}`
      );

      setUsers(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      <h1 className="text-3xl font-bold text-white">
        Chats
      </h1>

      {
        users.map((user, index) => (

          <Link
            key={index}
            href={`/chat/${user.id}`}
            className="block bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:bg-zinc-800 transition"
          >

            <div className="flex items-center gap-4">

              {
              user.avatar ? (

                <img
                  src={`http://127.0.0.1:8000/storage/${user.avatar}`}
                  alt="avatar"
                  className="

                  w-14 h-14

                  rounded-full

                  object-cover

                "
                />

              ) : (

                <div
                  className="

                  w-14 h-14

                  rounded-full

                  bg-zinc-700

                  flex items-center justify-center

                  text-white

                  font-bold

                "
                >

                  {user.name?.charAt(0)}

                </div>

              )
            }

              <div>

                <h1 className="text-white font-semibold text-lg">
                  {user.name}
                </h1>

                <p className="text-zinc-400 text-sm">
                  {user.prodi}
                </p>

              </div>

            </div>

          </Link>

        ))
      }

    </div>
  );
}