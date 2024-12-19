import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Details from "@/models/Details";

export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const distinct = searchParams.get("distinct");
    const bank = searchParams.get("bank");
    const state = searchParams.get("state");
    const city = searchParams.get("city");

    // Handle distinct queries for the locator
    if (distinct) {
      const query = {};

      if (bank) query.BANK = bank;
      if (state) query.STATE = state;
      if (city) query.CITY1 = city;

      const distinctValues = await Details.distinct(distinct, query);
      return NextResponse.json({
        success: true,
        data: distinctValues.sort(),
      });
    }

    // Handle regular queries
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 5;
    const sort = searchParams.get("sort") || "BANK";
    const order = searchParams.get("order") || "asc";
    const search = searchParams.get("search") || "";
    const query = {};

    // Handle filters
    ["BANK", "IFSC", "BRANCH", "CITY1", "STATE"].forEach((field) => {
      const filterValue = searchParams.get(`filter_${field.toLowerCase()}`);
      if (filterValue) {
        // Decode the URI component and use exact matching
        query[field] = decodeURIComponent(filterValue);
      }
    });

    // Add search functionality
    if (search) {
      const searchRegex = new RegExp(search, "i");
      query.$or = [
        { BANK: searchRegex },
        { IFSC: searchRegex },
        { BRANCH: searchRegex },
        { CITY1: searchRegex },
        { STATE: searchRegex },
      ];
    }

    const skip = (page - 1) * limit;
    const sortOrder = order === "asc" ? 1 : -1;

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
