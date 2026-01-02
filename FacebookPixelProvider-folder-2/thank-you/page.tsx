"use client";

import { useEffect } from "react";
import { trackMetaEvent } from "../../src/lib/facebook-conversion-api-and-pixel-setup-folder-1/trackEvent";


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
