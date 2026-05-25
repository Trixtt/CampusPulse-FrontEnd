"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import CreatePost from "@/components/feed/create-post";
import ReportCard from "@/components/feed/report-card";


export default function HomePage() {

  const [posts, setPosts] = useState<any[]>([]);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");

  const fetchPosts = async () => {

    try {

      const response = await api.get(
        `/posts?type=report
        &category=${category}
        &status=${status}
        &location=${location}
        &search=${search}`
      );

      setPosts(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchPosts();

  }, [category,
    status,
    location,
    search]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      <CreatePost />

      <div className="grid grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Cari laporan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white"
        >

          <option value="">
            Semua Laporan
          </option>

          <option value="Fasilitas">
            Fasilitas
          </option>

          <option value="Keamanan">
            Keamanan
          </option>

          <option value="Kebersihan">
            Kebersihan
          </option>

          <option value="Akademik">
            Akademik
          </option>

          <option value="Parkir">
            Parkir
          </option>

        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white"
        >

          <option value="">
            Semua Status
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Diproses">
            Diproses
          </option>

          <option value="Selesai">
            Selesai
          </option>

        </select>

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-white"
        >

          <option value="">
            Semua Lokasi
          </option>

          <option value="Gedung A">
            Gedung A
          </option>

          <option value="Gedung B">
            Gedung B
          </option>

          <option value="Perpustakaan">
            Perpustakaan
          </option>

          <option value="Parkiran Timur">
            Parkiran Timur
          </option>

          <option value="Lab Komputer">
            Lab Komputer
          </option>

          <option value="Kantin">
            Kantin
          </option>

        </select>

      </div>

      {posts.map((post) => (

        <ReportCard
          key={post.id}
          postId={post.id}
          name={post.user.name}
          avatar={post.user.avatar}
          category={post.category}
          content={post.content}
          image={post.image}
          comments={post.comments}
          likes={post.likes}
          location={post.location}
        />

      ))}

    </div>
  );
}