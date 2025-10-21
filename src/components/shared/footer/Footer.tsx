import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  TwitterIcon,
  type LucideIcon,
} from "lucide-react";

import Link from "next/link";
interface LinkItem {
  href: string;
  label: string;
}

interface SocialLink {
  href: string;
  icon: LucideIcon;
  name: string;
}

interface Footer1Props {
  aboutUsTitle?: string;
  aboutUsDescription?: string;
  quickLinksTitle?: string;
  quickLinks?: LinkItem[];
  contactUsTitle?: string;
  address?: string;
  email?: string;
  phone?: string;
  followUsTitle?: string;
  socialLinks?: SocialLink[];
  copyrightText?: string;
}

const Footer1 = ({
  aboutUsTitle = "A Bit About Me",
  aboutUsDescription = "I'm a Full-Stack Developer passionate about crafting sleek, high-quality digital experiences. With expertise in React,NextJS, Node.js, and modern web tools, I focus on performance, design, and innovation in every project I build.",

  quickLinksTitle = "Quick Links",
  quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/skills", label: "Skills" },
    { href: "/blogs", label: "Blogs" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
    { href: "/login", label: "Login" },
  ],
  contactUsTitle = "Contact Us",
  address = "Nasirabath,Kulshi,Chittagong,Bangladesh",
  email = "tipusahil.ctg@gmail.com",
  phone = "01821270367",
  followUsTitle = "Follow Us",
  socialLinks = [
    {
      href: "https://www.facebook.com/tipusahilx",
      icon: Facebook,
      name: "Facebook",
    },
    { href: "https://x.com/tipusahil_X", icon: TwitterIcon, name: "X" },
    {
      href: "https://www.instagram.com/tipusahilx/",
      icon: Instagram,
      name: "Instagram",
    },
    { href: "https://github.com/tipusahil", icon: Github, name: "GitHub" },
    {
      href: "https://www.linkedin.com/in/tipusahil/",
      icon: Linkedin,
      name: "Linkedin",
    },
  ],
}: // copyrightText = `© ${new Date().getFullYear()} Tipusahil All rights reserved • Made with ❤️`,
Footer1Props) => {
  return (
    <footer className="bg-background/60  px-2 py-12 text-secondary-foreground">
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{aboutUsTitle}</h3>
            <p className="text-sm">{aboutUsDescription}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{quickLinksTitle}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{contactUsTitle}</h3>
            <p className="text-sm">{address}</p>
            <p className="text-sm">Email: {email}</p>
            <p className="text-sm">Phone: {phone}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{followUsTitle}</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-secondary-foreground hover:text-primary"
                >
                  <link.icon size={24} />
                  <span className="sr-only">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-secondary-foreground/10 pt-8 text-center">
          <p className="text-sm ">
            © {new Date().getFullYear()}{" "}
            <span className="text-blue-500">
              <a href="https://github.com/tipusahil">Tipusahil</a>
            </span>{" "}
            All rights reserved • Made with 🤍
          </p>
          {/* <p className="text-sm border-2">{copyrightText}</p> */}
        </div>
      </div>
    </footer>
  );
};

export { Footer1 };

