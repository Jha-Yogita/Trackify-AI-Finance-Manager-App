import nodemailer from "nodemailer";

export async function sendEmail({
  to_name,
  email,
  subject,
  month,
  total_income,
  total_expenses,
  net_income,
  categories,
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const categoryText = categories
    .map((c) => `- ${c.name}: $${c.amount}`)
    .join("\n");

  const html = `
    <h2>${subject}</h2>
    <p>Hello <b>${to_name}</b>,</p>
    <p>Here's your financial summary for <b>${month}</b>:</p>
    <ul>
      <li>Total Income: $${total_income}</li>
      <li>Total Expenses: $${total_expenses}</li>
      <li>Net: $${net_income}</li>
    </ul>
    <p><b>Breakdown:</b><br>
    <pre>${categoryText}</pre></p>
    <p>Thanks for using Trackify!</p>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Trackify App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html,
    });

    console.log("📩 Email sent:", info.messageId);
    return { success: true };
  } catch (err) {
    console.error("❌ Failed to send email:", err);
    return { success: false, error: err };
  }
}
