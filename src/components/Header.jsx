import Link from "next/link";
import { UserOutlined, ShoppingCartOutlined, HeartOutlined, SearchOutlined } from "@ant-design/icons";

export default function Header() {
  return (
    <>
      <div>
        <header className="flex items-center justify-between p-4 px-20">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-red-600">W</span>
            <span className="text-xl font-bold text-black">EARWISE</span>
          </div>

          <nav className="flex items-center space-x-6 text-lg">
            <Link href="/" className="text-black hover:text-gray-600">
              Home
            </Link>
            <div className="relative group">
              <Link
                href="#"
                className="text-black hover:text-gray-600 flex items-center"
              >
                Shop <i className="fas fa-chevron-down ml-1"></i>
              </Link>
              <div className="absolute hidden group-hover:block bg-white shadow-lg mt-2 rounded">
                <Link
                  href="#"
                  className="block px-4 py-2 text-black hover:bg-gray-100"
                >
                  Category 1
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-2 text-black hover:bg-gray-100"
                >
                  Category 2
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-2 text-black hover:bg-gray-100"
                >
                  Category 3
                </Link>
              </div>
            </div>
            <Link href="/wishList" className="text-black hover:text-gray-600">
              Wish List
            </Link>
            <Link href="/tryOn" className="text-black hover:text-gray-600">
              Try On
            </Link>
            <Link href="/contactUs" className="text-black hover:text-gray-600">
              Contact Us
            </Link>
            <Link href="/products" className="text-black hover:text-gray-600">
              Casual
            </Link>
          </nav>
          <div className="flex items-center space-x-4 text-xl">
            <Link href="#" className="text-black hover:text-gray-600">
            <SearchOutlined />
            </Link>
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
      </div>
    </>
  );
}
