import { motion } from "framer-motion";

export default function Privacy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-4xl"
    > 
      
       <div className="max-w-5xl mx-auto px-8 py-24 text-center">

         <h1 className="text-3xl font-bold text-slate-800">
           Privacy Policy
          </h1>

          <p className="mt-4 text-slate-500">
           Your privacy and security are important to MediFind.
          </p>
        </div> 
    

      <div className="mt-8 rounded-2xl bg-blue-50 p-5  mt- 4 mb-8 shadow-card">
        <h2 className="text-xl font-semibold text-slate-800">
          Your Data
        </h2>

        <p className="mt-3 leading-7 text-slate-600">
          MediFind is committed to protecting your personal
          information and keeping your healthcare data secure.
        </p>

        <h2 className="mt-6 text-xl font-semibold text-slate-800">
          Information Security
        </h2>

        <p className="mt-3 leading-7 text-slate-600">
          We use appropriate security measures to protect
          information handled through the MediFind platform.
        </p>
      </div>
    </motion.div>
  );
}