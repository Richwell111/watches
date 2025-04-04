import cloudinary from "@/utils/cloudinary";
import { connectDB } from "../../db/connectDB";
import Product from "../../models/product.model";

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  await connectDB();
  const productId = params.productId;

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

export async function DELETE(
  request: Request,
  { params }: { params: { productId: string } }
) {
  await connectDB();
  const productId = params.productId;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Delete the image in Cloudinary first
    const parts = product.image.split("/");
    const fileName = parts[parts.length - 1];
    const imageId = fileName.split(".")[0];

    await cloudinary.uploader.destroy(`watches/${imageId}`);

    // Delete from database
    await Product.findByIdAndDelete(productId);

    return new Response(
      JSON.stringify({ message: "Product deleted successfully." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: error instanceof Error ? error.message : "An error occurred.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}
