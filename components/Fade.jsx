import React from "react";
import { motion } from "framer-motion";

const Fade = ({ children }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.98,
        filter: "blur(8px)",
      }}
      animate={{
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      }}
      exit={{
        opacity: 0,
        scale: 0.98,
        filter: "blur(8px)",
      }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default Fade;