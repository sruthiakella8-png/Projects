import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ProviderCard({
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
        y: -5,
      }}
      whileTap={{
        scale: 0.97,
      }}
      className="
        relative
        w-full
        p-6
        rounded-2xl
        bg-white
        border
        border-slate-200
        shadow-sm
        hover:border-blue-400
        hover:shadow-xl
        hover:shadow-blue-500/10
        transition-all
        duration-200
        text-left
        group
      "
    >

      <div
        className="
          w-14
          h-14
          rounded-2xl
          bg-blue-50
          text-blue-600
          flex
          items-center
          justify-center
          mb-4
          group-hover:bg-blue-600
          group-hover:text-white
          transition-colors
        "
      >
        {icon}
      </div>

      <h3 className="font-bold text-lg text-slate-800">
        {title}
      </h3>

      <p className="text-sm text-slate-500 mt-2 pr-6">
        {description}
      </p>

      <ArrowRight
        size={19}
        className="
          absolute
          right-5
          bottom-5
          text-slate-300
          group-hover:text-blue-600
          group-hover:translate-x-1
          transition-all
        "
      />

    </motion.button>
  );
}