"use client";

import { useState } from "react";
import Image from "next/image";

export default function Page() {
  const [items, setItems] = useState([
    { id: 1, name: "Black Automatic Watch", price: 169.99, quantity: 1 },
    { id: 2, name: "Black Automatic Watch", price: 169.99, quantity: 1 },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const updateQuantity = (id, amount) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Confirm your order</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg">CONTACT INFO</h2>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-red-500 hover:underline"
                >
                  update
                </button>
              </div>
              {isEditing ? (
                <form className="space-y-4">
                  <input
                    className="w-full border-gray-300 rounded-md p-2"
                    type="text"
                    placeholder="Phone Number"
                  />
                  <input
                    className="w-full border-gray-300 rounded-md p-2"
                    type="email"
                    placeholder="Email Address"
                  />
                  <input
                    className="w-full border-gray-300 rounded-md p-2"
                    type="text"
                    placeholder="Address Line 1"
                  />
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Save
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Your phone number
                    </label>
                    <input
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-12"
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <input
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-12"
                      type="email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-12"
                      type="string"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg mb-4">PAYMENT</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Method
                </label>
                <select
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-12"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option>Cash</option>
                  <option>Credit Card</option>
                </select>
              </div>
              {paymentMethod === "Credit Card" && (
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Card Number
                    </label>
                    <input
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-12"
                      type="text"
                      placeholder="1234 5678 9101 1121"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Expiry Date
                      </label>
                      <input
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-12"
                        type="text"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        CVV
                      </label>
                      <input
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-12"
                        type="text"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Cardholder Name
                    </label>
                    <input
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm h-12"
                      type="text"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg mb-4">Order summary</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <Image
                        alt={item.name}
                        className="w-16 h-16 rounded-md mr-4"
                        height={60}
                        src="https://placehold.co/60x60"
                        width={60}
                      />
                      <div>
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-gray-500 border border-gray-300 rounded-md px-2"
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-gray-500 border border-gray-300 rounded-md px-2"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full bg-gray-900 text-white py-3 rounded-md mt-6">
                Confirm order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
