import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { type, ...data } = body;

  if (!data.email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const separator = "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";

  let subject = "";
  let emailBody = "";

  if (type === "freelancer") {
    subject = `Freelancer Application, ${data.name} (${data.role})`;
    emailBody = `
NEW FREELANCER APPLICATION, NUUHAVEN
${separator}
APPLICANT DETAILS
${separator}
Name:         ${data.name}
Email:        ${data.email}
Phone:        ${data.phone || "Not provided"}
Role:         ${data.role}
Portfolio:    ${data.portfolio || "Not provided"}
LinkedIn:     ${data.linkedin || "Not provided"}

${separator}
ABOUT THEM
${separator}
Skills:       ${(data.skills || []).join(", ")}
Experience:   ${data.experience}
Availability: ${data.availability}
Rate:         ${data.rate || "Not specified"}

${separator}
WORK SAMPLES / MESSAGE
${separator}
${data.message || "No message provided"}
    `.trim();
  } else if (type === "contact") {
    subject = `Client Enquiry, ${data.name} | ${data.service || "General"}`;
    emailBody = `
NEW CLIENT ENQUIRY, NUUHAVEN
${separator}
CONTACT DETAILS
${separator}
Name:         ${data.name}
Email:        ${data.email}
Phone:        ${data.phone || "Not provided"}
Company:      ${data.company || "Not provided"}

${separator}
ENQUIRY
${separator}
Service:      ${data.service || "Not specified"}
Budget:       ${data.budget || "Not specified"}
Timeline:     ${data.timeline || "Not specified"}

Message:
${data.message || "No message provided"}
    `.trim();
  } else if (type === "tool") {
    subject = `Tool Submission, ${data.toolName} | ${data.name}`;
    emailBody = `
NEW TOOL SUBMISSION, NUUHAVEN
Tool: ${data.toolName}
${separator}
CONTACT DETAILS
${separator}
Name:         ${data.name}
Email:        ${data.email}
Phone:        ${data.phone || "Not provided"}
Company:      ${data.company || "Not provided"}

${separator}
TOOL RESULTS
${separator}
${data.toolSummary || "See below"}

${separator}
MESSAGE / NEXT STEPS
${separator}
${data.message || "No additional message"}
    `.trim();
  }

  console.log(`\n=== NUUHAVEN SUBMISSION [${type?.toUpperCase()}] ===`);
  console.log(`Subject: ${subject}`);
  console.log(emailBody);
  console.log("==============================================\n");

  // To enable real emails: install resend, add RESEND_API_KEY env var, uncomment:
  // const { Resend } = await import('resend');
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: 'submissions@nuuhaven.com',
  //   to: 'tshepang@nuuhaven.com',
  //   subject,
  //   text: emailBody,
  // });

  return NextResponse.json({ success: true });
}
