"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackMetaEvent } from "@/lib/facebook-conversion-api-and-pixel-setup-folder-1/trackEvent";

declare global {
  interface Window {
    fbq: any;
  }
}

export const FacebookPixelProvider = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.fbq) return;
    // window.fbq("track", "PageView");
    trackMetaEvent({ eventName: "PageView" }); // -- এটা ব্যবহার করুন
  }, [pathname]);

  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');

          fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
        `,
        }}
      />
    </>
  );
};
