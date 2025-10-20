import Lugo from "@/components/shared/navbar/Lugo";
import Link from "next/link";

import Image from "next/image";
import LoginForm from "../auth/LoginForm";


export default function Login() {
  return (
    // <div className="flex items-center justify-center  min-h-screen ">
    <div className=" grid h-screen border-2 border-red-500 lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href={"/"} className="flex items-center gap-2 font-medium">
           <div className="border-green-500 border-2">
             <Lugo />
           </div>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center border-2 border-purple-500">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block border-2 border-yellow-500">
        <Image
        fill
          src={"/lugos/lugo_ts.png"}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8] "
        />
      </div>
    </div>
    // </div>
  );
}