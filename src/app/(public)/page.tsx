import About from "@/components/modules/About/About";
import BlogCard from "@/components/modules/Blogs/BlogCard";
import GlobeCities from "@/components/modules/Home/Globe";
import { ProjectCard } from "@/components/modules/Projects/ProjectCard";
import Hero from "@/components/modules/hero/Hero";
import Scroll_to_home from "@/components/shared/Scroll_to_home";
import { Button } from "@/components/ui/button";
import { getAllProjects } from "@/services/ProjectServices/ProjectServices";

import { IBlog, IProject } from "@/types";
import Link from "next/link";

const HomePage = async () => {
  // 1.--blogs----
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs`, {
    next: {
      // revalidate: 30//ISR kora hoise homepage tai// caile (no-store)SSR use kora jeto,but etar ketre loading spinner dekate hoi, but homepage e loading Spinner dekanor caite ISR koratai best-1
      tags: ["BLOGS"], //ei ISR tai ortat tag use kora tai best practise, ete server e pressure porbena.

      /**
       * --------------------------------------------------------
       * 🔥 Next.js fetch cache system (deep dive with example)
       * --------------------------------------------------------
       *
       * cache: "no-store"
       * -----------------
       * 👉 এটি দিলে কখনো cache হবে না।
       * 👉 প্রতিবার client/user request করলে runtime এ fresh data server থেকে আনবে।
       * 👉 অর্থাৎ SSG হবে না, এটি সবসময় SSR (Server Side Rendering) হিসেবে কাজ করবে।
       * 👉 Example: frequently changing data (Orders, Payments, Live Scoreboard , Cart, Payments, Cart ইত্যাদি)।
       *
       * cache: "force-cache"
       * --------------------
       * 👉 এটি default behavior।
       * 👉 প্রথমবার data fetch হলে সেটি static HTML এ build time এ cache হয়ে যাবে।
       * 👉 পরবর্তীতে user request এ loading দেখাবে না, cache থেকে serve করবে।
       * 👉 Example: rarely changing data (Static blog posts, About page, Docs, FAQ page)।
       *
       * next: { revalidate: 30 }
       * -------------------------
       * 👉 এটাকে বলে ISR (Incremental Static Regeneration)।
       * 👉 প্রথমবার data fetch হয়ে cache হবে।
       * 👉 এরপর প্রতি 30 সেকেন্ড পর backend এ silently data regenerate হবে।
       * 👉 User আগের cached data দেখবে, কিন্তু নির্দিষ্ট সময় পর নতুন data serve হবে।
       * 👉 Example: ( Product listing, listing page, News feed (auto refresh every X sec) যেখানে ডেটা ঘন ঘন change হয় না।
       *
       *
       * next: { tags: ["PRODUCT"] }
       * ----------------------------
       * 👉 Tag ভিত্তিক cache invalidation system।
       * 👉 তুমি চাইলে specific action এ cache refresh করতে পারবে।
       * 👉 Example: product update/add/delete হলে শুধু "PRODUCT" tag invalidate/(cache clear) হবে।
       * 👉 এর ফলে পুরো cache refresh না হয়ে targeted cache update হবে।
       *
       * next: { tags: ["USER"] }
       * -------------------------
       * 👉 User ভিত্তিক data change হলে tag invalidate/( cache invalidate ) হবে।
       * 👉 Example: (user profile update / authentication data / Auth session)।
       *
       * next: { tags: ["PRODUCT","USER"] }
       * ----------------------------------
       * 👉 একাধিক tag ব্যবহার করলে, যেকোনো tag invalidate হলেই নতুন করে fetch হবে।
       * 👉 Example: এমন পেজ যেখানে product + user info একসাথে render হচ্ছে।
       * 👉 kinba: Dashboard যেখানে একসাথে user + product data লাগে।
       *
       * --------------------------------------------------------
       * 📌 Summary & Best Practice:
       * --------------------------------------------------------
       * 1. SSR (Always fresh, no cache) → cache: "no-store"
       * 2. SSG (Static + cached forever) → cache: "force-cache"
       * 3. ISR (Static + refresh by time) → next: { revalidate: X }
       * 4. ISR (Smart refresh by tags)   → next: { tags: [...] } ✅ Best way
       *
       * 🟢 Real life usage:
       * -------------------
       * - "no-store" → Checkout, Payments, Cart data
       * - "force-cache" → Static content (Docs, Blogs)
       * - "revalidate" → Product listing (refresh every X seconds)
       * - "tags" → Product/User dashboard (fresh only when needed)
       *
       * ========================================================
       * ⚡ Native fetch cache modes (browser level)
       * ========================================================
       * এগুলো ব্রাউজারের fetch API এর part, কিন্তু Next.js এও set করা যায়।
       * অনেক সময় debugging বা custom scenario তে কাজে লাগে।
       *
       * cache: "default"
       * ----------------
       * 👉 ব্রাউজারের default cache policy (heuristic ভিত্তিক)।
       * 👉 সাধারণত server এর cache-control header এর উপর নির্ভর করে।
       * 👉 Example: সাধারণ static fetch যেখানে explicit rule নাই।
       *
       * cache: "reload"
       * ---------------
       * 👉 সবসময় network থেকে নতুন data আনবে।
       * 👉 cache bypass করবে, তবে পরে নতুন data cache করবে।
       * 👉 Example: Page refresh এ সবসময় নতুন data পেতে চাইলে।
       *
       * cache: "no-cache"
       * -----------------
       * 👉 Request send করার আগে server এ "validate" করে।
       * 👉 Cache এ data থাকলেও, server confirm করলে তবেই ব্যবহার করবে।
       * 👉 Example: Data validity গুরুত্বপূর্ণ (Weather API, Stock price)।
       *
       * cache: "only-if-cached"
       * -----------------------
       * 👉 Cache এ থাকলে serve করবে, না থাকলে error দেবে।
       * 👉 Network hit করবে না।
       * 👉 Example: Offline mode data serve করার সময়।
       *
       * ========================================================
       * 📌 Summary & Best Practice (Next.js perspective):
       * ========================================================
       * 1. SSR (Always fresh, no cache)     → cache: "no-store"
       * 2. SSG (Static + cached forever)    → cache: "force-cache"
       * 3. ISR (Static + time refresh)      → next: { revalidate: X }
       * 4. ISR (Smart refresh by tags)      → next: { tags: [...] } ✅ Best way
       *
       * ========================================================
       * 🟢 Real life usage (Cheat Sheet):
       * ========================================================
       * - "no-store"        → Checkout, Payments, Cart, Live scores
       * - "force-cache"     → Docs, Blog posts, Static pages
       * - "revalidate: X"   → Product listing, News feed (auto refresh)
       * - "tags"            → Product/User dashboard (fresh only when needed)
       * - "default"         → General requests (depends on server cache-control)
       * - "reload"          → Force fetch fresh copy (still cache new result)
       * - "no-cache"        → Validate with server before using cache
       * - "only-if-cached"  → Offline mode / must-use cache only
       *
       * ========================================================
       */
    },
  });
  // const blogs = await res.json();
  const { data: blogs } = await res.json();
  // console.log(blogs);
  // console.log(res);
  // console.log(blogs.data);
  // console.log(blogs.meta);

  // -----2.--------projects fetchingg-----
  const project_res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/projects`,
    {
      next: {
        tags: ["PROJECTS"],
      },
    }
  );
  // const  {data : projects} = await project_res.json();
  const projects: IProject[] = await getAllProjects();
  console.log(blogs);
  console.log(res);
  console.log(blogs.data);

  // -------------projects fetchingg-----

  // ---------------------------------------this page all work-----
  const scrollToAbout = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  // ---------------------------------------this page all work-----

  return (
    <div>
      <div>
        <Hero />
      </div>

      <GlobeCities />

      <div>
        <About />
      </div>
      <div className="my-10">
        <h2 className="text-center my-5 xl sm:text-2xl md:text-3xl text-4xl">
          ✨Featured Posts✨
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2 max-w-6xl mx-auto my-5">
          {blogs?.slice(0, 6).map((blog: IBlog) => (
            // blogs?.data?.map((blog : IBlog) => (
            <BlogCard key={blog?.id} blog={blog} />
          ))}
        </div>

        <div className="flex flex-col my-3 items-center justify-center">
          <Link href="/blogs">
            <Button className="btn-premium text-primary-foreground shadow-glow hover:scale-105">
              ✨Read more blog
            </Button>
          </Link>
        </div>
      </div>

      {/* -----projects */}
      <div id="projects" className="my-10">
        <h2 className="text-center my-5 xl sm:text-2xl md:text-3xl text-4xl">
          ✨Projects Showcase✨
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2 max-w-6xl mx-auto my-5">
          {projects?.slice(0, 6).map((project: IProject) => (
            // blogs?.data?.map((project : IBlog) => (
            <ProjectCard key={project?.id} project={project} />
          ))}
        </div>

        <div className="flex flex-col my-3 items-center justify-center">
          <Link href="/projects">
            <Button className="btn-premium text-primary-foreground shadow-glow hover:scale-105">
              ✨See all projects
            </Button>
          </Link>
        </div>
      </div>

        <Scroll_to_home id="home" />
    </div>
  );
};

export default HomePage;
