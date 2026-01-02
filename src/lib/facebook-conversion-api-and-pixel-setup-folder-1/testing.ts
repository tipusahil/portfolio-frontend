/**
 * 🧪 TESTING & DEBUGGING UTILITIES
 * 
 * এই functions গুলো development এ test করার জন্য
 */

import { sendToMetaCAPI } from "@/lib/facebook-conversion-api-and-pixel-setup-folder-1/capi";
import { getFacebookCookies } from "./utils/getFacebookCookies";


/**
 * Test if CAPI connection is working
 */
export const testCAPIConnection = async () => {
  console.log("🧪 Testing CAPI connection...");

  const result = await sendToMetaCAPI({
    eventName: "PageView",
    eventID: crypto.randomUUID(),
    userData: {
      email: "test@example.com",
      ip: "192.0.2.1",
      userAgent: "Mozilla/5.0 Test",
    },
    eventSourceUrl: "https://test.example.com",
  }) as { success?: boolean; response?: any; error?: any } | undefined;

  if (result?.success) {
    console.log("✅ CAPI connection successful!");
    console.log("Response:", result.response);
  } else {
    console.error("❌ CAPI connection failed!");
    console.error("Error:", result?.error ?? "No response");
  }

  return result;
};

/**
 * Check if Pixel is loaded
 */
export const checkPixelStatus = () => {
  if (typeof window === "undefined") {
    console.log("⚠️ Running on server-side");
    return false;
  }

  if (window.fbq) {
    console.log("✅ Facebook Pixel loaded");
    return true;
  } else {
    console.error("❌ Facebook Pixel NOT loaded");
    return false;
  }
};

/**
 * Check Facebook cookies
 */
export const checkFacebookCookies = () => {
  const { fbp, fbc } = getFacebookCookies();

  console.log("🍪 Facebook Cookies:");
  console.log("_fbp:", fbp || "❌ Not found");
  console.log("_fbc:", fbc || "❌ Not found");

  if (fbp) {
    console.log("✅ Attribution tracking enabled");
  } else {
    console.warn("⚠️ _fbp cookie missing - attribution may be affected");
  }

  return { fbp, fbc };
};

/**
 * Complete system health check
 */
export const runHealthCheck = async () => {
  console.log("🏥 Running Meta tracking health check...\n");

  // 1. Check environment variables
  console.log("1️⃣ Environment Variables:");
  console.log("NEXT_PUBLIC_FB_PIXEL_ID:", process.env.NEXT_PUBLIC_FB_PIXEL_ID ? "✅ Set" : "❌ Missing");
  console.log("FB_ACCESS_TOKEN:", process.env.FB_ACCESS_TOKEN ? "✅ Set" : "❌ Missing");
  console.log("");

  // 2. Check Pixel
  console.log("2️⃣ Facebook Pixel:");
  checkPixelStatus();
  console.log("");

  // 3. Check Cookies
  console.log("3️⃣ Facebook Cookies:");
  checkFacebookCookies();
  console.log("");

  // 4. Test CAPI (only if access token is set)
  if (process.env.FB_ACCESS_TOKEN && process.env.FB_ACCESS_TOKEN !== "your_generated_access_token") {
    console.log("4️⃣ CAPI Connection:");
    await testCAPIConnection();
  } else {
    console.log("4️⃣ CAPI Connection:");
    console.log("⚠️ Skipped - access token not configured");
  }

  console.log("\n✅ Health check complete!");
};

/**
 * Log event details (for debugging)
 */
export const debugEvent = (eventName: string, data?: any) => {
  console.group(`🔍 Debug: ${eventName}`);
  console.log("Event Name:", eventName);
  console.log("Timestamp:", new Date().toISOString());
  console.log("Data:", data);
  console.log("Cookies:", getFacebookCookies());
  console.groupEnd();
};

// Make available in browser console
if (typeof window !== "undefined") {
  (window as any).metaDebug = {
    runHealthCheck,
    checkPixelStatus,
    checkFacebookCookies,
    testCAPIConnection,
  };
  
  console.log("💡 Meta debugging tools available at: window.metaDebug");
}