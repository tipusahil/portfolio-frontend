import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',// configure korar pore server restart dite hobe,nahoi kaj korbena,
        hostname: '**',
        // port: '',
        // pathname: '/account123/**',
        // search: '',
      },
    ],
  },
  // 🟢 বিল্ডের সময় টাইপস্ক্রিপ্ট এরর ইগনোর করবে
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  // // 🟢 বিল্ডের সময় ESLint এরর ইগনোর করবে
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};

export default nextConfig;
