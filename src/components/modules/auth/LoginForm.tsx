"use client";


import Lugo from "@/components/shared/navbar/Lugo";
import TPassword from "@/components/TPassword";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

// type LoginFormValues = {
//   email: string;
//   password: string;
// };

export default function LoginForm() {

  const form = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const router = useRouter();
  const onSubmit = async (values: FieldValues) => {
    try {
  const toastId = toast.loading("Owner login...");
      // const response = await UserLoginServerActionFunc(values);
      // console.log("response from login : ", response);

      // if (!response.success) {
      //   console.log(response?.message);
      //   toast.error(response?.message || "something went wrong!", {
      //     duration: 4000,
      //   });
      // }
      // if (response.success === true) {
      //   console.log(response?.message);

      //   toast.success(response?.message || "User Logged successfully", {
      //     duration: 5000,
      //   });
      //   router.push("/dashboard");
      // }


// option-2: signIn call kore ---
    const result = await signIn("credentials", {
      redirect: false, // 👉 খুব গুরুত্বপূর্ণ! এতে page auto redirect করবে না
      email: values.email,
      password: values.password,
    });

    console.log("signIn result:", result);

    // if (result?.error  || result?.status ===401) {
    //   // 🔴 Invalid credentials হলে error ফিল্ডে মেসেজ থাকে
    //   console.log("result.error ---:",result)
    //   toast.error("Invalid email or password", { id: toastId, duration: 4000 });
    //   return;
    // }
if (!result?.ok) {
  console.log("result.error ---:", result);
  toast.error("Invalid email or password", { id: toastId });
  return;
}

toast.success("Owner logged successfully", { id: toastId });
window.location.href = "/dashboard";


    } catch (err:any) {
        toast.dismiss();
        toast.error(err.message || "something went wrong!",{ duration:2000});
      toast.error(err.message || "User Login Failed!",{ duration:5000});
      // console.log(error.message || error || "something went wrong!")
      console.log(err.message || "something went wrong!");
    }
  };

  const handleSocialLogin = (provider: "google" | "github") => {
    console.log(`Login with ${provider}`);
  };


  return (
    <div className="flex justify-center items-center ">
   
      <div className="space-y-5 w-full max-w-md border-2 py-4 px-3 p-8 rounded-lg shadow-md my-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full max-w-md "
          >
        <div className="flex flex-col justify-center items-center">
              <Lugo/>
            <h2 className="text-2xl font-bold text-center">Login</h2>
        </div>

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <TPassword field={field} />
                    {/* <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full mt-2 cursor-pointer">
              Login
            </Button>

            <div className="flex items-center justify-center space-x-2">
              <div className="h-px w-16 bg-gray-300" />
              <span className="text-sm text-gray-500">or continue with</span>
              <div className="h-px w-16 bg-gray-300" />
            </div>
          </form>
        </Form>
        {/* Social Login Buttons */}
        <div className="flex flex-col gap-3 mt-4">
          <Button
          disabled
            variant="outline"
            className="flex items-center justify-center gap-2"
            onClick={() => handleSocialLogin("github")}
          >
            {/* GitHub */}
            <Image
              src="https://img.icons8.com/ios-glyphs/24/github.png"
              alt="GitHub"
              className="w-5 h-5"
              width={20}
              height={20}
            />
            Login with GitHub
          </Button>

          <Button
            variant="outline"
            className="flex items-center justify-center gap-2"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/dashboard",
              })
            }
          >
            {/* Google */}
            <Image
              src="https://img.icons8.com/color/24/google-logo.png"
              alt="Google"
              className="w-5 h-5"
              width={20}
              height={20}
            />
            Login with Google
          </Button>
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
