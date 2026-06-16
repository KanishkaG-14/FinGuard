// import { useNavigate, useSearchParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import {
//   Home,
//   Upload,
//   BarChart3,
//   History,
//   FileText,
//   LogOut,
//   Bot,
// } from "lucide-react";

// import DocumentationContent from "../components/DocumentationContent";
// import UploadContent from "../components/UploadContent";

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   const [active, setActive] = useState("home");

//   useEffect(() => {
//     const user = localStorage.getItem("user");

//     if (!user) {
//       navigate("/");
//       return;
//     }

//     const tab = searchParams.get("tab");

//     if (tab === "upload") {
//       setActive("upload");
//       window.history.replaceState({}, "", "/dashboard");
//     }
//   }, [navigate, searchParams]);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   return (
//     <div className="flex h-screen bg-gray-100 dark:bg-slate-900 text-black dark:text-white transition-all duration-500">

//       {/* SIDEBAR */}
//       <div className="w-64 bg-white dark:bg-slate-800 p-5 shadow-lg relative">

//         <h1 className="text-xl font-bold text-primary mb-6 hover:drop-shadow-[0_0_10px_#3b82f6] transition">
//           FinGuard
//         </h1>

//         <nav className="space-y-4">

//           {/* HOME */}
//           <div
//             onClick={() => setActive("home")}
//             className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition hover:shadow-[0_0_10px_#3b82f6]
//               ${
//                 active === "home"
//                   ? "bg-primary/20 text-primary"
//                   : "hover:bg-gray-200 dark:hover:bg-slate-700"
//               }`}
//           >
//             <Home size={18} />
//             Home
//           </div>

//           {/* UPLOAD */}
//           <div
//             onClick={() => setActive("upload")}
//             className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition hover:shadow-[0_0_10px_#3b82f6]
//               ${
//                 active === "upload"
//                   ? "bg-primary/20 text-primary"
//                   : "hover:bg-gray-200 dark:hover:bg-slate-700"
//               }`}
//           >
//             <Upload size={18} />
//             Upload Transaction Data
//           </div>

//           {/* FRAUD ANALYTICS */}
//           <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer hover:shadow-[0_0_10px_#3b82f6] transition">
//             <BarChart3 size={18} />
//             Fraud Analytics
//           </div>

//           {/* HISTORY */}
//           <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer hover:shadow-[0_0_10px_#3b82f6] transition">
//             <History size={18} />
//             History
//           </div>

//           {/* CHATBOT */}
//           <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 cursor-pointer hover:shadow-[0_0_10px_#3b82f6] transition">
//             <Bot size={18} />
//             Chatbot
//           </div>

//           {/* DOCUMENTATION */}
//           <div
//             onClick={() => setActive("docs")}
//             className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition hover:shadow-[0_0_10px_#3b82f6]
//               ${
//                 active === "docs"
//                   ? "bg-primary/20 text-primary"
//                   : "hover:bg-gray-200 dark:hover:bg-slate-700"
//               }`}
//           >
//             <FileText size={18} />
//             Documentation
//           </div>
//         </nav>

//         {/* LOGOUT */}
//         <div className="absolute bottom-5 left-5 w-56">
//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center justify-center gap-2 bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200 hover:shadow-[0_0_10px_red] transition"
//           >
//             <LogOut size={18} />
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="flex-1 p-10 overflow-y-auto">

//         {active === "home" && (
//           <>
//             <div className="flex justify-between items-center mb-8">
//               <h1 className="text-3xl font-bold">
//                 Welcome to FinGuard
//               </h1>

//               <div className="text-sm text-gray-500 dark:text-gray-300">
//                 Fraud Detection System
//               </div>
//             </div>

//             <div className="bg-white dark:bg-slate-800 p-10 rounded-xl shadow-md text-center hover:shadow-[0_0_20px_#3b82f6] transition">

//               <h2 className="text-xl font-semibold mb-4">
//                 Graph-Based Fraud Detection Model
//               </h2>

//               <p className="text-gray-500 dark:text-gray-400 mb-6">
//                 Analyze financial transactions using hybrid AI models to detect
//                 anomalies and prevent fraud in real-time.
//               </p>

//               <button
//                 onClick={() => setActive("upload")}
//                 className="px-6 py-3 bg-primary text-white rounded-lg hover:shadow-[0_0_15px_#3b82f6] transition"
//               >
//                 Get Started →
//               </button>
//             </div>
//           </>
//         )}

//         {active === "upload" && <UploadContent />}
//         {active === "docs" && <DocumentationContent />}
//       </div>
//     </div>
//   );
// }






























//NEW
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  Upload,
  BarChart3,
  Table,
  Activity,
  LogOut,
  Moon,
  Sun,
  GitBranch,
} from "lucide-react";

import UploadContent from "../components/UploadContent";
import SummaryContent from "../components/SummaryContent";
import FraudTable from "../components/FraudTable";
import AnalysisContent from "../components/AnalysisContent";

