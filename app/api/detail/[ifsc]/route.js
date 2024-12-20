import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Details from "@/models/Details";
import { handleApiError } from "@/lib/utils/api";

export async function GET(req, { params }) {
  try {
    // Await params before destructuring
    const ifsc = await params.ifsc;

    await connectToDatabase();
    const detail = await Details.findOne({ IFSC: ifsc }).lean();

    if (!detail) {
      return NextResponse.json(
        { success: false, error: "Bank details not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: detail });
  } catch (error) {
    return handleApiError(error, "Failed to fetch bank detail");
  }
}
