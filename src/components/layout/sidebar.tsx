"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import api from "@/services/api";
import {
  Home,
  Bell,
  Users,
  CircleAlert,
  MessageSquare,
  User,
  Search,
  MessageCircle,
  Shield,
} from "lucide-react";

export default function Sidebar() {

  const [unreadCount, setUnreadCount] = useState(0);

  const [user, setUser] = useState<any>(null);

  const fetchUnread = async () => {

      try {

        const user = JSON.parse(
          localStorage.getItem("user") || "{}"
        );

        const response = await api.get(
          `/chat/unread/${user.id}`
        );

        setUnreadCount(
          response.data.count
        );

      } catch (error) {

        console.log(error);

      }
    };

  useEffect(() => {

    const data = localStorage.getItem("user");

    if (data) {
      setUser(JSON.parse(data));
    }

    fetchUnread();

  }, []);

  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 w-72 h-screen bg-zinc-950 border-r border-zinc-800 p-5 overflow-y-auto z-50">

      <h1 className="text-2xl font-bold text-white mb-10">
        Campus Pulse
      </h1>

      <div className="space-y-2">

        <Link
          href="/home"
          className={`

        flex items-center gap-4

        px-4 py-3

        rounded-2xl

        transition-all
        duration-300

        ${pathname === "/home"
              ? "bg-white text-black shadow-lg"
              : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
            }

        `}
        >
          <Home size={20} />
          Home
        </Link>

        <Link
          href="/rooms"
          className={`

        flex items-center gap-4

        px-4 py-3

        rounded-2xl

        transition-all
        duration-300

        ${pathname === "/rooms"
              ? "bg-white text-black shadow-lg"
              : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
            }

        `}
        >
          <Users size={20} />
          Global Room
        </Link>

        <Link
          href="/chat"
          className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-zinc-900 text-zinc-300 hover:text-white transition"
        >

          <div className="flex items-center gap-3">

            <div className="relative">

              <MessageCircle size={20} />

              {
                unreadCount > 0 && (

                  <div
                    className="

                    absolute

                    -top-2 -right-2

                    min-w-[20px]
                    h-5

                    px-1

                    rounded-full

                    bg-red-500

                    text-white

                    text-xs

                    flex items-center justify-center

                  "
                  >

                    {unreadCount}

                  </div>

                )
              }

            </div>

            Chat

          </div>

        </Link>

        <Link
          href="/search"
          className={`
          flex items-center gap-4
          px-4 py-3
          rounded-2xl
          transition-all
          duration-300
          ${pathname === "/search"
              ? "bg-white text-black shadow-lg"
              : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
            }
        `}
        >
          <Search size={20} />
          Search
        </Link>

        <Link
          href="/notifications"
          className={`
            flex items-center gap-4
            px-4 py-3
            rounded-2xl
            transition-all
            duration-300
            ${pathname === "/notifications"
              ? "bg-white text-black shadow-lg"
              : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
            }
          `}
        >
          <Bell size={20} />
          Notifications
        </Link>

        <Link
          href="/profile"
          className={`
            flex items-center gap-4
            px-4 py-3
            rounded-2xl
            transition-all
            duration-300
            ${pathname === "/profile"
              ? "bg-white text-black shadow-lg"
              : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
            }
          `}
        >
          <User size={20} />
          Profile
        </Link>


        {
          user?.role === "admin" && (
            <Link
              href="/admin"
              className={`
              flex items-center gap-4
              px-4 py-3
              rounded-2xl
              transition-all
              duration-300
              ${pathname === "/admin"
                  ? "bg-white text-black shadow-lg"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }
            `}
            >
              <Shield size={20} />
              Admin
            </Link>
          )
        }

      </div>
    </div>
  );
}