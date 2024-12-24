import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Details from "@/models/Details";
import { handleApiError } from "@/lib/utils/api";

export async function GET() {
  try {
    await connectToDatabase();

    const [totalBranches, bankDistribution, stateDistribution] = await Promise.all([
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

    const stats = {
      totalBranches,
      bankDistribution,
      stateDistribution,
    };

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    return handleApiError(error, "Failed to fetch statistics");
  }
}