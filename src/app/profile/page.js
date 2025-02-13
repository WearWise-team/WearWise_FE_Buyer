"use client"

import { Menu, Avatar, Button, Tag } from "antd"
import {
  UserOutlined,
  ShoppingOutlined,
  HeartOutlined,
  EnvironmentOutlined,
  CreditCardOutlined,
  BellOutlined,
  SettingOutlined,
} from "@ant-design/icons"
import Image from "next/image"

export default function ProfilePage() {
  const menuItems = [
    {
      key: "personal",
      icon: <UserOutlined />,
      label: "Personal Information",
    },
    {
      key: "orders",
      icon: <ShoppingOutlined />,
      label: "My Orders",
    },
    {
      key: "wishlist",
      icon: <HeartOutlined />,
      label: "My Wishlists",
    },
    {
      key: "addresses",
      icon: <EnvironmentOutlined />,
      label: "Manage Addresses",
    },
    {
      key: "cards",
      icon: <CreditCardOutlined />,
      label: "Saved Cards",
    },
    {
      key: "notifications",
      icon: <BellOutlined />,
      label: "Notifications",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
  ]

  const orders = [
    {
      id: 1,
      name: "Girls Pink Moana Printed Dress",
      image: "/placeholder.svg?height=100&width=100",
      size: "Size: 5",
      quantity: 1,
      price: 80.0,
      status: "delivered",
    },
    {
      id: 2,
      name: "Women Textured Handheld Bag",
      image: "/placeholder.svg?height=100&width=100",
      size: "Size: Regular",
      quantity: 1,
      price: 80.0,
      status: "processing",
    },
    {
      id: 3,
      name: "Tailored Cotton Casual Shirt",
      image: "/placeholder.svg?height=100&width=100",
      size: "Size: M",
      quantity: 1,
      price: 40.0,
      status: "processing",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-[300px,1fr] gap-8">
        <div className="bg-white rounded-lg p-6 shadow-sm h-fit">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b">
            <Avatar size={64} src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
            <div>
              <h2 className="font-semibold">Robert Fox</h2>
              <p className="text-gray-500">robert@example.com</p>
            </div>
          </div>
          <Menu mode="inline" defaultSelectedKeys={["orders"]} items={menuItems} className="border-none" />
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">My Orders</h1>
            <Button type="primary" className="bg-black">
              Filter
            </Button>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-6">
                  <div className="relative w-20 h-20">
                    <Image
                      src={order.image || "/placeholder.svg"}
                      alt={order.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{order.name}</h3>
                    <p className="text-sm text-gray-500">{order.size}</p>
                    <p className="text-sm text-gray-500">Qty: {order.quantity}</p>
                    <Tag color={order.status === "delivered" ? "success" : "processing"} className="mt-2">
                      {order.status === "delivered" ? "Delivered" : "Processing"}
                    </Tag>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${order.price.toFixed(2)}</p>
                    <Button type="link" className="p-0">
                      View Order
                    </Button>
                    {order.status === "processing" && (
                      <Button type="link" danger className="p-0 block">
                        Cancel Order
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

