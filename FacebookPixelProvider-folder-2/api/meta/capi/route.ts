import { sendToMetaCAPI } from "@/lib/facebook-conversion-api-and-pixel-setup-folder-1/capi";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    undefined;

  const userAgent = req.headers.get("user-agent") || undefined;

  await sendToMetaCAPI({
    eventName: body.eventName,
    eventID: body.eventID,
    eventSourceUrl: body.eventSourceUrl,
    userData: {
      ...body.userData,
      ip,
      userAgent,
    },
    customData: body.customData,
  });

  return NextResponse.json({ success: true });
}
