// components/Header.js
"use client";
import Link from "next/link";
import {
  UserOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [cartCount, setCartCount] = useState(2); // Giả định dữ liệu
  const [wishlistCount, setWishlistCount] = useState(3); // Giả định dữ liệu
  const [userImage, setUserImage] = useState("/default-avatar.png"); // Ảnh mặc định

  const pathname = usePathname(); // Lấy đường dẫn hiện tại

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
        },
      });
  
      if (response.ok) {
        // Nếu logout thành công
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

  return (
    <>
      <header className="flex items-center justify-between p-4 px-20">
        {/* Logo */}
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-red-600">W</span>
          <span className="text-xl font-bold text-black">EARWISE</span>
        </div>

        {/* Navbar */}
        <nav className="flex items-center space-x-6 text-lg">
          <NavLink href="/" label="Home" activePath={isActive("/")} />
          <NavLink href="/tryOn" label="Try On" activePath={isActive("/tryOn")} />
          <NavLink href="/products" label="Product" activePath={isActive("/products/*")} />
          <NavLink href="/contactUs" label="Contact Us" activePath={isActive("/contactUs")} />
        </nav>

        {/* Icon + User */}
        <div className="flex items-center space-x-4 text-xl relative">
          {/* Search */}
          <Link href="#" className="text-black hover:text-gray-600">
            <SearchOutlined />
          </Link>

          

          {/* User (Avatar + Dropdown) */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              {/* Wishlist với Badge */}
              <div className="relative">
                <Link href="#" className="text-black hover:text-gray-600">
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
                <Link href="#" className="text-black hover:text-gray-600">
                  <ShoppingCartOutlined className="text-2xl" />
                </Link>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>

              {/* User Avatar + Dropdown */}
              <div className="relative self-center">
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
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-10">
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
              </div>
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
    </>
  );
}

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
