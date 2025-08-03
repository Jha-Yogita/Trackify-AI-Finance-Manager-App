
import { sendEmail } from "@/actions/send-emails";
import EmailTemplate from "@/emails/template";

export default async function handler(req, res) {
  const result = await sendEmail({
    to: "your@email.com",
    subject: "Test Budget Alert",
    react: EmailTemplate({
      userName: "Yogita",
      type: "budget-alert",
      data: {
        percentageUsed: "85.0",
        budgetAmount: "1000",
        totalExpenses: "850",
        accountName: "Main Account",
      },
    }),
  });

  res.status(200).json(result);
}
