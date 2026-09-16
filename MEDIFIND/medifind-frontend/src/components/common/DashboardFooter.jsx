import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardFooter({
  portal = "MediFind",
}) {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-t border-slate-200 bg-white px-6 py-4"
    >
      <div className="flex flex-col items-center justify-between gap-3 text-sm text-slate-500 md:flex-row">

        {/* ================= LOGO ================= */}
        <div className="flex items-center gap-2">

          {/* GPS Logo */}
          <div className="relative flex h-8 w-8 items-center justify-center">
            <MapPin
              size={32}
              strokeWidth={2.5}
              className="text-[#0891B2]"
            />

            {/* Medical Plus */}
            <span className="absolute left-1/2 top-[6px] -translate-x-1/2 text-[11px] font-bold text-[#2563EB]">
              +
            </span>
          </div>

          {/* MediFind */}
          <span className="font-semibold text-[#2563EB]">
            Medi
            <span className="text-[#14B8A6]">
              Find
            </span>
          </span>

          <span className="hidden text-slate-300 md:inline">
            |
          </span>

          <span>
            © {new Date().getFullYear()}
          </span>

          <span className="hidden text-slate-300 md:inline">
            |
          </span>

          <span>
            {portal}
          </span>
        </div>

        {/* ================= LINKS ================= */}
        <div className="flex items-center gap-5">

          <Link
            to="/privacy"
            className="transition-colors hover:text-[#2563EB]"
          >
            Privacy
          </Link>

          <Link
            to="/terms"
            className="transition-colors hover:text-[#2563EB]"
          >
            Terms
          </Link>

          <Link
            to="/help"
            className="transition-colors hover:text-[#14B8A6]"
          >
            Help
          </Link>

        </div>

      </div>
    </motion.footer>
  );
}