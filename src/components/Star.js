import { FaStar } from "react-icons/fa";

export default function Star({ numStars }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={index < numStars ? "text-yellow-500" : "text-gray-300"}
        />
      ))}
    </div>
  );
}
