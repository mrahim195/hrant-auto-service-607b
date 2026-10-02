import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/lib/site";

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  service?: string;
  vehicle?: string;
  preferredDate?: string;
};

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const message = String(body.message || "").trim();
  const service = String(body.service || "").trim();
  const vehicle = String(body.vehicle || "").trim();
  const preferredDate = String(body.preferredDate || "").trim();

  if (!name || !phone || !message) {
    return NextResponse.json(
      { error: "Name, phone, and message are required." },
      { status: 400 }
    );
  }

  if (phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json(
      { error: "Please enter a valid phone number." },
      { status: 400 }
    );
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const host = process.env.SMTP_HOST || "";
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";
  const to =
    process.env.CONTACT_TO_EMAIL ||
    site.email ||
    user;
  const from = process.env.CONTACT_FROM_EMAIL || user || to;

  if (!host || !user || !pass) {
    return NextResponse.json(
      {
        error:
          "SMTP is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS in .env.local.",
      },
      { status: 503 }
    );
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from,
      to,
      replyTo: email || undefined,
      subject: `Service request from ${name} · ${site.businessName}`,
      text: [
        `Business: ${site.businessName}`,
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email || "(none)"}`,
        `Service: ${service || "(not specified)"}`,
        `Vehicle: ${vehicle || "(not specified)"}`,
        `Preferred date: ${preferredDate || "(not specified)"}`,
        "",
        message,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "SMTP send failed.";
    return NextResponse.json({ error: detail }, { status: 500 });
  }
}
