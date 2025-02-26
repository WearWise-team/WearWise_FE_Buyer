"use client";

import SidebarFilter from "@/components/SidebarFilter";
import { useProducts } from "@/Context/ProductContext";
import Card from "@/components/Card";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  searchProduct,
  fetchFilteredProducts,
} from "@/apiServices/products/page";

const ProductPage = () => {
  const { products } = useProducts();
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.toString();
  const [productList, setProductList] = useState(products || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("searchQuery nhận được:", searchQuery); // Kiểm tra giá trị searchQuery

    const fetchProducts = async () => {
      if (!searchQuery) {
        console.log("Không có searchQuery, bỏ qua");
        setProductList(products);
        return;
      }
      setLoading(true);
      try {
        const params = new URLSearchParams(searchQuery);

        if (params.has("search")) {
          // Trường hợp tìm kiếm
          const query = params.get("search")?.trim() || "";
          console.log("Query sau khi xử lý:", query);
          const result = await searchProduct(query);

          setProductList(Array.isArray(result) ? result : []);
        } else if (
          params.has("minPrice") ||
          params.has("maxPrice") ||
          params.has("categories")
        ) {
          // Trường hợp lọc
          const filterParams = parseQueryToFilter(params);
          console.log("Filter parameters:", filterParams);
          const result = await fetchFilteredProducts(filterParams);

          console.log(result);

          setProductList(Array.isArray(result) ? result : []);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProductList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, products]);

  const handleViewAll = () => {
    router.push("/products");
    setProductList(products);
  };

  const parseQueryToFilter = (params) => {
    let filter = {};

    if (params.has("minPrice")) {
      filter.minPrice = Number(params.get("minPrice"));
    }

    if (params.has("maxPrice")) {
      filter.maxPrice = Number(params.get("maxPrice"));
    }

    if (params.has("categories")) {
      filter.categories = params.get("categories").split(",");
    }

    if (params.has("colors")) {
      filter.colors = params.get("colors").split(",");
    }

    if (params.has("sizes")) {
      filter.sizes = params.get("sizes").split(",");
    }

    if (params.has("sortPrice")) {
      const sortValue = params.get("sortPrice");
      filter.sortPrice =
        sortValue === "asc" || sortValue === "desc" ? sortValue : null;
    }

    return filter;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        <SidebarFilter />

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p
              className="text-sm text-gray-600 cursor-pointer"
              onClick={handleViewAll}
            >
              Showing {productList?.length} results
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productList?.map((product, index) => (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
