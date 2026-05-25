"use client";

import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  if (!mounted) return null;

  const handleLogout = () => {
    // Hapus cookie token (dipakai middleware)
    Cookies.remove("token");
    // Hapus user dari localStorage (dipakai UI)
    localStorage.removeItem("user");
    // Redirect ke login
    router.push("/login");
  };

  return (
    <div
      className="
      fixed top-0
      left-72 right-0
      h-24
      bg-zinc-950/90
      backdrop-blur-xl
      border-b border-zinc-800
      flex items-center justify-between
      px-10
      z-40
    "
    >
      {/* LEFT */}
      <div>
        <h1 className="text-2xl font-bold text-white">Campus Pulse</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Smart Campus Social Platform
        </p>
      </div>

      <div className="flex items-center gap-5">
        {/* USER */}
        <div className="flex items-center gap-4">
          {user?.avatar ? (
            <img
              src={`http://127.0.0.1:8000/storage/${user.avatar}`}
              alt="avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0)}
            </div>
          )}
          <div>
            <h1 className="text-white font-semibold">{user?.name}</h1>
            <p className="text-zinc-500 text-sm">{user?.prodi || "Mahasiswa"}</p>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="
          w-12 h-12
          rounded-2xl
          bg-zinc-900
          border border-zinc-800
          flex items-center justify-center
          text-red-400
          hover:bg-red-500 hover:text-white
          transition-all
        "
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
}
