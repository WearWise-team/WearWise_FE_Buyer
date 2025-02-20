import SidebarFilter from '@/components/SidebarFilter'
import Card from '@/components/Card'
import React from 'react'
const MOCK_PRODUCTS = [
    {
      name: "Gradient Graphic T-shirt",
      image: "/placeholder.svg?height=400&width=300",
      rating: 3.5,
      price: 145,
    },
    {
      name: "Polo with Tipping Details",
      image: "/placeholder.svg?height=400&width=300",
      rating: 4.5,
      price: 180,
    },
    {
      name: "Black Striped T-shirt",
      image: "/placeholder.svg?height=400&width=300",
      rating: 5,
      price: 120,
      originalPrice: 150,
      discount: 20,
    },
    {
      name: "Black Striped T-shirt",
      image: "/placeholder.svg?height=400&width=300",
      rating: 5,
      price: 120,
      originalPrice: 150,
      discount: 20,
    },
    // Add more mock products as needed
  ]
const ProductPage = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-8">
            <SidebarFilter />
    
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-gray-600">Showing 1-10 of 100 Products</p>
                <select className="border rounded-lg px-3 py-2 text-sm">
                  <option>Most Popular</option>
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
    
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {MOCK_PRODUCTS.map((product, index) => (
                  <Card key={index} product={product} />
                ))}
              </div>
    
              <div className="flex justify-center mt-8 gap-2">
                <button className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">Previous</button>
                {[1, 2, 3, "...", 10].map((page, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 text-sm rounded-lg ${page === 1 ? "bg-primary text-white" : "hover:bg-gray-50"}`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">Next</button>
              </div>
            </div>
          </div>
        </div>
      )
}

export default ProductPage