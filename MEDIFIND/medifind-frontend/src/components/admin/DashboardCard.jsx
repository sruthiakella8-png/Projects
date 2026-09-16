import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function DashboardCard({
  title,
  count,
  icon,
  color,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.06,
        rotate: 1,
      }}
      transition={{ duration: 0.5 }}
      className={`${color} rounded-2xl p-6 text-white shadow-xl cursor-pointer`}
    >
      <div className="flex justify-between items-center">

        <div>
          <p className="text-lg opacity-90">{title}</p>

          <h2 className="text-4xl font-bold mt-3">
            {count}
          </h2>
        </div>

        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
          className="text-5xl"
        >
          {icon}
        </motion.div>

      </div>
    </motion.div>
  );
}