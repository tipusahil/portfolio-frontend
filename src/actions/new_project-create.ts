// "use server";
// import { authOptions } from "@/helpers/authOptions";
// import { getServerSession } from "next-auth";
// import { revalidateTag } from "next/cache";
// import { isRedirectError } from "next/dist/client/components/redirect-error";
// // ইন্টারফেস ডিফাইন করা
// interface IModifiedData {
//   title: string;
//   content: string;
//   authorId: number;
//   thumbnail?: string;
//   isFeatured: boolean;
//   tags: string[];
// }

// // সার্ভার অ্যাকশন ফাংশন
// export const createProjectServerActionFunc = async (data: FormData) => {
// // export const createBlogServerActionFunc = async (data: FormData): Promise<void> => {
//   try {
//     // সেশন থেকে ইউজার ডেটা নেওয়া
//     // const session = await getUserSession();
//     // if (!session || !session.userId) {
//     //   throw new Error("User not authenticated");
//     // }

//     // টেক্সট ডেটা প্রসেসিং
 
// // option-1: next-auth use na korle niser niome broser theke cookie get korte hobe, ---------------



// // --------start----next-auth---use kore token newa -----------------
// // option-2:-----next-auth use korle evabe browser theke cookie get korte hbe, 
//  // ✅ NextAuth থেকে session আনো (অথেনটিকেশন চেকের জন্য)
//   // ------------
//   const session = await getServerSession(authOptions);

//     if (!session || !session.user) {
//       throw new Error("User not authenticated! Please login.");
//     }

//     // // ✅ সব কুকি লগ করো ডিবাগের জন্য
//     // const cookieStore =await cookies();
//     // console.log("All cookies:", cookieStore.getAll()); // ✅ সব কুকি দেখো
//     // const accessToken = cookieStore.get("accessToken")?.value;
//      const accessToken = session.user.accessToken;

//     if (!accessToken) {
//       throw new Error("Access token missing! Please login fast.");
//     }
//     console.log("accessToken from browser cookie:", accessToken);
//   // ------------
// // --------end----next-auth---use kore token newa -----------------

//     const blogInfo = Object.fromEntries(data.entries());
//     console.log("blogInfo", blogInfo);
//     // ইমেজ ফিল্ড চেক
//     const file = data.get("thumbnail") as File | string | null;

//     // মডিফাইড ডেটা তৈরি
//     const modifiedData: IModifiedData = {
//       title: blogInfo.title as string,
//       content: blogInfo.content as string,
//       // authorId: 1, // সেশন থেকে authorId
//       authorId: Number(session.user.id), // ✅ session থেকে id
//       // authorId: session.userId, // সেশন থেকে authorId
//       isFeatured: Boolean(blogInfo.isFeatured),
//       tags: blogInfo.tags
//         ? (blogInfo.tags as string)
//             .split(",")
//             .map((tag) => tag.trim())
//             .filter((tag) => tag !== "")
//         : [],
//     };

//     // যদি external URL থাকে, তাহলে thumbnail ফিল্ডে সেট করো
//     if (file && typeof file === "string") {
//       modifiedData.thumbnail = file;
//     }

//     // ফর্মডেটা তৈরি (পোস্টম্যানের ফরম্যাট অনুযায়ী)
//     const formData = new FormData();
//     formData.append("data", JSON.stringify(modifiedData)); // টেক্সট ডেটা JSON হিসেবে
//     if (file && file instanceof File) {
//       formData.append("file", file); // ফাইল যোগ করা
//     }
//     console.log("----formData------", formData);

//     // ব্যাকএন্ডে API কল
// // ======================= EXAMPLE FETCH (DEEP-COMMENTED) =======================
// //
// // এখানে মূল লক্ষ্য: যখন আমরা ব্লগ পোস্ট করার জন্য `fetch` করছি, তখন token/cookie
// // কীভাবে পাঠাবো, কোথায় কেন header ব্যবহার করলে হবে, কোথায় credentials: "include"
// // দরকার — সবকিছু পরিষ্কার করে দেয়া হলো।
// // ==============================================================================

