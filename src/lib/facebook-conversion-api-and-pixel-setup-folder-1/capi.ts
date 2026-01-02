import { hashData } from "./crypto";
import { MetaCustomData, MetaUserData } from "./types";

interface CAPIParams {
  eventName: string;
  eventID: string;
  userData: MetaUserData;
  customData?: MetaCustomData;
  testEventCode?: string;
  eventSourceUrl?: string;
}

interface CAPIResponse {
  success: boolean;
  response?: any;
  error?: any;
}



/* 
total 3ta folder er modde (facebook conversion api and pixel setup) er jabotio sob kisu ase : folder gulo holo : 
1. --> src/lib/(facebook-conversion-api-and-pixel-setup-folder-1) : ei folder ta 
2. --> src/app/api/(meta/capi/route.ts) : ei file ta// evabei rakte hobe.
3. --> FacebookPixelProvider-folder-2 : ei folder ta ekdom .env er layer e eta ase.
4. --> .env files er meta er variables gulo takte hobe.
*/

/* -------------------------------------------------------------------------- */
/*                              Helper Function                               */
/* -------------------------------------------------------------------------- */

export const sendToMetaCAPI = async ({
  eventName,
  eventID,
  userData,
  customData = {},
  eventSourceUrl,
  testEventCode,
}: CAPIParams): Promise<CAPIResponse> => {
  try {
    // ✅ Test event code: .env থেকে নিবে অথবা parameter থেকে
    const finalTestEventCode = testEventCode || process.env.FB_TEST_EVENT_CODE;

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_id: eventID, // ✅ Pixel & CAPI deduplication

          event_source_url: eventSourceUrl,

          user_data: {
            em: userData.email ? [hashData(userData.email)] : undefined,
            ph: userData.phone ? [hashData(userData.phone)] : undefined,
            client_ip_address: userData.ip,
            client_user_agent: userData.userAgent,
            fbp: userData.fbp,
            fbc: userData.fbc,
          },

          custom_data: customData,
        },
      ],
      // ✅ Test event code (শুধুমাত্র testing এর জন্য)
      ...(finalTestEventCode ? { test_event_code: finalTestEventCode } : {}),
    };

    const response = await fetch(
      `https://graph.facebook.com/${process.env.META_API_VERSION || "v21.0"}/${process.env.NEXT_PUBLIC_FB_PIXEL_ID}/events?access_token=${process.env.FB_ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Meta CAPI Error:", data);
      return { success: false, error: data };
    }

    console.log("✅ Meta CAPI Success:", data);
    return { success: true, response: data };
  } catch (error) {
    console.error("❌ Meta CAPI Exception:", error);
    return { success: false, error };
  }
};