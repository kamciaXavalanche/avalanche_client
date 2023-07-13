"use client";

import { motion } from "framer-motion";
import Logo from "./Navbar/Logo";

const Loader = () => {
  return (
    <motion.div className="fixed top-0 left-0 w-full h-screen z-[999] bg-white flex justify-center items-center overflow-hidden">
      <Logo />
    </motion.div>
  );
};

export default Loader;
