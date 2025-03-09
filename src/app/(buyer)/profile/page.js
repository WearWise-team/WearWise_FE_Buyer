"use client"

import { useEffect, useState, useCallback } from "react"
import { Menu } from "antd"
import { UserOutlined, ShoppingOutlined, HeartOutlined } from "@ant-design/icons"
import { getUserOrders } from "@/apiServices/orders/page"
import { useNotification } from "@/apiServices/NotificationService"
import { useRouter } from "next/navigation"
import OrdersList from "@/components/OrdersList"
import UserProfile from "@/components/UserProfile"

function explode(delimiter, string, limit) {
  //  discuss at: https://locutus.io/php/explode/
  // original by: Kevin van Zonneveld (https://kvz.io)
  //   example 1: explode(' ', 'Kevin van Zonneveld')
  //   returns 1: [ 'Kevin', 'van', 'Zonneveld' ]
  if (arguments.length < 2 || typeof delimiter === "undefined" || typeof string === "undefined") {
    return null
  }
  if (delimiter === "" || delimiter === false || delimiter === null) {
    return false
  }
  if (typeof delimiter === "function") {
    // Here we must use call because the function is a first-class object
    // return delimiter(string)
  }
  if (typeof limit !== "undefined") {
    limit = Number.parseInt(limit, 10) // Normalize to positive integer
    if (Number.isNaN(limit)) {
      limit = 0
    }
    if (limit > 0) {
      var splitted = string.split(delimiter)
      var partA = splitted.splice(0, limit - 1)
      var partB = splitted.join(delimiter)
      partA.push(partB)
      return partA
    }
    // for limit <= 0
    return false
  }
  return string.split(delimiter)
}

export default function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState("orders")
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState(null)
  const [user, setUser] = useState(null)
  const notify = useNotification()
  const router = useRouter()

  // Fetch userId from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUserId(parsedUser.id)
        setUser(parsedUser)
      } catch (error) {
        console.error("Error parsing user data:", error)
      }
    }
  }, [])

  // Memoized fetch function
  const fetchOrders = useCallback(async () => {
    if (!userId || selectedTab !== "orders") return

    setLoading(true)
    try {
      const data = await getUserOrders(userId)
      // Only update if data has actually changed
      setOrders((prevOrders) => {
        const isDifferent = JSON.stringify(data) !== JSON.stringify(prevOrders)
        return isDifferent ? data : prevOrders
      })
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }, [userId, selectedTab])

  // Fetch orders when dependencies change
  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const handleTabChange = (e) => {
    setSelectedTab(e.key)
  }

  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (!router.isReady) return

      const query = router.query
      const resultCode = query.resultCode

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
            })

            if (response.ok) {
              notify("Payment Successful", "Your order has been completed.", "topRight", "success")
            } else {
              notify("Update Failed", "Could not update order status.", "topRight", "error")
            }
          } catch (error) {
            notify("Error", "Something went wrong.", "topRight", "error")
          }
        } else {
          notify("Payment Failed", "Your payment was not successful.", "topRight", "error")
        }
        router.replace("/profile", undefined, { shallow: true })
      }
    }

    checkPaymentStatus()
  }, [router.query, router, router.isReady, notify, userId])

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
          {selectedTab === "orders" && <OrdersList orders={orders} loading={loading} notify={notify} />}

          {selectedTab === "wishlist" && (
            <div className="text-center py-12 bg-white rounded-lg">
              <HeartOutlined className="text-4xl text-gray-400 mb-4" />
              <p className="text-gray-500">No wishlisted items found.</p>
            </div>
          )}

          {selectedTab === "Profile" && user && <UserProfile orders={orders} />}
        </div>
      </div>
    </div>
  )
}

