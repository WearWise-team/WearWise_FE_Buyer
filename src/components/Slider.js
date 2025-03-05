"use client";
import { Button, Badge, Select } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Slider() {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prevAngle) => (prevAngle + 0.5) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const calculatePosition = (offsetAngle, radius) => {
    const totalAngle = (angle + offsetAngle) % 360;
    const radian = (totalAngle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    return { x, y };
  };

  const floatingAnimation = (delay) => {
    const floatY = Math.sin((angle + delay) * 0.05) * 10;
    return floatY;
  };

  const renderProduct = (
    imageSrc,
    alt,
    title,
    offsetAngle,
    radius,
    delay,
    size = "w-32"
  ) => {
    const { x, y } = calculatePosition(offsetAngle, radius);
    const floatY = floatingAnimation(delay);

    return (
      <div
        key={title}
        style={{
          position: "absolute",
          transform: `translate(${x}px, ${y}px) translateY(${floatY}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <div className={`bg-white rounded-lg shadow-lg p-1 ${size}`}>
          <Image
            width={100}
            height={100}
            src={imageSrc || "/placeholder.svg"}
            alt={alt}
            className="w-full rounded-lg mb-2"
          />
          <h2 className="text-xs font-semibold text-black truncate">{title}</h2>
        </div>
      </div>
    );
  };

  const products = [
    {
      src: "/image-10.2-removebg-preview.png",
      alt: "Cardigan",
      title: "Cardigan",
      angle: 0,
      radius: 160,
      delay: 0,
    },
    {
      src: "/image-10.3-removebg-preview.png",
      alt: "Sleeve Cardigan",
      title: "Sleeve Cardigan",
      angle: 72,
      radius: 160,
      delay: 500,
    },
    {
      src: "/image-10.4-removebg-preview.png",
      alt: "Jean le",
      title: "Jean le",
      angle: 144,
      radius: 160,
      delay: 1000,
    },
    {
      src: "/jeann.webp",
      alt: "Jean",
      title: "Jean",
      angle: 216,
      radius: 160,
      delay: 1500,
    },
    {
      src: "/shose.webp",
      alt: "Shoe",
      title: "Shoe",
      angle: 288,
      radius: 160,
      delay: 4000,
    },
  ];

  return (
    <div className="bg-[#FDCBD5] flex items-center justify-center min-h-screen w-full">
      <div className="container mx-auto px-20 flex flex-col md:flex-row items-center">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="text-center md:text-left md:w-1/2 mb-8 md:mb-0">
            <h1 className="md:text-6xl font-bold mb-4 text-gray-900 tracking-tight">
              Elevate Your Style{" "}
              <span className="text-rose-600">Virtually</span>
            </h1>
            <p className="text-2xl text-gray-600 mb-6 leading-relaxed w-3/2">
              Experience our revolutionary virtual try-on technology. See how
              our latest collection looks on you before making a purchase.
            </p>
          </div>
        </div>
        <div className="relative md:w-1/2 pr-9 flex justify-center items-center h-[600px]">
          {products.map((product) =>
            renderProduct(
              product.src,
              product.alt,
              product.title,
              product.angle,
              product.radius,
              product.delay
            )
          )}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              transform: `translateY(${floatingAnimation(2000)}px)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            <Image
              width={200}
              height={400}
              src="/image10-removebg-preview.png"
              alt="Model wearing clothes"
              className="w-40 h-80 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
