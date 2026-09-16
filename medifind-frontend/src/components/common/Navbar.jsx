import { Link } from "react-router-dom";
import logo from "../../assets/logo-gradient.svg";






function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="max-w-7xl mx-auto mt-3 px-4 py-4 rounded-2xl
      bg-white/10 backdrop-blur-xl border border-white/20
      flex items-center justify-between shadow-lg">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="MediFind"
            className="h-10 w-auto"
          />

          <span className="text-2xl font-bold">
            <span className="text-blue-500">Medi</span>
            <span className="text-teal-400">Find</span>
          </span>
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-10">

          <Link
            to="/about"
            className="text-black hover:text-teal-400 transition duration-300"
          >
           About
          </Link>

          <Link
            to="/features"
            className="text-black hover:text-teal-400 transition duration-300"
          >
           Features
          </Link>

          <Link
            to="/help"
            className="text-black hover:text-teal-400 transition duration-300"
          >
           Help
          </Link>

          <Link
            to="/contact"
            className="text-black hover:text-teal-400 transition duration-300"
          >
            Contact
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">

          <Link
            to="/login"
            className="px-5 py-2 rounded-xl border border-teal-400
            text-black hover:bg-teal-500/20 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 rounded-xl
            bg-gradient-to-r from-cyan-500 to-teal-500
            text-white shadow-lg
            hover:scale-105 transition"
          >
            Register
          </Link>

        </div>

      </nav>
    </header>
  );
}

export default Navbar;