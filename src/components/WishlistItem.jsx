"use client"

import { useState } from "react"
import { Empty, Spin, Button, Row, Col, Typography } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import Image from "next/image"
import Card from "./Card"

const { Title } = Typography

export default function WishlistItems({ wishlistItems, loading, notify, onRemoveItem, onRefresh }) {
  const [removingItems, setRemovingItems] = useState({})

  const handleRemoveItem = async (itemId) => {
    setRemovingItems((prev) => ({ ...prev, [itemId]: true }))
    try {
      await onRemoveItem(itemId)
      notify("Success", "Item removed from wishlist", "topRight", "success")
      onRefresh()
    } catch (error) {
      notify("Error", "Failed to remove item from wishlist", "topRight", "error")
    } finally {
      setRemovingItems((prev) => ({ ...prev, [itemId]: false }))
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    )
  }

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg">
        <Empty description="No items in your wishlist" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Title level={4}>My Wishlist ({wishlistItems.length} items)</Title>

      <Row gutter={[16, 16]}>
        {wishlistItems.map((item) => (
          <Col xs={24} sm={12} md={8} key={item.id}>
            <div className="h-full flex flex-col">
              <Card product={item.product} rating={item.rating_avg} /> {/* Use the imported Card component */}
              <div className="mt-auto p-4">
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  loading={removingItems[item.id]}
                  onClick={() => handleRemoveItem(item.id)}
                  className="w-full"
                >
                  {removingItems[item.id] ? "Removing..." : "Remove"}
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}