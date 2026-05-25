"use client";

import {
  Heart,
  MessageCircle,
  Flame,
  Users,
  Share,
} from "lucide-react";

interface Props {
  name: string;
  category: string;
  content: string;
  image?: string;
  comments?: any[];
  likes?: any[];
}

export default function DiscussionCard({
  name,
  category,
  content,
  image,
  comments,
  likes,
}: Props) {

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-zinc-700 transition">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />

          <div>

            <h1 className="text-white font-semibold text-lg">
              {name}
            </h1>

            <div className="flex items-center gap-2 mt-2">

              <span className="bg-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-full">
                {category}
              </span>

              <span className="bg-purple-500/20 text-purple-300 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                <Users size={12} />
                Community
              </span>

            </div>

          </div>

        </div>

        <Flame
          size={20}
          className="text-orange-400"
        />

      </div>

      <div className="mt-6">

        <p className="text-zinc-200 leading-relaxed">
          {content}
        </p>

        {
          image && (
            <img
              src={`http://127.0.0.1:8000/storage/${image}`}
              alt="discussion"
              className="w-full rounded-2xl mt-5"
            />
          )
        }

      </div>

      <div className="flex gap-8 mt-6 text-zinc-400">

        <button className="flex items-center gap-2 hover:text-pink-400 transition">

          <Heart size={18} />

          {likes?.length || 0}

        </button>

        <button className="flex items-center gap-2 hover:text-cyan-400 transition">

          <MessageCircle size={18} />

          {comments?.length || 0}

        </button>

        <button className="flex items-center gap-2 hover:text-white transition">

          <Share size={18} />

          Share

        </button>

      </div>

    </div>
  );
}