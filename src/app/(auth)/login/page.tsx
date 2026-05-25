"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { toast } from "sonner";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // AUTO REDIRECT JIKA SUDAH LOGIN
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.replace("/home");
    }
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await api.post("/login", form);

      const { token, user } = response.data;

      // SIMPAN TOKEN DI COOKIE (agar middleware bisa baca)
      // expires: 7 hari, bisa disesuaikan
      Cookies.set("token", token, { expires: 7 });

      // SIMPAN USER DI LOCALSTORAGE (untuk tampilan UI)
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login berhasil");

      // Redirect ke /home
      router.push("/home");
    } catch (error: any) {
      console.log(error);
      toast.error("Email atau password salah");
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
            Campus
            <br />
            Pulse
          </h1>
          <p className="text-zinc-400 mt-6 text-lg max-w-md">
            Smart Campus Social Platform untuk mahasiswa UMK.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-white">Welcome Back</h1>
          <p className="text-zinc-500 mt-3">Login untuk melanjutkan</p>

          <div className="space-y-5 mt-10">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-white"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-white"
            />
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-white text-black font-bold py-5 rounded-2xl hover:scale-[1.02] transition-all disabled:opacity-50"
            >
              {loading ? "Loading..." : "Login"}
            </button>

            <p className="text-zinc-500 text-center mt-6">
              Belum punya akun?
              <Link href="/register" className="text-white ml-2 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
