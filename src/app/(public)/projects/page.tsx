import { ProjectCard } from "@/components/modules/Projects/ProjectCard";
import { getAllProjects } from "@/services/ProjectServices/ProjectServices";
import { IProject } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All projects | Tipusahil",
  description:
    "Browse all project posts on web development. Next.js, React, and more. Stay updated with latest tutorials and articles.",
};

const AllProjectsPage = async () => {
  try {
    const projects: IProject[] = await getAllProjects();
// console.log(projects)
    return (
      <div className="py-20 max-w-7xl mx-auto z-10">
        <h2 className="text-center text-4xl font-bold text-slate-800 dark:text-slate-100">
          All Projects
        </h2>
        <div className="grid  grid-cols-1  md:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto my-10">
          {projects?.map((project : IProject) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("error from projectsPage: ", error);
    return <div className="text-center text-red-500">Error loading projects</div>;
  }
};

export default AllProjectsPage;
