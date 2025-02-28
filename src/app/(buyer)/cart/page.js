"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { getMyCart, removeFromCart } from "@/apiServices/cart/page";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [totalDiscount, setTotalDiscount] = useState(0);

  console.log(cartItems);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const userId = user.id;

      const fetchCartItems = async () => {
        try {
          const response = await getMyCart(userId);
          setCartItems(response.cart_items);
          updateSubtotal(response.cart_items);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCartItems();
    } else {
      setLoading(false);
    }
  }, []);

  const updateSubtotal = (items) => {
    const total = items.reduce((acc, item) => {
      const totalQuantity = item.quantities.reduce(
        (sum, q) => sum + q.quantity,
        0
      );
      return acc + item.product.price * totalQuantity;
    }, 0);
    setSubtotal(total);
  };

  const applyDiscount = () => {
    let totalDiscount = 0;
    cartItems.forEach((item) => {
      if (item.discounts) {
        const validDiscounts = item.discounts.filter((discount) => {
          const now = new Date();
          const startDate = new Date(discount.start_date);
          const endDate = new Date(discount.end_date);
          return (
            now >= startDate && now <= endDate && discount.code === discountCode
          );
        });

        validDiscounts.forEach((discount) => {
          totalDiscount +=
            ((item.product.price * discount.percentage) / 100) * item.quantity;
        });
      }
    });

    setTotalDiscount(totalDiscount);
  };

  const removeItem = async (cartItemId, index) => {
    try {
      const response = await removeFromCart({ cart_item_id: cartItemId });

      if (response.success) {
        const updatedCart = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCart);
        updateSubtotal(updatedCart);
      } else {
        console.error("Failed to remove item from cart:", response.message);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const updateQuantity = (index, size, color, amount) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            quantities: item.quantities.map((q) =>
              q.size === size && q.color === color
                ? { ...q, quantity: Math.max(1, q.quantity + amount) }
                : q
            ),
          };
        }
        return item;
      });

      updateSubtotal(updatedItems);
      return updatedItems;
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto p-4">
        <nav className="text-sm mb-4 flex gap-2 text-end">
          <Link className="text-gray-500 hover:text-gray-700" href="#">
            Home
          </Link>
          <IoMdArrowDropright className="pt-1 h-full" />
          <Link className="text-gray-500 hover:text-gray-700" href="#">
            Cart
          </Link>
        </nav>
        <h1 className="text-2xl font-bold mb-6">Your cart</h1>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <Image
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg mr-4"
                    height={60}
                    width={60}
                    src={item.product.image}
                  />
                  <div>
                    <h2 className="font-semibold">{item.product.name}</h2>

                    {item.quantities.map((q, idx) => (
                      <div
                        key={idx}
                        className="text-sm text-gray-500 flex items-center"
                      >
                        <p>
                          Size: {q.size}, Color: {q.color}, Quantity:{" "}
                          {q.quantity}
                        </p>

                        <div className="flex border rounded-lg ml-2">
                          <button
                            className="px-3 py-1"
                            onClick={() =>
                              updateQuantity(index, q.size, q.color, -1)
                            }
                          >
                            -
                          </button>
                          <span className="px-3 py-1">{q.quantity}</span>
                          <button
                            className="px-3 py-1"
                            onClick={() =>
                              updateQuantity(index, q.size, q.color, 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}

                    <p className="font-bold mt-2">${item.product.price}</p>
                  </div>
                </div>
                <div className="flex-col pl-3 text-center">
                  <div className="flex border rounded-lg w-1/2">
                    <span className="px-4 py-2">
                      {item.quantities.reduce(
                        (total, q) => total + q.quantity,
                        0
                      )}
                    </span>
                  </div>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-lg mt-4"
                    onClick={() => removeItem(item.product.id, index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full lg:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Discount</span>
                <span className="text-red-500">
                  -${totalDiscount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery Fee</span>
                <span>$15</span>
              </div>
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>Total</span>
                <span>${(subtotal - totalDiscount + 15).toFixed(2)}</span>
              </div>
              <div className="flex mb-4">
                <input
                  className="flex-1 p-2 border rounded-l-lg"
                  placeholder="Enter discount code"
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <button
                  className="bg-black text-white px-4 rounded-r-lg"
                  onClick={applyDiscount}
                >
                  Apply
                </button>
              </div>
              <button className="bg-black text-white w-full py-3 rounded-lg">
                Go to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
