"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {

    const data = localStorage.getItem("user");

    if (data) {
      setUser(JSON.parse(data));
    }

  }, []);

  return (
    <div className="max-w-3xl mx-auto">

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

        <div className="flex items-center gap-5">

          <div className="w-24 h-24 rounded-full bg-zinc-700" />

          <div>

            <h1 className="text-3xl font-bold text-white">
              {user?.name}
            </h1>

            <p className="text-zinc-400 mt-1">
              {user?.email}
            </p>

            <p className="text-zinc-400 mt-1">
            {user?.prodi}
            </p>

            <p className="text-zinc-500 text-sm mt-2">
            Angkatan {user?.angkatan}
            </p>

          </div>

        </div>

        <div className="grid grid-cols-3 gap-4 mt-10">

          <div className="bg-zinc-800 rounded-2xl p-5 text-center">

            <h1 className="text-2xl font-bold text-white">
              12
            </h1>

            <p className="text-zinc-400 text-sm">
              Posts
            </p>

          </div>

          <div className="bg-zinc-800 rounded-2xl p-5 text-center">

            <h1 className="text-2xl font-bold text-white">
              48
            </h1>

            <p className="text-zinc-400 text-sm">
              Comments
            </p>

          </div>

          <div className="bg-zinc-800 rounded-2xl p-5 text-center">

            <h1 className="text-2xl font-bold text-white">
              5
            </h1>

            <p className="text-zinc-400 text-sm">
              Reports
            </p>

          </div>

        </div>

        <div className="mt-10">

          <h1 className="text-xl font-semibold text-white">
            Tentang
          </h1>

          <p className="text-zinc-400 mt-3 leading-relaxed">
            {user?.bio}
          </p>
          
          <Link
            href="/profile/edit"
            className="inline-block mt-6 bg-blue-600 hover:bg-blue-500 transition px-5 py-3 rounded-xl text-white"
            >
            Edit Profile
          </Link>

        </div>

      </div>

    </div>
  );
}