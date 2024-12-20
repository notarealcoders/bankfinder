import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Details from "@/models/Details";
import { getCache, setCache, CACHE_KEYS } from "@/lib/cache";

export async function GET() {
  try {
    // Try to get stats from cache
    const cachedStats = await getCache(CACHE_KEYS.STATS);
    if (cachedStats) {
      return NextResponse.json({
        success: true,
        data: cachedStats,
      });
    }

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

    const stats = {
      totalBranches,
      bankDistribution,
      stateDistribution,
    };

    // Cache the stats
    await setCache(CACHE_KEYS.STATS, stats);

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
