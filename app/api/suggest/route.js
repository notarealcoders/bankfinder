import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Details from "@/models/Details";
import { handleApiError } from "@/lib/utils/api";

/**
 * @swagger
 * /api/suggest:
 *   get:
 *     summary: Get search suggestions
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query
 *     responses:
 *       200:
 *         description: List of suggestions
 */
export async function GET(req) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");
    
    if (!query || query.length < 2) {
      return NextResponse.json({ success: true, data: [] });
    }

    const regex = new RegExp(query, "i");
    
    const [banks, branches, cities] = await Promise.all([
      Details.distinct("BANK", { BANK: regex }).limit(5),
      Details.distinct("BRANCH", { BRANCH: regex }).limit(5),
      Details.distinct("CITY1", { CITY1: regex }).limit(5)
    ]);

    const suggestions = {
      banks,
      branches,
      cities
    };

    return NextResponse.json({ success: true, data: suggestions });
  } catch (error) {
    return handleApiError(error, "Failed to fetch suggestions");
  }
}