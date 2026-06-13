import { Link, useNavigate } from "react-router-dom";
import {
  Layers,
  Zap,
  GitBranch,
  Activity,
  Moon,
  Sun,
} from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  const isDark = document.documentElement.classList.contains("dark");

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.documentElement.classList.contains("dark")
        ? "dark"
        : "light"
    );
  };

  const handleTryDemo = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      alert("You are not logged in. Please login first.");
      return;
    }

    navigate("/dashboard?tab=upload");
  };

  const handleGetStarted = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/login");
      return;
    }

    navigate("/dashboard?tab=upload");
  };

  return (
    <div className="bg-gray-100 dark:bg-slate-900 text-black dark:text-white text-lg transition">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-4">

        <h1 className="text-2xl font-bold text-blue-500">
          FinGuard
        </h1>

        <div className="hidden md:flex gap-8">
          <a href="#features" className="hover:text-blue-500 transition">
            Features
          </a>

          <Link to="/docs" className="hover:text-blue-500 transition">
            Docs
          </Link>
        </div>

        <div className="flex gap-3 items-center">

          <button
            onClick={toggleTheme}
            className="p-2 rounded hover:bg-blue-500/20 transition"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link to="/login">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              Login
            </button>
          </Link>

          <Link to="/signup">
            <button className="px-4 py-2 border border-blue-500 rounded-lg">
              Sign Up
            </button>
          </Link>

        </div>
      </nav>

      {/* HERO */}
<section className="max-w-6xl mx-auto px-6 py-20">

  <div className="grid lg:grid-cols-2 gap-16 items-center">

    {/* LEFT SIDE */}
    <div>

      <div className="mb-6">
        <span className="px-4 py-2 border border-blue-500 rounded-full text-blue-500">
          ⚡ Advanced AI Security
        </span>
      </div>

      <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight mb-6">
        AI Powered{" "}
        <span className="text-blue-500">
          Fraud Detection
        </span>
      </h1>

      <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl mb-8">
        Detect suspicious financial transactions using graph neural networks,
        anomaly detection, and hybrid AI models. Monitor risk in real-time and
        prevent fraud before it impacts your business.
      </p>

      <div className="flex flex-wrap gap-4 mb-10">

        <a href="#features">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Explore Features →
          </button>
        </a>

        <Link to="/docs">
          <button className="px-6 py-3 border border-blue-500 rounded-lg hover:bg-blue-500/10 transition">
            Documentation
          </button>
        </Link>

        <button
          onClick={handleGetStarted}
          className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition"
        >
          Get Started
        </button>

      </div>

      <div className="flex gap-10">

        <div>
          <h3 className="text-3xl font-bold text-blue-500">
            99.7%
          </h3>
          <p className="text-gray-500">
            Detection Accuracy
          </p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-blue-500">
            &lt;1s
          </h3>
          <p className="text-gray-500">
            Response Time
          </p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-blue-500">
            24/7
          </h3>
          <p className="text-gray-500">
            Monitoring
          </p>
        </div>

      </div>

    </div>

    {/* RIGHT SIDE */}
    {/* RIGHT SIDE */}
{/* RIGHT SIDE */}
<div className="flex justify-center">

  <div
    className="
      relative
      bg-white
      dark:bg-slate-800
      rounded-3xl
      p-8
      shadow-xl
      border
      border-blue-500/10
      hover:shadow-[0_0_30px_#3b82f6]
      hover:-translate-y-1
      transition-all duration-500
      w-full
      max-w-lg
    "
  >

    <h3 className="text-xl font-bold text-center mb-2">
      Heterogeneous Graph Network
    </h3>

    <p className="text-center text-sm text-gray-500 mb-6">
      Multi-entity fraud detection using graph learning
    </p>

    <svg
      viewBox="0 0 500 350"
      className="w-full h-[320px]"
    >

      {/* GLOW FILTER */}
      <defs>
        <filter id="glow">
          <feGaussianBlur
            stdDeviation="4"
            result="coloredBlur"
          />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* CONNECTION 1 */}
      <line
        x1="150"
        y1="80"
        x2="250"
        y2="170"
        stroke="#3b82f6"
        strokeWidth="3"
        strokeDasharray="10"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="100"
          to="0"
          dur="2s"
          repeatCount="indefinite"
        />
      </line>

      {/* CONNECTION 2 */}
      <line
        x1="350"
        y1="80"
        x2="250"
        y2="170"
        stroke="#3b82f6"
        strokeWidth="3"
        strokeDasharray="10"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="100"
          to="0"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </line>

      {/* CONNECTION 3 */}
      <line
        x1="250"
        y1="170"
        x2="150"
        y2="280"
        stroke="#3b82f6"
        strokeWidth="3"
        strokeDasharray="10"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="100"
          to="0"
          dur="3s"
          repeatCount="indefinite"
        />
      </line>

      {/* CONNECTION 4 */}
      <line
        x1="250"
        y1="170"
        x2="350"
        y2="280"
        stroke="#3b82f6"
        strokeWidth="3"
        strokeDasharray="10"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="100"
          to="0"
          dur="2.2s"
          repeatCount="indefinite"
        />
      </line>

      {/* DOTTED RELATION */}
      <line
        x1="150"
        y1="80"
        x2="350"
        y2="80"
        stroke="#94a3b8"
        strokeWidth="2"
        strokeDasharray="6"
      />

      {/* USER */}
      <circle
        cx="150"
        cy="80"
        r="28"
        fill="#22c55e"
        filter="url(#glow)"
      />

      <text
        x="150"
        y="85"
        textAnchor="middle"
        fill="white"
        fontSize="14"
        fontWeight="600"
      >
        User
      </text>

      {/* MERCHANT */}
      <circle
        cx="350"
        cy="80"
        r="28"
        fill="#a855f7"
        filter="url(#glow)"
      />

      <text
        x="350"
        y="85"
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="600"
      >
        Shop
      </text>

      {/* CENTRAL TRANSACTION NODE */}
      <circle
        cx="250"
        cy="170"
        r="40"
        fill="#3b82f6"
        filter="url(#glow)"
      >
        <animate
          attributeName="r"
          values="40;45;40"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

      <text
        x="250"
        y="175"
        textAnchor="middle"
        fill="white"
        fontSize="14"
        fontWeight="700"
      >
        Txn
      </text>

      {/* DEVICE */}
      <circle
        cx="150"
        cy="280"
        r="28"
        fill="#f59e0b"
        filter="url(#glow)"
      />

      <text
        x="150"
        y="285"
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="600"
      >
        Device
      </text>

      {/* LOCATION */}
      <circle
        cx="350"
        cy="280"
        r="28"
        fill="#ef4444"
        filter="url(#glow)"
      />

      <text
        x="350"
        y="285"
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="600"
      >
        Geo
      </text>

      {/* FRAUD RING */}
      <circle
        cx="250"
        cy="170"
        r="58"
        fill="none"
        stroke="#ef4444"
        strokeWidth="4"
        strokeDasharray="10"
      >
        <animate
          attributeName="r"
          values="58;65;58"
          dur="2s"
          repeatCount="indefinite"
        />

        <animate
          attributeName="opacity"
          values="1;0.4;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

    </svg>

    {/* LEGEND */}
    <div className="grid grid-cols-2 gap-3 mt-4 text-sm">

      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        User
      </div>

      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
        Merchant
      </div>

      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
        Device
      </div>

      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        Location
      </div>

    </div>

  </div>

</div>

  </div>

</section>

      {/* WHY FINGUARD */}
<section id="features" className="py-24 px-6">

  <h2 className="text-4xl font-bold text-center mb-4">
    Why FinGuard?
  </h2>

  <p className="text-center text-gray-500 mb-14 max-w-2xl mx-auto">
    Advanced fraud detection powered by Graph Neural Networks,
    real-time analytics, and intelligent risk assessment.
  </p>

  <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

    {/* CARD 1 */}
    <div className="
      bg-white
      dark:bg-slate-800
      rounded-2xl
      p-8
      shadow-lg
      hover:-translate-y-2
      hover:shadow-[0_0_25px_#3b82f6]
      transition-all
    ">

      <div className="text-5xl mb-4">
        ⚡
      </div>

      <h3 className="text-2xl font-bold mb-3">
        Real-Time Detection
      </h3>

      <p className="text-gray-500">
        Analyze transactions instantly and identify suspicious
        activity before financial damage occurs.
      </p>

    </div>

    {/* CARD 2 */}
    <div className="
      bg-white
      dark:bg-slate-800
      rounded-2xl
      p-8
      shadow-lg
      hover:-translate-y-2
      hover:shadow-[0_0_25px_#3b82f6]
      transition-all
    ">

      <div className="text-5xl mb-4">
        🕸️
      </div>

      <h3 className="text-2xl font-bold mb-3">
        Graph Intelligence
      </h3>

      <p className="text-gray-500">
        Discover hidden relationships between users,
        merchants, devices and locations.
      </p>

    </div>

    {/* CARD 3 */}
    <div className="
      bg-white
      dark:bg-slate-800
      rounded-2xl
      p-8
      shadow-lg
      hover:-translate-y-2
      hover:shadow-[0_0_25px_#3b82f6]
      transition-all
    ">

      <div className="text-5xl mb-4">
        🧠
      </div>

      <h3 className="text-2xl font-bold mb-3">
        AI-Powered Analysis
      </h3>

      <p className="text-gray-500">
        Graph Neural Networks learn complex fraud patterns
        that traditional systems often miss.
      </p>

    </div>

    {/* CARD 4 */}
    <div className="
      bg-white
      dark:bg-slate-800
      rounded-2xl
      p-8
      shadow-lg
      hover:-translate-y-2
      hover:shadow-[0_0_25px_#3b82f6]
      transition-all
    ">

      <div className="text-5xl mb-4">
        📊
      </div>

      <h3 className="text-2xl font-bold mb-3">
        Actionable Insights
      </h3>

      <p className="text-gray-500">
        Visualize fraud trends, risk scores and alerts
        through an intuitive analytics dashboard.
      </p>

    </div>

  </div>

</section>

      {/* TECH SPECS */}
       {/* FRAUD DETECTION PIPELINE */}
<section className="py-24 px-6">

  <h2 className="text-4xl font-bold text-center mb-4">
    Fraud Detection Pipeline
  </h2>

  <p className="text-center text-gray-500 mb-16">
    End-to-end workflow used to identify suspicious financial transactions
  </p>

  <div className="max-w-6xl mx-auto">

    {/* TOP ROW */}
    <div className="grid md:grid-cols-3 gap-20 items-center">

      {/* Upload Data */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg text-center relative hover:-translate-y-2 transition-all">

        <div className="text-5xl mb-4">📁</div>

        <h3 className="text-xl font-bold mb-2">
          Upload Data
        </h3>

        <p className="text-sm text-gray-500">
          CSV transaction records are uploaded
        </p>

        {/* Arrow */}
        <div className="hidden md:flex absolute -right-16 top-1/2 -translate-y-1/2 items-center">
          <div className="w-12 h-1 bg-blue-500"></div>
          <div className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[12px] border-t-transparent border-b-transparent border-l-blue-500"></div>
        </div>

      </div>

      {/* Build Graph */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg text-center relative hover:-translate-y-2 transition-all">

        <div className="text-5xl mb-4">🕸️</div>

        <h3 className="text-xl font-bold mb-2">
          Build Graph
        </h3>

        <p className="text-sm text-gray-500">
          Users, merchants and devices become graph nodes
        </p>

        {/* Arrow */}
        <div className="hidden md:flex absolute -right-16 top-1/2 -translate-y-1/2 items-center">
          <div className="w-12 h-1 bg-blue-500"></div>
          <div className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[12px] border-t-transparent border-b-transparent border-l-blue-500"></div>
        </div>

      </div>

      {/* Graph Learning */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg text-center hover:-translate-y-2 transition-all">

        <div className="text-5xl mb-4">🧠</div>

        <h3 className="text-xl font-bold mb-2">
          Graph Learning
        </h3>

        <p className="text-sm text-gray-500">
          GNN extracts hidden fraud patterns
        </p>

      </div>

    </div>

    {/* VERTICAL ARROW */}
    <div className="flex justify-center my-12">

      <div className="flex flex-col items-center">

        <div className="w-1 h-16 bg-blue-500"></div>

        <div className="
          w-0
          h-0
          border-l-[12px]
          border-r-[12px]
          border-t-[16px]
          border-l-transparent
          border-r-transparent
          border-t-blue-500
        "></div>

      </div>

    </div>

    {/* BOTTOM ROW */}
    <div className="grid md:grid-cols-3 gap-20 items-center">

      {/* Feature Fusion */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg text-center relative hover:-translate-y-2 transition-all">

        <div className="text-5xl mb-4">⚡</div>

        <h3 className="text-xl font-bold mb-2">
          Feature Fusion
        </h3>

        <p className="text-sm text-gray-500">
          Local and global information are combined
        </p>

        {/* Arrow */}
        <div className="hidden md:flex absolute -right-16 top-1/2 -translate-y-1/2 items-center">
          <div className="w-12 h-1 bg-blue-500"></div>
          <div className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[12px] border-t-transparent border-b-transparent border-l-blue-500"></div>
        </div>

      </div>

      {/* Fraud Detection */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg text-center relative hover:-translate-y-2 transition-all">

        <div className="text-5xl mb-4">🚨</div>

        <h3 className="text-xl font-bold mb-2">
          Fraud Detection
        </h3>

        <p className="text-sm text-gray-500">
          Suspicious transactions are identified
        </p>

        {/* Arrow */}
        <div className="hidden md:flex absolute -right-16 top-1/2 -translate-y-1/2 items-center">
          <div className="w-12 h-1 bg-blue-500"></div>
          <div className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[12px] border-t-transparent border-b-transparent border-l-blue-500"></div>
        </div>

      </div>

      {/* Analytics */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg text-center hover:-translate-y-2 transition-all">

        <div className="text-5xl mb-4">📊</div>

        <h3 className="text-xl font-bold mb-2">
          Analytics
        </h3>

        <p className="text-sm text-gray-500">
          Results and alerts are visualized
        </p>

      </div>

    </div>

  </div>

</section>

      {/* DEMO */}
      <section className="py-20 px-10">
        <div className="bg-blue-500 text-white p-12 rounded-xl text-center">

          <h2 className="text-3xl font-bold mb-4">
            Experience FinGuard in Action
          </h2>

          <p className="mb-6">
            Try our intelligent fraud detection system in real-time.
          </p>

          <button
            onClick={handleTryDemo}
            className="bg-white text-black px-6 py-3 rounded-lg"
          >
            Try Demo →
          </button>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-10 text-sm opacity-80">
        <p>© 2026 FinGuard Project</p>
        <p>AI-Based Fraud Detection using Graph Learning</p>
      </footer>

    </div>
  );
}

const features = [
  {
    icon: <Layers size={24} />,
    title: "Multi-Scale Extraction",
    desc: "Captures complex fraud patterns across multiple transaction layers.",
  },
  {
    icon: <Zap size={24} />,
    title: "Lightweight Attention",
    desc: "Efficient attention mechanism for real-time detection.",
  },
  {
    icon: <GitBranch size={24} />,
    title: "Dual-Branch Model",
    desc: "Combines local and global transaction insights.",
  },
  {
    icon: <Activity size={24} />,
    title: "Feature Fusion",
    desc: "Integrates multiple signals for high accuracy.",
  },
];