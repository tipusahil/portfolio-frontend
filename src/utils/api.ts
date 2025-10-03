/* eslint-disable @typescript-eslint/no-explicit-any */

export const apiRequest = async (
  endpoint: string,
  options: {
    method?: string;
    body?: any;
    cache?: RequestCache; // "default" | "force-cache" | "no-cache" | "reload" | "no-store" | "only-if-cached"
  } = {}
) => {
  const { method = "GET", body, cache = "default" } = options;

try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    cache,
  });

  if (!res.ok) {
    console.log(res);
    throw new Error(`API error: ${res.status}`);
  }

  const { data } = await res.json();
  return data;
} catch (error) {
        console.error(" blogs getting failed! Unexpected error:", error);
    const errorMessage = typeof error === "object" && error !== null && "message" in error
      ? (error as { message?: string }).message
      : undefined;
    return { success: false, message: errorMessage || "Unexpected error" };
}
};
