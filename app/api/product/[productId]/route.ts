import { connectDB } from "../../db/connectDB";
import Product from "../../models/product.model";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } } // ✅ Correct typing
) {
  await connectDB();
  const { productId } = params;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ product }), {
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
