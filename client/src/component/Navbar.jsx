import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { logout } from "../api/userApi";

function Navbar() {
  const { user, getUser } = useContext(UserContext);
  async function handleLogout() {
    try {
      await logout();
      getUser();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold">📝 Todo App</h1>

        {/* Navigation Links */}
        <ul className="flex items-center gap-8 text-lg">
          {/* <li>
            <a href="/" className="hover:text-blue-200 transition duration-300">
              Home
            </a>
          </li> */}

          {!user && (
            <>
              <li>
                <Link
                  to="/todos/register"
                  className="hover:text-blue-200 transition duration-300"
                >
                  Sign Up
                </Link>
              </li>

              <li>
                <Link
                  to="/todos/login"
                  className="hover:text-blue-200 transition duration-300"
                >
                  Log In
                </Link>
              </li>
            </>
          )}

          {user && (
            <li>
              <Link
                to="/todos/login"
                className="hover:text-blue-200 transition duration-300"
                onClick={handleLogout}
              >
                Log out
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