export default function Dashboard() {

  const navigate = useNavigate();

  /* ============================
      STATES
  ============================ */

  const [active, setActive] = useState("upload");

  const [summary, setSummary] = useState(null);

  const [transactions, setTransactions] = useState([]);

  const [selectedTransaction, setSelectedTransaction] =
    useState(null);

  /* ============================
      AUTH CHECK
  ============================ */

  useEffect(() => {

    const user = localStorage.getItem("user");

    if (!user) {

      navigate("/");

    }

  }, [navigate]);

  /* ============================
      THEME TOGGLE
  ============================ */

  const isDark =
    document.documentElement.classList.contains("dark");

  const toggleTheme = () => {

    document.documentElement.classList.toggle("dark");

    localStorage.setItem(

      "theme",

      document.documentElement.classList.contains("dark")
        ? "dark"
        : "light"
    );
  };

  /* ============================
      LOGOUT
  ============================ */

  const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/");
  };

  return (

    <div className="
      flex
      h-screen
      bg-lightbg
      dark:bg-darkbg
      text-black
      dark:text-white
      transition-all
      duration-500
    ">

      {/* ============================
          SIDEBAR
      ============================ */}

      <div className="
        w-72
        bg-white
        dark:bg-slate-900
        shadow-xl
        relative
        border-r
        border-gray-200
        dark:border-slate-700
        flex
        flex-col
      ">

        {/* LOGO */}

        <div className="px-8 py-8">

          <h1 className="text-3xl font-black">

            <span className="fin-glow">

              FIN

            </span>

            <span className="guard-glow">

              GUARD

            </span>

          </h1>

          <p className="text-sm text-gray-500 mt-2">

            Fraud Intelligence Dashboard

          </p>

        </div>

        {/* MENU */}

        <nav className="flex-1 px-5 space-y-4">

          {/* UPLOAD */}

          <button
            onClick={() => setActive("upload")}
            className={`
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              transition-all
              ${
                active === "upload"

                  ? "bg-green-500/15 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.25)]"

                  : "hover:bg-gray-100 dark:hover:bg-slate-800"
              }
            `}
          >

            <Upload size={20} />

            Upload Data

          </button>

          {/* SUMMARY */}

          <button
            onClick={() => setActive("summary")}
            className={`
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              transition-all
              ${
                active === "summary"

                  ? "bg-green-500/15 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.25)]"

                  : "hover:bg-gray-100 dark:hover:bg-slate-800"
              }
            `}
          >

            <BarChart3 size={20} />

            Results Summary

          </button>

          {/* FRAUD TABLE */}

          <button
            onClick={() => setActive("fraud")}
            className={`
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              transition-all
              ${
                active === "fraud"

                  ? "bg-red-500/15 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.25)]"

                  : "hover:bg-gray-100 dark:hover:bg-slate-800"
              }
            `}
          >

            <Table size={20} />

            Fraud Table

          </button>

          {/* ANALYSIS */}

          <button
            onClick={() => setActive("analysis")}
            className={`
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              transition-all
              ${
                active === "analysis"

                  ? "bg-red-500/15 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.25)]"

                  : "hover:bg-gray-100 dark:hover:bg-slate-800"
              }
            `}
          >

            <Activity size={20} />

            Analysis

          </button>

        </nav>

        {/* LOGOUT */}

        <div className="p-5">

          <button
            onClick={handleLogout}
            className="
              w-full
              btn-danger
              flex
              items-center
              justify-center
              gap-2
            "
          >

            <LogOut size={18} />

            Logout

          </button>

        </div>

      </div>
            {/* ============================
          MAIN CONTENT
      ============================ */}

      <div className="flex-1 overflow-y-auto">

        {/* TOP BAR */}

        <div className="
          nav-glass
          sticky
          top-0
          z-20
          px-10
          py-5
          flex
          justify-end
          items-center
          gap-4
        ">

          {/* THEME TOGGLE */}

          <button
            onClick={toggleTheme}
            className="
              p-3
              rounded-xl
              hover:bg-gray-200
              dark:hover:bg-slate-800
              transition
            "
          >

            {isDark ? (

              <Sun size={20} />

            ) : (

              <Moon size={20} />

            )}

          </button>

          {/* GITHUB */}

          <a
            href="https://github.com/KanishkaG-14/FinGuard"
            target="_blank"
            rel="noopener noreferrer"
          >

            <button className="
              btn-outline
              flex
              items-center
              gap-2
            ">

              <GitBranch size={18} />

              GitHub

            </button>

          </a>

        </div>

        {/* PAGE CONTENT */}

        <div className="p-10">

          {/* UPLOAD */}

          {active === "upload" && (

            <UploadContent

              setSummary={setSummary}

              setTransactions={setTransactions}

              setActive={setActive}

            />

          )}

          {/* SUMMARY */}

          {active === "summary" && (

            <SummaryContent

              summary={summary}

            />

          )}

          {/* FRAUD TABLE */}

          {active === "fraud" && (

            <FraudTable

              transactions={transactions}

              setSelectedTransaction={setSelectedTransaction}

              setActive={setActive}

            />

          )}

          {/* ANALYSIS */}

          {active === "analysis" && (

            <AnalysisContent

              transaction={selectedTransaction}

            />

          )}

        </div>

      </div>

    </div>

  );
}