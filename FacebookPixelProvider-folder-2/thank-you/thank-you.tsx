"use client";

import { useEffect } from "react";
import { trackMetaEvent } from "../../src/lib/facebook-conversion-api-and-pixel-setup-folder-1/trackEvent";


//  ei file ta thank-you/page.tsx : route/server file e call korte hobe 
// and src/app/api/meta/capi/route.ts file ta oi jaigai takte hobe total 3ta folder segulor modde facebook conversion api and pixel setup er jabotio sob kisu:
/* 
1. src/lib/(facebook-conversion-api-and-pixel-setup-folder-1) : ei folder ta 
2. src/app/api/(meta/capi/route.ts) : ei file ta
3. FacebookPixelProvider-folder-2 : ei folder ta
*/
/* 
🧠 PART 0: Lead vs CompleteRegistration (Truth)
❌ ভুল (৯০% মানুষ করে)

Form Submit → Lead

Thank You Page → Lead ❌

👉 এতে Meta ভাবে:
একই মানুষ ২ বার Lead দিয়েছে

✅ সঠিক (Enterprise logic)
Step	Event
Form submit	Lead
Thank You Page / Success	CompleteRegistration ✅

👉 Meta বুঝে:

“Lead confirmed, real human, high quality”

📈 Result: CPA কমে, Lead quality বাড়ে
*/

export default function ThankYouPage() {
  useEffect(() => {
    trackMetaEvent({
      eventName: "CompleteRegistration",
      customData: {
        content_name: "Contact Form Confirmed",
      },
    });
  }, []);

  return <h1>Thank you! We’ll contact you soon.</h1>;
}
