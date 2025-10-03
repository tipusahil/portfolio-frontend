"use client";
import { motion } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';
import DownloadButton from './DownloadButton';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
const {theme} = useTheme();


  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-8">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main Heading with Enhanced Styling */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`text-5xl sm:text-6xl lg:text-8xl font-black leading-tight ${
              theme==="dark" ? 'text-white' : 'text-gray-900'
            }`}
            style={{ fontFamily: 'Poppins, sans-serif', marginTop: '3rem' }}
          >
            <span className={`${ theme==="dark" ? 'text-white ' : 'text-gray-900'}`}>Hi, I'm</span>
            <span className={`block mt-4 ${ theme==="dark" ? 'gradient-text-hero' : 'gradient-text-hero-light'}`}>
              Tipusahil
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`text-xl sm:text-2xl lg:text-3xl font-semibold ${
               theme==="dark" ? 'text-gray-300' : 'text-gray-600'
            } max-w-4xl mx-auto`}
          >
            Full-Stack Developer | Building Modern Web Solutions
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={`text-base sm:text-lg lg:text-xl ${
               theme==="dark" ? 'text-gray-400' : 'text-gray-500'
            } max-w-3xl mx-auto leading-relaxed`}
          >
            Passionate about creating exceptional digital experiences with cutting-edge technologies.
            Specializing in React, Node.js, and modern web development with a focus on premium user experiences.
          </motion.p>

          {/* Enhanced CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pt-12"
          >
 <div className='flex flex-col md:flex-row lg:flex-row xl-flex-row items-center justify-center  space-y-3 md:space-x-3  lg:space-x-4  xl:space-x-6 md:space-y-2'>
             <Button
              onClick={scrollToProjects}
              className={`group relative self-center px-6  py-5 text-xl font-bold rounded-2xl transition-all duration-300 btn-premium gpu-accelerated ${
                 theme==="dark"
                  ? 'bg-gradient-to-r from-blue-500 via-purple-600 to-cyan-500 text-white hover:from-blue-600 hover:via-purple-700 hover:to-cyan-600 glow-premium'
                  : 'bg-gradient-to-r from-blue-600 via-purple-700 to-cyan-600 text-white hover:from-blue-700 hover:via-purple-800 hover:to-cyan-700 glow-premium-light'
              } shadow-2xl`}
            >
        
               <span className="relative z-10 px-4 py-3">Explore My Work</span>
       
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </Button>
{/* ------ */}
           <DownloadButton className=''/>
 </div>
          </motion.div>

          {/* Enhanced Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="pt-20"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex justify-center"
            >
              <ChevronDownIcon
                className={`h-10 w-10 cursor-pointer transition-all duration-300 hover:scale-110 ${
                   theme==="dark" ? 'text-gray-400 hover:text-white glow-premium' : 'text-gray-500 hover:text-gray-900 glow-premium-light'
                }`}
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;