import { motion } from "framer-motion";
import icon3D from "../../assets/Icon/icon3Dpng.png";

const LoadingScreen = ({ duration = 2200 }) => {
  return (
    <div className="fixed inset-0 bg-slate-950 z-50 flex flex-col items-center justify-center gap-8">
      {/* Pulsing glow ring + icon3D */}
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute w-28 h-28 rounded-full animate-pulse-glow" />
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-sky-600 to-blue-500 flex items-center justify-center rounded-full shadow-lg overflow-hidden">
          <img
            src={icon3D}
            alt="Yourksatra"
            className="w-20 h-20 object-contain"
          />
        </div>
      </motion.div>

      {/* Brand name */}
      <motion.p
        className="text-white/60 text-sm font-medium tracking-widest uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Yourksatra
      </motion.p>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-sky-600 to-blue-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: duration / 1000 - 0.3, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
