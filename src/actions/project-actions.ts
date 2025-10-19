// "use server";
// /**
//  * 📝 Explanation:
//  * এই লাইনটা দিলে পুরো ফাইলের ভেতরে যেকোনো exported function automatically 
//  * "Server Action" হিসেবে treat হবে (Next.js 13+ feature)।
//  * - মানে এই ফাইলের ফাংশনগুলো **কখনো client side bundle-এ যাবে না**।
//  * - console.log() করলে output browser console এ নয়, server terminal এ দেখা যাবে।
//  * - এটা এক ধরনের security boundary, যাতে client কখনো server-only কোড execute করতে না পারে।
// //  * 🟢 Server Actions enable করার জন্য এই লাইন টপে দিতে হয়। 
// // 👉 এটাতে বোঝানো হয় যে এই ফাংশন শুধুমাত্র সার্ভার-সাইডে রান করবে, ক্লায়েন্টে না।
// // 👉 তাই console.log করলে output ব্রাউজারে না, টার্মিনালে (server logs) দেখা যাবে।
// // 📌 Industry Standard: সব server action function এ একদম উপরে এটি থাকতে হবে।


//  */

// // import { cookies } from "next/headers";

// import path from "path"; // ✅ Node.js built-in module → filesystem path resolve করার জন্য।

// import fs from "fs";
// // 🟢 Node.js built-in File System module, লোকাল ফাইল লেখার/পড়ার কাজে ব্যবহার হয়।
// // 👉 এখানে লোকাল uploads ফোল্ডারে image লিখতে ব্যবহার হচ্ছে।
// // ⚠️ Industry Note: Production এ সাধারণত লোকাল ফাইলসিস্টেমে ইমেজ সেভ করা হয় না। Cloud storage (AWS S3, Cloudinary) use করা হয়।

// import { revalidateTag } from "next/cache"; // ✅ Next.js API → cache invalidate করার জন্য।

// import { redirect } from "next/navigation"; // ✅ Next.js API → server-side navigation করার জন্য।
// // import { getUserSession } from "@/helpers/getUserSession";
// // 🟢 custom helper function যা session থেকে currently logged-in user এর data ফেরত দেয়।
// // 👉 AuthorId dynamically নিতে হবে বলে session দরকার।

// // ============================================================================
// //                               SERVER ACTION
// // ============================================================================
// export const createProjectServerActionFunc = async (data: FormData) => {
// try {
//     /**
//    * 📝 Explanation:
//    * এই ফাংশনটা server action → তাই এটা শুধু server-এ run করবে।
//    * parameter "data" হচ্ছে HTML form থেকে আসা FormData।
//    * Best Practice: সবসময় async রাখবে কারণ এর ভেতরে file upload, db call, fetch ইত্যাদি থাকবে।
// //    *   // 🟢 async function: Server action সবসময় async হতে হবে। 
//   // কারণ এখানে async কাজ হচ্ছে (session fetch, file read/write, API call ইত্যাদি)।
//    */

//   // const session = await getUserSession();
//   // 🟢 এখানে logged-in user এর session data নেয়া হচ্ছে।
//   // 👉 AuthorId হিসেবে ব্যবহার করার জন্য।
//   // 📌 Best Practice: সবসময় session থেকে user.id নিতে হবে, client থেকে আসা id ব্যবহার করা নিরাপদ না (tampering হতে পারে)।

//   // ---------------- Convert FormData to Object ----------------
//   const projectInfo = Object.fromEntries(data.entries());
//   /**
//    * 📝 Explanation:
//    * - FormData.entries() key-value pair iterable দেয়।
//    * - Object.fromEntries() দিয়ে সরাসরি একে JS object এ কনভার্ট করলাম।
//    * Best Practice: form data নিয়ে কাজ করার আগে এটাকে Object বানানো সুবিধাজনক।
//    */

//   // -------------------------- START: File Or Image Uploader -------------------
//   const file = data?.get("thumbnail") as File | null;
//   let imageURL: string;

//   if (file && typeof file === "string") {
//     // 🟢 Case 1: যদি সরাসরি একটা external URL string  (external link) দেওয়া হয় thumbnail হিসেবে।
//     imageURL = file;
//   } else if (file && file instanceof File) {
//     // ✅ Case 2: Thumbnail ফিল্ড যদি আসলেই user-uploaded file হয়
//     const bytes = await file.arrayBuffer(); // file → ArrayBuffer // ফাইলকে binary data তে নেয়া।
//     const buffer = Buffer.from(bytes); // Buffer এ convert। // ArrayBuffer → Node.js Buffer
//     const filePath = path.join(process.cwd(), "public/uploads", file.name); // 👉 ফাইল কোথায় save হবে তার absolute path বানানো হচ্ছে।
//     // process.cwd() = current project root
//     // public/uploads = Static folder যেখানে file serve হবে
//     fs.writeFileSync(filePath, buffer); // file system এ save করা
//     imageURL = `/uploads/${file.name}`; // public path assign করা
//   } else {
//     // ✅ Case 3: কিছুই না পেলে fallback। hisene dummy image ব্যবহার করা
//     imageURL = "/uploads/dami_image.png";
//   }
//   // -------------------------- END: File Or Image Uploader ---------------------
//   /**
//    * 🔑 Best Practice Notes:
//    * - production এ file storage এর জন্য fs ব্যবহার করা উচিত নয় (কারণ serverless function এ FS persist করে না)।
//    * - Industry standard: AWS S3 / Cloudinary / Supabase storage এর মত external file storage service use করা।
//    * - local uploads শুধু demo / dev purpose এর জন্য রাখো।
//    */

