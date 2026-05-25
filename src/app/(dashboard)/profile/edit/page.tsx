"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

export default function EditProfilePage() {

  const [user, setUser] = useState<any>(null);

  const [form, setForm] = useState({
    name: "",
    prodi: "",
    angkatan: "",
    bio: "",
  });

  const [avatar, setAvatar] = useState<any>(null);

  useEffect(() => {

    const data = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    setUser(data);

    setForm({
      name: data.name || "",
      prodi: data.prodi || "",
      angkatan: data.angkatan || "",
      bio: data.bio || "",
    });

  }, []);

  const handleChange = (e: any) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {

    try {

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("prodi", form.prodi);
      formData.append("angkatan", form.angkatan);
      formData.append("bio", form.bio);

      if (avatar) {
        formData.append("avatar", avatar);
      }

      const response = await api.post(
        `/profile/update/${user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      window.location.href = "/profile";

      alert("Profile berhasil diupdate");

    } catch (error) {

      console.log(error);

      alert("Gagal update profile");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-white mb-8">
          Edit Profile
        </h1>

        <div className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Nama"
            value={form.name}
            onChange={handleChange}
            className="w-full bg-zinc-800 p-4 rounded-xl text-white"
          />

          <input
            type="text"
            name="prodi"
            placeholder="Program Studi"
            value={form.prodi}
            onChange={handleChange}
            className="w-full bg-zinc-800 p-4 rounded-xl text-white"
          />

          <input
            type="text"
            name="angkatan"
            placeholder="Angkatan"
            value={form.angkatan}
            onChange={handleChange}
            className="w-full bg-zinc-800 p-4 rounded-xl text-white"
          />

          <textarea
            name="bio"
            placeholder="Bio"
            value={form.bio}
            onChange={handleChange}
            className="w-full bg-zinc-800 p-4 rounded-xl text-white"
          />

          <input
            type="file"
            onChange={(e: any) =>
              setAvatar(e.target.files[0])
            }
            className="text-white"
          />

          <button
            onClick={handleUpdate}
            className="bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-xl text-white"
          >
            Simpan Perubahan
          </button>

        </div>

      </div>

    </div>
  );
}