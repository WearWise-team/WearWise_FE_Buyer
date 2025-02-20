import Image from "next/image";
import { Rate } from 'antd';
export default function Card({product}) {
  // Default props for development
  const defaultProduct = {
    ...product,
  }

  const { name, image, rating = 5, price, originalPrice, discount } = defaultProduct;

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="relative aspect-[2/2] w-full overflow-hidden rounded-t-lg">
        <Image
          fill
          src={image || "/placeholder.svg"}
          alt={name}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h2 className="text-base font-medium text-gray-900 mb-2">{name}</h2>
        <div className="flex items-center mb-2">
          <div className="flex items-center text-yellow-500">
              <Rate defaultValue={rating} disabled/>
          </div>
          <span className="ml-2 text-sm text-gray-600">{rating}/5</span>
        </div>
        <div className="flex items-center">
          <span className="text-lg font-bold">${price}</span>
          {originalPrice && (
            <>
              <span className="text-sm text-gray-500 line-through ml-2">${originalPrice}</span>
              {discount && (
                <span className="ml-2 text-red-500 bg-red-50 px-2 py-0.5 rounded-full text-xs">-{discount}%</span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
