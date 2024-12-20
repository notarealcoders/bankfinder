import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Details from "@/models/Details";

export async function GET(req) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const bank = searchParams.get("bank");
    const state = searchParams.get("state");
    const city = searchParams.get("city");
    const branch = searchParams.get("branch");

    const query = {};
    if (bank) query.BANK = bank;
    if (state) query.STATE = state;
    if (city) query.CITY1 = city;
    if (branch) query.BRANCH = branch;

    const detail = await Details.findOne(query).lean();

    if (!detail) {
      return NextResponse.json(
        { success: false, error: "Branch not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: detail });
  } catch (error) {
    console.error("Error locating branch:", error);
    return NextResponse.json(
      { success: false, error: "Failed to locate branch" },
      { status: 500 }
    );
  }
}
