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

    <div className="max-w-4xl mx-auto pb-20">

      {/* HEADER */}

      <div
        className="

      h-56

      rounded-3xl

      bg-gradient-to-r
      from-zinc-900
      via-zinc-800
      to-zinc-900

      border border-zinc-800

    "
      />

      {/* CARD */}

      <div
        className="

      bg-zinc-900

      border border-zinc-800

      rounded-3xl

      p-10

      -mt-20

      relative z-20

      shadow-2xl

    "
      >

        {/* AVATAR */}

        <div className="flex items-center gap-6 mb-10">

          {
            avatar ? (

              <img
                src={URL.createObjectURL(avatar)}
                alt="avatar"
                className="

              w-32 h-32

              rounded-full

              object-cover

              border-4 border-black

            "
              />

            ) : user?.avatar ? (

              <img
                src={`http://127.0.0.1:8000/storage/${user.avatar}`}
                alt="avatar"
                className="

              w-32 h-32

              rounded-full

              object-cover

              border-4 border-black

            "
              />

            ) : (

              <div
                className="

              w-32 h-32

              rounded-full

              bg-zinc-800

              flex items-center justify-center

              text-white

              text-4xl

              font-bold

            "
              >

                {user?.name?.charAt(0)}

              </div>

            )
          }

          <div>

            <h1 className="text-3xl font-bold text-white">
              Edit Profile
            </h1>

            <p className="text-zinc-400 mt-2">
              Kelola informasi akunmu
            </p>

            <label
              className="

            inline-block

            mt-4

            px-5 py-2

            rounded-xl

            bg-zinc-800

            text-white

            cursor-pointer

            hover:bg-zinc-700

            transition

          "
            >

              Ganti Foto

              <input
                type="file"
                hidden
                onChange={(e: any) =>
                  setAvatar(
                    e.target.files[0]
                  )
                }
              />

            </label>

          </div>

        </div>

        {/* FORM */}

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="text-zinc-400 text-sm">
              Nama
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="

            w-full

            mt-2

            bg-zinc-800

            border border-zinc-700

            p-4

            rounded-2xl

            text-white

          "
            />

          </div>

          <div>

            <label className="text-zinc-400 text-sm">
              Program Studi
            </label>

            <input
              type="text"
              name="prodi"
              value={form.prodi}
              onChange={handleChange}
              className="

            w-full

            mt-2

            bg-zinc-800

            border border-zinc-700

            p-4

            rounded-2xl

            text-white

          "
            />

          </div>

          <div>

            <label className="text-zinc-400 text-sm">
              Angkatan
            </label>

            <input
              type="text"
              name="angkatan"
              value={form.angkatan}
              onChange={handleChange}
              className="

            w-full

            mt-2

            bg-zinc-800

            border border-zinc-700

            p-4

            rounded-2xl

            text-white

          "
            />

          </div>

        </div>

        {/* BIO */}

        <div className="mt-6">

          <label className="text-zinc-400 text-sm">
            Bio
          </label>

          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows={5}
            className="

          w-full

          mt-2

          bg-zinc-800

          border border-zinc-700

          p-4

          rounded-2xl

          text-white

        "
          />

        </div>

        {/* BUTTON */}

        <button
          onClick={handleUpdate}
          className="

        mt-8

        w-full

        bg-white

        text-black

        font-semibold

        py-4

        rounded-2xl

        hover:scale-[1.01]

        transition-all

      "
        >

          Simpan Perubahan

        </button>

      </div>

    </div>
  );
}