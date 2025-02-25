import Image from "next/image";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { FaRegTrashCan } from "react-icons/fa6";

function WishList({ products }) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <nav className="text-gray-600 text-sm mb-4">
          <a className="hover:underline" href="#">
            Home
          </a>{" "}
          &gt; <span>Wish list</span>
        </nav>

        <div className="bg-white rounded-lg shadow p-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between border-b pb-4 mb-4 last:border-b-0"
              >
                <div className="flex items-center">
                  <Image
                    alt={product.name}
                    className="w-24 h-24 rounded mr-4"
                    height={96}
                    src={product.image}
                    width={96}
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <p className="text-gray-600">Size: {product.size}</p>
                    <p className="text-gray-800 font-bold">${product.price}</p>
                    <p className="text-gray-600">Color: {product.color}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button className="text-red-500 hover:text-red-700 mr-4 flex items-center">
                    <FaRegTrashCan className="pr-1"/> <span>Xóa</span>
                  </button>
                  <button className="text-gray-500 hover:text-gray-700 flex items-center">
                    <ShoppingCartOutlined className="text-xl mr-1" />{" "}
                    <span>Giỏ hàng</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">
              Danh sách yêu thích trống.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

const products = [
  {
    id: 1,
    name: "Gradient Graphic T-shirt",
    size: "Large",
    price: 145,
    color: "White",
    image:
      "https://storage.googleapis.com/a1aa/image/mRq5TKcmm7JvSiqA3kMQRqktin1CCZgQhHJpsvPHS0o.jpg",
  },
  {
    id: 2,
    name: "Checkered Shirt",
    size: "Medium",
    price: 180,
    color: "Red",
    image:
      "https://storage.googleapis.com/a1aa/image/pdU_Ak9BA861qERqiQTYz-ks8-ybOW-DCUrS7O0EnUY.jpg",
  },
  {
    id: 3,
    name: "Skinny Fit Jeans",
    size: "Large",
    price: 240,
    color: "Blue",
    image:
      "https://storage.googleapis.com/a1aa/image/JaZlL5_9siSLD1ILL5YmM7B2WVl1LDEcFiGnCaZLtag.jpg",
  },
];

export default function Page() {
  return <WishList products={products} />;
}
