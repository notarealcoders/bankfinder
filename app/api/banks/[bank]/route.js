import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Details from "@/models/Details";
import { handleApiError } from "@/lib/utils/api";

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const { bank } = params;
    const decodedBank = decodeURIComponent(bank);

    const [branchCount, stateDistribution, cityDistribution] =
      await Promise.all([
        Details.countDocuments({ BANK: decodedBank }),
        Details.aggregate([
          { $match: { BANK: decodedBank } },
          { $group: { _id: "$STATE", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
        ]),
        Details.aggregate([
          { $match: { BANK: decodedBank } },
          { $group: { _id: "$CITY1", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 10 },
        ]),
      ]);

    return NextResponse.json({
      success: true,
      data: {
        branchCount,
        stateDistribution,
        cityDistribution,
      },
    });
  } catch (error) {
    return handleApiError(error, "Failed to fetch bank information");
  }
}
