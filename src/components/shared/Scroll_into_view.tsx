import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useTheme } from "next-themes";


 const Scroll_into_view = ({id}:{id:string}) => {
const { theme } = useTheme();

// ---------------------------------------this page all work-----

  const handleScroll = () => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

// ---------------------------------------this page all work-----



  return <div>
              <ChevronDownIcon
                className={`h-8 w-8 text-muted-foreground/50 hover:text-foreground sm:h-10 sm:w-10 rounded-2xl border-[0.8] cursor-pointer transition-all duration-300 hover:scale-110 ${
                  theme === "dark"
                    ? " glow-premium"
                    : " glow-premium-light"
                }`}
              onClick={handleScroll}
              />
  </div>;
};

export default Scroll_into_view;
