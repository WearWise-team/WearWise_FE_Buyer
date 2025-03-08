"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCartOutlined, HeartOutlined, SearchOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { FaMicrophone } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { useNotification } from "@/apiServices/NotificationService";

let searchTimeout;

export default function Header() {
  const router = useRouter();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0); 
  const [wishlistCount, setWishlistCount] = useState(3); 
  const [userImage, setUserImage] = useState("https://placehold.co/100x100"); 
  const [isListening, setIsListening] = useState(false);
  const notify = useNotification();

  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();
    setIsListening(true);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchValue(transcript);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const pathname = usePathname(); 

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLoggedIn(!!accessToken);

    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.image) {
      setUserImage(userData.image);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("Access token không tồn tại.");
        return;
      }
  
      const response = await fetch("http://127.0.0.1:8000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
      });
  
      if (response.ok) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        window.location.href = "/";
      } else {
        const errorData = await response.json();
        console.error("Đăng xuất thất bại:", errorData.message || "Lỗi không xác định.");
      }
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };
  

  const isActive = (path) => pathname === path;

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

  const handleSearch = async (event) => {
  event.preventDefault();

    if (!searchValue.trim()) {
      notify("Search", "Please enter a keyword to search.", "topRight", "warning");
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
          <NavLink href="/" label="Home" activePath={isActive("/")} />
          <NavLink href="/tryOn" label="Try On" activePath={isActive("/tryOn")} />
          <NavLink href="/tryOnK" label="Try On with Kling AI" activePath={isActive("/tryOnK")} />
          <NavLink href="/products" label="Product" activePath={isActive("/products/*")} />
          <NavLink href="/contactUs" label="Contact Us" activePath={isActive("/contactUs")} />
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
              <FaMicrophone 
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer ${isListening ? "text-red-600" : "text-pink-500"}`} 
                onClick={startListening} 
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* User (Avatar + Dropdown) */}
        {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              {/* Wishlist với Badge */}
              <div className="relative">
                <Link href="/wishlist" className="text-black hover:text-gray-600">
                  <HeartOutlined className="text-2xl" />
                </Link>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </div>

              {/* Cart với Badge */}
              <div className="relative">
                <Link href="/cart" className="text-black hover:text-gray-600">
                  <ShoppingCartOutlined className="text-2xl" />
                </Link>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>

              {/* User Avatar + Dropdown */}
              <>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="focus:outline-none"
                >
                  <img
                    src={userImage}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border-2 border-gray-300 hover:border-red-500 transition duration-300"
                  />
                </button>

                {showMenu && (
                  <div className="absolute left-10 top-8 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-10">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            </div>
          ) : (
            <>
              <Link href="/login" className="text-black hover:text-gray-600">
                Login
              </Link>
              <Link href="/register" className="text-black hover:text-gray-600">
                Register
              </Link>
            </>
          )}
      </div>
    </header>
)};

// Component NavLink tái sử dụng cho Navbar
const NavLink = ({ href, label, activePath }) => (
  <Link
    href={href}
    className={`relative text-red hover:text-red-500 transition-colors duration-300 ${
      activePath ? "font-bold" : ""
    } group`}
  >
    {label}
    <span
      className={`absolute left-0 bottom-0 h-0.5 bg-red-600 transition-all duration-300 ${
        activePath ? "w-full" : "w-0 group-hover:w-full"
      }`}
    ></span>
  </Link>
);
