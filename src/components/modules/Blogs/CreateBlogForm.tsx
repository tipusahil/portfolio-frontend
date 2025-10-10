"use client"; // kuno function k server function kore hole ei line use korte hbe.ar eta server  action function
import { createBlogServerActionFunc } from "@/actions/create";
// import { createBlog } from "@/actions/create";
import SingleImageUploader from "@/components/SingleFileUploader";

import Form from "next/form"; // nije theke import korte hoi saggesstion asena eta

import { useState } from "react";

export default function CreateBlogForm() {
  const [isFeatured, setIsFeatured] = useState("false");

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
        action={createBlogServerActionFunc}
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
          className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </Form>
    </div>
  );
}
