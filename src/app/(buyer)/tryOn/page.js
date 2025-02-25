"use client";

import { useState } from "react";
import Image from "next/image";
import {
  UploadOutlined,
  UserOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { FaTshirt } from "react-icons/fa";

export default function TryOn2D() {
  const [personImage, setPersonImage] = useState(null);
  const [garmentImage, setGarmentImage] = useState(null);
  const [resultImage, setResultImage] = useState(
    "https://storage.googleapis.com/a1aa/image/lK61aVyJd9w8WVWf7gZtE6Dkut0rhZJ2QZbNwIoZHbU.jpg"
  );

  const handleImageUpload = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn2D = () => {
    // TODO: Implement 2D try-on logic here
    // You can use a 3D model and texture of your garment for this purpose
  }

  return (
    <div className="bg-white flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Try On 2D</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upload Person Image */}
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-2">
            Step 1: Upload a person image
          </h2>
          <div className="border-2 border-gray-300 rounded-lg p-4 w-64 h-52 flex flex-col items-center justify-center">
            <div className="flex items-center mb-2">
              <UserOutlined className="text-xl mr-2" />
              <span className="font-semibold">Person</span>
            </div>
            <div className="flex flex-col items-center justify-center h-full">
              {personImage ? (
                <Image
                  src={personImage}
                  alt="Uploaded Garment"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <UploadOutlined className="text-2xl mb-2" />
                  <input
                    type="file"
                    className="hidden"
                    id="garment-upload"
                    onChange={(e) => handleImageUpload(e, setPersonImage)}
                  />
                  <label
                    htmlFor="garment-upload"
                    className="text-center text-gray-500 cursor-pointer"
                  >
                    Drop Image Here
                    <br />- or -<br />
                    Click to Upload
                  </label>
                </>
              )}
            </div>
          </div>
        </div>
        {/* Upload Garment Image */}
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-2">
            Step 2: Upload a garment image
          </h2>
          <div className="border-2 border-gray-300 rounded-lg p-4 w-64 h-52 flex flex-col items-center justify-center">
            <div className="flex items-center mb-2">
              <FaTshirt className="text-xl mr-2" />
              <span className="font-semibold">Garment</span>
            </div>
            <div className="flex flex-col items-center justify-center h-full">
              {garmentImage ? (
                <Image
                  src={garmentImage}
                  alt="Uploaded Garment"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <UploadOutlined className="text-2xl mb-2" />
                  <input 
                    type="file"
                    className="hidden"
                    id="garment-upload"
                    onChange={(e) => handleImageUpload(e, setGarmentImage)}
                  />
                  <label
                    htmlFor="garment-upload"
                    className="text-center text-gray-500 cursor-pointer"
                  >
                    Drop Image Here
                    <br />- or -<br />
                    Click to Upload
                  </label>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Display Result */}
      <div className="flex flex-col items-center mt-6">
        <h2 className="text-lg font-semibold mb-2">
          Step 3: Press “Run” to get try-on results
        </h2>
        <div className="border-2 border-gray-300 rounded-lg p-4 w-64 h-52 flex flex-col items-center justify-center">
          <div className="flex items-center mb-2">
            <PictureOutlined className="text-xl mr-2" />
            <span className="font-semibold">Result</span>
          </div>
          <Image
            src={resultImage}
            alt="Try-on Result"
            width={64}
            height={64}
            className="w-16 h-16 object-cover"
          />
        </div>
      </div>
      {/* Run Button */}
      <button onClick={handleTryOn2D} className="mt-6 bg-black text-white py-2 px-6 rounded-full">
        Run
      </button>
    </div>
  );
}
