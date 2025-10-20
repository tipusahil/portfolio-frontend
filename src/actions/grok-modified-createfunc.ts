// "use server";
// import { revalidateTag } from "next/cache";
// import { redirect } from "next/navigation";
//   interface IModifiedData {
//   title: string,
//   content:string,
//     authorId: number;
//     thumbnail?: string;
//     isFeatured: boolean;
//     tags: string[];
// } 
// export const createBlogServerActionFunc = async (data: FormData) => {
//   // টেক্সট ডেটা প্রসেসিং
//   const blogInfo = Object.fromEntries(data.entries());

//   // ইমেজ ফিল্ড চেক
//   const file = data.get("thumbnail") as File | string | null;
//   let modifiedData;

//   if (file && typeof file === "string") {
//     // যদি external URL হয়
//     modifiedData = {
//       ...blogInfo,
//       authorId: 1, // ডামি authorId, সেশন থেকে নিতে হবে
//       thumbnail: file,
//       isFeatured: Boolean(blogInfo.isFeatured),
//       tags: blogInfo.tags
//         .toString()
//         .split(",")
//         .map((tag) => String(tag.trim())),
//     } as IModifiedData;
//   } else {
//     // ফাইল থাকলে বা না থাকলে

//     modifiedData  = {
//       ...blogInfo,
//       authorId: 1,
//       isFeatured: Boolean(blogInfo.isFeatured),
//       tags: blogInfo.tags
//         .toString()
//         .split(",")
//         .map((tag) => String(tag.trim())),
//     };
//   }

//   // ব্যাকএন্ডে FormData পাঠানো
//   const formData = new FormData();
//   for (const key in modifiedData) {
//     if (Array.isArray(modifiedData[key])) {
//       formData.append(key, JSON.stringify(modifiedData[key])); // অ্যারে হলে JSON স্ট্রিং হিসেবে
//     } else {
//       formData.append(key, modifiedData[key]);
//     }
//   }
//   if (file && file instanceof File) {
//     formData.append("file", file); // ফাইল যোগ করা
//   }

//   // ব্যাকএন্ডে API কল
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/`, {
//     method: "POST",
//     headers: {
//       Authorization:
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJvd25lciIsImVtYWlsIjoidGlwdXNhaGlsLmN0Z0BnbWFpbC5jb20iLCJpYXQiOjE3NTkxNjU2MTcsImV4cCI6MTc2MDAyOTYxN30.IXBu2ab4VLpZNZmPQuV6ekMf3eNs5GJD2BDgR3taQJM",
//     },
//     body: formData, // FormData পাঠানো
//     next: {
//       tags: ["BLOG"],
//     },
//   });

//   const result = await res.json();

//   if (result?.success === true) {
//     revalidateTag("BLOGS");
//     redirect("/blogs");
//   }

//   return result;
// };