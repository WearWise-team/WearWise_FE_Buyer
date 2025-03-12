"use client"

import Image from "next/image"
import { Rate } from "antd"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function Card({ product, rating }) {
  const percentageOf = (value, percentage) => (value * percentage) / 100
  const { name, main_image, price, discounts } = product

  const discount = discounts?.length ? discounts[discounts.length - 1] : null
  const discountPercentage = discount?.pivot?.percentage ?? 0

  const discountedPrice = price !== undefined && !isNaN(price) ? price - percentageOf(price, discountPercentage) : 0

  const safeDiscountedPrice =
    discountedPrice !== undefined && !isNaN(discountedPrice) ? Number.parseFloat(discountedPrice).toFixed(3) : "0.000"
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[2/2] w-full overflow-hidden rounded-t-lg">
          <Image
            fill
            src={main_image || "https://placehold.co/100x100"}
            alt={name}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <div className="p-4">
        <h2 className="text-base font-medium text-gray-900 mb-2">{name}</h2>

        {/* Hiển thị Rating */}
        {typeof rating === "number" && (
          <div className="flex items-center mb-2">
            <div className="flex items-center text-yellow-500">
              <Rate value={rating} disabled />
            </div>
            <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}/5</span>
          </div>
        )}

        {/* Hiển thị giá */}
        <div className="flex items-center mb-3">
          <span className={`text-lg font-bold ${discount ? "text-red-500" : ""}`}>{safeDiscountedPrice}đ</span>
          {discount && (
            <>
              <span className="text-sm text-gray-500 line-through ml-2">{price}đ</span>
              <span className="ml-2 text-red-500 bg-red-50 px-2 py-0.5 rounded-full text-xs">
                -{Math.floor(discountPercentage)}%
              </span>
            </>
          )}
        </div>

        {/* Buy Now Button */}
        <button
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl flex items-center justify-center transition-colors duration-200"
          onClick={() => console.log("Buy Now clicked for", name)}
        >
          <ShoppingCart className="w-4 h-4 mr-2 " />
          Buy Now
        </button>
      </div>
    </div>
  )
}

