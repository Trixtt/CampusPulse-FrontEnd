"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

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

  const [user, setUser] = useState<any>(null);

  useEffect(() => {

    const data = localStorage.getItem("user");

    if (data) {
      setUser(JSON.parse(data));
    }

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
          className={`
          flex items-center gap-4
          px-4 py-3
          rounded-2xl
          transition-all
          duration-300
          ${pathname === "/chat"
              ? "bg-white text-black shadow-lg"
              : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
            }
        `}
        >
          <MessageCircle size={20} />
          Chat
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