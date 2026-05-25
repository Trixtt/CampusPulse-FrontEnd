"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

export default function NotificationsPage() {

  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {

    const fetchNotifications = async () => {

      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      const response = await api.get(
        `/notifications/${user.id}`
      );

      setNotifications(response.data);
    };

    fetchNotifications();

  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-5">

      <h1 className="text-3xl font-bold text-white">
        Notifications
      </h1>

      {
        notifications.map((notification, index) => (

          <div
            key={index}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
          >

            <p className="text-white">
              {notification.message}
            </p>

          </div>

        ))
      }

    </div>
  );
}