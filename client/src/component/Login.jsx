import { Link,useNavigate } from "react-router-dom";
import { useState,useContext } from "react";
import { login } from "../api/userApi.js";
import { UserContext } from "../context/UserContext";

function Login() {
  const { getUser } = useContext(UserContext);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  
  const navigate = useNavigate();
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await login(user);
      getUser();
      navigate("/todos")
    } catch (err) {
      console.log(err);
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
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
            <p className="mt-2 text-gray-500">Sign in to continue.</p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={(e)=> handleSubmit(e)}>
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
                placeholder="Enter your email"
                value={user?.email}
                onChange={(e)=> setUser((prev)=> ({...prev,email: e.target.value}))}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

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
                placeholder="Enter your password"
                value={user?.password}
                onChange={(e)=> setUser((prev)=> ({...prev,password: e.target.value}))}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Log In
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-gray-600">
            <span>Don't have an account? </span>

            <Link
              to="/todos/register"
              className="font-semibold text-blue-600 hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
