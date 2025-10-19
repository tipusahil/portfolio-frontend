"use client"; // kuno function k server function kore hole ei line use korte hbe.ar eta server  action function

/*

*---------------------------------------------------------------
🧩 দুই ধরনের Form Handling আছে Next.js এ
🟦 ১️⃣ Traditional React Form (client-side submit)

*-*****************-----1. normal html form tag/react form tag------********************
<form onSubmit={handleSubmit}>

use client component এ কাজ করে

তুমি নিজে preventDefault(), toast, loading state, error handling করো

✅ সুবিধা:

পুরোটাই client-side, তাই:

toast, state, loading ইত্যাদি UI feedback real-time কাজ করে

React lifecycle maintain থাকে

Third-party integration সহজ (e.g. Stripe, Firebase, toast, Zustand ইত্যাদি)

UX smooth হয় (page reload হয় না)

Complex validation, dynamic UI state ইত্যাদিতে বেশি flexible

❌ অসুবিধা:

Server action বা database call করার জন্য আলাদা API route বা server action call লাগবে

খুব বড় form হলে network latency handle manually করতে হয়

*-*****************-----2.nextjs Form component------********************
🟩 ২️⃣ Next.js <Form> (from "next/form") + Server Actions

Server Action-ভিত্তিক form submission (Next.js 14/15 এর নতুন ফিচার)

✅ সুবিধা:

Super clean syntax
action={serverActionFunc}

Defaultভাবে:

preventDefault দরকার হয় না

File upload ও FormData nativeভাবে handle হয়

Security-wise ভালো: কারণ action সরাসরি server-side চলে

সার্ভারে automatically serialize/deserialize হয়

কোনো API endpoint লাগে না (zero boilerplate)

Form submission করলে automatic revalidation বা redirect() করা যায়

খুব efficient যখন তুমি simple CRUD কাজ করো (e.g. CMS admin panel, dashboard, blog editor ইত্যাদি)

❌ অসুবিধা:

React state reactivity হারিয়ে ফেলে
(তুমি isSubmitting, toast, loading ইত্যাদি client-side থেকে দেখাতে পারো না) karon nextjs er ei Form component behind the seeen page ta relaod kore fele. tai state gulo reseet hoye jai.

toast বা spinner দেখাতে হলে workaround করতে হয়

কিছু complex UI case-এ খুব rigid হয়ে যায়

Transition/reload effect চলে আসে (যদি "use client" form-এর মধ্যে না থাকে)

Server Actions এখনও experimental (Next.js 15 stable হলেও ecosystem এখনও evolving)

🧠 তাহলে Industry Standard কী?
Context	Best Approach	Reason
✅ Simple CRUD admin forms	Next.js <Form> + Server Actions	কম কোড, security ভালো, revalidation সহজ
✅ Complex interactive forms (e.g. blog editor, checkout form, profile update)	Client-side <form> + toast/loading + Server Action call via JS	UX ভালো, react state ও feedback maintain থাকে
✅ File upload, progress bar, toast	Client form	তুমি UI full control পাবে
✅ API + external backend integration	Client-side form → fetch("/api/...")	full flexibility
💡 Best practice (Industry pattern)

Mixed approach:

ছোট বা simple form → <Form action={serverAction}>

বড় বা reactive form → client form + serverAction call manually

যেমন:

// client form
const formData = new FormData(e.target);
const res = await createBlogServerActionFunc(formData);


এই approach টা industry তে এখন সবচেয়ে জনপ্রিয় কারণ:

UX smooth

Security strong (server action এর কারণে)

Loading/toast fully controllable

⚙️ Efficiency comparison
Metric	next/form	client form
Performance	✅ Slightly faster (no JS needed)	⚡ Slightly slower (depends on React state)
Developer control	❌ কম	✅ অনেক বেশি
SSR compatibility	✅ ভালো	⚡ Works with hydration
User Experience	⚠️ Basic	💯 Dynamic, polished
Toast / Animation	❌ কঠিন	✅ সহজ
Debugging	❌ server-side heavy	✅ easy with console
🏁 Final verdict (for তোমার মতো real project devদের জন্য):

🔹 Short answer:

➤ Small CRUD: next/form
➤ Real-world apps (toast, file upload, loading state): client form + server action

🔹 Best pattern (industry-standard Next.js 15+)

"use client";

import { createBlog } from "@/actions/create";
import toast from "react-hot-toast";

const handleSubmit = async (formData: FormData) => {
  toast.loading("Creating blog...");
  const result = await createBlog(formData);
  toast.dismiss();
  result.success ? toast.success("Done!") : toast.error("Failed!");
};


*1..normal form tag  use korle (Traditional):
💡 Summary:
- Full control over UI/UX: loading, toast, validation, redirect
- Works everywhere: API routes, server actions, external backend
- Mature & stable, widely used in production (industry standard)
- Pros: Full UX control, debugging & testing easy, maintainable
- Cons: Slightly more boilerplate (preventDefault, FormData), client-side submission extra JS run, SSR revalidation manual
- Best for: Blogs, SaaS dashboards, e-commerce, forms with toast/loading
- Avoid: Tiny admin panel with minimal UX, purely CRUD internal forms

*2.nextJs Form Component use korle (new but small project):
💡 Summary:
- Best for: Internal CRUD dashboards, simple forms
- Pros: Automatic FormData, SSR-friendly, minimal syntax
- Cons: Limited UX control, experimental API, debugging harder
- Industry usage: ~30% (Next.js 15, experimental)
*---------------------------------------------------------------
*/


