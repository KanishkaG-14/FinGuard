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

            Transactions
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