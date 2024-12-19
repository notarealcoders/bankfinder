import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Details from "@/models/Details";

export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 5;
    const sort = searchParams.get("sort") || "BANK"; // Default sorting column
    const order = searchParams.get("order") || "asc"; // Default sorting order

    const skip = (page - 1) * limit;

    // Set the sort order
    const sortOrder = order === "asc" ? 1 : -1;

    // Fetch paginated data with sorting
    const details = await Details.find({})
      .skip(skip)
      .limit(limit)
      .sort({ [sort]: sortOrder });

    // Total count for pagination
    const total = await Details.countDocuments();

    return NextResponse.json({ success: true, data: details, total });
  } catch (error) {
    console.error("Error fetching details:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
