
import BlogDetailsCard from "@/components/modules/Blogs/BlogCardDetails";
import { getBlogById } from "@/services/BlogServices/BlogService";
import { IBlog } from "@/types";

// ---------start-generateMetadata ------

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ blog_id: string }>;
}) => {
  const { blog_id } = await params;
  // const blog = await getBlogById(blog_id);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${blog_id}`, {
    next:{
      tags:["BLOGS"]
    }
  });
 const blog =await  res.json();
  // console.log({blog});

  return  {
  title: `${await blog?.data?.title} | Tipusahil ` || "Blog Not Found",
  description: blog?.data?.content || "No description available",
  
  };
};
// ---------end-generateMetadata ------

/**  ---------------------
 * ⚡ generateStaticParams কী কাজ করছে এখানে:
 *
 * 👉 SSG (Static Site Generation) ব্যবহার করা হয়েছে
 *    - যাতে কোনো ইউজার যখন individual কোনো blog/post page-এ ঢোকে,
 *      তখন loading state না দেখিয়ে, build-time-এ আগে থেকেই prerender করা static HTML serve হয়।
 *    - এতে SEO ভালো হয়, page একেবারে সাথে সাথে দেখায় (no loading spinner).
 *
 * 👉 এখানে আমরা সব post prebuild করছি না,
 *      বরং শুরু থেকে শুধু top 3 (বা তুমি চাইলে যত খুশি) blog/page generate করছি।
 *    - এর মানে: এই ৩টা পেজ build-time এ বানানো থাকবে।
 *    - বাকিগুলো dynamicParams = true থাকলে প্রথমবার request হলে generate হবে।
 *
 * 👉 behind-the-scenes (build-time এ কী হয়):
 *    - next build চলার সময় Next.js এই ফাংশন চালাবে
 *    - API থেকে সব blog data fetch করবে
 *    - তারপর blogs থেকে slice(0,3) নিয়ে প্রথম ৩টা blog-এর জন্য params বানাবে
 *    - প্রতিটি object এর key = dynamic segment name (blog_id), value = blog.id
 *    - Next.js ওই blog_id অনুযায়ী ৩টা static page prerender করবে
 *
 * 👉 কেন string এ কনভার্ট করা হচ্ছে (String(blog.id)):
 *    - কারণ route parameter সবসময় string হিসেবে resolve হয়।
 *
 * 👉 Important Note:
 *    - generateStaticParams build-time এ একবারই চালায়, runtime এ আবার চালায় না।
 *    - তাই নতুন post prebuild করতে চাইলে নতুন build করতে হবে।
 *    - তবে dynamicParams:true থাকলে অন্য post গুলো অন-ডিমান্ড এ আসতে পারবে।
 */

export const generateStaticParams = async () => {
  // 1) API call → সব post ডাটা আনছে

  // // if (process.env.NODE_ENV === "production") {...};
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post`);
  //   const { data: blogs } = await res.json();

  //   // 2) শুধু প্রথম ৩টা post প্রি-জেনারেট করব
  //   return blogs?.data?.slice(0, 3).map((blog: I) => ({
  //     blog_id: String(blog.id), // route param সবসময় string হতে হবে
  //     // blog_id: blog.id, // ❌ এভাবে রাখলে number হলে problem হবে
  //   }));
  
  // // 3) শুধু টেস্ট করার জন্য চাইলে একটিই fix route return করা যায়:
  // // return [{ blog_id: "1" }];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs`);
    if (!res.ok) {
      throw new Error(`API call failed: ${res.status}`);
    }
    const { data: blogs } = await res.json();
    // console.log("--------------blogs-------------",blogs);// important for debuging
    // console.log("--------------blogs.data-------------",blogs.data);// important for debuging
    return blogs?.slice(0, 3).map((blog: IBlog) => ({
      blog_id: String(blog.id),
    })) || [];
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
};
// --------------------------------------------------------------------

const BlogDetailsPage = async ({ params }:  { params: Promise<{ blog_id: string }> }) => {
try {
    // const BlogDetailsPage = async ({ params }: { params: Promise<{ blog_id: string }> }) =>{
  /* 
/* uporer type ta kaj na korle niser ta use korte hobe ,ar niser params descruct korr smy await dite hbe evabe ( const { blog_id } = await params;), but chatgpt bolse uporer type tai right params kokonu promise hoina naki
{ params: Promise<{ blog_id: string }> }
*/

  // const { blog_id } = params;
    const { blog_id } = await params;
  //   console.log( params);

  const blog = await getBlogById(blog_id,"default");// ei line diyew data fetch hobe,  kaj hobe, niser 2line diyew data fetch hobe.
  // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${blog_id}`);
  // const {data: blog} = await res.json();
// console.log("-------blog", await blog)

  if (!blog) {
  return <div>Blog not found</div>;
}

  return (
    <div className="py-10 max-w-7xl mx-auto">
      {/* <h2 className="text-4xl">BlogDetails Page id {blog_id}</h2> */}
      <BlogDetailsCard blog={blog} />
    </div>
  );
} catch (error) {
  console.log("blog Details page:", error);
  <div>blog not fount!</div>
}
};

export default BlogDetailsPage;
