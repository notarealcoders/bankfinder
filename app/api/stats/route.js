import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Details from "@/models/Details";

export async function GET() {
  try {
    await connectToDatabase();

    const [totalBranches, bankDistribution, stateDistribution] =
      await Promise.all([
        Details.countDocuments(),
        Details.aggregate([
          { $group: { _id: "$BANK", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 10 },
        ]),
        Details.aggregate([
          { $group: { _id: "$STATE", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 10 },
        ]),
      ]);

    return NextResponse.json({
      success: true,
      data: {
        totalBranches,
        bankDistribution,
        stateDistribution,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
