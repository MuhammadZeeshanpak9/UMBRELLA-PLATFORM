import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: Number(process.env.SMTP_PORT ?? 465) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"ELEV8 Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `New Message from ${name} — ELEV8 Corporation`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#030008;color:#ffffff;border-radius:16px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#9f81b9,#6ecfff);padding:32px;text-align:center;">
            <h1 style="margin:0;font-size:24px;font-weight:300;letter-spacing:0.2em;color:#ffffff;">ELEV8 CORPORATION</h1>
            <p style="margin:8px 0 0;font-size:12px;letter-spacing:0.3em;opacity:0.85;">NEW CONTACT MESSAGE</p>
          </div>
          <div style="padding:40px 32px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#9f81b9;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;width:100px;">Name</td>
                <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#ffffff;font-size:15px;">${name}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#9f81b9;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;">Phone</td>
                <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#ffffff;font-size:15px;">${phone || "—"}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#9f81b9;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;">Email</td>
                <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:#6ecfff;font-size:15px;"><a href="mailto:${email}" style="color:#6ecfff;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding:16px 0 4px;color:#9f81b9;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;vertical-align:top;">Message</td>
                <td style="padding:16px 0 4px;color:#ffffff;font-size:15px;line-height:1.7;white-space:pre-wrap;">${message}</td>
              </tr>
            </table>
          </div>
          <div style="padding:24px 32px;background:rgba(255,255,255,0.03);text-align:center;font-size:11px;color:rgba(255,255,255,0.3);letter-spacing:0.15em;">
            ELEV8 CORPORATION — YOUNIVERSE HUB
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
