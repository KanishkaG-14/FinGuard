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
      <section className="text-center py-28 px-6">

        <h1 className="text-6xl font-bold mb-6">
          FinGuard
        </h1>

        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          FinGuard is an intelligent fraud detection system that leverages
          graph-based learning, anomaly detection, and hybrid AI models to
          identify suspicious financial transactions in real-time.
        </p>

        <div className="mb-6">
          <span className="px-4 py-2 border border-blue-500 rounded-full text-blue-500">
            ⚡ Advanced AI Security
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-4">

          <a href="#features">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg">
              Explore Features →
            </button>
          </a>

          <Link to="/docs">
            <button className="px-6 py-3 border border-blue-500 rounded-lg">
              Documentation
            </button>
          </Link>

          <button
            onClick={handleGetStarted}
            className="px-6 py-3 bg-gray-700 text-white rounded-lg"
          >
            Get Started
          </button>

        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 px-10">

        <h2 className="text-4xl font-bold text-center mb-12">
          Core Features
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-white dark:bg-slate-800 shadow-md"
            >

              <div className="bg-blue-500 text-white p-3 rounded-lg w-fit mb-4">
                {f.icon}
              </div>

              <h3 className="text-xl font-semibold mb-2">
                {f.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {f.desc}
              </p>

            </div>
          ))}
        </div>

      </section>

      {/* TECH SPECS */}
      <section className="py-20 px-6 bg-gray-100 dark:bg-slate-900 transition">

  <h2 className="text-4xl font-bold text-center mb-12">
    Technical Specifications
  </h2>

  <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

    {/* LEFT CARD */}
    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-md hover:shadow-[0_0_25px_#3b82f6] transition">

      <h3 className="text-lg font-semibold mb-4 text-blue-500">
        Architecture Enhancements
      </h3>

      <ul className="space-y-3 text-gray-600 dark:text-gray-300">
        <li>• Graph Neural Network Modeling</li>
        <li>• Multi-scale feature extraction</li>
        <li>• Attention-based learning</li>
        <li>• Optimized computation pipeline</li>
      </ul>

    </div>

    {/* RIGHT CARD */}
    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-md hover:shadow-[0_0_25px_#3b82f6] transition">

      <h3 className="text-lg font-semibold mb-4 text-blue-500">
        Performance Metrics
      </h3>

      <ul className="space-y-3 text-gray-600 dark:text-gray-300">
        <li>• 99.7% detection accuracy</li>
        <li>• Real-time fraud alerts</li>
        <li>• High recall rate</li>
        <li>• Reduced processing latency</li>
      </ul>

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