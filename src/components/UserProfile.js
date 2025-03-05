"use client"

import { Image } from "antd"

export default function UserProfile({ user, orders }) {
  const formatCurrency = (amount) =>
    Number.parseFloat(amount).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg max-w-6xl transition-all duration-300 hover:shadow-xl">
      {/* Header Section */}
      <div className="flex items-center gap-6 border-b border-gray-100 pb-6">
        <Image
          size={80}
          src={user.avatar || "/default-avatar.png"}
          alt={user.name}
          className="rounded-full border-4 border-white shadow-md transition-transform duration-300 hover:scale-105"
        />
        <div className="flex-1">
          <h2 className="font-bold text-2xl text-gray-900 tracking-tight">{user.name}</h2>
          <p className="text-gray-600 text-sm mt-1 font-light italic">{user.email}</p>
          <div className="flex gap-4 mt-2 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {user.phone}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14l9-5-9-5-9 5 9 5zm0 7l-9-5 9-5 9 5-9 5z"
                />
              </svg>
              {user.gender}
            </span>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <p className="text-gray-700 font-medium">
            <span className="text-gray-900 font-semibold">Address:</span> {user.address}
          </p>
        </div>
        <div className="flex items-center justify-between text-sm">
          <p className="text-gray-700 font-medium">
            <span className="text-gray-900 font-semibold">Joined:</span>{" "}
            {new Date(user.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-6 grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900">{orders.length}</p>
          <p className="text-sm text-gray-600">Total Orders</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(orders.reduce((sum, order) => sum + order.total_amount, 0))}
          </p>
          <p className="text-sm text-gray-600">Total Revenue</p>
        </div>
      </div>
    </div>
  )
}

