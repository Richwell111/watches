import { connectDB } from "../db/connectDB";
import Product from "../models/product.model";

export async function GET() {
  await connectDB();

  try {
    const products = await Product.find({}).sort({ createdAt: -1 });

    return new Response(JSON.stringify({ products }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(
      "Error in fetching products:",
      error instanceof Error ? error.message : error
    );

    return new Response(
      JSON.stringify({
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
