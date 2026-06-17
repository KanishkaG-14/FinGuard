import { Link } from "react-router-dom";
import { Moon, Sun, Shield, GitBranch } from "lucide-react";
import { useState } from "react";
export default function Landing() {
  const [isDark, setIsDark] = useState(
  document.documentElement.classList.contains("dark")
);

  const toggleTheme = () => {
  document.documentElement.classList.toggle("dark");

  const darkMode =
    document.documentElement.classList.contains("dark");

  setIsDark(darkMode);

  localStorage.setItem(
    "theme",
    darkMode ? "dark" : "light"
  );
};

  return (
    <div className="bg-white dark:bg-slate-900 text-black dark:text-white min-h-screen transition-all duration-500">

      {/* NAVBAR */}
      <nav className="nav-glass sticky top-0 z-50 px-10 py-5 flex justify-between items-center">

        <h1 className="text-3xl font-black tracking-wide">

          <span className="fin-glow animate-glowGreen">
            FIN
          </span>

          <span className="guard-glow animate-glowRed">
            GUARD
          </span>

        </h1>

        <div className="flex gap-3 items-center">

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* GITHUB */}
          <a
            href="https://github.com/KanishkaG-14/FinGuard"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="border border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-slate-800 px-6 py-3 rounded-xl transition flex items-center gap-2">

              <GitBranch size={18} />

              GitHub

            </button>
          </a>

          {/* LOGIN */}
          <Link to="/login">

            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition">

              Login

            </button>

          </Link>

          {/* SIGNUP */}
          <Link to="/signup">

            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition">

              Sign Up

            </button>

          </Link>

        </div>

      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-16">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE */}
          <div className="fade-up">

            <p className="text-primary font-semibold mb-5 tracking-wide">

              AI POWERED FRAUD INTELLIGENCE

            </p>

            <h1 className="text-7xl lg:text-8xl xl:text-9xl font-black leading-tight mb-10">

              <span className="fin-glow animate-glowGreen">

                FIN

              </span>

              <span className="guard-glow animate-glowRed">

                GUARD

              </span>

            </h1>

            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">

              FinGuard leverages Graph Neural Networks and anomaly detection
              techniques to identify suspicious financial activities and
              strengthen trust in digital transactions.

            </p>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex justify-center lg:justify-end lg:pr-12">

            <div className="shield-container animate-float">

              <div className="shield-ring"></div>

              <div className="shield-ring"></div>

              <div className="shield-ring"></div>

              <div className="
  w-56
  h-56
  rounded-full
  bg-white
  dark:bg-slate-800
  shadow-xl
  flex
  items-center
  justify-center
">

                <Shield
                  size={80}
                  className="text-primary animate-pulseShield"
                />

              </div>

              {/* SAFE NODE */}
              <div
                className="graph-node safe"
                style={{
                  top: "-10px",
                  left: "20%",
                }}
              />

              {/* FRAUD NODE */}
              <div
                className="graph-node fraud"
                style={{
                  top: "25%",
                  right: "0",
                }}
              />

              {/* SAFE NODE */}
              <div
                className="graph-node safe"
                style={{
                  bottom: "0",
                  left: "10%",
                }}
              />

            </div>

          </div>

        </div>
        <section className="py-16 px-6">

  <div
    className="
      max-w-4xl
      mx-auto
      text-center
      bg-white/5
      dark:bg-slate-800/50
      border
      border-green-500/20
      rounded-3xl
      px-10
      py-8
      backdrop-blur-md
      shadow-[0_0_25px_rgba(22,163,74,0.15),0_0_25px_rgba(220,38,38,0.15)]
    "
  >

    <p className="text-2xl md:text-3xl font-semibold leading-relaxed">

  <span className="text-green-500">
    "Every transaction tells a story.
  </span>

  <span className="text-red-500">
    {" "}FinGuard ensures it's one of trust."
  </span>

</p>

  </div>

</section>
      </section> 
      {/* FEATURES */}
      <section
  id="features"
  className="pt-20 pb-20 px-6"
>

        <h2 className="section-title drop-shadow-[0_0_15px_rgba(22,163,74,0.25)]">

          Key Features

        </h2>

        <p className="text-center text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-14">

          Advanced fraud detection powered by Graph Intelligence,
          real-time analytics, and hybrid AI models.

        </p>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

          {/* CARD 1 */}
          <div className="
  bg-white
  dark:bg-slate-800
  rounded-3xl
  p-8
  border
  border-green-500/20
  shadow-[0_0_20px_rgba(34,197,94,0.12),0_0_20px_rgba(239,68,68,0.12)]
  hover:shadow-[0_0_35px_rgba(34,197,94,0.28),0_0_35px_rgba(239,68,68,0.28)]
  hover:-translate-y-2
  transition-all
  duration-300
">

            <div className="text-5xl mb-4">

              🛡️

            </div>

            <h3 className="text-2xl font-bold mb-3">

              Real-Time Detection

            </h3>

            <p className="text-gray-500 dark:text-gray-400">

              Instantly identify suspicious transactions before
              financial damage occurs.

            </p>

          </div>

          {/* CARD 2 */}
          <div className="
  bg-white
  dark:bg-slate-800
  rounded-3xl
  p-8
  border
  border-green-500/20
  shadow-[0_0_20px_rgba(34,197,94,0.12),0_0_20px_rgba(239,68,68,0.12)]
  hover:shadow-[0_0_35px_rgba(34,197,94,0.28),0_0_35px_rgba(239,68,68,0.28)]
  hover:-translate-y-2
  transition-all
  duration-300
">

            <div className="text-5xl mb-4">

              🕸️

            </div>

            <h3 className="text-2xl font-bold mb-3">

              Graph Intelligence

            </h3>

            <p className="text-gray-500 dark:text-gray-400">

              Reveal hidden relationships between users,
              merchants, devices, and locations.

            </p>

          </div>

          {/* CARD 3 */}
          <div className="
  bg-white
  dark:bg-slate-800
  rounded-3xl
  p-8
  border
  border-green-500/20
  shadow-[0_0_20px_rgba(34,197,94,0.12),0_0_20px_rgba(239,68,68,0.12)]
  hover:shadow-[0_0_35px_rgba(34,197,94,0.28),0_0_35px_rgba(239,68,68,0.28)]
  hover:-translate-y-2
  transition-all
  duration-300
">

            <div className="text-5xl mb-4">

              🧠

            </div>

            <h3 className="text-2xl font-bold mb-3">

              Hybrid AI Models

            </h3>

            <p className="text-gray-500 dark:text-gray-400">

              Combine Graph Neural Networks with anomaly
              detection techniques for enhanced accuracy.

            </p>

          </div>

          {/* CARD 4 */}
          <div className="
  bg-white
  dark:bg-slate-800
  rounded-3xl
  p-8
  border
  border-green-500/20
  shadow-[0_0_20px_rgba(34,197,94,0.12),0_0_20px_rgba(239,68,68,0.12)]
  hover:shadow-[0_0_35px_rgba(34,197,94,0.28),0_0_35px_rgba(239,68,68,0.28)]
  hover:-translate-y-2
  transition-all
  duration-300
">

            <div className="text-5xl mb-4">

              📊

            </div>

            <h3 className="text-2xl font-bold mb-3">

              Actionable Insights

            </h3>

            <p className="text-gray-500 dark:text-gray-400">

              Visualize fraud trends and transaction risks
              through an intuitive interface.

            </p>

          </div>

        </div>

      </section>

      {/* TEAM */}
      <section className="py-20 px-6">

        <h2 className="section-title drop-shadow-[0_0_15px_rgba(22,163,74,0.25)]">

          Meet the Team

        </h2>

        <p className="text-center text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-14">

          The minds behind FinGuard.

        </p>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">

          {/* MEMBER 1 */}
          <div className="
  bg-white
  dark:bg-slate-800
  rounded-2xl
  p-6
  text-center
  border
  border-red-500/20
  shadow-[0_0_20px_rgba(34,197,94,0.12),0_0_20px_rgba(239,68,68,0.12)]
  hover:shadow-[0_0_35px_rgba(34,197,94,0.28),0_0_35px_rgba(239,68,68,0.28)]
  hover:-translate-y-2
  transition-all
  duration-300
">

            <div className="text-5xl mb-4">

              👩‍💻

            </div>

            <h3 className="text-xl font-bold">

              Kanishka Gupta

            </h3>

            <p className="text-gray-500 dark:text-gray-400 mt-2">

              FinGuard Development Team

            </p>

          </div>

          {/* MEMBER 2 */}
          <div className="
  bg-white
  dark:bg-slate-800
  rounded-2xl
  p-6
  text-center
  border
  border-red-500/20
  shadow-[0_0_20px_rgba(34,197,94,0.12),0_0_20px_rgba(239,68,68,0.12)]
  hover:shadow-[0_0_35px_rgba(34,197,94,0.28),0_0_35px_rgba(239,68,68,0.28)]
  hover:-translate-y-2
  transition-all
  duration-300
">

            <div className="text-5xl mb-4">

              👩‍💻

            </div>

            <h3 className="text-xl font-bold">

              Kandibanda Sathwika

            </h3>

            <p className="text-gray-500 dark:text-gray-400 mt-2">

              FinGuard Development Team

            </p>

          </div>

          {/* MEMBER 3 */}
          <div className="
  bg-white
  dark:bg-slate-800
  rounded-2xl
  p-6
  text-center
  border
  border-red-500/20
  shadow-[0_0_20px_rgba(34,197,94,0.12),0_0_20px_rgba(239,68,68,0.12)]
  hover:shadow-[0_0_35px_rgba(34,197,94,0.28),0_0_35px_rgba(239,68,68,0.28)]
  hover:-translate-y-2
  transition-all
  duration-300
">

            <div className="text-5xl mb-4">

              👩‍💻

            </div>

            <h3 className="text-xl font-bold">

              Yennam Tejaswi

            </h3>

            <p className="text-gray-500 dark:text-gray-400 mt-2">

              FinGuard Development Team

            </p>

          </div>

        </div>

      </section>
      {/* FOOTER */}
      <footer className="py-10 text-center footer-text border-t border-gray-200 dark:border-slate-700 mt-10">

        <h3 className="text-2xl font-black mb-3">

          <span className="fin-glow">

            FIN

          </span>

          <span className="guard-glow">

            GUARD

          </span>

        </h3>

        <p className="mb-2">

          Hybrid Fraud Detection using Graph Learning

        </p>

        <p className="text-sm opacity-80">

          © 2026 FinGuard. All rights reserved.

        </p>

      </footer>

    </div>
  );
}


