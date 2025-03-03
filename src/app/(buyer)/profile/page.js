"use client";

import { useEffect, useState, useCallback } from "react";
import { Menu, Avatar, Button, Tag, Spin, Divider, Tabs } from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { getUserOrders } from "@/apiServices/orders/page";
import { useNotification } from "@/apiServices/NotificationService";
import { useRouter } from "next/navigation"; // Import useRouter

export default function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const notify = useNotification();
  const router = useRouter();

  // Fetch userId from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserId(parsedUser.id);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  // Memoized fetch function
  const fetchOrders = useCallback(async () => {
    if (!userId || selectedTab !== "orders") return;

    setLoading(true);
    try {
      const data = await getUserOrders(userId);
      // Only update if data has actually changed
      setOrders((prevOrders) => {
        const isDifferent = JSON.stringify(data) !== JSON.stringify(prevOrders);
        return isDifferent ? data : prevOrders;
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, [userId, selectedTab]);

  // Fetch orders when dependencies change
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleTabChange = (e) => {
    setSelectedTab(e.key);
  };

  const formatCurrency = (amount) =>
    parseFloat(amount).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const PaymentButton = ({ order }) => {
    const [isPending, setIsPending] = useState(false);
    const exchangeRate = 25000;

    const handlePayment = async () => {
      setIsPending(true);
      const amountVND = Math.round(order.total_amount * exchangeRate);

      if (amountVND < 1000 || amountVND > 50000000) {
        notify(
          "Payment Error",
          "Amount must be from 1,000 to 50,000,000 VND",
          "topRight",
          "error"
        );
        setIsPending(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/api/momo/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: amountVND, orderId: order.id }),
        });
        const data = await response.json();

        if (data.payUrl) {
          window.location.href = data.payUrl;
        } else {
          notify(
            "Payment Failed",
            "Unable to generate payment link",
            "topRight",
            "error"
          );
        }
      } catch (error) {
        notify("Payment Error", "Something went wrong", "topRight", "error");
      } finally {
        setIsPending(false);
      }
    };

    return (
      <Button
        type="primary"
        className="bg-pink-500 hover:!bg-pink-600"
        onClick={handlePayment}
        disabled={isPending}
      >
        {isPending ? "Processing..." : "Pay with Momo"}
      </Button>
    );
  };

  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (!router.isReady) return;

      const query = router.query;
      const resultCode = query.resultCode;

      if (resultCode !== undefined) {
        if (resultCode === "0") {
          try {
            const response = await fetch("http://127.0.0.1:8000/api/orders", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                status: "completed",
                userId: userId,
                orderId: `${explode(":", query.orderId)[0]}`,
              }),
            });

            if (response.ok) {
              notify(
                "Payment Successful",
                "Your order has been completed.",
                "topRight",
                "success"
              );
            } else {
              notify(
                "Update Failed",
                "Could not update order status.",
                "topRight",
                "error"
              );
            }
          } catch (error) {
            notify("Error", "Something went wrong.", "topRight", "error");
          }
        } else {
          notify(
            "Payment Failed",
            "Your payment was not successful.",
            "topRight",
            "error"
          );
        }
        router.replace("/profile", undefined, { shallow: true });
      }
    };

    checkPaymentStatus();
  }, [router.query]);

  const renderOrdersByStatus = (status) => {
    const filteredOrders = orders.filter((order) => order.status === status);

    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-[200px]">
          <Spin size="large" />
        </div>
      );
    }

    if (filteredOrders.length === 0) {
      return (
        <div className="text-center py-12 bg-white rounded-lg">
          <ShoppingOutlined className="text-4xl text-gray-400 mb-4" />
          <p className="text-gray-500">No {status} orders found.</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                <p className="text-gray-500 text-sm">
                  Placed on {formatDate(order.order_date)}
                </p>
              </div>
              <Tag
                color={
                  order.status === "completed"
                    ? "green"
                    : order.status === "pending"
                    ? "orange"
                    : "red"
                }
                className="font-medium"
              >
                {order.status.toUpperCase()}
              </Tag>
            </div>

            <Divider className="my-4" />

            {order.items.map((item, index) => (
              <div
                key={item.order_item_id}
                className={`flex items-center gap-6 ${
                  index > 0 ? "pt-4 border-t" : ""
                }`}
              >
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.product_name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{item.product_name}</h4>
                  <div className="text-sm text-gray-600">
                    <p>Color: {item.color_name}</p>
                    <p>Size: {item.shirt_size || item.pant_size}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(item.price)}</p>
                </div>
              </div>
            ))}

            <Divider className="my-4" />

            <div className="flex justify-between items-center">
              <div>
                {order.payment_method !== "cod" && (
                  <p className="text-gray-600">
                    Payment: {order.payment_method.toUpperCase()}
                  </p>
                )}
                <p className="font-semibold text-lg">
                  Total: {formatCurrency(order.total_amount)}
                </p>
              </div>
              {order.status === "pending" && <PaymentButton order={order} />}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-[300px,1fr] gap-8">
        <div className="bg-white rounded-lg p-6 shadow-sm h-fit">
          <Menu
            mode="inline"
            selectedKeys={[selectedTab]}
            onClick={handleTabChange}
            className="border-0"
            items={[
              { key: "orders", icon: <ShoppingOutlined />, label: "My Orders" },
              {
                key: "wishlist",
                icon: <HeartOutlined />,
                label: "My Wishlists",
              },
              {
                key: "Profile",
                icon: <UserOutlined />,
                label: "My Profile",
              },
            ]}
          />
        </div>

        <div className="space-y-6">
          {selectedTab === "orders" && (
            <Tabs
              defaultActiveKey="pending"
              items={[
                {
                  key: "pending",
                  label: "Pending",
                  children: renderOrdersByStatus("pending"),
                },
                {
                  key: "completed",
                  label: "Completed",
                  children: renderOrdersByStatus("completed"),
                },
                {
                  key: "canceled",
                  label: "Canceled",
                  children: renderOrdersByStatus("canceled"),
                },
              ]}
            />
          )}
          {selectedTab === "wishlist" && (
            <div className="text-center py-12 bg-white rounded-lg">
              <HeartOutlined className="text-4xl text-gray-400 mb-4" />
              <p className="text-gray-500">No wishlisted items found.</p>
            </div>
          )}
          {selectedTab === "Profile" && (
            <div className="p-8 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg max-w-6xl transition-all duration-300 hover:shadow-xl">
              {/* Header Section */}
              <div className="flex items-center gap-6 border-b border-gray-100 pb-6">
                <Avatar
                  size={80}
                  src={user.avatar || "/default-avatar.png"}
                  alt={user.name}
                  className="rounded-full border-4 border-white shadow-md transition-transform duration-300 hover:scale-105"
                />
                <div className="flex-1">
                  <h2 className="font-bold text-2xl text-gray-900 tracking-tight">
                    {user.name}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1 font-light italic">
                    {user.email}
                  </p>
                  <div className="flex gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
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
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
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
                    <span className="text-gray-900 font-semibold">
                      Address:
                    </span>{" "}
                    {user.address}
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
                  <p className="text-lg font-semibold text-gray-900">
                    {orders.length}
                  </p>
                  <p className="text-sm text-gray-600">Total Orders</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(
                      orders.reduce((sum, order) => sum + order.total_amount, 0)
                    )}
                  </p>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
