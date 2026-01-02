import crypto from "crypto";
import { getFacebookCookies } from "./utils/getFacebookCookies";

export const trackMetaEvent = ({
  eventName,
  userData = {},
  customData,
}: {
  eventName: string;
  userData?: any;
  customData?: any;
}) => {
  const eventID = crypto.randomUUID();

  const { fbp, fbc } = getFacebookCookies();

  // 🔵 Pixel
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, customData, { eventID });
  }

  // 🔴 CAPI (fire & forget)
  fetch("/api/meta/capi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventName,
      eventID,
      eventSourceUrl:
        typeof window !== "undefined" ? window.location.href : undefined,
      userData: {
        ...userData,
        fbp,
        fbc,
      },
      customData,
    }),
  }).catch(() => {});
};
