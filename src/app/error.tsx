"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-red-600">
          Something went wrong!
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {error.message || "An unexpected error occurred."}
        </p>

        {error.digest && (
          <p className="mt-1 text-xs text-gray-400">Error ID: {error.digest}</p>
        )}

        <div className="mt-4">
          <Button
            variant="default"
            onClick={() => reset()} className="cursor-pointer"//
            // onClick={() => window.location.reload()}
          >
            Try again
          </Button>
        </div>
             <div className="mt-4">
          <Button
            variant="default"
                        /* error.tsx ফাইল একটা Error Boundary হিসেবে কাজ করে।

যখন কোনো error throw হয়, তখন Next.js ওই route/page কে error.tsx দিয়ে render করে।

reset() কল করলে Next.js ওই error boundary কে reset করে আবার চেষ্টা করে ওই route/page load করতে।

👉 কিন্তু, reset কখন কাজ করবে?

যদি error runtime/client side এ ঘটে (যেমন useEffect এর মধ্যে বা কোনো client hook এ), তখন reset() আবার চেষ্টা করবে।

কিন্তু যদি error server-side rendering (SSR) এ ঘটে (যেমন server component এ কোনো hook বা query fail করা), তখন reset() immediate reload করতে পারে না, এজন্য browser reload লাগে (Ctrl+Shift+R দিয়ে যেটা করছেন)। */
            onClick={() => window.location.reload()}
          >
            Hard Reload -- Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
