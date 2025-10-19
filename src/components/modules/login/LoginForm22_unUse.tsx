"use client";
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
import PasswordUi from "@/components/ui/PasswordUi";
import { cn } from "@/lib/utils";
// import { authApi, useLoginMutation } from "@/redux/features/auth/auth.api";
// import { useAppDispatch } from "@/redux/hook";
// import { setUser } from "@/redux/sliceFeatures/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import z from "zod";

// -------------------
const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "email is required." }) // string type er sate ei (nonempty)ta use kora jai, tai string dilam nahoi email() diyei kaj hoye jai zod er v4 onujai
    .email({ message: "Please enter a valid email address." }),

  password: z
    .string()
    .nonempty({ message: "Password is required." })
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." }),
});
// -------------------

// export function LoginForm({
//   className,
//   ...props
// }: React.ComponentProps<"form">) {

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  //  ----------------------start form--------
  const router = useRouter();

  // const HookForm = useForm();
  const HookForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // --------

  // --------
  // const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
        const loadingId = toast.loading("login...")
      console.log("-----loginform--data--------:", data);
      console.log(
        "---loginform--data--after stringify--:",
        JSON.stringify(data)
      );

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // যদি cookie/token পাঠাতে হয়// ✅ cookie পাঠানোর জন্য
          body: JSON.stringify(data), // এখানে email ও password যাবে
        }
      );

      if (!res.ok) {
        console.log(res);
        console.log(res.statusText);
        if(res.statusText && res.status===401){
            // toast.dismiss(loadingId);
            toast.error("please double check your password",{id:loadingId,duration:5000})
            throw new Error(`please double check your password`);
        }
        if(res.statusText && res.status===403){
            //    toast.dismiss(loadingId);
            toast.error("You are unauthorized",{id:loadingId,duration:5000})
            throw new Error(`You are unauthorized`);
        }
        throw new Error(`API error: ${res.status}`);

      
      }

      const result = await res.json();
      console.log("user result----:", result);
        if (result.success) {
            // dispatch(setUser(result.data)); // result.data = {accesstoken, refreshtoken, user: {...}}// state e set

            // dispatch(authApi.util.invalidateTags(['USER']));
            // console.log('loginForm thek setUser er jonno data : ', result.data);
            toast.success(result.message,{id:loadingId, duration:5000});
            router.push('/dashboard');
          }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      const errorMsg = (err?.data?.message || "").trim();
    //   console.log("errorBro:",err)
      if (
        errorMsg === "user does not exist!" ||
        errorMsg === "User does not exist!"
      ) {
  const toastId = toast.loading(errorMsg);
            toast.error("User not found! Please register first.",{id:toastId,duration:5000})

        
        //  router.push("/register");
        router.push("/");
        return;
      }

      if (errorMsg === "password does not match") {
        const toastId = toast.loading(errorMsg);
        // toast.error(errorMsg);
        toast.error(errorMsg || "Enter The Correct Password",{id:toastId,duration:5000});
        return;
      }

      if (errorMsg === "Invalid JSON in 'data' field") {
     const toastId = toast.loading(errorMsg);
        toast.error(errorMsg || "Invalid JSON in 'data' field",{id:toastId,duration:5000});
        return;
      }

      //    if (errorMsg === 'User is not verified!') {
      //       toast.error("Your account is not verified, please verify.");
      //       router.push("/verify", { state: data.email });
      //       return;
      //     }

      // যদি অন্য কোনো error আসে
      toast.error("Something went wrong. Please try again.");
    }
  };
  //  ----------------------end form--------

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-foreground/80 text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>

      <div className="grid gap-6">
        {/* ----------start ---login form ----*/}
        <Form {...HookForm}>
          <form
            onSubmit={HookForm.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {/* ----------formFIeld for email */}
            <FormField
              control={HookForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@example.com"
                      type="email"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ------------formFiled for login */}
            <FormField
              control={HookForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Password</FormLabel> */}
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <Link
                      href={"/forgot-password"}
                      className="ml-auto text-sm underline-offset-4 hover:underline hover:text-blue-500"
                    >
                      Forgot your password?
                    </Link>
                  </div>

                  <FormControl>
                    {/* <Input
                      placeholder="john@example.com"
                      {...field}
                      value={field.value || ""}
                    /> */}
                    <PasswordUi {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground  cursor-pointer"
            >
              Login
            </Button>
          </form>
        </Form>

        {/* ----------end ---login form ----*/}

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-foreground/80 relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button
          onClick={() =>
            window.open(
              `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`,
              "_self"
            )
          } // (_self) er jaigai (_blank,_parent, _top) eshob o dewa jai , but ekoi tab e open korte caile (_self)tab tai dite hbe.
          type="button"
          variant="outline"
          className="w-full cursor-pointer"
        >
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href={"/register"}
          replace
          className="underline underline-offset-4 hover:text-blue-500"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
