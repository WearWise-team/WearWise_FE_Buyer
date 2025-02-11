import Image from "next/image";

export default function Cart() {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-4">
          <Image
            width={200}
            height={100}
            alt="Orange and black sleeve striped T-shirt"
            className="rounded-t-lg"
            src="https://storage.googleapis.com/a1aa/image/jj2YjB6IiJIYzv6qXAO3UckaWZAA4VcWoJSwQL4ceG8.jpg"
          ></Image>
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Sleeve Striped T-shirt</h2>
            <div className="flex items-center mt-2">
              <div className="flex items-center text-yellow-500">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
              </div>
              <span className="ml-2 text-gray-600">4.5/5</span>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-2xl font-bold">$130</span>
              <span className="text-gray-500 line-through ml-2">$160</span>
              <span className="ml-2 text-red-500 bg-red-100 px-2 py-1 rounded-full text-sm">
                -30%
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
