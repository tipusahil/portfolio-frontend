"use client";

import { ChevronUpIcon } from "@heroicons/react/16/solid";
import { useTheme } from "next-themes";

const Scroll_to_home = ({ id }: { id: string }) => {
  const { theme } = useTheme();

  const handleScroll = () => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div
      className="
        fixed bottom-6 right-6 z-50
        flex items-center justify-center
        rounded-full
        
        backdrop-blur-md bg-background/40
        border border-muted-foreground/20
        hover:scale-110 transition-all duration-300
      "
    >
      <ChevronUpIcon
        className={`h-8 w-8 rounded-full sm:h-10 sm:w-10 text-muted-foreground/50 hover:text-foreground cursor-pointer ${
          theme === "dark" ? "glow-premium" : "glow-premium-light"
        }`}
        onClick={handleScroll}
      />
    </div>
  );
};

export default Scroll_to_home;
