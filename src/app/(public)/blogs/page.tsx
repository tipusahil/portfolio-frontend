import AllBlogsClient from "@/components/modules/Blogs/AllBlogsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Blogs | Tipusahil",
  description:
    "Browse all blog posts on web development. Next.js, React, and more. Stay updated with latest tutorials and articles.",
};

const AllBlogsPage = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs`, {
      next: { tags: ["BLOGS"] },
    });

    if (!res.ok) throw new Error(`API error: ${res.status}`);

    const { data: allBLogs } = await res.json();

    return <AllBlogsClient blogs={allBLogs} />;
  } catch (error) {
    console.error("error from blogsPage:", error);
    return <div>blogs loading failed or error</div>;
  }
};

export default AllBlogsPage;
