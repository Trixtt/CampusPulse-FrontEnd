"use client";

import { useState } from "react";
import api from "@/services/api";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    nim: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();

    try {
      const response = await api.post("/register", form);

      alert(response.data.message);

      console.log(response.data);
    } catch (error: any) {
      console.log(error.response.data);
      alert("Register gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="w-[400px] p-6 shadow-lg rounded-xl space-y-4"
      >
        <h1 className="text-2xl font-bold">Register</h1>

        <input
          type="text"
          name="name"
          placeholder="Nama"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="nim"
          placeholder="NIM"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}