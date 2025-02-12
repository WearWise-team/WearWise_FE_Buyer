import { FaSearch, FaHeart, FaUser } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";

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
            <a href="#" className="text-black hover:text-gray-600">
              Home
            </a>
            <div className="relative group">
              <a
                href="#"
                className="text-black hover:text-gray-600 flex items-center"
              >
                Shop <i className="fas fa-chevron-down ml-1"></i>
              </a>
              <div className="absolute hidden group-hover:block bg-white shadow-lg mt-2 rounded">
                <a
                  href="#"
                  className="block px-4 py-2 text-black hover:bg-gray-100"
                >
                  Category 1
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-black hover:bg-gray-100"
                >
                  Category 2
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-black hover:bg-gray-100"
                >
                  Category 3
                </a>
              </div>
            </div>
            <a href="#" className="text-black hover:text-gray-600">
              Our Story
            </a>
            <a href="#" className="text-black hover:text-gray-600">
              Blog
            </a>
            <a href="#" className="text-black hover:text-gray-600">
              Contact Us
            </a>
            <a href="#" className="text-black hover:text-gray-600">
              Casual
            </a>
          </nav>
          <div className="flex items-center space-x-4 text-xl">
            <a href="#" className="text-black hover:text-gray-600">
              <FaSearch />
            </a>
            <a href="#" className="text-black hover:text-gray-600">
              <FaHeart />
            </a>
            <a href="#" className="text-black hover:text-gray-600">
              <FaBagShopping />
            </a>
            <a href="#" className="text-black hover:text-gray-600">
              <FaUser />
            </a>
          </div>
        </header>
      </div>
    </>
  );
}
