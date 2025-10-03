"use client";
import { motion } from "framer-motion";
import React from "react";

import { useTypedSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";

const About: React.FC = () => {
  const { isDarkMode } = useTypedSelector((state: any) => state.theme);

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2
            className={`text-4xl sm:text-5xl rounded-2xl py-1 lg:text-6xl font-bold mb-6 ${
              isDarkMode
                ? "text-white glow-premium"
                : "text-gray-900 glow-premium-light"
            }`}
          >
            About Me
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-blue-500 via-purple-600 to-cyan-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16  items-center">
          {/* Enhanced Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-end"
          >
            <div
              className={`relative w-full md:w-[50%]  rounded-2xl ${
                isDarkMode ? "glass-premium-dark" : "glass-premium"
              } p-2 float-animation card-premium gpu-accelerated`}
            >
              <div className="w-full h-full  bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <span className="text-8xl font-black text-white z-10 w-full  rounded-md">
                  <Link
                    href={"/assets/images2/short-removebg-preview.png"}
                    download
                  >
                    <Image
                      src={"/assets/images2/short-removebg-preview.png"}
                      alt="Tipusahil image"
                      className="size-full"
                    />
                  </Link>
                </span>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced About Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3
              className={`text-3xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Muhammad Mostafa Tipu Sahil
            </h3>

            <p
              className={`text-lg leading-relaxed ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              I'm a passionate full-stack developer with a deep love for
              creating modern, efficient, and user-friendly web applications. My
              journey in web development started with curiosity and has evolved
              into a comprehensive expertise across multiple cutting-edge
              technologies and frameworks.
            </p>

            <p
              className={`text-lg leading-relaxed ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              I specialize in building scalable applications using React,
              Node.js, TypeScript, and modern database technologies. My approach
              combines clean code practices with innovative solutions to deliver
              exceptional digital experiences that feel premium and engaging.
            </p>

            {/* Enhanced Social Links */}
            <div className="flex space-x-6 pt-8">
              <Link
                href="https://linkedin.com/in/tipusahil"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 btn-premium ${
                  isDarkMode
                    ? "glass-premium-dark text-white hover:bg-white/20 glow-premium"
                    : "glass-premium text-gray-800 hover:bg-black/10 glow-premium-light"
                }`}
              >
                <span className="flex items-center justify-center space-x-2 p-1">
                  <Image
                    src={"/assets/images2/social_logos/linkedin_logo.png"}
                    alt="linkdin icon"
                    className="size-8"
                  />
                  <h1>Linkdln</h1>
                </span>
              </Link>
              <Link
                href="https://github.com/tipusahil"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 btn-premium ${
                  isDarkMode
                    ? "glass-premium-dark text-white hover:bg-white/20 glow-premium"
                    : "glass-premium text-gray-800 hover:bg-black/10 glow-premium-light"
                }`}
              >
                <span className="flex items-center justify-center space-x-2 px-1 pt-2">
                  <Image
                    src={"/assets/images2/social_logos/github.png"}
                    alt=""
                    className="size-6"
                  />
                  <h1>Github</h1>
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
