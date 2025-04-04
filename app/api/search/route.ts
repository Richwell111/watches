import { NextRequest } from "next/server";
import { connectDB } from "../db/connectDB";
import Product from "../models/product.model";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Correct way to get search parameters from NextRequest
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get("searchTerm") || "";

    const products = await Product.find({
      name: { $regex: searchTerm, $options: "i" },
    }).sort({ createdAt: -1 });

    return new Response(JSON.stringify({ products }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: error instanceof Error ? error.message : "An error occurred.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}
