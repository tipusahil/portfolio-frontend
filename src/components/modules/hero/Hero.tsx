"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { TextReveal } from "../Home/TextReveal";
import DownloadButton from "./DownloadButton";

const Hero: React.FC = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // theme না লোড হওয়া পর্যন্ত রেন্ডার বন্ধ

  // const scrollToProjects = () => {
  //   document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  // };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-8 py-6"
    >
      <div className="max-w-7xl mx-auto text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
           <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-4xl sm:text-5xl lg:text-7xl  xl:text-8xl font-black leading-tight ${
            // className={`text-5xl sm:text-6xl lg:text-8xl font-black leading-tight ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
            style={{ fontFamily: "Poppins, sans-serif", marginTop: "3rem" }}
          >
            <span className="text-foreground">Hi, I’m </span>
            <span
              className={`block mt-4 ${
                theme === "dark"
                  ? "gradient-text-hero"
                  : "gradient-text-hero-light"
              }`}
            >
              Tipusahil
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="break-words text-center text-base sm:text-lg md:text-xl lg:text-3xl font-semibold max-w-full sm:max-w-3xl lg:max-w-6xl mx-auto overflow-wrap-break-word"
          >
            Full-Stack Developer | Building Modern Web Solutions
          </motion.p>

          <div className="flex flex-col items-center justify-center">
            <TextReveal />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-foreground/70/95 max-w-full sm:max-w-2xl mx-auto leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl break-words overflow-wrap-break-word"
          >
            Passionate about creating exceptional digital experiences with
            cutting-edge technologies. Specializing in React, Node.js, and
            modern web development with a focus on premium user experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pt-8 sm:pt-12"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => router.push("/projects")}
                className="btn-premium text-primary shadow-glow w-full sm:w-auto"
              >
                Explore My Work
              </Button>

              <DownloadButton className="btn-premium text-primary shadow-glow w-full sm:w-auto" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="pt-12 sm:pt-20"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex justify-center"
            >
              <ChevronDownIcon
                className={`h-8 w-8 sm:h-10 sm:w-10 rounded-2xl border-[0.8] cursor-pointer transition-all duration-300 hover:scale-110 ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-white glow-premium"
                    : "text-gray-500 hover:text-gray-900 glow-premium-light"
                }`}
                onClick={() => router.push("/about")}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;