import { Resend } from "resend";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const message =
      typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (
      name.length > 100 ||
      email.length > 254 ||
      phone.length > 40 ||
      message.length > 5000 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { error: "Please check your details and try again." },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["aintomar.mohammed200@gmail.com"],
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend delivery error:", error);
      return NextResponse.json(
        { error: "Email could not be sent. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
