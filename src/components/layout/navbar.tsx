"use client";

export default function Navbar() {

  return (
    <div className="fixed top-0 left-72 right-0 h-24 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800 flex items-center justify-between px-10 z-40 ">

      <div>
        <h1 className="text-white font-semibold text-lg">
          Dashboard
        </h1>

        <p className="text-zinc-400 text-sm">
          Campus Pulse Platform
        </p>
      </div>

      <div className="w-10 h-10 rounded-full bg-zinc-800" />

    </div>
  );
}