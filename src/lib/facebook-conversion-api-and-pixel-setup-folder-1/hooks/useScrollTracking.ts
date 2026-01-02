"use client";

import { useEffect, useRef } from "react";
import { trackMetaEvent } from "../trackEvent";


// use case : 
// useScrollTracking();


export const useScrollTracking = () => {
  const triggered = useRef(false);

  useEffect(() => {
    const onScroll = async () => {
      const scrollPercent =
        (window.scrollY + window.innerHeight) /
        document.body.scrollHeight;

      if (scrollPercent > 0.5 && !triggered.current) {
        triggered.current = true;

        await trackMetaEvent({
          eventName: "ViewContent",
          customData: {
            content_name: "Scrolled 50%",
          },
        });
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
};