import { createBlogServerActionFunc } from "@/actions/create";
// import { createBlog } from "@/actions/create";
import SingleImageUploader from "@/components/SingleFileUploader";

import Form from "next/form"; // nije theke import korte hoi saggesstion asena eta
import { useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

export default function CreateBlogForm() {
  const [isFeatured, setIsFeatured] = useState("false");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleFormSubmitting = async (formData: FormData) => {
    try {
      toast.loading("Creating blog...", { duration: 3000 });
      setIsSubmitting(true); // disable button

      // ✅ call the server action
      const result = await createBlogServerActionFunc(formData);
      console.log("---------------result ------------", result);
      // success হলে চাইলে একটা toast বা alert দিতে পারো
      if (result?.success) {
        // -----------------window---------
        // alert("✅ Blog created successfully!");
        window.location.href = "/blogs"; // window er alert theke redirect korte caile evabe korte hobe,alert er ok btn e click korlei oi /blogs route e niye jabe.
        // ----------window----------
        toast.dismiss(); // আগের loading বন্ধ করা
        toast.success("✅ Blog created successfully!", { duration: 5000 });
        router.push("/blogs"); // অন্য পেজে নিয়ে যায়
      }
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("❌ Failed to create blog!", { duration: 5000 });
    } finally {
      setIsSubmitting(false); // আবার enable করে দাও
    }
  };

  // ------
  //   const create = async ( data : FormData) =>{// server action func ta async func hote hobe.
  // "use server";// eta serverAction func er pet er ekdm top/upore likte hoi evabe, karon ami cacci eta ekta server function hisebe run hok.
  // console.log(data)
  //   };
  // ------

  return (
    <div className=" min-w-[300px] max-w-[700px] w-full h-screen ">
      <Form /** eta nextjs er form component*/
        // action="/blogs"// from submit kore kon route e niye jabe seta action e bole dite hbe.
        // action={createBlogServerActionFunc}
        action={handleFormSubmitting}
        formEncType="multipart/form-data" // ei line tai ✅ এটা ঠিকভাবে file + data কে server action এ পাঠাবে। form-data hisebe backend e jabe tai. eta dite hbe
        className="max-w-3xl mx-auto p-6  shadow-md rounded-lg space-y-2 w-full"
      >
        <h2 className="text-xl font-semibold mb-4">Create Blog</h2>

        {/* Title */}
        <div>
          {/* <label className="block text-sm font-medium mb-1" htmlFor="title">
          Title
        </label> */}
          <input
            placeholder="Title"
            type="text"
            id="title"
            name="title"
            className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Content */}
        <div>
          {/* <label className="block text-sm font-medium mb-1" htmlFor="content">
          Content
        </label> */}
          <textarea
            placeholder="Content"
            id="content"
            name="content"
            // rows={4}
            rows={2}
            className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
          />
        </div>

        {/* -----Thumbnail----- */}
        <div>
          {/* --- */}
          {/* <label className="block text-sm font-medium mb-1" htmlFor="thumbnail">
          Thumbnail URL
        </label>
        <input
          type="url"
          id="thumbnail"
          name="thumbnail"
          className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
        /> */}

          {/* --------- */}
          <div className="w-full rounded-md">
            <SingleImageUploader
              message={"Thumbnail"}
              onChange={(file) => {
                if (file) {
                  const dataTransfer = new DataTransfer();
                  dataTransfer.items.add(file as File);
                  const input =
                    document.querySelector<HTMLInputElement>("#thumbnail-file");
                  if (input) {
                    input.files = dataTransfer.files;
                  }
                }
              }}
            />
          </div>

          <input
            type="file"
            id="thumbnail-file"
            name="thumbnail"
            className="hidden"
          />

          {/* --------- */}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="tags">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="Next.js, React, Web Development"
            className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Featured */}
        <div className="flex gap-6 items-center">
          <p className="block text-sm font-medium mb-1">Featured</p>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="isFeatured"
                value="true"
                checked={isFeatured === "true"}
                onChange={(e) => setIsFeatured(e.target.value)}
                className="text-blue-600 focus:ring-blue-500"
              />
              Yes
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="isFeatured"
                value="false"
                checked={isFeatured === "false"}
                onChange={(e) => setIsFeatured(e.target.value)}
                className="text-blue-600 focus:ring-blue-500"
              />
              No
            </label>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-600 text-white  font-medium py-2 rounded-md hover:bg-blue-700 transition${
            isSubmitting ? "disabled" : "visible"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </Form>
    </div>
  );
}
