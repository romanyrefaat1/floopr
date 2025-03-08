"use client";

import { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { BiUpArrow } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/firebase"; // Ensure your Firestore is properly initialized

export default function ProgressBar() {
  const [num, setNum] = useState(60);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "waitlist-emails"), (snapshot) => {
      setNum(snapshot.size);
    });

    return () => unsubscribe();
  }, []);

  const progressWidth = `calc(100% * ${num / 100})`;
  const labelLeft = `calc(100% * ${num / 100} - 8%)`;

  return (
    <div className="relative">
      <motion.div 
        className="relative rounded-full h-2 w-full cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="bg-secondary opacity-30 rounded-full h-2 w-full" />
        <motion.div
          className="bg-secondary absolute top-0 left-0 rounded-full h-2"
          initial={{ width: progressWidth }}
          animate={{ 
            width: progressWidth,
            boxShadow: isHovered ? "0 0 12px 4px rgba(143, 245, 48, 0.2)" : "none"
          }}
          transition={{ 
            width: { duration: 0.5, ease: "easeOut" },
            boxShadow: { duration: 0.3 } 
          }}
          style={{ width: progressWidth }}
        />
      </motion.div>
      
      <motion.div
        className="text-secondary opacity-70 text-xs absolute top-3"
        initial={{ left: labelLeft }}
        animate={{ left: labelLeft }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ left: labelLeft }}
      >
        <span className="bg-black/20 px-2 py-1 rounded-lg">
          {num}/100
        </span>
      </motion.div>
      
      {/* Animated tooltip with Framer Motion */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            className="absolute select-none mt-2 top-3 right-0"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-end gap-1">
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <BiUpArrow className="text-secondary" size={12} />
              </motion.div>
              <motion.div 
                className="bg-[#111] p-2 w-full max-w-[200px] rounded-lg"
                initial={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-text-muted text-[10px] whitespace-normal block">
                  Psst, let's see what will happen when we get here!
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}