import { FaStar, FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function Reviews() {
  return (
    <>
      {/* <div className="bg-white text-black">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">OUR HAPPY CUSTOMERS</h1>
          <div className="flex space-x-4 overflow-x-auto">
            {[...Array(5)].map((_, index) => (
              <CartReview key={index} />
            ))}
          </div>
        </div>
      </div> */}

      <div className="bg-white text-gray-800">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            OUR HAPPY CUSTOMERS
          </h1>
          <div className="flex justify-center items-center space-x-4">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full cursor-pointer">
              <FaArrowLeft></FaArrowLeft>
            </div>
            <div className="flex space-x-4 overflow-x-auto">
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md w-80">
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <FaStar key={index} className="text-yellow-500" />
                    ))}
                  </div>
                </div>
                <h2 className="text-lg font-semibold mb-2">
                  Sarah M.{" "}
                  <i className="fas fa-check-circle text-green-500"></i>
                </h2>
                <p className="text-gray-600">
                  &quot;I&apos;m blown away by the quality and style of the
                  clothes I received from Shop.co. From casual wear to elegant
                  dresses, every piece I&apos;ve bought has exceeded my
                  expectations.&quot;
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md w-80">
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <FaStar key={index} className="text-yellow-500" />
                    ))}
                  </div>
                </div>
                <h2 className="text-lg font-semibold mb-2">
                  Alex K. <i className="fas fa-check-circle text-green-500"></i>
                </h2>
                <p className="text-gray-600">
                  &quot;Finding clothes that align with my personal style used
                  to be a challenge until I discovered Shop.co. The range of
                  options they offer is truly remarkable, catering to a variety
                  of tastes and occasions.&quot;
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md w-80">
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <FaStar key={index} className="text-yellow-500" />
                    ))}
                  </div>
                </div>
                <h2 className="text-lg font-semibold mb-2">
                  James L.{" "}
                  <i className="fas fa-check-circle text-green-500"></i>
                </h2>
                <p className="text-gray-600">
                  &quot;As someone who&apos;s always on the lookout for unique
                  fashion pieces, I&apos;m thrilled to have stumbled upon
                  Shop.co. The selection of clothes is not only diverse but also
                  on-point with the latest trends.&quot;
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full cursor-pointer">
              <FaArrowRight></FaArrowRight>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
