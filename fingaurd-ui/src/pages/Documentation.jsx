import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Home,
  Upload,
  BarChart3,
  History,
  FileText,
  LogOut,
  BookOpen,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [active, setActive] = useState("home");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-slate-900 text-black dark:text-white">

      {/* ================= SIDEBAR ================= */}
      <div className="w-64 bg-white dark:bg-slate-800 p-5 shadow-lg relative">

        <h1 className="text-xl font-bold text-teal-500 mb-6">
          FinGuard
        </h1>

        <nav className="space-y-4">

          <div
            onClick={() => setActive("home")}
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${
              active === "home"
                ? "bg-teal-100 dark:bg-teal-500/20 text-teal-500"
                : "hover:bg-gray-200 dark:hover:bg-slate-700"
            }`}
          >
            <Home size={18} />
            Home
          </div>

          <div
            onClick={() => setActive("upload")}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer"
          >
            <Upload size={18} />
            Upload Data
          </div>

          <div
            onClick={() => setActive("docs")}
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer ${
              active === "docs"
                ? "bg-teal-100 dark:bg-teal-500/20 text-teal-500"
                : "hover:bg-gray-200 dark:hover:bg-slate-700"
            }`}
          >
            <FileText size={18} />
            Documentation
          </div>
        </nav>

        {/* LOGOUT */}
        <div className="absolute bottom-5 left-5 w-56">
          <button
            onClick={handleLogout}
            className="w-full bg-red-100 text-red-600 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 p-10 overflow-auto">

        {/* ================= HOME ================= */}
        {active === "home" && (
          <>
            <h1 className="text-3xl font-bold mb-6">
              Welcome to FinGuard
            </h1>

            <div className="bg-white dark:bg-slate-800 p-10 rounded-xl shadow-md text-center">
              <h2 className="text-xl font-semibold mb-4">
                Fraud Detection System
              </h2>

              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Analyze transactions and detect fraud in real-time.
              </p>
            </div>
          </>
        )}

        {/* ================= DOCUMENTATION ================= */}
        {active === "docs" && (
          <>
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold mb-2">
                Technical Documentation
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Access project documents and research
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

              {/* CARD 1 */}
              <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md text-center hover:shadow-[0_0_25px_#14b8a6] transition">

                <div className="bg-teal-500/20 p-4 rounded-full w-fit mx-auto mb-4">
                  <BookOpen className="text-teal-400" size={28} />
                </div>

                <h2 className="text-xl font-semibold mb-2">
                  Research Paper
                </h2>

                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Full research methodology and experiments.
                </p>

                <button className="px-4 py-2 bg-teal-500 text-white rounded-lg">
                  Open Document →
                </button>
              </div>

              {/* CARD 2 */}
              <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md text-center hover:shadow-[0_0_25px_#14b8a6] transition">

                <div className="bg-teal-500/20 p-4 rounded-full w-fit mx-auto mb-4">
                  <FileText className="text-teal-400" size={28} />
                </div>

                <h2 className="text-xl font-semibold mb-2">
                  Project Report
                </h2>

                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Complete system design and implementation.
                </p>

                <button className="px-4 py-2 bg-teal-500 text-white rounded-lg">
                  Open Document →
                </button>
              </div>

            </div>
          </>
        )}

      </div>
    </div>
  );
}