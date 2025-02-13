"use client";

import Slider from "../components/Slider";
import ListProducts from "../components/ListProducts";
import FilterPanel from "../components/FilterPanel";
import Reviews from "@/components/Reviews";

const logos = ["VERSACE", "ZARA", "GUCCI", "PRADA", "Calvin Klein"];

export default function Home() {
  return (
    <>
      <Slider></Slider>
      <div className="overflow-hidden bg-[#CC2B52] py-4">
        <div className="flex space-x-10 whitespace-nowrap animate-marquee">
          {logos.map((logo, index) => (
            <span key={index} className="text-white text-2xl font-bold">
              {logo}
            </span>
          ))}
        </div>
      </div>

      <ListProducts title="NEW ARRIVALS"></ListProducts>

      <hr />

      <ListProducts title="Top Selling"></ListProducts>

      <FilterPanel></FilterPanel>

      <Reviews title={"OUR HAPPY CUSTOMERS"}></Reviews>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(48%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        .animate-marquee {
          animation: marquee 10s ease infinite alternate;
        }
      `}</style>
    </>
  );
}
