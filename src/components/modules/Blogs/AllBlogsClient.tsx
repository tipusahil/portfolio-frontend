"use client";

import BlogCard from "@/components/modules/Blogs/BlogCard";
import { IBlog } from "@/types";

interface AllBlogsClientProps {
  blogs: IBlog[];
}

const AllBlogsClient = ({ blogs }: AllBlogsClientProps) => {
  return (
    <div className="py-20 max-w-7xl mx-auto">
      <h2 className="text-center text-4xl font-bold mb-10 text-foreground">
        ✨ All Blogs ✨
      </h2>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 max-w-6xl mx-auto my-5">
        {blogs?.slice(0, 6).map((blog: IBlog) => (
          <li key={blog.id} className="list-none">
            <BlogCard blog={blog} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllBlogsClient;
