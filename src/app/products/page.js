"use client";

import SidebarFilter from "@/components/SidebarFilter";
import { useProducts } from "@/Context/ProductContext";
import Card from "@/components/Card";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const ProductPage = () => {
  const { products } = useProducts();
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    if (productList.length === 0) {
      const savedResult = localStorage.getItem("searchResult");
      if (savedResult) {
        const parsedData = JSON.parse(savedResult);
        setProductList(parsedData);

        setTimeout(() => {
          localStorage.removeItem("searchResult");
        }, 100);
      } else {
        setProductList(products);
      }
    }
  }, [products]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        <SidebarFilter />

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">
              Showing 1-10 of {productList.length} Products
            </p>
            <select className="border rounded-lg px-3 py-2 text-sm">
              <option>Most Popular</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList.map((product, index) => (
              <Link href={`/products/${product.id}`} key={index}>
                <Card
                  product={product}
                  rating={
                    product.reviews?.length > 0
                      ? product.reviews.reduce(
                          (sum, cur) => sum + cur.rating,
                          0
                        ) / product.reviews.length
                      : 0
                  }
                />
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-8 gap-2">
            <button className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">
              Previous
            </button>
            {[1, 2, 3, "...", 10].map((page, index) => (
              <button
                key={index}
                className={`px-4 py-2 text-sm rounded-lg ${
                  page === 1 ? "bg-primary text-white" : "hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
