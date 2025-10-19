"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PinContainer } from "@/components/ui/3d-pin";
import { IProject } from "@/types";

interface ProjectCardProps {
  project: IProject;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="h-[30rem] w-full flex items-center justify-center z-10">
    {/* <div className="h-[30rem]  w-full flex items-center justify-center bg-foreground dark:bg-background"> */}
      <PinContainer title={project.title} href={project.link || "link not provided yet"}>
        <div className="flex flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[24rem] bg-gradient-to-b from-slate-800/50 to-slate-800/0 backdrop-blur-sm border border-slate-700/50 rounded-2xl">
          {/* Thumbnail */}
          <div className="relative w-full h-36 bg-foreground overflow-hidden rounded-lg border border-slate-700/50">
            <Image
              src={project.thumbnail || "/navbar-images/retro.png"}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Title & Description */}
          <div className="flex-1 mt-4">
            <h3 className="text-xl font-bold text-slate-100">{project.title}</h3>
            <p className="text-sm text-slate-400 mt-1 line-clamp-3">
              {project.description}
            </p>
          </div>

          {/* Footer Info */}
          <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
            <span>Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
            <Link
              href={project.link || "link not provided yet"}
              target="_blank"
              className="text-sky-600 text-sm font-medium hover:underline"
            >
              Live Link →
            </Link>
          </div>
        </div>
      </PinContainer>
    </div>
  );
};
