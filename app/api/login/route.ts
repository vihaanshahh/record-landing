import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  // Test credentials — not real auth, just for RecordLoop testing.
  if (email === "test@recordloop.dev" && password === "testpass123") {
    const response = NextResponse.json({ ok: true });
    response.cookies.set("rl_session", "authenticated", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
    return response;
  }

  return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
}
