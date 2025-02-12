import Image from "next/image";

export default function Slider() {
  return (
    <>
      <div className="bg-[#FDCBD5] flex items-center justify-center min-h-screen w-full">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="text-center md:text-left md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl font-bold mb-2 text-black">
              Try Before You Buy!
            </h1>
            <p className="text-lg text-black">
              Experience the latest in virtual try-on technology.
            </p>
            <div className="flex justify-center md:justify-start mt-8">
              <div className="w-8 h-8 bg-white mx-1"></div>
              <div className="w-8 h-8 bg-blue-500 mx-1"></div>
              <div className="w-8 h-8 bg-gray-500 mx-1"></div>
              <div className="w-8 h-8 bg-green-300 mx-1"></div>
            </div>
          </div>
          <div className="relative md:w-1/2 flex justify-center items-center">
            <div className="absolute top-0 left-1/4 transform -translate-x-1/2 -translate-y-1/2 rotate-6">
              <div className="bg-white rounded-lg shadow-lg p-1 w-40">
                <Image
                  width={100}
                  height={100}
                  src="https://placehold.co/100x100"
                  alt="Cardigan"
                  className="w-full rounded-lg mb-2"
                ></Image>
                <h2 className="text-sm font-semibold text-black">Cardigan</h2>
              </div>
            </div>
            <div className="absolute top-0 right-1/4 transform translate-x-1/2 -translate-y-1/2 -rotate-6">
              <div className="bg-white rounded-lg shadow-lg p-1 w-40">
                <Image
                  width={100}
                  height={100}
                  src="https://placehold.co/100x100"
                  alt="Sleeve Cardigan"
                  className="w-full rounded-lg mb-2"
                ></Image>
                <h2 className="text-sm font-semibold text-black">
                  Sleeve Cardigan
                </h2>
              </div>
            </div>
            <div className="absolute bottom-0 left-1/4 transform -translate-x-1/2 translate-y-1/2 -rotate-6">
              <div className="bg-white rounded-lg shadow-lg p-1 w-40">
                <Image
                  width={100}
                  height={100}
                  src="https://placehold.co/100x100"
                  alt="Jean"
                  className="w-full rounded-lg mb-2"
                ></Image>
                <h2 className="text-sm font-semibold text-black">Jean</h2>
              </div>
            </div>
            <div className="absolute bottom-0 right-1/4 transform translate-x-1/2 translate-y-1/2 rotate-6">
              <div className="bg-white rounded-lg shadow-lg p-1 w-40">
                <Image
                  width={100}
                  height={100}
                  src="https://placehold.co/100x100"
                  alt="Jean"
                  className="w-full rounded-lg mb-2"
                ></Image>
                <h2 className="text-sm font-semibold text-black">Jean</h2>
              </div>
            </div>
            <Image
              width={200}
              height={400}
              src="https://placehold.co/200x400"
              alt="Model wearing clothes"
              className="relative z-10 w-40 h-80 object-cover"
            ></Image>
          </div>
        </div>
      </div>
    </>
  );
}
