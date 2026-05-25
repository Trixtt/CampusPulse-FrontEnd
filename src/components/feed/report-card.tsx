"use client";

import api from "@/services/api";
import { useState } from "react";
import {
  MessageCircle,
  Heart,
  MapPin,
  AlertTriangle,
} from "lucide-react";

interface Props {
  avatar?: string;
  name: string;
  category: string;
  content: string;
  image?: string;
  comments?: any[];
  likes?: any[];
  postId: number;
  location?: string;
}

export default function ReportCard({
  avatar,
  name,
  category,
  content,
  image,
  comments,
  likes,
  postId,
  location,
}:

  Props) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(
    likes?.length || 0
  );
  const handleLike = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      await api.post("/likes", {
        user_id: user.id,
        post_id: postId,
      });

      setLiked(true);

      setLikeCount((prev) => prev + 1);

    } catch (error) {

      console.log(error);

    }
  };
  const [showComments, setShowComments] =
    useState(false);

  const [commentText, setCommentText] =
    useState("");

  const [commentList, setCommentList] =
    useState(comments || []);

  const handleComment = async () => {
    try {

      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      const response = await api.post(
        "/comments",
        {
          user_id: user.id,
          post_id: postId,
          content: commentText,
        }
      );

      setCommentList([
        ...commentList,
        response.data.comment
      ]);

      setCommentText("");

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 relative">

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">

          {
          avatar ? (

            <img
              src={`http://127.0.0.1:8000/storage/${avatar}`}
              alt="avatar"
              className="

              w-14 h-14

              rounded-full

              object-cover

            "
            />

          ) : (

            <div
              className="

              w-14 h-14

              rounded-full

              bg-zinc-700

              flex items-center justify-center

              text-white

              font-bold

            "
            >

              {name?.charAt(0)}

            </div>

          )
        }

          <div>

            <h1 className="text-white font-semibold text-lg">
              {name}
            </h1>

            <div className="flex items-center gap-2 mt-2">

              <span className="bg-red-500/20 text-red-400 text-xs px-3 py-1 rounded-full">
                {category}
              </span>

              <span className="bg-yellow-500/20 text-yellow-300 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                <AlertTriangle size={12} />
                Laporan
              </span>

            </div>

          </div>

        </div>

        <div className="flex items-center gap-2 text-zinc-400">
          <MapPin size={16} />

          <p className="text-sm">
            {location}
          </p>

        </div>

      </div>

      <div className="mt-6">

        <p className="text-zinc-200 leading-relaxed">
          {content}
        </p>

        {
          image && (
            <img
              src={`http://127.0.0.1:8000/storage/${image}`}
              alt="report"
              className="w-full rounded-2xl mt-5"
            />
          )
        }

      </div>

      <div className="flex items-center gap-6 mt-6 pt-4 border-t border-zinc-800 text-zinc-400">

        <button
          type="button"
          onClick={handleLike}
          className={`

          flex items-center gap-2

          px-4 py-2

          rounded-xl

          transition-all duration-300

          ${liked
              ? "bg-red-500/20 text-red-400"
              : "hover:bg-zinc-800 text-zinc-400 hover:text-white"
            }

        `}
        >
          <Heart size={18} />

          {likeCount}
        </button>

        <button
          type="button"
          onClick={() =>
            setShowComments(!showComments)
          }
          className="

          flex items-center gap-2
          px-4 py-2
          rounded-xl
          hover:bg-zinc-800
          hover:text-white
          transition-all duration-300

        "
        >
          <MessageCircle size={18} />

          {commentList.length}
        </button>

      </div>

      {
        showComments && (

          <div className="mt-6 border-t border-zinc-800 pt-6">

            <h1 className="text-white font-semibold text-xl mb-5">
              Komentar ({commentList.length})
            </h1>

            {/* Input Comment */}

            <div className="flex gap-4 items-start">

              <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center text-white font-bold text-lg">
                {name?.charAt(0)}
              </div>

              <div className="flex-1 flex gap-3">

                <input
                  type="text"
                  placeholder="Tulis tanggapan..."
                  value={commentText}
                  onChange={(e) =>
                    setCommentText(e.target.value)
                  }
                  className="

                  flex-1

                  bg-zinc-800
                  border border-zinc-700

                  rounded-2xl

                  px-5 py-4

                  text-white

                  focus:outline-none
                  focus:ring-2
                  focus:ring-white/10

                "
                />

                <button
                  onClick={handleComment}
                  className="

                  bg-white
                  text-black

                  px-7

                  rounded-2xl

                  font-semibold

                  hover:scale-105

                  transition-all duration-300

                "
                >
                  Kirim
                </button>

              </div>

            </div>

            {/* Comment List */}

            <div className="space-y-4 mt-6">

              {
                commentList.map(
                  (comment: any, index) => (

                    <div
                      key={index}
                      className="

                      flex gap-4

                    "
                    >

                      {/* Avatar */}

                      <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center text-white font-bold text-lg">
                        {
                          comment.user?.name
                            ?.charAt(0)
                        }
                      </div>

                      {/* Content */}

                      <div
                        className="

                        flex-1

                        bg-zinc-800

                        rounded-3xl

                        p-5

                      "
                      >

                        <div className="flex items-center justify-between">

                          <div className="flex items-center gap-3">

                            <h1 className="text-white font-semibold">
                              {comment.user?.name}
                            </h1>

                            <p className="text-zinc-500 text-sm">
                              baru saja
                            </p>

                          </div>

                          <button className="text-zinc-500 hover:text-red-400 transition">

                            <Heart size={18} />

                          </button>

                        </div>

                        <p className="text-zinc-200 mt-3 leading-relaxed">
                          {comment.content}
                        </p>

                        <button
                          className="

                          mt-4

                          text-zinc-400
                          hover:text-white

                          text-sm

                          transition

                        "
                        >
                          Balas
                        </button>

                      </div>

                    </div>

                  )
                )
              }

            </div>

          </div>

        )
      }

    </div>
  );
}