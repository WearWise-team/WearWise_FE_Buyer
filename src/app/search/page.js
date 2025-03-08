"use client";

import Image from "next/image";
import { useState } from "react";
import { FaSearch, FaMicrophone } from "react-icons/fa";
import { searchProduct } from "@/apiServices/products/page";
import { useRouter } from "next/navigation";

export default function WearwiseSearch() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  // Hàm tìm kiếm sản phẩm
  const handleSearch = async (event) => {
    event.preventDefault();

    if (!searchValue.trim()) {
      console.warn("Vui lòng nhập sản phẩm cần tìm!");
      return;
    }

    try {
      const result = await searchProduct(searchValue);
      localStorage.setItem("searchResult", JSON.stringify(result));
      router.push("/products");
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="bg-white flex items-center justify-center h-screen">
      <div className="text-center">
        <Image
          alt="Wearwise logo"
          className="mx-auto mb-8"
          height={92}
          src="https://storage.googleapis.com/a1aa/image/OjZfgJx7c4wSa-dyvsiMnNmNzv7PGHS9ucm8ubEuWOw.jpg"
          width={272}
          style={{ backgroundColor: "#ffe4e6" }}
        />
        <div className="relative w-full max-w-md mx-auto">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <form onSubmit={handleSearch}>
            <input
              className="w-full py-3 pl-12 pr-12 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              type="text"
              placeholder="Find my products"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>
          <FaMicrophone className="absolute right-4 top-1/2 transform -translate-y-1/2 text-pink-500" />
        </div>
      </div>
    </div>
  );
}
