"use client";

import {
  Pie,
  Bar,
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const ReportMap = dynamic(
  () => import("@/components/admin/report-map"),
  {
    ssr: false,
  }
);

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function AdminPage() {

  const router = useRouter();

  const [posts, setPosts] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    if (user.role !== "admin") {

        router.push("/home");

        return;
    }

    fetchData();

    }, []);

  const fetchData = async () => {

    try {

      const postsResponse = await api.get("/posts");

      setPosts(postsResponse.data);

      const analyticsResponse = await api.get(
        "/reports/analytics"
        );

        setAnalytics(analyticsResponse.data);

    } catch (error) {

      console.log(error);
    }
    
  };

  const handleDelete = async (id: number) => {
    try {

        await api.delete(`/posts/${id}`);

        alert("Posting berhasil dihapus");

        fetchData();

    } catch (error) {

        console.log(error);

        alert("Gagal menghapus posting");
    }
    };

    const handleUpdateStatus = async (
        id: number,
        status: string,
        priority: string,
        verification: string
        ) => {

        try {

            await api.put(`/posts/${id}/status`, {
            status,
            priority,
            verification
            });

            alert("Laporan diperbarui");

            fetchData();

        } catch (error) {

            console.log(error);
        }
        };
    
    const pieData = {
        labels: [
            "Fasilitas",
            "Keamanan",
        ],

        datasets: [
            {
            data: [
                analytics?.facility_reports || 0,
                analytics?.security_reports || 0,
            ],
            },
        ],
        };

    const barData = {
    labels: [
        "Pending",
        "Completed",
    ],

    datasets: [
        {
        label: "Reports",
        data: [
            analytics?.pending_reports || 0,
            analytics?.completed_reports || 0,
        ],
        },
    ],
    };

  

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold text-white">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-5">

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

            <h1 className="text-4xl font-bold text-white">
            {analytics?.total_reports || 0}
            </h1>

            <p className="text-zinc-400 mt-2">
            Total Reports
            </p>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

            <h1 className="text-4xl font-bold text-yellow-400">
            {analytics?.pending_reports || 0}
            </h1>

            <p className="text-zinc-400 mt-2">
            Pending Reports
            </p>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

            <h1 className="text-4xl font-bold text-green-400">
            {analytics?.completed_reports || 0}
            </h1>

            <p className="text-zinc-400 mt-2">
            Completed Reports
            </p>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

            <h1 className="text-2xl font-bold text-white mb-6">
                Campus Report Map
            </h1>

            <ReportMap posts={posts} />

        </div>

        </div>

    <div className="grid grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

            <h1 className="text-xl font-bold text-white mb-6">
            Report Categories
            </h1>

            <Pie data={pieData} />

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

            <h1 className="text-xl font-bold text-white mb-6">
            Report Status
            </h1>

            <Bar data={barData} />

        </div>

    </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

        <h1 className="text-xl font-semibold text-white mb-5">
          Semua Posting
        </h1>

        <div className="space-y-4">

          {
            posts.map((post, index) => (

              <div
                key={index}
                className="bg-zinc-800 rounded-xl p-4"
              >

                <h1 className="text-white font-semibold">
                  {post.user.name}
                </h1>

                <p className="text-zinc-300 mt-2">
                  {post.content}
                </p>

                <div className="flex gap-3 mt-4">
                <select
                    defaultValue={post.status}
                    onChange={(e) =>
                    handleUpdateStatus(
                        post.id,
                        e.target.value,
                        post.priority,
                        post.verification
                    )
                    }
                    className="bg-zinc-700 text-white rounded-lg px-3 py-2"
                >

                    <option value="Pending">
                    Pending
                    </option>

                    <option value="Diproses">
                    Diproses
                    </option>

                    <option value="Selesai">
                    Selesai
                    </option>

                    <option value="Ditolak">
                    Ditolak
                    </option>

                </select>

                <select
                defaultValue={post.verification}
                onChange={(e) =>
                    handleUpdateStatus(
                    post.id,
                    post.status,
                    post.priority,
                    e.target.value
                    )
                }
                className="bg-zinc-700 text-white rounded-lg px-3 py-2"
                >

                <option value="Unverified">
                    Unverified
                </option>

                <option value="Verified">
                    Verified
                </option>

                <option value="Fake Report">
                    Fake Report
                </option>

                </select>

                <select
                    defaultValue={post.priority}
                    onChange={(e) =>
                    handleUpdateStatus(
                        post.id,
                    post.status,
                    e.target.value,
                    post.verification
                    )
                    }
                    className="bg-zinc-700 text-white rounded-lg px-3 py-2"
                >

                    <option value="Low">
                    Low
                    </option>

                    <option value="Medium">
                    Medium
                    </option>

                    <option value="High">
                    High
                    </option>

                    <option value="Urgent">
                    Urgent
                    </option>

                </select>

                </div>

                <button
                onClick={() => handleDelete(post.id)}
                className="mt-4 bg-red-600 hover:bg-red-500 transition px-4 py-2 rounded-xl text-white"
                >
                Delete Post
                </button>

              </div>

            ))
          }

        </div>

      </div>

    </div>
  );
}