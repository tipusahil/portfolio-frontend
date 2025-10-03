import { apiRequest } from "@/utils/api";


// Single blog fetch
export const getBlogById = (blog_id: string, cacheType: RequestCache = "default") => {
  return apiRequest(`blogs/${blog_id}`, { cache: cacheType });
};

// All blogs fetch
export const getAllBlogs = () => {
  return apiRequest("blogs", { cache: "no-store" });
};
