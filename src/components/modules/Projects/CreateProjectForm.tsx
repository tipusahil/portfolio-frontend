"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import SingleImageUploader from "@/components/SingleFileUploader";
import { FileMetadata } from "@/hooks/use-file-upload";
import { useRouter } from "next/navigation";

// ✅ Validation schema
const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  link: z.string().url({ message: "Please enter a valid project URL" }),
});

const CreateProjectForm = () => {
  const [image, setImage] = useState<(File | FileMetadata) | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      link: "",
    },
  });

  // ✅ Submit Handler
  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    try {
      if (status === "loading") {
        toast.error("Session is loading, please wait...");
        return;
      }

      if (!session?.user) {
        toast.error("You must be logged in to create a project!");
        return;
      }

      const accessToken = session.user.accessToken;
      if (!accessToken) {
        toast.error("Access token missing! Please login again.");
        return;
      }

      const toastId = toast.loading("Creating project...");

      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          ...data,
          authorId: Number(session.user.id),
        })
      );
      if (image) formData.append("file", image as File);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/projects/`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          next: { tags: ["PROJECTS"] },
        }
      );

      const result = await response.json();
      toast.dismiss(toastId);

      if (!response.ok) {
        console.error("Create failed:", result);
        toast.error(result?.message || "Project creation failed ❌");
        return;
      }

      toast.success(result?.message || "✅ Project created successfully");
      form.reset();
      setImage(null);
      router.push("/projects");
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong ❌");
    }
  };

  return (
    <div className="max-w-2xl min-w-[350px] mx-auto px-6 py-3 bg-card sm:max-w-[350px] h-screen  my-3 max-h-[500px] rounded-xl shadow-lg border">
      <h2 className="text-2xl font-bold mt-3 text-center">
        Create New Project
      </h2>
      <div className=" mt-2 min-h-[60%] max-h-[70%] overflow-y-auto p-2">
        <Form {...form}>
          <form
            id="form_id"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 "
          >
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Write a short project description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Link */}
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://your-project-link.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <SingleImageUploader
              message="Thumbnail"
              onChange={(file) => setImage(file)}
            />

            {/* Submit Button */}
          </form>
        </Form>
      </div>
      <div className="pt-4">
        <Button
          form="form_id"
          type="submit"
          className="w-full border bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold py-5 text-lg hover:opacity-90 rounded-xl"
        >
          Create Project
        </Button>
      </div>
    </div>
  );
};

export default CreateProjectForm;
