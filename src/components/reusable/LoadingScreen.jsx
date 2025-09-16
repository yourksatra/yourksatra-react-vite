import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500); // 2.5 detik
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="absolute inset-0 bg-white dark:bg-gray-900 z-50">
      <div className="w-2/3">
        <motion.div
          className="h-1 bg-sky-500 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;