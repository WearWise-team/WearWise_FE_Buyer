import { FaStar } from "react-icons/fa";

export default function CartReview() {
  return (
    <>
      <div className="flex-shrink-0 w-80 p-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} className="text-yellow-500" />
            ))}
          </div>
        </div>
        <h2 className="text-lg font-bold mb-2">
          Sarah M. <i className="fas fa-check-circle text-green-500"></i>
        </h2>
        <p className="text-gray-700">
          &quot;I&apos;m blown away by the quality and style of the clothes I
          received from Shop.co. From casual wear to elegant dresses, every
          piece I&apos;ve bought has exceeded my expectations.&quot;
        </p>
      </div>
    </>
  );
}
