import { NextResponse } from "next/server";
import { getFeedItems } from "@/lib/feedItems";

export async function GET() {
  try {
    const items = await getFeedItems();
    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching feed items:", error);
    return NextResponse.json(
      { error: "Failed to fetch feed items" },
      { status: 500 }
    );
  }
}

