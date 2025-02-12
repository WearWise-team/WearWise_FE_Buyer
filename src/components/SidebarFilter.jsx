export default function SidebarFilter() {
    return (
      <div className="w-64 pr-8">
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Filters</h3>
          <div className="space-y-2">
            {["T-shirts", "Shorts", "Shirts", "Hoodies", "Jeans"].map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  id={category}
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor={category} className="ml-2 text-sm text-gray-600">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>
  
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Price</h3>
          <input type="range" min="0" max="200" className="w-full" />
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-600">$0</span>
            <span className="text-sm text-gray-600">$200</span>
          </div>
        </div>
  
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Colors</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "bg-green-500",
              "bg-red-500",
              "bg-yellow-500",
              "bg-orange-500",
              "bg-blue-500",
              "bg-purple-500",
              "bg-pink-500",
              "bg-black",
            ].map((color) => (
              <button key={color} className={`w-6 h-6 rounded-full ${color} border border-gray-200`} />
            ))}
          </div>
        </div>
  
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Size</h3>
          <div className="flex flex-wrap gap-2">
            {["XX Small", "X Small", "Small", "Medium", "Large", "X Large", "XX Large", "3X Large", "4X Large"].map(
              (size) => (
                <button key={size} className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200">
                  {size}
                </button>
              ),
            )}
          </div>
        </div>
        <button className="w-full rounded-lg bg-black text-white px-4 py-2 hover:bg-black/90">
          Apply Filter
        </button>
      </div>
    )
  }
  
  