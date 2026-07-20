import { Link, useNavigate } from "react-router-dom";
import { register,login } from "../api/userApi.js";
import { useState,useContext } from "react";
import { UserContext } from "../context/UserContext";

function Signup() {
  const { getUser } = useContext(UserContext);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await register(user);
      await login({"email":user.email,"password":user.password})
      getUser();
      navigate("/todos")
    } catch (err) {
      console.logI(err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="px-6 py-4">
        <Link
          to="/todos"
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
        >
          ← Back
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center px-4 pb-10">
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>

            <p className="mt-2 text-gray-500">Sign up to continue</p>
          </div>

          {/* Signup Form */}
          <form className="space-y-5" onSubmit={(e) => handleSubmit(e)}>
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block font-medium text-gray-700"
              >
                Full Name
              </label>

              <input
                id="fullName"
                type="text"
                value={user?.name}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter your full name"
                className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-medium text-gray-700"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={user?.email}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Enter your email"
                className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block font-medium text-gray-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={user?.password}
                onChange={(e) =>
                  setUser((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder="Enter your password"
                className="w-full rounded-md border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Sign Up
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center text-gray-600">
            <span>Already have an account? </span>

            <Link
              to="/todos/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Log In
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Signup;
