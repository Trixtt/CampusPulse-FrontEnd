"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import api from "@/services/api";

export default function ReportDetailPage() {

  const params = useParams();

  const [post, setPost] = useState<any>(null);

  useEffect(() => {

    fetchPost();

  }, []);

  const fetchPost = async () => {

    try {

      const response = await api.get(
        `/posts/${params.id}`
      );

      setPost(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  if (!post) {

    return (
      <div className="text-white">
        Loading...
      </div>
    );
  }

  return (

    <div className="max-w-4xl">

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

        <h1 className="text-3xl font-bold text-white">
          {post.category}
        </h1>

        <p className="text-zinc-400 mt-2">
          {post.location}
        </p>

        <p className="text-zinc-200 mt-6 leading-relaxed">
          {post.content}
        </p>

        {
          post.image && (
            <img
              src={`http://127.0.0.1:8000/storage/${post.image}`}
              className="w-full rounded-2xl mt-6"
            />
          )
        }

      </div>

    </div>

  );
}