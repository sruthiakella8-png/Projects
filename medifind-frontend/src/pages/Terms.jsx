import { motion } from "framer-motion";

export default function Terms() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-4xl"
    >
      <div className="max-w-5xl mx-auto px-8 py-24 text-center">
        
        <h1 className="text-3xl font-bold text-slate-800">
         Terms & Conditions
        </h1>

        <p className="mt-4 text-slate-500">
          Please review the terms for using the MediFind platform.
        </p>
     </div>
      <div className="mt-8 rounded-2xl bg-white p-6  mb-10 shadow-card">
        <h2 className="text-xl font-semibold text-slate-800">
          Using MediFind
        </h2>

        <p className="mt-3 leading-7 text-slate-600">
          Users are expected to provide accurate information
          and use the MediFind platform responsibly.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-slate-800">
          Account Responsibility
        </h2>

        <p className="mt-3 leading-7 text-slate-600">
          Keep your account credentials secure and do not share
          your login information with others.
        </p>
      </div>
    </motion.div>
  );
}