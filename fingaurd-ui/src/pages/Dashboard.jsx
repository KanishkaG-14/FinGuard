import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Home,
  Upload,
  BarChart3,
  History,
  FileText,
  LogOut,
  Bot,
} from "lucide-react";

import DocumentationContent from "../components/DocumentationContent";
import UploadContent from "../components/UploadContent";

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [active, setActive] = useState("home");

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/");
      return;
    }

    const tab = searchParams.get("tab");

    if (tab === "upload") {
      setActive("upload");
      window.history.replaceState({}, "", "/dashboard");
    }
  }, [navigate, searchParams]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-slate-900 text-black dark:text-white transition-all duration-500">

      {/* SIDEBAR */}
      <div className="w-64 bg-white dark:bg-slate-800 p-5 shadow-lg relative">

        <h1 className="text-xl font-bold text-primary mb-6 hover:drop-shadow-[0_0_10px_#3b82f6] transition">
          FinGuard
        </h1>

        <nav className="space-y-4">

          {/* HOME */}
          <div
            onClick={() => setActive("home")}
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition hover:shadow-[0_0_10px_#3b82f6]
              ${
                active === "home"
                  ? "bg-primary/20 text-primary"
                  : "hover:bg-gray-200 dark:hover:bg-slate-700"
              }`}
          >
            <Home size={18} />
            Home
          </div>

          {/* UPLOAD */}
          <div
            onClick={() => setActive("upload")}
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition hover:shadow-[0_0_10px_#3b82f6]
              ${
                active === "upload"
                  ? "bg-primary/20 text-primary"
                  : "hover:bg-gray-200 dark:hover:bg-slate-700"
              }`}
          >
            <Upload size={18} />
            Upload Transaction Data
          </div>

          {/* FRAUD ANALYTICS */}
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer hover:shadow-[0_0_10px_#3b82f6] transition">
            <BarChart3 size={18} />
            Fraud Analytics
          </div>

          {/* HISTORY */}
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer hover:shadow-[0_0_10px_#3b82f6] transition">
            <History size={18} />
            History
          </div>

          {/* CHATBOT */}
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer hover:shadow-[0_0_10px_#3b82f6] transition">
            <Bot size={18} />
            Chatbot
          </div>

          {/* DOCUMENTATION */}
          <div
            onClick={() => setActive("docs")}
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition hover:shadow-[0_0_10px_#3b82f6]
              ${
                active === "docs"
                  ? "bg-primary/20 text-primary"
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
            className="w-full flex items-center justify-center gap-2 bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200 hover:shadow-[0_0_10px_red] transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-10 overflow-y-auto">

        {active === "home" && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">
                Welcome to FinGuard
              </h1>

              <div className="text-sm text-gray-500 dark:text-gray-300">
                Fraud Detection System
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-10 rounded-xl shadow-md text-center hover:shadow-[0_0_20px_#3b82f6] transition">

              <h2 className="text-xl font-semibold mb-4">
                Graph-Based Fraud Detection Model
              </h2>

              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Analyze financial transactions using hybrid AI models to detect
                anomalies and prevent fraud in real-time.
              </p>

              <button
                onClick={() => setActive("upload")}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:shadow-[0_0_15px_#3b82f6] transition"
              >
                Get Started →
              </button>
            </div>
          </>
        )}

        {active === "upload" && <UploadContent />}
        {active === "docs" && <DocumentationContent />}
      </div>
    </div>
  );
}