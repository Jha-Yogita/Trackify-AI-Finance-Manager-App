// /app/api/ai-chat/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { question, summary } = await req.json();

    if (!question || !summary) {
      return new Response("Missing data", { status: 400 });
    }

    const prompt = `
You are Trackify AI, a smart and friendly personal finance assistant.

User asked: "${question}"

Here is the user's financial summary:
- Total Income: ₹${summary.totalIncome}
- Total Expenses: ₹${summary.totalExpenses}
- Net Savings: ₹${summary.netSavings}
- Expense Breakdown by Category:
${Object.entries(summary.byCategory)
  .map(([category, amount]) => `  - ${category}: ₹${amount}`)
  .join("\n")}

Reply in a clean, conversational tone like ChatGPT. Keep the answer short (5 to 7 lines max), easy to understand, and avoid using symbols like *, -, or •. Don't use bullet points. Be direct, friendly, and personalized based on the user's data.
`;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);

    if (!result?.response?.text) {
      return new Response(JSON.stringify({ answer: "⚠️ Gemini returned nothing." }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const text = result.response.text().trim();
    return new Response(JSON.stringify({ answer: text }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Gemini error:", err);
    return new Response(JSON.stringify({ answer: "⚠️ Gemini failed to generate a response." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
