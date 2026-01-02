import { sendToMetaCAPI } from "@/lib/facebook-conversion-api-and-pixel-setup-folder-1/capi";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ✅ IP এবং User Agent server থেকে নিচ্ছি (secure)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      undefined;

    const userAgent = req.headers.get("user-agent") || undefined;

    const result = await sendToMetaCAPI({
      eventName: body.eventName,
      eventID: body.eventID,
      eventSourceUrl: body.eventSourceUrl,
      userData: {
        ...body.userData,
        ip,
        userAgent,
      },
      customData: body.customData,
      testEventCode: process.env.FB_TEST_EVENT_CODE, // ✅ .env থেকে নিচ্ছে
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ CAPI Route Error:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}