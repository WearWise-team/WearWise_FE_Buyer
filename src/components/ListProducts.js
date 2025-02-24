"use client";

import { useProducts } from "@/Context/ProductContext";
import { useRouter } from "next/navigation";
import Card from "./Card";
import Link from "next/link";

export default function ListProducts({ title }) {
  const { productsHP } = useProducts();
  const router = useRouter();

  return (
    <div className="bg-white text-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl text-center mb-8">{title}</h1>

        {productsHP.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 px-24">
            {productsHP.map((product) => {
              const rating =
                product.reviews?.length > 0
                  ? product.reviews.reduce((sum, cur) => sum + cur.rating, 0) /
                    product.reviews.length
                  : 0;

              return (
                <div key={product.id} className="product-item">
                  <Link href={`/products/${product.id}`}>
                    <Card product={product} rating={rating} />
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center">No products found</div>
        )}

        <div className="text-center mt-8">
          <button
            onClick={() => router.push("/products")}
            className="bg-white border border-gray-300 text-gray-800 py-2 px-6 rounded-full hover:bg-gray-100"
          >
            View All
          </button>
        </div>
      </div>
    </div>
  );
}
