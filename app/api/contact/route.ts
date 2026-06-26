import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, message, stage, challenges, goals, timeline, recommendation } = body;

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email required" }, { status: 400 });
  }

  const emailBody = `
NEW DISCOVERY SESSION REQUEST, NUUHAVEN

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:     ${name}
Email:    ${email}
Phone:    ${phone || "Not provided"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BUSINESS ASSESSMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Business Stage:   ${stage || "Not specified"}
Challenges:       ${(challenges || []).join(", ") || "Not specified"}
Goals:            ${(goals || []).join(", ") || "Not specified"}
Timeline:         ${timeline || "Not specified"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RECOMMENDED SERVICES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${(recommendation || []).join("\n") || "To be determined"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${message || "No additional message provided"}
  `.trim();

  // Log for development/deployment without email service
  console.log("=== NUUHAVEN CONTACT SUBMISSION ===");
  console.log(emailBody);
  console.log("===================================");

  // If you add an email service (Resend, SendGrid, etc.), integrate here.
  // For now we store the submission in the response and log it.
  // To enable emails: npm install resend, then:
  // const { Resend } = await import('resend');
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({ from: 'noreply@nuuhaven.com', to: 'tshepang@nuuhaven.com', subject: `Discovery Session, ${name}`, text: emailBody });

  return NextResponse.json({ success: true });
}
