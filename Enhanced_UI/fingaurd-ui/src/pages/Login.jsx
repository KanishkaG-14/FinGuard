import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:5000/login", data);

    console.log(res.data); // 🔥 CHECK THIS

    if (res.data.message === "Login success") {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } else {
      alert(res.data.message);
    }
  } catch (err) {
    console.log(err);
    alert("Server error");
  }
};

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 dark:bg-slate-900 text-black dark:text-white transition">

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-800 p-8 rounded-xl w-96 space-y-4 shadow-md"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-200 dark:bg-slate-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 rounded bg-gray-200 dark:bg-slate-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button className="w-full bg-primary py-2 rounded hover:shadow-[0_0_15px_#3b82f6] text-white transition">
          Login
        </button>
      </form>
    </div>
  );
}