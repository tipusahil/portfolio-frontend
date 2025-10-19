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
        className={`${className}`}
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
