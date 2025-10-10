
import BlogCard from "@/components/modules/Blogs/BlogCard";
import { getAllBlogs } from "@/services/BlogServices/BlogService";
import { IBlog } from "@/types";
import { Metadata } from "next";

export const metadata :Metadata = {// metadata server compo te use kora jai shudo
  title : "All Blogs | Tipusahil",
 description: "Browse all blog  posts on web development.Next.js,React, and more.Stay updated with latest tutorials and articles.",
}


const AllBlogsPage = async () => {
  try {
     const blogs :IBlog[] = await getAllBlogs();
console.log(blogs)
  return (
    <div className="py-30 max-w-7xl mx-auto">
      <h2 className="text-center text-4xl">All Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2 max-w-6xl mx-auto my-5">
        
{
  // blogs?.data?.map((blog : IBlog) => <BlogCard key={blog?.id} blog={blog}/>)
  blogs?.map((blog : IBlog) => <BlogCard key={blog?.id} blog={blog}/>)
}
      </div>
    </div>
  );
  } catch (error) {
    console.log("error from blogsPage: ",error)
       return <div>Error loading blogs</div>; 
  }
};

export default AllBlogsPage;
