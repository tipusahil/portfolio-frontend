import { hashData } from "./crypto";
import { MetaCustomData, MetaUserData } from "./types";


interface CAPIParams {
  eventName: string;
  eventID: string;
  userData: MetaUserData;
  customData?: MetaCustomData;
  eventSourceUrl?: string;
}


/* -------------------------------------------------------------------------- */
/*                              Helper Function                               */
/* -------------------------------------------------------------------------- */

export const sendToMetaCAPI = async ({
  eventName,
  eventID,
  userData,
  customData = {},
  eventSourceUrl,
}: CAPIParams): Promise<void> => {
  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: "website",
        event_id: eventID, // Pixel & CAPI deduplication

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
  };

  await fetch(
    `https://graph.facebook.com/${process.env.META_API_VERSION}/${process.env.NEXT_PUBLIC_FB_PIXEL_ID}/events?access_token=${process.env.FB_ACCESS_TOKEN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );
};
