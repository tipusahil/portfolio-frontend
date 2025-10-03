"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";

const DownloadButton = ({ className} : {className: string}) => {
  try {
    const { theme } = useTheme();

    const [download1, setDownload1] = useState(false);

    const downloadHanlder = () => {
      setDownload1(true);

      setTimeout(() => {
        setDownload1(false);
      }, 2000);
    };

    return (
      <Button
        onClick={downloadHanlder}
        className={`group relative ${className}  px-6  py-5 text-xl font-bold rounded-2xl transition-all duration-300 btn-premium gpu-accelerated ${
          theme === "dark"
            ? "bg-gradient-to-r from-blue-500 via-purple-600 to-cyan-500 text-white hover:from-blue-600 hover:via-purple-700 hover:to-cyan-600 glow-premium"
            : "bg-gradient-to-r from-blue-600 via-purple-700 to-cyan-600 text-white hover:from-blue-700 hover:via-purple-800 hover:to-cyan-700 glow-premium-light"
        } shadow-2xl`}
      >
        <Link href="/Muhammad-Mostafa-Tipu-Sahil-Resume-1.pdf" download>
          {download1 ? "Downloading..." : "📃Download CV 👆"}
        </Link>
      </Button>
    );
  } catch (error) {
    console.log(error);
    return <div>download button issue </div>;
  }
};

export default DownloadButton;
