import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Details from "@/models/Details";

export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 5;
    const sort = searchParams.get("sort") || "BANK";
    const order = searchParams.get("order") || "asc";
    const search = searchParams.get("search") || "";
    const filters = {};

    // Get filter parameters
    ["BANK", "IFSC", "BRANCH", "CITY1", "STATE"].forEach((field) => {
      const value = searchParams.get(`filter_${field.toLowerCase()}`);
      if (value) filters[field] = new RegExp(value, "i");
    });

    // Build query
    let query = {};

    // Add search
    if (search) {
      query.$or = [
        { BANK: new RegExp(search, "i") },
        { IFSC: new RegExp(search, "i") },
        { BRANCH: new RegExp(search, "i") },
        { CITY1: new RegExp(search, "i") },
        { STATE: new RegExp(search, "i") },
      ];
    }

    // Add filters
    if (Object.keys(filters).length > 0) {
      query = { ...query, ...filters };
    }

    const skip = (page - 1) * limit;
    const sortOrder = order === "asc" ? 1 : -1;

    // Execute query with pagination
    const [details, total] = await Promise.all([
      Details.find(query)
        .sort({ [sort]: sortOrder })
        .skip(skip)
        .limit(limit)
        .lean(),
      Details.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: details,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      hasMore: skip + details.length < total,
    });
  } catch (error) {
    console.error("Error fetching details:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
