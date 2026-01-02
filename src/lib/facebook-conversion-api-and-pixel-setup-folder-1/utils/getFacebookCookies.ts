/**
 * 
 * 

 * Read Facebook cookies safely (works on server and client)
 * Returns _fbp and _fbc if present, otherwise undefined for each.

 * 🍪 Enterprise-grade Facebook cookie reader
 * 
 * ✔ Works on:
 * - Mobile / Desktop
 * - Android / iOS
 * - Chrome / Safari / Firefox
 * - Facebook / Instagram in-app browser
 * 
 * ✔ Safe for:
 * - Client-side
 * - Server-side (Next.js / Vercel)
 * 
 * ❌ Never throws
 * ❌ Never breaks rendering
 */

export interface FacebookCookies {
  fbp?: string;
  fbc?: string;
}

export const getFacebookCookies = (): FacebookCookies => {
  // ❗ Server-side safety
  if (typeof document === "undefined") {
    return {};
  }

  try {
    const cookies = document.cookie
      .split(";")
      .map((c) => c.trim());

    let fbp: string | undefined;
    let fbc: string | undefined;

    for (const cookie of cookies) {
      if (cookie.startsWith("_fbp=")) {
        fbp = cookie.replace("_fbp=", "");
      }

      if (cookie.startsWith("_fbc=")) {
        fbc = cookie.replace("_fbc=", "");
      }
    }

    return {
      fbp,
      fbc,
    };
  } catch (error) {
    // Enterprise rule: never crash tracking
    console.warn("⚠️ Failed to read Facebook cookies", error);
    return {};
  }
};
