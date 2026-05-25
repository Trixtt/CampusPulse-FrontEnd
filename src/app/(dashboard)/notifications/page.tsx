"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

import {
  Heart,
  MessageCircle,
} from "lucide-react";

export default function NotificationsPage() {

  const [notifications, setNotifications] =
    useState<any[]>([]);

  useEffect(() => {

    fetchNotifications();

  }, []);

  const fetchNotifications = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      const response = await api.get(
        `/notifications/${user.id}`
      );

      setNotifications(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="max-w-3xl mx-auto">

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-white">
          Notifications
        </h1>

        <p className="text-zinc-500 mt-2">
          Aktivitas terbaru pada postinganmu
        </p>

      </div>

      {/* NOTIFICATION LIST */}

      <div className="space-y-4">

        {
          notifications.map((notif) => (

            <div
              key={notif.id}
              onClick={() =>
                window.location.href = "/home"
              }
              className="

              bg-zinc-900

              border border-zinc-800

              rounded-3xl

              p-5

              flex items-center gap-5

              cursor-pointer

              hover:bg-zinc-800

              transition-all duration-300

            "
            >

              {/* ICON */}

              <div
                className="

                w-14 h-14

                rounded-full

                bg-zinc-800

                flex items-center justify-center

              "
              >

                {
                  notif.type == "like"
                  ? (
                    <Heart
                      size={22}
                      className="text-red-500"
                    />
                  )
                  : (
                    <MessageCircle
                      size={22}
                      className="text-blue-400"
                    />
                  )
                }

              </div>

              {/* CONTENT */}

              <div className="flex-1">

                <h1 className="text-white font-semibold">

                  {notif.from_user?.name}

                  {
                    notif.type == "like"
                      ? " menyukai postinganmu"
                      : " mengomentari postinganmu"
                  }

                </h1>

                <p className="text-zinc-500 text-sm mt-1">
                  {notif.post?.content}
                </p>

                <p className="text-zinc-500 text-sm mt-1">
                  Tekan untuk melihat postingan
                </p>

              </div>

            </div>

          ))
        }

      </div>

    </div>
  );
}