import Image from "next/image"
import { Rate } from "antd"

export default function Card({ product, rating }) {
  const percentageOf = (value, percentage) => (value * percentage) / 100;
  const { name, main_image, price, discounts } = product;

  const discount = discounts?.length ? discounts[discounts.length - 1] : null
  const discountedPrice = discount ? (price - percentageOf(price, discount.pivot.percentage)) : price

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="relative aspect-[2/2] w-full overflow-hidden rounded-t-lg">
        <Image
          fill
          src={main_image || "https://placehold.co/100x100"}
          alt={name}
          className="object-cover"  
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h2 className="text-base font-medium text-gray-900 mb-2">{name}</h2>

        {/* Hiển thị Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center text-yellow-500">
            <Rate value={rating} disabled />
          </div>
          <span className="ml-2 text-sm text-gray-600">{rating}/5</span>
        </div>

        {/* Hiển thị giá */}
        <div className="flex items-center">
          <span className={`text-lg font-bold ${discount ? "text-red-500" : ""}`}>${discountedPrice}</span>
          {discount && (
            <>
              <span className="text-sm text-gray-500 line-through ml-2">${price}</span>
              <span className="ml-2 text-red-500 bg-red-50 px-2 py-0.5 rounded-full text-xs">
                -{Math.floor(discount.pivot.percentage)}%
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