//   // ---------------- Modified Data Prepare ----------------
//   const modifiedData = {
//     ...projectInfo,
//     thumbnail: imageURL,
//     // authorId: 1, // ✅ Dummy author ID (normally এখানে auth session থেকে আসবে)
//     // isFeatured: Boolean(projectInfo.isFeatured), // boolean এ cast করা
//     // tags: projectInfo.tags
//     //   .toString()
//     //   .split(",")
//     //   .map((tag) => String(tag.trim())),
//   };

//   console.log("modify data:",modifiedData);
//   /**
//    * 📝 Explanation:
//    * modifiedData হচ্ছে final data যেটা API / DB তে পাঠানো হবে।
//    * Best Practice: সবসময় backend এ sanitize/validate করতে হবে।
//    * Industry Standard:
//    * - TypeScript/Zod দিয়ে schema validate করা।
//    * - Yup/Joi এর মত validation লাইব্রেরি use করা।
//    */

//   // ---------------- API Call (Create project) ----------------
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/projects/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization:   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJvd25lciIsImVtYWlsIjoidGlwdXNhaGlsLmN0Z0BnbWFpbC5jb20iLCJpYXQiOjE3NjA2MTEyMzcsImV4cCI6MTc2MTQ3NTIzN30.y13O0DuOt1uG9HWoeHP6u5whuMVZ4vQEKHjA0Mrmqb8",
//         //  Authorization: `Bearer ${token}`, // cookie থেকে পাওয়া token use করলো
//     },
//     body: JSON.stringify(modifiedData),
//     next: {
//       tags: ["PROJECTS"],
//     },
//   });

//   const result = await res.json();

//   /**
//    * 📝 Explanation:
//    * - এখানে আমরা external/internal API hit করছি।
//    * - next:{ tags } দেওয়ার মানে হচ্ছে এই fetch call caching এর সাথে project ট্যাগ bind হচ্ছে।
//    * ❌ কিন্তু এটা mutation invalidate করবে না।
//    * ✅ তাই নিচে success হলে revalidateTag() করতে হবে।
//    */

//   // ---------------- Success Handle ----------------
//   if (result?.success === true) {
//       console.log("success True----:", result);
//     revalidateTag("PROJECTS");
//     /**
//      * 📝 Explanation:
//      * - এইটা industry standard।
//      * - revalidateTag("project") দিলে cached GET requests (যেগুলোতে next:{tags:["project"]} ছিলো)
//      *   automatically invalidate হয়ে fresh data নিয়ে আসবে।
//      * - mutation করার পরে সবসময় explicitly revalidate করা best practice।
//     //  *     // 🟢 project cache invalidate করা হলো।
//     // 👉 যাতে নতুন project create হবার পর সাথে সাথে latest data দেখা যায়। 
//      */
//     // revalidatePath("/projects"); // ❌ এক্ষেত্রে ট্যাগ based invalidation বেশি scalable (industry standard)।

//     redirect("/projects");
//     /**
//      * 📝 Explanation:
//      * - Server Action এ client-side router.push() ব্যবহার করা যায় না।
//      * - এজন্য redirect() use করতে হয় → এটি server-side redirect করবে।
//      * - Industry standard: Mutation success হলে redirect করা বা success message দেখানো।
//      */
//   }

//   console.log("successFalse----", result);
//   return result;
//   /**
//    * 📝 Explanation:
//    * সব result return করাই ভালো, কারণ client component চাইলে response ব্যবহার করতে পারে।
//    */
// } catch (error) {
  
// }
// };

// /* ------------------- Extra Notes -------------------
// ✅ Server Action এ সবসময় এই ৩টা মাথায় রাখবে:
// 1. File upload হলে Local FS এ না রেখে external storage (S3/Cloudinary) use করাই industry standard।
// 2. Mutation success হলে সবসময় cache invalidate করবে → revalidateTag() বা revalidatePath()।
// 3. redirect() server action এ use করবে, client এ নয়।

// ❌ Common Mistakes:
// - শুধুমাত্র fetch এর মধ্যে next:{tags:["project"]} দিয়ে cache invalidate আশা করা (এটা হয় না)।
// - Local FS এ production file upload (serverless এ কাজ করবে না)।
// - Server action এর ভেতরে সরাসরি window/document/localStorage access করা (এগুলো client only)।

// */

// // ============================================================================
// //          CLIENT COMPONENT থেকে SERVER ACTION USE করার নিয়ম
// // ============================================================================

// /* 
// export const OnnoCompo = () => {
//   ...
//   const create = async (data: FormData) => {
//     "use server"; // 🟢 Server Action enable করতে function এর একদম top এ লিখতে হবে।
//     console.log(data);
//     ...
//   };
// }
// */
// // 👉 এইভাবে client component থেকেও server action use করা যায়।
// // 👉 Industry Standard: Server Actions সরাসরি form এর action হিসেবে bind করা উত্তম।
// // Example: <form action={createproject}>...</form>
