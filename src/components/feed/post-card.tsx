"use client";

import {
  Heart,
  MessageCircle,
  Share,
} from "lucide-react";

import CommentSection from "./comment-section";
import api from "@/services/api";

interface Props {
  postId: number;
  name: string;
  category: string;
  content: string;
  image?: string;
  comments?: any[];
  likes?: any[];
}

export default function PostCard({
  postId,
  name,
  category,
  content,
  image,
  comments,
  likes
}: Props) {

    const handleLike = async () => {

        try {

            const user = JSON.parse(
            localStorage.getItem("user") || "{}"
            );

            await api.post("/likes/toggle", {
            post_id: postId,
            user_id: user.id,
            });

            window.location.reload();

        } catch (error) {

            console.log(error);
        }
        };

    return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">

      <div className="flex items-center gap-3">

        <div className="w-12 h-12 rounded-full bg-zinc-700" />

        <div>
          <h1 className="text-white font-semibold">
            {name}
          </h1>

          <p className="text-zinc-400 text-sm">
            {category}
          </p>
        </div>

      </div>

      <div className="mt-5">
        <p className="text-zinc-200 leading-relaxed">
            {content}
        </p>

        {
            image && (
            <img
                src={`http://127.0.0.1:8000/storage/${image}`}
                alt="post"
                className="w-full rounded-2xl mt-5"
            />
            )
        }

        {
        comments?.map((comment, index) => (

            <div
            key={index}
            className="mt-4 bg-zinc-800 rounded-xl p-3"
            >

            <h1 className="text-white font-semibold text-sm">
                {comment.user.name}
            </h1>

            <p className="text-zinc-300 text-sm mt-1">
                {comment.content}
            </p>

            </div>

        ))
        }

        </div>

      <div className="flex gap-8 mt-5 text-zinc-400">

        <button
        onClick={handleLike}
        className="flex items-center gap-2 hover:text-white transition"
        >
          <Heart size={18} />
          {likes?.length || 0} Likes
        </button>

        <button className="flex items-center gap-2 hover:text-white transition">
          <MessageCircle size={18} />
          Comment
        </button>

        <button className="flex items-center gap-2 hover:text-white transition">
          <Share size={18} />
          Share
        </button>

      </div>

      <CommentSection postId={postId} />

    </div>
  );
}