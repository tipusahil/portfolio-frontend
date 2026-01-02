import crypto from "crypto";
import { getFacebookCookies } from "./utils/getFacebookCookies";
import { generateUUID } from "./generateUUID";

export const trackMetaEvent = ({
  eventName,
  userData = {},
  customData,
}: {
  eventName: string;
  userData?: any;
  customData?: any;
}) => {
  const eventID = generateUUID(); // ✅ Browser-safe UUID

  const { fbp, fbc } = getFacebookCookies();

  // 🔵 Pixel (Browser-side)
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, customData, { eventID });
  }

  // 🔴 CAPI (Server-side via API route)
  fetch("/api/meta/capi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventName,
      eventID, // ✅ Same eventID = deduplication
      eventSourceUrl:
        typeof window !== "undefined" ? window.location.href : undefined,
      userData: {
        ...userData,
        fbp,
        fbc,
      },
      customData,
    }),
  }).catch((err) => {
    console.error("❌ CAPI fetch error:", err);
  });
};