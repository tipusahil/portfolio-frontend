import { apiRequest } from "@/utils/api";

// Single blog fetch
export const getProjectById = (
  project_id: string,
  cacheType: RequestCache = "default"
) => {
  return apiRequest(`blogs/${project_id}`, { cache: cacheType });
};

// All projects fetch
export const getAllProjects = () => {
  // return apiRequest("projects", { cache: "no-store" });
  return apiRequest(
    "projects",
    //  { cache:'no-cache'}
    {
      // cache:'no-cache',
      next: {
        tags: ["PROJECTS"],
      },
    }
  );
};
