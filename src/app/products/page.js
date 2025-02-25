"use client";

import SidebarFilter from "@/components/SidebarFilter";
import { useProducts } from "@/Context/ProductContext";
import Card from "@/components/Card";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { searchProduct } from "@/apiServices/products/page";

const ProductPage = () => {
  const { products } = useProducts(); // Lấy danh sách sản phẩm từ context
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get("search") || "";
  const [productList, setProductList] = useState(products || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.history.replaceState(null, "", "/products");
    const fetchProducts = async () => {
      if (!searchQuery) {
        setProductList(products); // Nếu không có tìm kiếm, hiển thị danh sách gốc
        return;
      }

      setLoading(true);
      try {
        const result = await searchProduct(searchQuery);
        if (Array.isArray(result)) {
          setProductList(result); // Cập nhật danh sách sản phẩm
          // Xóa query khỏi URL mà không reset state
        } else {
          console.error("Expected an array but got:", result);
          setProductList([]); // Đặt danh sách trống nếu dữ liệu không đúng format
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
    router.push("/products"); // Xóa searchQuery khỏi URL
    setProductList(products); // Hiển thị danh sách gốc
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        <SidebarFilter />

        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600 cursor-pointer" onClick={handleViewAll}>
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
