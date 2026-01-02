import { sendToMetaCAPI } from "@/lib/facebook-conversion-api-and-pixel-setup-folder-1/capi";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("🔵 CAPI API Route Called");

    const body = await req.json();
    console.log("🔵 Request Body:", JSON.stringify(body, null, 2));

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") || undefined;

    const userAgent = req.headers.get("user-agent") || undefined;

    console.log("🔵 IP Address:", ip);
    console.log("🔵 User Agent:", userAgent);

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
      testEventCode: process.env.FB_TEST_EVENT_CODE,
    });

    console.log("✅ CAPI Success:", JSON.stringify(result, null, 2));

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("❌ CAPI Route Error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error?.message || String(error),
        stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      },
      { status: 500 }
    );
  }
}

// OPTIONS method for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}