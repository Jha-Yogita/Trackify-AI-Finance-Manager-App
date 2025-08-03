// /app/api/summary/route.js
import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/prisma";

export async function GET() {
  const user = await checkUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const txns = await db.transaction.findMany({ where: { userId: user.id } });

  const summary = txns.reduce(
    (acc, txn) => {
      const amt = Number(txn.amount);
      if (txn.type === "EXPENSE") {
        acc.totalExpenses += amt;
        acc.byCategory[txn.category] = (acc.byCategory[txn.category] || 0) + amt;
      } else {
        acc.totalIncome += amt;
      }
      return acc;
    },
    { totalIncome: 0, totalExpenses: 0, byCategory: {} }
  );
  summary.netSavings = summary.totalIncome - summary.totalExpenses;

  return new Response(JSON.stringify({ summary }), {
    headers: { "Content-Type": "application/json" },
  });
}
