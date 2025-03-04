"use client";

import { useState, use, useEffect } from "react";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { FaSlidersH, FaChevronDown } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";
import { Rate } from "antd";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import CartReview from "@/components/CardReview";
import ListProducts from "@/components/ListProducts";
import Link from "next/link";
import { getProductDetails } from "@/apiServices/products/page";
import WearwiseLoading from "@/components/WearwiseLoading";
import { addToCart } from "@/apiServices/cart/page";
import { useNotification } from "@/apiServices/NotificationService";
import { useRouter } from "next/navigation";

export default function DetailProduct({ params }) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(1);
  const [activeTab, setActiveTab] = useState("Details");
  const tabs = ["Details", "Rating & Reviews", "FAQs"];
  const [cart, setCart] = useState([]);
  const notify = useNotification();
  const router = useRouter();

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  useEffect(() => {
    if (product === null) {
      setIsLoading(true);
      setTimeout(() => {
        getProductDetails(id)
          .then((data) => {
            setProduct(data);
          })
          .catch((error) => console.error("error when show data:", error))
          .finally(() => setIsLoading(false));
      }, 3000);
    }
  }, [id, product]);

  useEffect(() => {
    if (product) {
      setRating(
        product.reviews.reduce((sum, cur) => sum + cur.rating, 0) /
          product.reviews.length
      );
    }
  }, [product]);

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

  const handleAddToCart = (
    productId,
    productColorId,
    productSizeId,
    quantity
  ) => {
    if (!selectedColor) {
      notify(
        "Product Color Required",
        "Please select a color for this product.",
        "topRight",
        "warning"
      );
      return;
    }

    const isUserLogin = localStorage.getItem("user");
    const isAlreadyInCart = cart.some(
      (item) =>
        item.product_id === productId &&
        item.product_color_id === productColorId &&
        item.product_size_id === productSizeId
    );
    if (isAlreadyInCart && isUserLogin) {
      notify(
        "Product Added to Cart",
        "Your product has been added to the cart.",
        "topRight",
        "warning"
      );
      return;
    } else if (!isUserLogin) {
      notify(
        "Login Required",
        "You must login to add this product to the cart.",
        "topRight",
        "warning"
      );
      router.push("/login");
      return;
    }

    const newItem = {
      product_id: productId,
      product_color_id: productColorId,
      product_size_id: productSizeId,
      quantity: quantity,
    };

    setCart([...cart, newItem]); 

    addToCart(newItem)
      .then((response) =>
        notify(
          "Product Added Successfully",
          "Your product has been added to the inventory.",
          "topRight"
        )
      )
      .catch((error) => console.error("Add to cart error:", error));
  };

  const percentageOf = (value, percentage) => (value * percentage) / 100;

  if (isLoading) {
    return <WearwiseLoading></WearwiseLoading>;
  }

  return (
    <>
      <div className="bg-white text-gray-800">
        <div className="container mx-16 p-4">
          {/* Breadcrumb */}
          <nav className="text-sm mb-4 flex gap-2 text-end">
            <Link className="text-gray-500 hover:text-gray-700" href="/">
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
                {(product?.images && product.images.length > 0
                  ? product.images
                  : [product?.image, product?.image, product?.image]
                ).map((value, index) =>
                  value ? (
                    <Image
                      key={index}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-20 h-20 rounded-lg"
                      height="100"
                      src={value.url ? value.url : value}
                      width="100"
                    />
                  ) : null
                )}
              </div>

              <div className="w-full lg:w-3/4 mb-4">
                <Image
                  alt="Main product image"
                  className="w-full rounded-lg"
                  height="800"
                  src={product ? product.image : "https://placehold.co/100x100"}
                  width="600"
                />
              </div>
            </div>

            {/* Chi tiết sản phẩm */}
            <div className="lg:w-1/2 lg:pl-8">
              <h1 className="text-2xl font-bold mb-2">
                {product ? product.name : "is loading..."}
              </h1>

              <div className="flex items-center mb-2">
                <div className="flex items-center text-yellow-500">
                  <Rate allowHalf value={rating} disabled />
                </div>
                <span className="ml-2 text-gray-600">
                  {rating ? rating.toFixed(0) : 0}/5
                </span>
              </div>

              <div className="flex items-center mb-4">
                <span className="text-3xl font-bold">
                  ${product ? product.price : 0}
                </span>
                {product && product.discounts.length > 0 ? (
                  <div className="ml-2">
                    {product.discounts.map((discount) => {
                      // Tính giá sau giảm giá
                      const discountedPrice = percentageOf(
                        product.price,
                        discount.percentage
                      );
                      return (
                        <p key={discount.id} className="flex items-center">
                          <span className="text-gray-500">
                            {discount.code} -
                          </span>
                          <span className="text-gray-500 ml-2 line-through">
                            ${discountedPrice.toFixed(2)}
                          </span>
                          <span className="text-red-500 ml-2">
                            {discount.percentage}%
                          </span>
                        </p>
                      );
                    })}
                  </div>
                ) : null}
              </div>

              <p className="text-gray-600 mb-4 w-2/3">
                {product ? product.description : ""}
              </p>

              {/* Chọn màu */}
              <div className="mb-4">
                <h2 className="text-lg font-medium mb-2">Select Colors</h2>
                <div className="flex space-x-2">
                  {product?.colors?.map((color) => (
                    <button
                      key={color.id}
                      id={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className="relative w-10 h-10 rounded-full border-gray-600 transition-all duration-300 hover:shadow-md"
                      style={{ backgroundColor: color.code }}
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
                  {product?.sizes?.map((size) => (
                    <button
                      key={size.id}
                      id={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={`px-4 py-2 border border-spacing-1 rounded-md ${
                        selectedSize === size.id
                          ? "bg-gray-800 text-white"
                          : "bg-white text-gray-800"
                      } transition-all duration-300 hover:shadow-md`}
                    >
                      {size.shirt_size + "-" + size.target_audience}
                    </button>
                  ))}
                </div>
              </div>

              {/* Các nút thao tác */}
              <div className="flex items-center space-x-4 mb-4">
                <Link
                  href="/tryOn"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      localStorage.setItem("tryOnImage", product.image); // Lưu ảnh vào localStorage
                    }
                  }}
                >
                  <button className="px-4 py-2 bg-black text-white rounded-lg">
                    Try to 2D
                  </button>
                </Link>
                <button
                  className="px-4 py-2 bg-black text-white rounded-lg"
                  onClick={() =>
                    handleAddToCart(product?.id, selectedColor, selectedSize, 1)
                  }
                >
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
                {activeTab === "Details" && (
                  <div className="inline-block">
                    <div className="bg-gray-100">
                      <div className="max-w-4xl p-4 bg-white shadow-md rounded-md">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <Image
                              alt="Avatar of supplier"
                              className="w-20 h-20 rounded-full"
                              height="100"
                              src={
                                product
                                  ? product.supplier.avatar
                                  : "https://placehold.co/100x100"
                              }
                              width="100"
                            />
                          </div>
                          <div className="ml-4 flex-grow">
                            <h2 className="text-xl font-semibold"></h2>
                            <div className="flex items-center">
                              <span>Shop: </span>
                              <span className="ml-2 text-red-500">
                                {product && product.supplier.name}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span>Address: </span>
                              <span className="ml-2 text-red-500">
                                {product && product.supplier.address}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span>Phone Number: </span>
                              <span className="ml-2 text-red-500">
                                {product && product.supplier.phone}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "Rating & Reviews" && (
                  <>
                    <div className="flex items-center space-x-4 p-4 justify-between">
                      <div className="text-lg font-semibold">
                        All Reviews{" "}
                        <span className="text-gray-500">
                          {product && product.reviews.length}
                        </span>
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
                        <Rate
                          allowHalf
                          defaultValue={rating}
                          onChange={handleChange}
                        />
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
                    <div className="flex flex-wrap gap-8">
                      {product.reviews.length > 0 &&
                        product.reviews.map((review, index) => (
                          <CartReview
                            key={index}
                            numStar={review.rating}
                            author={review.user.name}
                            comment={review.content}
                          />
                        ))}
                    </div>
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
