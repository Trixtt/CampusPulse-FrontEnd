"use client";

import { useEffect, useState, useRef } from "react";
import api from "@/services/api";
import { useParams } from "next/navigation";

export default function ChatPage() {

  const params = useParams();

  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  // sementara hardcode receiver
  const receiverId = params.id;

  const [currentUser, setCurrentUser] = useState<any>(null);

  const bottomRef = useRef<any>(null);

  const fetchMessages = async () => {

    if (!currentUser) return;

    try {

      const response = await api.get(
        `/messages/${currentUser.id}/${receiverId}`
      );

      setMessages(response.data);

    } catch (error) {

      console.log(error);
    }
  };

    useEffect(() => {
    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    setCurrentUser(user);

    }, []);

    useEffect(() => {
    if (!currentUser) return;

    fetchMessages();

    const interval = setInterval(() => {

        fetchMessages();

    }, 1000);

    return () => clearInterval(interval);

    }, [currentUser]);

    useEffect(() => {
    bottomRef.current?.scrollIntoView({
        behavior: "smooth",
    });

    }, [messages]);
    

  const handleSend = async () => {

    if (!currentUser) return;

    try {

      await api.post("/messages/send", {
        sender_id: currentUser.id,
        receiver_id: receiverId,
        message,
      });

      setMessage("");

      fetchMessages();

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

        <h1 className="text-2xl font-bold text-white mb-6">
          Chat
        </h1>

        <div className="space-y-4 h-[500px] overflow-y-auto">

          {
            messages.map((msg, index) => (

              <div
                key={index}
                className={`p-4 rounded-2xl max-w-[70%] ${
                  msg.sender_id === currentUser.id
                    ? "bg-blue-600 ml-auto text-white"
                    : "bg-zinc-800 text-white"
                }`}
              >
                {msg.message}
              </div>

            ))
          }
          <div ref={bottomRef} />

        </div>

        <div className="flex gap-3 mt-6">

          <input
            type="text"
            placeholder="Tulis pesan..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-zinc-800 rounded-xl p-4 text-white"
          />

          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-500 transition px-6 rounded-xl text-white"
          >
            Kirim
          </button>

        </div>

      </div>

    </div>
  );
}