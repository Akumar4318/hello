/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <motion.div
        whileHover={{
          scale: 1.05,
          boxShadow: "4px 4px 0px rgba(255,255,255,0.18)",
        }}
        whileTap={{
          scale: 0.95,
          boxShadow: "0px 0px 0px rgba(255,255,255,0.18)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className={`text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold 
        shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] transition-all duration-300 ease-out 
        ${active ? "bg-yellow-50 text-black" : "bg-richblack-800"}`}
      >
        {children}
      </motion.div>
    </Link>
  );
};

export default Button;
