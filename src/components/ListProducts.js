import Card from "./Card";

export default function ListProducts({title}) {
  return (
    <>
      <div className="bg-white text-gray-800">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl text-center mb-8">{title}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 px-24">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="product-item">
                <Card></Card>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="bg-white border border-gray-300 text-gray-800 py-2 px-6 rounded-full hover:bg-gray-100">
              View All
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