// const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs`, {
//   method: "POST",

//   // ------------------- HEADERS SECTION -------------------
//   // এখানে সাধারণত আমরা Authorization header পাঠাই যদি access token
//   // ক্লায়েন্ট-সাইডে (memory / localStorage / sessionStorage) থেকে নিয়ে ব্যবহার করি।
//   //
//   // NOTE:
//   //  - যদি token httpOnly cookie এর মাধ্যমে সেভ করা থাকে, তাহলে Authorization
//   //    header পাঠানোর দরকার হয় না — কারণ ব্রাউজ যখন cookie পাঠাবে (credentials: "include")
//   //    তখন backend সেই cookie থেকে token পড়বে এবং ভ্যারিফাই করবে।
//   //  - কিন্তু যদি token localStorage/sessionStorage বা রিইক্ট স্টেট এ থাকে,
//   //    তখন সার্ভারে পাঠাতে হলে Authorization: `Bearer ${accessToken}` পাঠাতে হয়।
//   //
//   headers: {
//     // Authorization: `Bearer ${session.token}`, // যদি session.token ক্লায়েন্টে থাকে
//     Authorization: `Bearer ${accessToken}`,
//     //
//     // Attention-1: তুমি যেটা লিখেছ — "session থেকে টোকেন" — সেটা ক্লায়েন্ট সাইডে
//     // যদি অ্যাভেইলেবল থাকে তখনই এই Authorization হেডার ব্যবহার করো।
//     //
//     // Attention-2 (Server Action vs Client Component):
//     // - **Server Action**: এগুলো Node.js সার্ভার সাইডে চলে (browser থেকে run হয় না).
//     //   তাই server action এর ভেতর `fetch` করলে সেটা সার্ভার থেকে করা HTTP কল।
//     //   ব্রাউজার-এর মতো cookie auto-attach হবে না — কারণ browser → server রিকোয়েস্ট আর
//     //   server → server রিকোয়েস্ট আলাদা। তাই server action থেকে যদি তুমি অন্য সার্ভারে
//     //   cookie বা authorization পাঠাতে চাও, তাহলে অবশ্যই headers এ সেট করে দিতে হবে
//     //   বা Node.js context থেকে cookie/read cookie করে header বানাতে হবে।
//     //
//     // Attention-3 (Client Component + fetch from browser):
//     // - যদি এই কোডটি **client component** বা ব্রাউজারে চলে এমন কোনো ফাংশন থেকে হয়,
//     //   তাহলে ব্রাউজার নিজে cookie attach করতে পারে যদি তুমি `credentials: "include"` দাও।
//     //   তখন extra Authorization হেডার না দিয়েও backend cookie থেকে token পেয়ে
//     //   verify করতে পারবে —前提: backend-এ Access token cookie httpOnly ও সঠিক domain/path দিয়ে সেট করা আছে।
//     //
//     // Attention-4 (বিঃদ্রঃ Bearer prefix):
//     // - যদি backend Authorization header expect করে `Bearer <token>` ফরম্যাটে,
//     //   তাহলে client-এও `Bearer ` টা দিতে হবে। কিন্তু যদি backend cookie থেকে token
//     //   নেবে, তখন cookie-তে `Bearer ` না দিয়ে সরাসরি token রাখো — backend যেভাবে পড়তে চায় সে
//     //   ফরম্যাটেই রাখবে। মিল না থাকলে ভেরিফাই ত্রুটি দিবে।
//   },

//   // ------------------- BODY -------------------
//   // POST body হিসেবে FormData পাঠাচ্ছিস — ব্রাউজার FormData পাঠালে
//   // Content-Type header নিজে ঠিক করে (multipart/form-data; boundary=...).
//   // তুমি ম্যানুয়ালি `Content-Type` দিলেই boundary মিস হয়ে গিয়ে request fail করবে।
//   //
//   // তাই: যদি FormData ব্যবহার করো — **কখনোই** `headers['Content-Type']` সেট কোরো না।
//   body: formData,

