"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    nim: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();

    if (!form.email.endsWith("@std.umk.ac.id")) {
      toast.error("Gunakan email kampus UMK");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/register", form);

      toast.success(response.data.message);

      // Redirect ke login setelah register berhasil
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error("Register gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black grid lg:grid-cols-2">
      {/* LEFT */}
      <div
        className="
        hidden lg:flex
        items-center justify-center
        bg-gradient-to-br from-zinc-900 via-black to-zinc-950
        border-r border-zinc-800
        p-16
      "
      >
        <div>
          <h1 className="text-6xl font-black text-white leading-tight">
            Join
            <br />
            Campus Pulse
          </h1>
          <p className="text-zinc-400 mt-6 text-lg max-w-md">
            Platform sosial mahasiswa modern untuk berbagi laporan, diskusi, dan
            interaksi kampus.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center p-10">
        <form onSubmit={handleRegister} className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-white">Create Account</h1>
          <p className="text-zinc-500 mt-3">Gunakan email kampus UMK</p>

          <div className="space-y-5 mt-10">
            <input
              type="text"
              name="name"
              placeholder="Nama Lengkap"
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-white"
            />
            <input
              type="text"
              name="nim"
              placeholder="NIM"
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-white"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Kampus"
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-white"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-bold py-5 rounded-2xl hover:scale-[1.02] transition-all disabled:opacity-50"
            >
              {loading ? "Loading..." : "Register"}
            </button>

            <p className="text-zinc-500 text-center">
              Sudah punya akun?
              <Link href="/login" className="text-white ml-2 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
