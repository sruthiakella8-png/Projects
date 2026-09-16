import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import logo from "../assets/logo-gradient.svg";

const categories = [
  { name: "Doctors", icon: "ti-stethoscope", bg: "bg-blue-600" },
  { name: "Hospitals", icon: "ti-building-hospital", bg: "bg-teal-600" },
  { name: "Diagnostics", icon: "ti-microscope", bg: "bg-purple-600" },
  { name: "Pharmacy", icon: "ti-pill", bg: "bg-amber-600" },
];

function Home({ user, onLogout }) {
  return (
    <div className="min-h-screen bg-white">
    <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden flex flex-col items-center justify-center text-center px-6 py-24 bg-gradient-to-b from-blue-950 via-blue-900 to-teal-900">

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/70 via-blue-900/75 to-teal-900/85"></div>

        {/* Map Pins */}
        <i
          className="ti ti-map-pin-filled absolute text-blue-600 text-3xl drop-shadow-md"
          style={{ left: "14%", top: "18%" }}
        ></i>

        <i
          className="ti ti-map-pin-filled absolute text-teal-500 text-2xl drop-shadow-md"
          style={{ left: "76%", top: "14%" }}
        ></i>

        <i
          className="ti ti-map-pin-filled absolute text-purple-600 text-3xl drop-shadow-md"
          style={{ left: "84%", top: "58%" }}
        ></i>

        <i
          className="ti ti-map-pin-filled absolute text-amber-600 text-2xl drop-shadow-md"
          style={{ left: "8%", top: "66%" }}
        ></i>

        <i
          className="ti ti-map-pin-filled absolute text-teal-300 text-xl drop-shadow-md"
          style={{ left: "48%", top: "78%" }}
        ></i>

        {/* Hero Content */}
        <div className="relative z-10">

          <h1 className="text-5xl font-bold mb-3">
            <span className="text-blue-700">Medi</span>
            <span className="text-teal-300">Find</span>
          </h1>

          <p className="text-blue-100 text-sm mb-6 max-w-md mx-auto">
            Locate doctors, hospitals, diagnostics and pharmacies — all on one
            map.
          </p>

          <div className="mb-10 px-6 py-2 rounded-full text-white text-sm font-medium bg-white/15 border border-white/40 inline-flex items-center gap-2">
            <i className="ti ti-map-pin"></i>
            GPS Powered. Care Near You.
          </div>

          <div className="flex justify-center gap-4">
            <Link
              to="/register"
              className="px-6 py-3 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="px-6 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white/10"
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-10 px-6 py-14">
        {categories.map((cat) => (
          <div key={cat.name} className="flex flex-col items-center w-24">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl mb-2 ${cat.bg}`}
            >
              <i className={`ti ${cat.icon}`}></i>
            </div>

            <span className="text-sm font-medium text-gray-800">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;