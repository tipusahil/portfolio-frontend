"use server";
import { revalidateTag } from "next/cache";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

// ইন্টারফেস ডিফাইন করা
interface IModifiedData {
  title: string;
  content: string;
  authorId: number;
  thumbnail?: string;
  isFeatured: boolean;
  tags: string[];
}

// সার্ভার অ্যাকশন ফাংশন
export const createBlogServerActionFunc = async (data: FormData) => {
  try {
    // সেশন থেকে ইউজার ডেটা নেওয়া
    // const session = await getUserSession();
    // if (!session || !session.userId) {
    //   throw new Error("User not authenticated");
    // }

    // টেক্সট ডেটা প্রসেসিং
    const blogInfo = Object.fromEntries(data.entries());
    console.log("blogInfo", blogInfo);
    // ইমেজ ফিল্ড চেক
    const file = data.get("thumbnail") as File | string | null;

    // মডিফাইড ডেটা তৈরি
    const modifiedData: IModifiedData = {
      title: blogInfo.title as string,
      content: blogInfo.content as string,
      authorId: 1, // সেশন থেকে authorId
      // authorId: session.userId, // সেশন থেকে authorId
      isFeatured: Boolean(blogInfo.isFeatured),
      tags: blogInfo.tags
        ? (blogInfo.tags as string)
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "")
        : [],
    };

    // যদি external URL থাকে, তাহলে thumbnail ফিল্ডে সেট করো
    if (file && typeof file === "string") {
      modifiedData.thumbnail = file;
    }

    // ফর্মডেটা তৈরি (পোস্টম্যানের ফরম্যাট অনুযায়ী)
    const formData = new FormData();
    formData.append("data", JSON.stringify(modifiedData)); // টেক্সট ডেটা JSON হিসেবে
    if (file && file instanceof File) {
      formData.append("file", file); // ফাইল যোগ করা
    }
    console.log("formData", formData);

    // ব্যাকএন্ডে API কল
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/`, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${session.token}`, // সেশন থেকে টোকেন
        Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJvd25lciIsImVtYWlsIjoidGlwdXNhaGlsLmN0Z0BnbWFpbC5jb20iLCJpYXQiOjE3NTkxNjU2MTcsImV4cCI6MTc2MDAyOTYxN30.IXBu2ab4VLpZNZmPQuV6ekMf3eNs5GJD2BDgR3taQJM`, // সেশন থেকে টোকেন
      },
      body: formData,
      next: {
        tags: ["BLOGS"],
      },
    });
    console.log("res", res);
    const result = await res.json();
    console.log("result:", result);
    if (result?.success === true) {
      revalidateTag("BLOGS");
      console.log("result message: ", result?.message);
      redirect("/blogs");
    } else {
      console.error("Blog creation failed:", result.message);
      return {
        success: false,
        message: result.message || "Blog creation failed",
      };
    }
  } catch (error: any) {
       if (isRedirectError(error)) {
      throw error; // redirect হলে normal flow
    }
    console.error("Error in createBlogServerActionFunc:", error.message);
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
};
