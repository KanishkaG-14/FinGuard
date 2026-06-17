import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/signup", data);

      alert(res.data.message);

      if (res.data.message === "Signup successful") {
        navigate("/login");
      }
    } catch (err) {
  console.error(err);

  alert(
    err.response?.data?.message ||
    err.message ||
    "Signup failed"
  );
}
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 dark:bg-slate-900 text-black dark:text-white">

      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="bg-white dark:bg-slate-800 p-8 rounded-xl w-96 space-y-4 shadow-md"
      >
        <h2 className="text-2xl font-bold text-center">
          Signup
        </h2>

        <input
          type="text"
          placeholder="Name"
          autoComplete="off"
          className="w-full p-2 rounded bg-gray-200 dark:bg-slate-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          autoComplete="new-email"
          className="w-full p-2 rounded bg-gray-200 dark:bg-slate-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          className="w-full p-2 rounded bg-gray-200 dark:bg-slate-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button className="w-full bg-primary py-2 rounded text-white hover:opacity-90 transition">
          Create Account
        </button>
      </form>
    </div>
  );
}