import NavbarFlow, {
  FeatureItem,
  HoverLink,
} from "@/components/ui/navbar-flow";
import ThemeSwitchIcon from "./ThemeSwitchIcon";
import Lugo from "./Lugo";

const NavbarFlow2 = () => {
  return (
    <div>
      <NavbarFlow
        emblem={<Lugo />}
        links={[
          { text: "Home", url: "/" },
          { text: "About", url: "/about" },
          { text: "Skills", url: "/skills" },
          // { text: "Projects", url: "/projects" },
          {
            text: "Projects",
            submenu: (
              <div className="flex flex-col space-y-2">
                <HoverLink url="/projects">
                  All Projects
                </HoverLink>
                <HoverLink url="https://greenline-bus-tickets.surge.sh">
                  Bus-Ticket-Service
                </HoverLink>
                <HoverLink url="https://political-kettle.surge.sh">
                  Guessing-Game
                </HoverLink>
                <HoverLink url="https://retro-forum-tipusahil-project5.surge.sh">
                  Retro-Forum
                </HoverLink>
                <HoverLink url="https://frontend-ph-tour-management-system.vercel.app">
                  Tour-Management-App
                </HoverLink>
              </div>
            ),
          },
           { text: "Blogs", url: "/blogs" },
          { text: "Services", url: "/services" },
          { text: "Experience", url: "/experience" },

          // { text: "Testimonials", url: "/testimonials" },
          { text: "Dashboard", url: "/dashboard" },
        ]}
        rightComponent={<ThemeSwitchIcon />}
        // rightComponent={<div>a</div>}
      />
    </div>
  );
};

export default NavbarFlow2;