//   // ------------------- CREDENTIALS -------------------
//   // credentials নির্ধারণ করে ব্রাউজার কি করে cookie attach করবে এটা।
//   // তিনটি সম্ভাব্য মান:
//   //  - "omit" (কখনো cookie পাঠাবে না),
//   //  - "same-origin" (আপনার সাইট ও request URL একই origin হলে পাঠাবে),
//   //  - "include" (cross-origin হলেও cookie পাঠাবে)
//   //
//   // তুমি যে comment এ লিখেছ — "Server Action-এ credentials কাজ করে না" — এটা ঠিক ও না:
//   //  - **Server Actions** Node.js সার্ভার-সাইডে execute হয়; `credentials: "include"`
// //    হল ব্রাউজার API behaviour; সার্ভার-সাইডে এটি কাজ করে না কারণ ব্রাউজার cookie
//   //    attach করা ব্রাউজার-এর কাজ। সার্ভার-সাইডে তুমি যদি cookie পাঠাতে চাও, সেটি
//   //    তোমাকে সরাসরি headers এ দিতে হবে (অথবা Next.js এর cookies() helper ব্যবহার করে)।
//   //
//   //  - **Client** থেকে fetch করে যদি cookie attach করতে চাও, তখন `credentials: "include"`
//   //    লাগে এবং backend-এ CORS ও cookie policy সঠিক থাকতে হবে (নিচে ব্যাখ্যা আছে)।
//   //
//   // সংক্ষেপে:
//   //  - Client → Server (browser request): credentials: "include" দরকার হলে cookie পাঠাবে।
//   //  - Server Action → Server/External API: `credentials` ব্রাউজার-কন্ডিশন প্রযোজ্য নয়;
//   //    এখানে header বা cookie string নিজেই ঠিক করতে হবে।
//   //
//   // তোমার comment-এ বলার মত: "Server-action function theke ( credentials: "include") eta dewar porew token backend e pataina" —
//   // তাই ঘটে কারণ server actions ব্রাউজার নয়, সুতরাং `credentials` কাজ করে না। header লাগবে।
//   //
//   // উদাহরণ:
//   // credentials: "include"  // only meaningful in browser/client fetch()
//   //
//   // Next.js-specific note:
//   // - Next.js app-router এর server action যদি browser থেকে invoke করা হয়, তখন
//   //   browser → server action রিকোয়েস্টে cookie auto পাঠাতে হলে browser fetch call-এ credentials: "include" দিতে হবে.
//   //   কিন্তু server action নিজে যখন অন্য সার্ভারে request করছে, তখন সে cookie attach করবে না।
//   //
//   // conclusion: তুমি যে সমস্যাটা দেখেছ — সেটার কারণটা এটাই।
//   //
//   // ------------------------------------------------------------
//   // নিচে `next: { tags: ["BLOGS"] }` — Next.js fetch cache control / revalidation options
//   // (app-router + RSC/Edge) জন্য দেয়া। এটা revalidation / caching ট্যাগ হিসেবে কাজ করে।
//   // ------------------------------------------------------------
//   next: { tags: ["BLOGS"] },
// });

// // ======================= END FETCH =============================================

//     console.log("res", res);
//     const result = await res.json();
//     // console.log("---------result from create function before succss check -----------:", result);
//     if (result?.success === true) {
//       revalidateTag("BLOGS");
//        console.log("---------result from create function after success check -----------:", result);
//        return result;
//       // redirect("/blogs");

     
//     } else {
//       console.error("Project creation failed:", result.message);
//       throw new Error(result.message || "Project creation failed");
//     }
//   } catch (error: unknown) {
//   if (isRedirectError(error)) {
//     throw error; // redirect হলে normal flow
//   }

//   if (error instanceof Error) {
//     console.error("Error in createProjectServerActionFunc:", error.message);
//     throw new Error(error.message);
//   } else {
//     console.error("Unknown error in createProjectServerActionFunc:", error);
//     throw new Error("Something went wrong");
//   }
// }
// };
