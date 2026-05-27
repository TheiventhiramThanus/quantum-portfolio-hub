import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">("loading");

  useEffect(() => {
    // Increase duration slightly to let the animation play out
    const timer = setTimeout(() => {
      setPhase("exiting");
      setTimeout(() => setPhase("done"), 800);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  if (phase === "done") return null;

  const name = "THANUS";

  return (
    <AnimatePresence>
      {phase !== "exiting" && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#05050a]"
        >
          {/* Glowing center */}
          <motion.div
            animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-72 h-72 rounded-full blur-[90px] pointer-events-none"
            style={{ background: "linear-gradient(135deg, #38BDF8, #8B5CF6)" }}
          />

          <div className="relative flex flex-col items-center">
            {/* Logo/Spinner Box */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.2 }}
              className="relative w-16 h-16 mb-8 flex items-center justify-center"
            >
              <div
                className="absolute inset-0 rounded-2xl border-2 border-transparent"
                style={{
                  borderTopColor: "#38BDF8",
                  borderBottomColor: "#8B5CF6",
                  animation: "spin 2s linear infinite",
                }}
              />
              <div
                className="absolute inset-[6px] rounded-2xl border-2 border-transparent"
                style={{
                  borderRightColor: "#38BDF8",
                  borderLeftColor: "#8B5CF6",
                  animation: "spin 1.5s linear infinite reverse",
                }}
              />
              {/* Inner glowing dot */}
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-3 h-3 rounded-full bg-white shadow-[0_0_15px_#fff,0_0_30px_#38BDF8]"
              />
            </motion.div>

            {/* Typing Name */}
            <div className="flex overflow-hidden">
              {name.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.1, // Staggered typing effect
                    type: "spring",
                    stiffness: 150
                  }}
                  className="text-2xl sm:text-3xl font-black tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]"
                >
                  {char}
                </motion.span>
              ))}
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-[10px] tracking-[0.4em] text-muted-foreground/60 mt-3 uppercase"
            >
              Building the Future
            </motion.p>
          </div>

          {/* Progress bar */}
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "200px", opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-10 h-[2px] rounded-full bg-white/10 overflow-hidden"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-full w-1/2 rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, #38BDF8, #8B5CF6, transparent)" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
