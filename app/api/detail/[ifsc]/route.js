import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Details from "@/models/Details";

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const { ifsc } = params;

    const detail = await Details.findOne({ IFSC: ifsc }).lean();

    if (!detail) {
      return NextResponse.json(
        { success: false, error: "Bank details not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: detail });
  } catch (error) {
    console.error("Error fetching bank detail:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch bank detail" },
      { status: 500 }
    );
  }
}
