"use client"

import { useEffect, useState, useCallback } from "react"
import { Menu } from "antd"
import { UserOutlined, ShoppingOutlined, HeartOutlined } from "@ant-design/icons"
import { getUserOrders } from "@/apiServices/orders/page"
import { getUserWishlists, removeWishlistItem } from "@/apiServices/wishlists/page"
import { useNotification } from "@/apiServices/NotificationService"
import { useRouter, useSearchParams } from "next/navigation"
import OrdersList from "@/components/OrdersList"
import UserProfile from "@/components/UserProfile"
import WishlistItems from "@/components/WishlistItem"

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
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")

  const [selectedTab, setSelectedTab] = useState(tabParam || "orders")
  const [orders, setOrders] = useState([])
  const [wishlistItems, setWishlistItems] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(false)
  const [loadingWishlist, setLoadingWishlist] = useState(false)
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
    // Check for MoMo payment status on mount
    useEffect(() => {
      const resultCode = searchParams.get("resultCode")
      if (resultCode && resultCode !== "0") {
        // Payment failed
        // notify("error", "Payment failed. Please try again.") // Show notification
        router.push("/cart") // Redirect to cart page
      } else if (resultCode === "0") {
        // Payment success
        notify("success", "Payment successful!") // Show success notification
      }
    }, [searchParams, router, notify])
  
  // // Update URL when tab changes
  // useEffect(() => {
  //   if (selectedTab) {
  //     // Update URL without refreshing the page
  //     // window.history.pushState({}, "", `/profile?tab=${selectedTab}`)
  //   }
  // }, [selectedTab])

  // Set initial tab from URL parameter
  useEffect(() => {
    if (tabParam) {
      setSelectedTab(tabParam)
    }
  }, [tabParam])

  // Memoized fetch function for orders
  const fetchOrders = useCallback(async () => {
    if (!userId || selectedTab !== "orders") return

    setLoadingOrders(true)
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
      setLoadingOrders(false)
    }
  }, [userId, selectedTab])

  // Memoized fetch function for wishlists
  const fetchWishlists = useCallback(async () => {
    if (!userId || selectedTab !== "wishlist") return

    setLoadingWishlist(true)
    try {
      const data = await getUserWishlists(userId)
      // Only update if data has actually changed
      setWishlistItems((prevItems) => {
        const isDifferent = JSON.stringify(data) !== JSON.stringify(prevItems)
        return isDifferent ? data : prevItems
      })
    } catch (error) {
      console.error("Error fetching wishlists:", error)
    } finally {
      setLoadingWishlist(false)
    }
  }, [userId, selectedTab])

  // Fetch data when dependencies change
  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  useEffect(() => {
    fetchWishlists()
  }, [fetchWishlists])

  const handleTabChange = (e) => {
    setSelectedTab(e.key)
  }

  // Handle removing wishlist item
  const handleRemoveWishlistItem = async (itemId) => {
    try {
      await removeWishlistItem(itemId)
      return true
    } catch (error) {
      console.error("Error removing wishlist item:", error)
      throw error
    }
  }

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
                key: "profile",
                icon: <UserOutlined />,
                label: "My Profile",
              },
            ]}
          />
        </div>

        <div className="space-y-6">
          {selectedTab === "orders" && <OrdersList orders={orders} loading={loadingOrders} notify={notify} />}

          {selectedTab === "wishlist" && (
            <WishlistItems
              wishlistItems={wishlistItems}
              loading={loadingWishlist}
              notify={notify}
              onRemoveItem={handleRemoveWishlistItem}
              onRefresh={fetchWishlists}
            />
          )}

          {selectedTab === "profile" && user && <UserProfile user={user} orders={orders} />}
        </div>
      </div>
    </div>
  )
}

