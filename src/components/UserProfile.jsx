"use client"

import { useState, useEffect } from "react"
import {
  Button,
  Card,
  Input,
  Radio,
  DatePicker,
  Form,
  Tabs,
  Table,
  Tag,
  Avatar,
  Typography,
  Row,
  Col,
  Descriptions,
  Empty,
  Spin,
  message,
} from "antd"
import { EditOutlined, UserOutlined, InboxOutlined } from "@ant-design/icons"
import dayjs from "dayjs"
import { viewProfile, updateProfile } from "@/apiServices/users/page";

const { Title, Text } = Typography

export default function UserProfile({ orders = [] }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [form] = Form.useForm()

  console.log(orders);

  // Fetch user profile from API
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true)
        const data = await viewProfile();
        // const data = await response.json()
        console.log(data);
        setUser(data)
        form.setFieldsValue({
          name: data.name,
          phone: data.phone,
          address: data.address,
          gender: data.gender,
          weight: data.weight,
          height: data.height,
          shirt_size: data.shirt_size,
          pant_size: data.pant_size,
          // Nếu có dob trong API thì thêm vào đây
          // dob: data.dob ? dayjs(data.dob) : null,
        })
      } catch (error) {
        console.error("Failed to load profile data")
      } finally {
        setIsLoading(false)
      }
    }
    fetchUserProfile()
  }, [form])

  const handleSubmit = async (values) => {
    setIsLoading(true)
    try {
      const formattedData = {
        name: values.name,
        address: values.address,
        phone: values.phone,
        email: user.email,
        weight: values.weight,
        height: values.height,
        shirt_size: values.shirt_size,
        gender: values.gender,
        pant_size: values.pant_size,
        role: user.role,
        avatar: user.avatar,
      }

      const response = await updateProfile(user.id, formattedData);

      if (!response.ok) {
        throw new Error("Failed to update user information")
      }

      const updatedData = await response.json()
      setUser(updatedData)
      message.success("Your profile has been updated successfully.")
      setIsEditing(false)
    } catch (error) {
      message.error("Failed to update profile. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    form.setFieldsValue({
      name: user.name,
      phone: user.phone,
      address: user.address,
      gender: user.gender,
      weight: user.weight,
      height: user.height,
      shirt_size: user.shirt_size,
      pant_size: user.pant_size,
    })
    setIsEditing(false)
  }

  // Define table columns
  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => dayjs(date).format("MM/DD/YYYY"),
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items) => `${items.map(
        (item) => `${item.product_name} x ${item.quantity} ${item.quantity == 1 ? "item" : "items"}`,
      )}`,
    },
    {
      title: "Total amount",
      dataIndex: "total_amount",
      key: "total_amount",
      render: (total) => `${total}`,
    },
  ]

  const tabItems = [
    {
      key: "profile",
      label: "Profile",
      children: user ? (
        <div style={{ marginTop: 16 }}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar size={80} src={user.avatar} icon={<UserOutlined />} />
                <div style={{ marginLeft: 16 }}>
                  <Title level={4} style={{ margin: 0 }}>
                    {user.name}
                  </Title>
                  <Text type="secondary">{user.role}</Text>
                </div>
              </div>
            </Col>
            <Col span={24}>
              <Descriptions bordered column={{ xs: 1, sm: 2 }}>
                <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                <Descriptions.Item label="Phone Number">{user.phone || "Not provided"}</Descriptions.Item>
                <Descriptions.Item label="Address">{user.address || "Not provided"}</Descriptions.Item>
                <Descriptions.Item label="Gender">
                  {user.gender === "male" ? "Male" : user.gender === "female" ? "Female" : "Other"}
                </Descriptions.Item>
                <Descriptions.Item label="Weight">{user.weight} kg</Descriptions.Item>
                <Descriptions.Item label="Height">{user.height} cm</Descriptions.Item>
                <Descriptions.Item label="Shirt Size">{user.shirt_size}</Descriptions.Item>
                <Descriptions.Item label="Pant Size">{user.pant_size}</Descriptions.Item>
                <Descriptions.Item label="Total Orders">{orders.length}</Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </div>
      ) : null,
    },
    {
      key: "orders",
      label: "Order History",
      children: (
        <div style={{ marginTop: 16 }}>
          {orders.length > 0 ? (
            <Table
              columns={columns}
              dataSource={orders.map((order) => ({ ...order, key: order.id }))}
              pagination={{ pageSize: 5 }}
            />
          ) : (
            <Empty
              image={<InboxOutlined style={{ fontSize: 60 }} />}
              description="No Orders Yet"
              style={{ padding: "40px 0" }}
            >
              <Text type="secondary">You haven't placed any orders.</Text>
            </Empty>
          )}
        </div>
      ),
    },
  ]

  return (
    <Card
      title="Personal Information"
      extra={!isEditing && <Button type="text" icon={<EditOutlined />} onClick={() => setIsEditing(true)} />}
    >
      {isEditing ? (
        <Spin spinning={isLoading}>
          {/* Fix: Pass the form instance to the Form component */}
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="name" label="Full Name" rules={[{ required: true, message: "Please enter your name" }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Email">
              <Input value={user?.email} disabled />
              <Text type="secondary">Email cannot be changed</Text>
            </Form.Item>

            <Form.Item name="phone" label="Phone Number">
              <Input />
            </Form.Item>

            <Form.Item name="address" label="Address">
              <Input />
            </Form.Item>

            <Form.Item name="gender" label="Gender">
              <Radio.Group>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
                <Radio value="other">Other</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="weight" label="Weight (kg)">
              <Input type="number" step="0.01" />
            </Form.Item>

            <Form.Item name="height" label="Height (cm)">
              <Input type="number" step="0.01" />
            </Form.Item>

            <Form.Item name="shirt_size" label="Shirt Size">
              <Input />
            </Form.Item>

            <Form.Item name="pant_size" label="Pant Size">
              <Input />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
              <Button style={{ marginRight: 8 }} onClick={handleCancel} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      ) : (
        <Spin spinning={isLoading}>
          {user ? <Tabs defaultActiveKey="profile" items={tabItems} /> : <Empty description="Loading profile..." />}
        </Spin>
      )}
    </Card>
  )
}