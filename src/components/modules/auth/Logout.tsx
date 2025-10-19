"use client";

import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

const LogoutCompo = () => {
  // -------------------------------------
  const session = useSession();
  const { status} = session;

const router = useRouter();
  if (status !== "authenticated") return null;

console.log("lgoout compo theke ----------:",session)
// -------------------------------------

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false }); // ✅ redirect বন্ধ, শুধু session clear করবে
      toast.success("Logged out successfully!");
      router.push("/")
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error(error);

    }
  };

  return (
    <Button
      variant="destructive"
      className="w-full justify-start gap-2 cursor-pointer"
      onClick={() => handleLogout()}
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
};

export default LogoutCompo;
