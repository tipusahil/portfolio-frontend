import { DropdownMenuDialog } from "@/components/ui/DropdownMenuDialog";
import { IBlog } from "@/types";
import Image from "next/image";
import Link from "next/link";
// import { GlowingEffect } from "@/components/ui/glowing-effect-2-default-color";
import { GlowingEffect } from "@/components/ui/glowing-effect-2-rich-color";


export default function BlogCard({ blog }: { blog: IBlog }) {
  return (
    <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
      {/* 🔥 Glowing Border Effect */}
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
        // movementDuration={0.6} // 🔥 faster and smoother glow speed
        movementDuration={1.5} // 🔥 faster and smoother glow speed

      />

      {/* 🔹 Card Content */}
      <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background/30 p-6 shadow-sm transition-all duration-300 hover:shadow-[0px_0px_27px_0px_rgba(255,255,255,0.2)] dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]">
        <div className="absolute top-1 right-1">
          <DropdownMenuDialog blog_id={blog.id} />
        </div>

        {/* 🖼️ Thumbnail */}
        {blog.thumbnail ? (
          <div className="relative h-56 w-full overflow-hidden rounded-md">
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="h-56 w-full rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300">
            No Image
          </div>
        )}

        {/* ✏️ Content */}
        <div className="flex flex-col flex-1 gap-4">
          <h3 className="text-xl font-semibold text-foreground">
            {blog.title}
          </h3>
          <p className="text-foreground/70 line-clamp-3">{blog.content}</p>

          {/* 👤 Author Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src={
                  blog.author?.picture ||
                  "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
                }
                alt={blog.author.name}
                width={36}
                height={36}
                className="rounded-full border border-border"
              />
              <span className="text-sm text-foreground/70 flex items-center gap-1">
                {blog.author.name}
                {blog.author.isVerified && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </span>
            </div>
            <span className="text-foreground/70 text-sm">
              {blog.view} views
            </span>
          </div>

          <div className="text-right">
            <Link href={`/blogs/${blog.id}`}>
              <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline">
                Read More →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
