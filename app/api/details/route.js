import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Details from "@/models/Details";
import { getCache, setCache, CACHE_KEYS } from "@/lib/cache";

export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const distinct = searchParams.get("distinct");
    const bank = searchParams.get("bank");
    const state = searchParams.get("state");
    const city = searchParams.get("city");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 5;
    const sort = searchParams.get("sort") || "BANK";
    const order = searchParams.get("order") || "asc";
    const search = searchParams.get("search") || "";

    // Handle distinct queries for the locator
    if (distinct) {
      const query = {};

      if (bank) query.BANK = bank;
      if (state) query.STATE = state;
      if (city) query.CITY1 = city;

      let cacheKey;
      switch (distinct) {
        case "BANK":
          cacheKey = CACHE_KEYS.BANKS;
          break;
        case "STATE":
          cacheKey = CACHE_KEYS.STATES(bank);
          break;
        case "CITY1":
          cacheKey = CACHE_KEYS.CITIES(bank, state);
          break;
        case "BRANCH":
          cacheKey = CACHE_KEYS.BRANCHES(bank, state, city);
          break;
      }

      const cachedData = await getCache(cacheKey);
      if (cachedData) {
        return NextResponse.json({
          success: true,
          data: cachedData,
        });
      }

      const distinctValues = await Details.distinct(distinct, query);
      const sortedValues = distinctValues
        .filter((value) => value != null && value !== "")
        .sort((a, b) => a.localeCompare(b));

      await setCache(cacheKey, sortedValues);

      return NextResponse.json({
        success: true,
        data: sortedValues,
      });
    }

    // Handle regular queries
    const query = {};
    const skip = (page - 1) * limit;
    const sortOrder = order === "asc" ? 1 : -1;

    // Handle filters
    ["BANK", "IFSC", "BRANCH", "CITY1", "STATE"].forEach((field) => {
      const filterValue = searchParams.get(`filter_${field.toLowerCase()}`);
      if (filterValue) {
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
