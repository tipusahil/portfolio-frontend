"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

const DownloadButton = ({ className }: { className: string }) => {
  // ✅ Hooks সবসময় top-level এ কল করতে হবে

  const [download1, setDownload1] = useState(false);

  const downloadHandler = () => {
    try {
      setDownload1(true);
      setTimeout(() => {
        setDownload1(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Hooks এর নিচে return থাকবে
  return (
    <Button onClick={downloadHandler} className={className}>
      <Link href="/Muhammad-Mostafa-Tipu-Sahil-Resume-1.pdf" download>
        {download1 ? "Downloading..." : "📃 Download CV 👆"}
      </Link>
    </Button>
  );
};

export default DownloadButton;
