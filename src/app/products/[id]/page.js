"use client";

import { useState } from "react";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { FaSlidersH, FaChevronDown } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import { Rate } from "antd";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Reviews from "@/components/Reviews";
import ListProducts from "@/components/ListProducts";
import Link from "next/link";

export default function DetailProduct() {
  const [selectedColor, setSelectedColor] = useState("gray");
  const [selectedSize, setSelectedSize] = useState("Large");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Product Details");
  const tabs = ["Product Details", "Rating & Reviews", "FAQs"];

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  const handleChange = (value) => {
    setRating(value);
    console.log("User rated:", value);
  };

  const handleSubmitReview = () => {
    console.log("Review Submitted:", { rating, reviewText });
    setShowReviewForm(false);
    setReviewText("");
    setRating(0);
  };

  const colors = [
    {
      id: "gray",
      bg: "bg-gray-800",
      border: "border-gray-600",
      shadow: "0_0_10px_3px_rgba(128,128,128,0.8)",
    },
    {
      id: "green",
      bg: "bg-green-800",
      border: "border-gray-600",
      shadow: "0_0_10px_3px_rgba(34,197,94,0.8)",
    },
    {
      id: "blue",
      bg: "bg-blue-800",
      border: "border-gray-600",
      shadow: "0_0_10px_3px_rgba(59,130,246,0.8)",
    },
  ];

  return (
    <>
      <div className="bg-white text-gray-800">
        <div className="container mx-16 p-4">
          {/* Breadcrumb */}
          <nav className="text-sm mb-4 flex gap-2 text-end">
            <Link className="text-gray-500 hover:text-gray-700" href="#">
              Home
            </Link>{" "}
            <IoMdArrowDropright className="pt-1 h-full" />
            <Link className="text-gray-500 hover:text-gray-700" href="#">
              Product
            </Link>{" "}
          </nav>

          <div className="flex flex-col lg:flex-row">
            {/* Hình ảnh sản phẩm */}
            <div className="flex items-center justify-between gap-5 lg:w-1/2">
              <div className="flex flex-col items-center justify-evenly h-full mb-4">
                {[
                  "Dhn6XAieil2J6UaY8hx0lBU6MfEFFT23ie77PYxJ_aQ.jpg",
                  "nANLUMGkKl5jjp-4FGy1K9rnyLqphVESrXOVFNW7fwc.jpg",
                  "3BrQql9F8L8boyaWDivxyozjY8_pjLAoUFV955UgufU.jpg",
                ].map((src, index) => (
                  <Image
                    key={index}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-20 h-20 rounded-lg"
                    height="100"
                    src={`https://storage.googleapis.com/a1aa/image/${src}`}
                    width="100"
                  />
                ))}
              </div>

              <div className="w-full lg:w-3/4 mb-4">
                <Image
                  alt="Main product image"
                  className="w-full rounded-lg"
                  height="800"
                  src="https://storage.googleapis.com/a1aa/image/2O0wQorkwOQyoIFuG2H8ed28lPwTTv5X4cnUJxcbLG8.jpg"
                  width="600"
                />
              </div>
            </div>

            {/* Chi tiết sản phẩm */}
            <div className="lg:w-1/2 lg:pl-8">
              <h1 className="text-2xl font-bold mb-2">
                T-shirt with Tape Details
              </h1>

              <div className="flex items-center mb-2">
                <div className="flex items-center text-yellow-500">
                  <Rate allowHalf defaultValue={4.5} disabled />
                </div>
                <span className="ml-2 text-gray-600">4.5/5</span>
              </div>

              <div className="flex items-center mb-4">
                <span className="text-3xl font-bold">$260</span>
                <span className="text-gray-500 line-through ml-2">$300</span>
                <span className="text-red-500 ml-2">-40%</span>
              </div>

              <p className="text-gray-600 mb-4 w-2/3">
                This graphic t-shirt which is perfect for any occasion. Crafted
                from a soft and breathable fabric, it offers superior comfort
                and style.
              </p>

              {/* Chọn màu */}
              <div className="mb-4">
                <h2 className="text-lg font-medium mb-2">Select Colors</h2>
                <div className="flex space-x-2">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={`relative w-10 h-10 rounded-full ${color.bg} ${color.border} transition-all duration-300 hover:shadow-[${color.shadow}]`}
                    >
                      {selectedColor === color.id && (
                        <RiCheckboxCircleLine className="absolute text-white text-2xl top-2 right-2" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chọn Size */}
              <div className="mb-4">
                <h2 className="text-lg font-medium mb-2">Choose Size</h2>
                <div className="flex space-x-2">
                  {["Small", "Medium", "Large", "X-Large"].map(
                    (size, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-lg flex items-center gap-2 ${
                          selectedSize === size ? "bg-black text-white" : ""
                        }`}
                      >
                        {size}
                        {selectedSize === size && (
                          <RiCheckboxCircleLine className="text-white" />
                        )}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Các nút thao tác */}
              <div className="flex items-center space-x-4 mb-4">
                <button className="px-4 py-2 bg-black text-white rounded-lg">
                  Try to 2D
                </button>
                <div className="flex items-center border rounded-lg">
                  <button
                    className="px-4 py-2"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  >
                    -
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button
                    className="px-4 py-2"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
                <button className="px-4 py-2 bg-black text-white rounded-lg ">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          <hr></hr>

          <ListProducts title="You might also like" />

          {/* Tabs */}
          <div className="mt-8 relative">
            {/* Navigation Tabs */}
            <div className="flex justify-center space-x-8 border-b ">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-4 transition-all duration-300 ${
                    activeTab === tab
                      ? "text-black font-semibold"
                      : "text-gray-600 hover:text-black"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full text-center p-4 mt-4"
              >
                {activeTab === "Product Details" && (
                  <p className="inline-block">
                    🔹 Details about the product...
                  </p>
                )}
                {activeTab === "Rating & Reviews" && (
                  <>
                    <div className="flex items-center space-x-4 p-4 justify-between">
                      <div className="text-lg font-semibold">
                        All Reviews <span className="text-gray-500">(451)</span>
                      </div>
                      <div className="flex items-center space-x-2 w-1/3 justify-evenly">
                        <button className="flex items-center justify-evenly w-10 h-10 rounded-full bg-gray-200">
                          <FaSlidersH />
                        </button>
                        <button className="flex items-center justify-center px-4 py-2 rounded-full bg-gray-200">
                          Latest <FaChevronDown className="ml-2" />
                        </button>
                        <button
                          className="flex items-center justify-center px-4 py-2 rounded-full bg-black text-white"
                          onClick={() => setShowReviewForm(true)}
                        >
                          Write a Review
                        </button>
                      </div>
                    </div>
                    {/* Show form */}
                    {showReviewForm && (
                      <div className="p-4 border rounded-lg shadow-lg bg-gray-100 mt-4">
                        <h2 className="text-lg font-semibold mb-2">
                          Write a Review
                        </h2>
                         <Rate allowHalf defaultValue={rating} onChange={handleChange}/>
                        <textarea
                          className="w-full p-2 mt-2 border rounded-lg"
                          rows="4"
                          placeholder="Share your thoughts..."
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                        ></textarea>
                        <div className="flex justify-end space-x-2 mt-2">
                          <button
                            className="px-4 py-2 bg-gray-300 rounded-lg"
                            onClick={() => setShowReviewForm(false)}
                          >
                            Cancel
                          </button>
                          <button
                            className="px-4 py-2 bg-black text-white rounded-lg"
                            onClick={handleSubmitReview}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    )}

                    <Reviews title={""} />
                  </>
                )}
                {activeTab === "FAQs" && (
                  <p className="inline-block">
                    ❓ Frequently Asked Questions...
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
