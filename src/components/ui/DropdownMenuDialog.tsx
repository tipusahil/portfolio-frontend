"use client";

import { Button } from "@/components/ui/button";
import { SpinnerCustom } from "@/components/ui/spinner";
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PencilIcon } from "@heroicons/react/16/solid";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FileMetadata } from "@/hooks/use-file-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import SingleImageUploader from "../SingleFileUploader";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { useSession } from "next-auth/react";

// Update schema (partial)
const formSchema = z.object({
  title: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine((val) => !val || val.length >= 3, {
      message: "Title must be at least 3 characters if provided",
    }),

  content: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .refine((val) => !val || val.length >= 10, {
      message: "Content must be at least 10 characters if provided",
    }),

  isFeatured: z.boolean().optional(),
  tags: z.string().optional(),
  view: z
    .preprocess((val: unknown) => {
      if (val === "" || val === undefined) return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    }, z.number().optional())
    .optional(),
});

export function DropdownMenuDialog({ blog_id }: { blog_id: string | number }) {
  // export function DropdownMenuDialog({blog_id}:{blog_id:string | number}) {
  const [showUpdateDialogModal, setshowUpdateDialogModalModal] =
    useState(false);
  const [showDeleteDialogModal, setshowDeleteDialogModalModal] =
    useState(false);
  const [isDelete, setIsDelete] = useState(false);
  // --------------start-----session_token related kaj-------------------------
  const { data: session, status } = useSession(); // ✅ সেশন থেকে ডেটা নাও
  // --------------end-----session_token related kaj-------------------------
  // -------------------
  const [image, setImage] = useState<(File | FileMetadata) | null>(null);
  //   console.log("inside addDivision : ", image);
  // -------------------

  // ------------------------------------
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      isFeatured: false,
      tags: "",
      view: undefined, // শুধু এটা string না — undefined রাখো
    },
  });

  // -----------update data submit function----------
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      // -----------------------session-------
      // ✅ সেশন চেক করো
      if (status === "loading") {
        toast.error("Session is loading, please wait...");
        return;
      }
      if (!session || !session.user) {
        toast.error(
          "You must be logged in to update a blog!, and only owner can do this"
        );
        setshowUpdateDialogModalModal(false);
        return;
      }

      const accessToken = session.user.accessToken;

      if (!accessToken) {
        toast.error("Access token missing! Please login again.");
        setshowUpdateDialogModalModal(false);
        return;
      }

      // -----------------------session-------

      const toastId = toast.loading("Blog updating...");
      // ---------- Prepare formData ----------
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          ...data,
          authorId: Number(session.user.id), // ✅ সেশন থেকে authorId
          isFeatured: Boolean(data.isFeatured),
          tags: data.tags
            ? (data.tags as string)
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag !== "")
            : [],
        })
      );

      if (image) {
        formData.append("file", image as File); // image upload korar jonno jei name file/image/files/images jeta backend e use kora hoise sei name tai ekane dite hobe
        console.log("formData_file:", formData.get("file")); // eta kaj korbe
      }

      // console.log("fortData entries:",formData.entries());
      console.log("fortData after stringify data:", formData.get("data")); // normally formData er kisui clg log kore deka jaina.but jodi kov deka dorkar hoi tahole evabe dekte hbe ,tik evabei log kore dekte hbe.
      // console.log("formData_file:",formData.get("file"));// eta kaj korbe

      // -----------

      // ---------- Send PUT request ----------
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${blog_id}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken}`, // ✅ সেশন থেকে টোকেন
          },
          next: {
            tags: ["BLOGS"],
          },
        }
      );

      // ---------- Handle response ----------
      if (!response.ok) {
        const errorText = await response.text();

        console.error("Update failed:", errorText);
        toast.dismiss(toastId);
        toast.error(`${"Update failed ❌: " + errorText}`, { duration: 10000 });
        //   alert("Update failed ❌: " + errorText);
        return;
      }

      const result = await response.json();
      if (result.success === true) {
        console.log("result updateer : --", result);
      }
      console.log("✅ Blog updated successfully:", result);
      toast.dismiss(toastId);
      toast.success(result?.message || "✅ Blog updated successfully", {
        duration: 5000,
      });
      setshowUpdateDialogModalModal(false); // close modal after success
    } catch (error: any) {
      console.error("Error updating blog:", error);
      // toast.dismiss(toastId);
      toast.error(error?.message || "Something went wrong ❌", {
        duration: 5000,
      });
    }
  };

  // --------------------------------

  //   ----------start---delete blog -------
  const handleBlogDelete = async (blog_id: number | string) => {
    try {

      // -------------session theke token -------------
          if (status === "loading") {
        toast.error("Session is loading, please wait...");
        return;
      }
      if (!session || !session.user) {
        toast.error(
          "You must be logged in to delete a blog!, and only owner can do this"
        );
        setshowUpdateDialogModalModal(false);
        return;
      }


      const accessToken = session.user.accessToken;
      if (!accessToken) {
        toast.error("Access token missing! Please login again.");
        setshowDeleteDialogModalModal(false);
        return;
      }


      // -------------session theke token -------------
      const toastId = toast.loading("Blog deleting...");
      setIsDelete(true); // ✅ স্পিনার চালু করো
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${blog_id}`,
        {
          method: "DELETE",
          headers: {
   Authorization: `Bearer ${accessToken}`, // ✅ সেশন থেকে টোকেন
          },
          next: {
            tags: ["BLOGS"],
          },
        }
      );

      // ---------- Handle response ----------
      if (!response.ok) {
        const errorText = await response.text();

        console.error("blog delation failed:", errorText);
        toast.dismiss(toastId);
        toast.error(`${"Deleting failed ❌: " + errorText}`, {
          duration: 10000,
        });
        return;
      }

      const result = await response.json();
      if (result.success === true) {
        console.log("delete result :", result);
      }
      console.log("✅ Blog delete successfully:", result);
      toast.dismiss(toastId);
      toast.success(result?.message || "✅ Blog deleted successfully", {
        duration: 5000,
      });

      setshowDeleteDialogModalModal(false); // close modal after success
    } catch (error: any) {
      console.error("Error delete blog:", error);
      // toast.dismiss(toastId);
      toast.error(error?.message || "Something went wrong ❌", {
        duration: 5000,
      });
    } finally {
      setIsDelete(false); // ✅ স্পিনার বন্ধ করো
    }
  };
  //   ----------end---delete blog -------

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" aria-label="Open menu" size="icon-sm">
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <DropdownMenuLabel>Blog Actions</DropdownMenuLabel>
          <hr />
          <DropdownMenuGroup>
            {/* ---1. create */}
            {/* <DropdownMenuItem onSelect={() => setshowUpdateDialogModalModal(true)}>
              <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                <PencilIcon className=" fill-white/30" />
                Create New
                <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
              </button>
            </DropdownMenuItem>
            <hr /> */}
            {/* ----2. edit/update---*/}
            <DropdownMenuItem
              onSelect={() => setshowUpdateDialogModalModal(true)}
            >
              <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                <PencilIcon className=" fill-white/30" />
                Edit
                <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
              </button>
            </DropdownMenuItem>
            <hr />
            {/* ----3. delete--- */}

            <DropdownMenuItem
              onSelect={() => setshowDeleteDialogModalModal(true)}
            >
              <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/10">
                <PencilIcon className=" fill-white/30" />
                Delete
                <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
              </button>
            </DropdownMenuItem>
            {/* -------------------- */}
            {/* <DropdownMenuItem onSelect={() => setshowDeleteDialogModalModal(true)}>
              Share...
            </DropdownMenuItem>
            <DropdownMenuItem disabled>Download</DropdownMenuItem> */}
            {/* -------------------- */}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* -------------------update dialog modal ------------- */}
      <Dialog
        open={showUpdateDialogModal}
        onOpenChange={setshowUpdateDialogModalModal}
      >
        <DialogContent className="sm:max-w-[380px] h-screen  my-3 max-h-[500px]">
          <DialogHeader>
            <DialogTitle>Update Your Blog</DialogTitle>
            <DialogDescription>
              Provide a name for your new blog. Click update when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="pb-3 min-h-[65%] overflow-y-auto p-2 ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                id="form_update_outsideOf_form"
                className="space-y-8  "
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Title" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public Title.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea rows={2} placeholder="Content" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public Content field.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* -------image uploader---- */}
                <SingleImageUploader
                  message={"Thumbnail"}
                  onChange={(file) => {
                    setImage(file);
                    if (file) {
                      const dataTransfer = new DataTransfer();
                      dataTransfer.items.add(file as File);
                      const input =
                        document.querySelector<HTMLInputElement>(
                          "#thumbnail-file"
                        );
                      if (input) {
                        input.files = dataTransfer.files;
                      }
                    }
                  }}
                />
                {/* -------image uploader---- */}

                {/* --------starat-tags field */}
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. nextjs, react, webdev"
                          // value সর্বদা string রাখছি যাতে controlled থাকে
                          //   value="string"
                          //   value={Array.isArray(field.value) ? field.value.join(", ") : ""}
                          //   onChange={(e) => {
                          //     const inputValue = e.target.value;
                          //     const tagsArray = inputValue
                          //       .split(",")
                          //       .map((tag) => tag.trim())
                          //       .filter((tag) => tag !== "");
                          //     field.onChange(tagsArray);
                          //   }}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-foreground/80">
                        Separate each tag with a comma.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ------end---tags field */}

                {/* ---start view field */}
                <FormField
                  control={form.control}
                  name="view"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Views</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter number of views"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription className="text-foreground/80">
                        Number of times this post has been viewed.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ---end view field */}

                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Is Featured?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) =>
                            field.onChange(value === "true")
                          }
                          defaultValue={field.value ? "true" : "false"}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="true" id="true" />
                            </FormControl>
                            <FormLabel htmlFor="true">Yes</FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="false" id="false" />
                            </FormControl>
                            <FormLabel htmlFor="false">No</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>

                      <FormDescription className="text-foreground/80">
                        Choose whether this post should be featured.
                      </FormDescription>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="form_update_outsideOf_form">
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* -------------------delete dialog- modal ---------- */}
      <Dialog
        open={showDeleteDialogModal}
        onOpenChange={setshowDeleteDialogModalModal}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete this blog</DialogTitle>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            {isDelete ? (
              <Button variant="outline" disabled>
                <SpinnerCustom />
                Deleting...
              </Button>
            ) : (
              <Button type="submit" onClick={() => handleBlogDelete(blog_id)}>
                delete
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
