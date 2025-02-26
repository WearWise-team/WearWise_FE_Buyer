"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { UserOutlined, ShoppingCartOutlined, HeartOutlined, SearchOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { FaMicrophone } from "react-icons/fa";
import { useRouter } from "next/navigation";

let searchTimeout;

export default function Header() {
  const router = useRouter();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (isSearchVisible) {
      searchTimeout = setTimeout(() => setIsSearchVisible(false), 2000);
    }
    return () => clearTimeout(searchTimeout);
  }, [isSearchVisible]);

  const handleFocus = () => {
    clearTimeout(searchTimeout);
  };

  const handleBlur = () => {
    searchTimeout = setTimeout(() => setIsSearchVisible(false), 2000);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (!searchValue.trim()) {
      console.warn("Vui lòng nhập sản phẩm cần tìm!");
      return;
    }
    router.push(`/products?search=${encodeURIComponent(searchValue)}`);
  };

  return (
    <header className="flex items-center justify-between p-4 px-20">
      <Link href="/">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-red-600">W</span>
          <span className="text-xl font-bold text-black">EARWISE</span>
        </div>
      </Link>

      <nav className="flex items-center space-x-6 text-lg">
        <Link href="/" className="text-black hover:text-gray-600">Home</Link>
        <Link href="/wishList" className="text-black hover:text-gray-600">Wish List</Link>
        <Link href="/tryOn" className="text-black hover:text-gray-600">Try On</Link>
        <Link href="/contactUs" className="text-black hover:text-gray-600">Contact Us</Link>
        <Link href="/products" className="text-black hover:text-gray-600">Casual</Link>
      </nav>
      
      <div className="flex items-center space-x-4 text-xl relative">
        {!isSearchVisible && (
          <SearchOutlined 
            className="text-black hover:text-gray-600 cursor-pointer" 
            onClick={() => setIsSearchVisible(true)} 
          />
        )}
        
        {/* Hiệu ứng trượt vào/trượt ra */}
        <AnimatePresence>
          {isSearchVisible && (
            <motion.div 
              initial={{ x: 50, opacity: 0, visibility: "hidden" }}
              animate={{ x: 0, opacity: 1, visibility: "visible" }}
              exit={{ x: 50, opacity: 0, visibility: "hidden", transition: { duration: 0.3 } }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md mx-auto"
            >
              <SearchOutlined className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <form onSubmit={handleSearch}>
                <input
                  className="w-full py-1 pl-12 pr-12 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  type="text"
                  placeholder="Find my products"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </form>
              <FaMicrophone className="absolute right-4 top-1/2 transform -translate-y-1/2 text-pink-500 cursor-pointer" />
            </motion.div>
          )}
        </AnimatePresence>
        
        <Link href="#" className="text-black hover:text-gray-600">
          <HeartOutlined />
        </Link>
        <Link href="#" className="text-black hover:text-gray-600">
          <ShoppingCartOutlined />
        </Link>
        <Link href="/" className="text-black hover:text-gray-600">
          <UserOutlined />
        </Link>
      </div>
    </header>
  );
}
