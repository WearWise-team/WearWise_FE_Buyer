"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { InputField } from "@/components/InputField";
import Link from "next/link";
import { IoMdArrowDropright } from "react-icons/io";
import { getMyCart } from "@/apiServices/cart/page";
import { createOrderFromCart } from "@/apiServices/orders/page";
import { useNotification } from "@/apiServices/NotificationService";
import { useRouter } from "next/navigation";

export default function Page() {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const notify = useNotification();
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      getMyCart(parsedUser.id)
        .then((response) => {
          setItems(response.cart);
        })
        .catch((error) => console.error("Error fetching cart:", error));
    }
  }, []);

  useEffect(() => {
    const storedTotal = localStorage.getItem("total");
    const storedDiscount = localStorage.getItem("discount");

    if (storedTotal) setTotalAmount(parseFloat(storedTotal));
    if (storedDiscount) setDiscount(parseFloat(storedDiscount));
  }, []);

  const handleCreateOrders = async () => {
    try {
      const totalAmount = localStorage.getItem("total");

      if (!totalAmount || isNaN(totalAmount)) {
        notify(
          "Create Order",
          "Please back to your cart and try again!",
          "topRight",
          "warning"
        );
        return;
      }

      console.log(totalAmount, paymentMethod);

      const response = await createOrderFromCart(
        user.id,
        totalAmount,
        "pending",
        paymentMethod
      );

      if (!response || response.error) {
        console.error(
          "Error creating order:",
          response?.error || "Unknown error"
        );
        return;
      }

      notify(
        "Create Order",
        "Your order has been create.",
        "topRight",
        "success"
      );

      localStorage.removeItem("discount");
      localStorage.removeItem("total");
      router.push("/profile");
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4">
        <nav className="text-sm mb-4 flex gap-2 text-end">
          <Link className="text-gray-500 hover:text-gray-700" href="/">
            Home
          </Link>{" "}
          <IoMdArrowDropright className="pt-1 h-full" />
          <Link className="text-gray-500 hover:text-gray-700" href="/cart">
            Cart
          </Link>{" "}
          <IoMdArrowDropright className="pt-1 h-full" />
          <Link className="text-gray-500 hover:text-gray-700" href="/order">
            Order
          </Link>{" "}
        </nav>
        <h1 className="text-3xl font-bold mb-6">Confirm your order</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg">CONTACT INFO</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-red-500 hover:underline"
                >
                  {isEditing ? "Cancel" : "Update"}
                </button>
              </div>
              {isEditing ? (
                <form className="space-y-4">
                  <InputField
                    label="Phone Number"
                    type="text"
                    value={user?.phone || ""}
                    onChange={(e) =>
                      setUser({ ...user, phone: e.target.value })
                    }
                  />
                  <InputField
                    label="Email Address"
                    type="email"
                    value={user?.email || ""}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                  <InputField
                    label="Address Line 1"
                    type="text"
                    value={user?.address || ""}
                    onChange={(e) =>
                      setUser({ ...user, address: e.target.value })
                    }
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
                  <InputField
                    label="Phone Number"
                    type="text"
                    value={user?.phone || ""}
                    disabled
                  />
                  <InputField
                    label="Email Address"
                    type="email"
                    value={user?.email || ""}
                    disabled
                  />
                  <InputField
                    label="Address"
                    type="text"
                    value={user?.address || ""}
                    disabled
                  />
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
                  <option value="cod">Cash on delivery</option>
                  <option value="momo">Momo</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg mx-auto">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Order Summary
              </h2>
              <div className="space-y-6 divide-y divide-gray-200">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between pt-4"
                  >
                    <div className="flex items-center space-x-4">
                      <Image
                        alt={item.product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                        height={64}
                        src={item.product.image || "https://placehold.co/64x64"}
                        width={64}
                      />
                      <div>
                        <h3 className="text-base font-medium text-gray-900">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Size: {item.size.shirt_size}, Color: {item.color.name}
                        </p>
                        <p className="text-sm font-semibold text-gray-700 mt-1">
                          ${Number(item.product.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-700 font-semibold">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-lg font-bold text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <hr className="mt-7"></hr>
              <div>
                <div className="flex justify-between mb-1 mt-8">
                  <span>Discount</span>
                  <span className="text-red-500">-${discount}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mb-2">
                  <span>Total</span>
                  <span>${totalAmount}</span>
                </div>
              </div>
              <button
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl mt-6 text-lg font-medium transition-all"
                onClick={() => handleCreateOrders()}
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
