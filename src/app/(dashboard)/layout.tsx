import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (

        <div className="flex bg-black min-h-screen">

            <Sidebar />

            <div className="flex-1 ml-72 pt-24">

                <Navbar />

                <main className="p-8">

                    {children}

                </main>

            </div>

        </div>

    );
}