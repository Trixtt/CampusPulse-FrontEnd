"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

import {
  MapPin,
  Calendar,
  Mail,
  Pencil,
} from "lucide-react";

import ReportCard from "@/components/feed/report-card";

export default function ProfilePage() {

  const [user, setUser] = useState<any>(null);

  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {

    const storedUser = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    setUser(storedUser);

    fetchPosts(storedUser.id);

  }, []);

  const fetchPosts = async (id: number) => {

    try {

      const response = await api.get(
        `/user-posts/${id}`
      );

      setPosts(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  if (!user) return null;

  return (

    <div className="max-w-5xl mx-auto pb-20">

      {/* COVER */}

      <div
        className="

          relative

          h-64

          rounded-3xl

          bg-gradient-to-r
          from-zinc-900
          via-zinc-800
          to-zinc-900

          border border-zinc-800

          z-0

        "
      />

      {/* PROFILE */}

      <div className="px-8 relative z-20">

        <div className="flex items-end justify-between -mt-20">

          {/* LEFT */}

          <div>

            {
            user.avatar ? (

              <img
                src={`http://127.0.0.1:8000/storage/${user.avatar}`}
                alt="avatar"
                className="

                w-40 h-40

                rounded-full

                object-cover

                border-[6px]
                border-black

                shadow-2xl

              "
              />

            ) : 
              (

            <div
              className="

              w-40 h-40

              rounded-full

              border-[6px]
              border-black

              bg-zinc-800

              flex items-center justify-center

              text-white

              text-5xl

              font-bold

              shadow-2xl

            "
            >

              {user.name?.charAt(0)}

            </div>

              )
            }

          </div>

          {/* BUTTON */}

          <a
          href="/profile/edit"
          className="

          relative z-50

          flex items-center gap-2

          px-6 py-3

          rounded-2xl

          bg-white
          text-black

          font-semibold

          hover:scale-105

          transition-all

        "
        > Edit Profile</a>

        </div>

        {/* INFO */}

        <div className="mt-6">

          <h1 className="text-4xl font-bold text-white">
            {user.name}
          </h1>

          <p className="text-zinc-400 mt-2 text-lg">
            @{user.nim}
          </p>

          {/* BIO */}

          <p className="text-zinc-300 mt-5 leading-relaxed max-w-3xl">
            {
              user.bio ||
              "Mahasiswa aktif Campus Pulse."
            }
          </p>

          {/* DETAIL */}

          <div className="flex flex-wrap gap-6 mt-6 text-zinc-400">

            <div className="flex items-center gap-2">

              <Mail size={18} />

              {user.email}

            </div>

            <div className="flex items-center gap-2">

              <MapPin size={18} />

              {user.prodi || "Program Studi"}

            </div>

            <div className="flex items-center gap-2">

              <Calendar size={18} />

              Angkatan {user.angkatan || "-"}
              
            </div>

          </div>

          {/* STATS */}

          <div className="flex gap-10 mt-8">

            <div>

              <h1 className="text-3xl font-bold text-white">
                {posts.length}
              </h1>

              <p className="text-zinc-500">
                Posts
              </p>

            </div>

            <div>

              <h1 className="text-3xl font-bold text-white">
                {
                  posts.reduce(
                    (acc, post) =>
                      acc + (post.likes?.length || 0),
                    0
                  )
                }
              </h1>

              <p className="text-zinc-500">
                Likes
              </p>

            </div>

            <div>

              <h1 className="text-3xl font-bold text-white">
                {
                  posts.reduce(
                    (acc, post) =>
                      acc + (post.comments?.length || 0),
                    0
                  )
                }
              </h1>

              <p className="text-zinc-500">
                Comments
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}