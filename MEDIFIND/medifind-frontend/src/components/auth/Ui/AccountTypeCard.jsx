import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function AccountTypeCard({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{
        y: -4,
      }}
      whileTap={{
        scale: 0.98,
      }}
      className="
        w-full
        text-left
        p-5
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        hover:border-blue-400
        hover:shadow-xl
        hover:shadow-blue-500/10
        transition-all
        duration-200
        group
      "
    >

      <div className="flex items-center gap-4">

        {/* Icon */}
        <div
          className="
            w-12
            h-12
            rounded-xl
            bg-blue-50
            text-blue-600
            flex
            items-center
            justify-center
            flex-shrink-0
            group-hover:bg-blue-600
            group-hover:text-white
            transition-colors
            duration-200
          "
        >
          {icon}
        </div>

        {/* Text */}
        <div className="flex-1">

          <h3 className="font-bold text-slate-800">
            {title}
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            {description}
          </p>

        </div>

        {/* Arrow */}
        <ArrowRight
          size={20}
          className="
            text-slate-300
            group-hover:text-blue-600
            group-hover:translate-x-1
            transition-all
          "
        />

      </div>

    </motion.button>
  );
}