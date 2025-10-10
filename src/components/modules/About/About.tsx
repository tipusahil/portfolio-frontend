"use client";

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

const About: React.FC = () => {
const {theme} = useTheme();// "light" | "dark" | "system"
const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // client mount হওয়ার পরই theme ঠিক হবে
  }, []);

  if (!mounted) {
    // SSR → Client mismatch এড়াতে server side এ fallback দিচ্ছি
    return null; 
  }

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 border-2 pt-3">
      <div className="max-w-7xl mx-auto ">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className={`text-4xl sm:text-5xl rounded-2xl py-1 lg:text-6xl font-bold mb-6 ${
            theme==="dark" ? 'text-white glow-premium' : 'text-gray-900 glow-premium-light'
          }`}>
            About Me
          </h2>
          <div className="w-32 h-2 bg-gradient-to-r from-blue-500 via-purple-600 to-cyan-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16  items-center justify-center ">
          {/* Enhanced Profile Image */}
    <div className='h-full '>
            <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
            // className="absolute top-2/5 -translate-y-1/6 flex items-center justify-center border-2 border-red-500 z-20"
          >
            <div className={`relative w-full md:w-[50%]    rounded-2xl ${
              theme==="dark" ? 'glass-premium-dark' : 'glass-premium'
            } p-2 float-animation card-premium gpu-accelerated`}>
              <div className="w-full h-full  bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <span className="text-8xl font-black text-white z-10 w-full  rounded-md">
              <Link  href={"/assets/images2/short-removebg-preview.png"} download>
                   <img src={"/assets/images2/short-removebg-preview.png"} alt="Tipusahil image"  className='size-full'/>
              </Link>
                  </span>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
              </div>
            </div>
          </motion.div>

    </div>
          {/* Enhanced About Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className={`text-3xl font-bold ${
              theme==="dark" ? 'text-white' : 'text-gray-900'
            }`}>
              Muhammad Mostafa Tipu Sahil
            </h3>
            
<p className={`text-lg leading-relaxed ${
  theme==="dark" ? 'text-gray-300' : 'text-gray-600'
}`}>
  I'm <span className="font-semibold">Muhammad Mostafa Tipu Sahil</span>, a 
  passionate <span className="font-semibold">Full-Stack Web Developer</span> and 
  tech enthusiast who believes in the power of code to create meaningful impact.  
  My journey began with endless curiosity about how the web works, and today 
  I am dedicated to building modern, scalable, and high-performance 
  applications that feel intuitive and engaging.
</p>

<p className={`text-lg leading-relaxed ${
  theme==="dark" ? 'text-gray-300' : 'text-gray-600'
}`}>
  My skillset spans across <span className="font-semibold">JavaScript, TypeScript, 
  React, Next.js, Node.js, Express.js, MongoDB, and PostgreSQL</span>.  
  I focus on writing clean, maintainable code while crafting seamless user 
  experiences. With Git, GitHub, and VS Code as my daily tools, I love turning 
  complex problems into elegant digital solutions.
</p>

<p className={`text-lg leading-relaxed ${
  theme==="dark" ? 'text-gray-300' : 'text-gray-600'
}`}>
  Beyond web development, I am deeply inspired by the future of technology — 
  particularly in <span className="font-semibold">Artificial Intelligence, AI Agents, and SaaS 
  products</span>. My vision is to combine full-stack development with AI-driven 
  innovation to create next-generation platforms that empower businesses and 
  individuals worldwide.
</p>

<p className={`text-lg leading-relaxed ${
  theme==="dark" ? 'text-gray-300' : 'text-gray-600'
}`}>
  What sets me apart is not just my technical knowledge, but my 
  <span className="font-semibold">dedication, consistency, and growth mindset</span>.  
  I spend long focused hours every day coding, learning, and improving.  
  For me, coding is not just a profession — it's a journey of creativity, 
  problem-solving, and building a better digital future.
</p>

            {/* Enhanced Social Links */}
    <div className="flex space-x-6 pt-8">
  {/* LinkedIn */}
  <Link
    href="https://linkedin.com/in/tipusahil"
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 btn-premium ${
      theme === "dark"
        ? "glass-premium-dark text-white hover:bg-white/20 glow-premium"
        : "glass-premium text-gray-800 hover:bg-black/10 glow-premium-light"
    }`}
  >
    <Image
      width={24}
      height={24}
      src="/assets/images2/social_logos/linkedin_logo.png"
      alt="LinkedIn logo"
    />
    <span className="text-lg">LinkedIn</span>
  </Link>

  {/* GitHub */}
  <Link
    href="https://github.com/tipusahil"
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 btn-premium ${
      theme === "dark"
        ? "glass-premium-dark text-white hover:bg-white/20 glow-premium"
        : "glass-premium text-gray-800 hover:bg-black/10 glow-premium-light"
    }`}
  >
    <Image
      width={24}
      height={24}
      src="/assets/images2/social_logos/github.png"
      alt="GitHub logo"
    />
    <span className="text-lg">GitHub</span>
  </Link>
</div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;