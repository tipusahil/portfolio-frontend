"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/libs/utils";
import Link from "next/link";

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href={"/"}>
          <MenuItem setActive={setActive} active={active} item="Home">
          </MenuItem>
        </Link>
        <Link href={"/about"}>
          <MenuItem setActive={setActive} active={active} item="About">
          </MenuItem>
        </Link>
        <Link href={"/skills"}>
          <MenuItem setActive={setActive} active={active} item="Skills">
          </MenuItem>
        </Link>
        <Link href={"/experience"}>
          <MenuItem setActive={setActive} active={active} item="Experience">
          </MenuItem>
        </Link>

        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/web-dev">Web Development</HoveredLink>
            <HoveredLink href="/interface-design">Interface Design</HoveredLink>
            <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink href="/branding">Branding</HoveredLink>
          </div>
        </MenuItem>

<Link href={"/projects"}>
        <MenuItem setActive={setActive} active={active} item="Projects">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Tour-Management-App"
              href="https://frontend-ph-tour-management-system.vercel.app/"
              src="/navbar images/tour.png"
              description="A Full-Stack web app for managing tours, bookings, and schedules with a responsive modern design."
            />
            <ProductItem
              title="Retro-Forum"
              href="https://retro-forum-tipusahil-project5.surge.sh/"
              src="/navbar images/retro.png"
              description="A retro-styled forum where users can post, comment, and interact in a vintage look."
            />
            <ProductItem
              title="Bus-Ticket-Service"
              href="https://greenline-bus-tickets.surge.sh"
              src="/navbar images/busticket.png"
              description="An online bus ticket system to search, reserve, and purchase tickets quickly."
            />
            <ProductItem
              title="Guessing-Game"
              href="https://political-kettle.surge.sh"
              src="/navbar images/alpha-game.png"
              description="A fun number guessing game with instant feedback and scoring logic."
            />
          </div>
        </MenuItem>
        </Link>

      <Link href={"/testimonials"}>
          <MenuItem setActive={setActive} active={active} item="Testimonials">
          </MenuItem>
        </Link>
        {/* <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/hobby">Hobby</HoveredLink>
            <HoveredLink href="/individual">Individual</HoveredLink>
            <HoveredLink href="/team">Team</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem> */}

      </Menu>
    </div>
  );
}
