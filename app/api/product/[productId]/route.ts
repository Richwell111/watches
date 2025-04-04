import { connectDB } from "../../db/connectDB";
import Product from "../../models/product.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { productId: string } } // ✅ Fixed typing
) {
  await connectDB();

  const { productId } = context.params; // ✅ Correctly extracting params

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "An error occurred.",
      },
      { status: 500 }
    );
  }
}
