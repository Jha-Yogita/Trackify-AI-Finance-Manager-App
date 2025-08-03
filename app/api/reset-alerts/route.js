import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await db.budget.updateMany({
      data: {
        lastAlertSent: null,
      },
    });

    return NextResponse.json({ success: true, updated: result.count });
  } catch (error) {
    console.error("Failed to reset alerts", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
