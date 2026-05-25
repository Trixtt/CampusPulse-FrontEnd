"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

import ReportCard from "@/components/feed/report-card";

import CreatePost from "@/components/feed/create-post";

export default function GlobalRoomPage() {

  const [posts, setPosts] = useState<any[]>([]);

  const fetchPosts = async () => {

    try {

      const response = await api.get(
        "/posts?type=discussion"
      );

      setPosts(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchPosts();

  }, []);

  return (

    <div className="max-w-3xl mx-auto space-y-6">

      {/* HEADER */}

      <div>

        <h1 className="text-3xl font-bold text-white">
          Global Room
        </h1>

        <p className="text-zinc-500 mt-2">
          Diskusi dan interaksi mahasiswa kampus
        </p>

      </div>

      {/* CREATE POST */}

      <CreatePost type="discussion" />

      {/* POSTS */}

      {
        posts.map((post) => (

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

        ))
      }

    </div>

  );
}