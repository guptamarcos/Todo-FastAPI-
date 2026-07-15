function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold">📝 Todo App</h1>

        {/* Navigation Links */}
        <ul className="flex items-center gap-8 text-lg">
          <li>
            <a href="/" className="hover:text-blue-200 transition duration-300">
              Home
            </a>
          </li>

          <li>
            <a
              href="/completed"
              className="hover:text-blue-200 transition duration-300"
            >
              Completed
            </a>
          </li>

          <li>
            <a
              href="/pending"
              className="hover:text-blue-200 transition duration-300"
            >
              Pending
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;