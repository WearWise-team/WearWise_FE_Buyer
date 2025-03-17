"use client"

import { useState, useEffect } from "react"
import {
  Button,
  Card,
  Input,
  Radio,
  Form,
  Tabs,
  Table,
  Avatar,
  Typography,
  Row,
  Col,
  Descriptions,
  Empty,
  Spin,
} from "antd"
import { EditOutlined, UserOutlined, InboxOutlined } from "@ant-design/icons"
import dayjs from "dayjs"
import { viewProfile, updateProfile } from "@/apiServices/users/page"
import { useNotification } from "@/apiServices/NotificationService"
const { Title, Text } = Typography
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function UserProfile({ orders = [] }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null)
  const [form] = Form.useForm()
  const notify = useNotification()
  const [avatar, setAvatar] = useState(null)
  const [fileList, setFileList] = useState([])

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true)
        const data = await viewProfile()
        setUser(data)
        if (data) {
          form.setFieldsValue({
            name: data.name,
            phone: data.phone,
            address: data.address,
            gender: data.gender,
            weight: data.weight,
            height: data.height,
            shirt_size: data.shirt_size,
            pant_size: data.pant_size,
            avatar: avatar,
            dob: data.dob ? dayjs(data.dob) : null,
          })
        }
      } catch (error) {
        console.error("Failed to load profile data", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUserProfile()
  }, [form])

  useEffect(() => {
    if (user?.dob) {
      form.setFieldValue("dob", dayjs(user.dob))
    }
  }, [user?.dob, form])

  const handleSubmit = async (values) => {
    setIsLoading(true)
    try {
      const formattedData = {
        name: values.name,
        address: values.address,
        phone: values.phone,
        email: user?.email || "",
        weight: values.weight,
        height: values.height,
        shirt_size: values.shirt_size,
        gender: values.gender,
        pant_size: values.pant_size,
        role: user.role,
        avatar: avatar,
        dob: values.dob ? values.dob.format("YYYY-MM-DD") : null,
      }

      const updatedData = await updateProfile(user.id, formattedData)

      if (!updatedData) {
        notify("Failed to update profile.", "Please try again.", "topRight", "error")
        return
      }

      setUser({ ...user, ...formattedData })
      setIsEditing(false)
      notify("Your profile has been updated successfully.", "successfully", "topRight")
    } catch (error) {
      console.error("Failed to update profile", error)
      notify("Failed to update profile.", "Please try again.", "topRight", "error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpload = async ({ file, fileList }) => {
    setFileList(fileList);
    const formData = new FormData();
    formData.append("avatar", file.originFileObj);
  
    try {
      const response = await fetch(`${BASE_URL}/api/buyer/profile/me`, {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
  
      const data = await response.json();

      if (response.ok) {
        setAvatar(data.avatar_url);
        localStorage.setItem("avatar", data.avatar_url);
        notify("Upload success:", data.message, "topRight");
      } else {
        console.error("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };  

  const handleCancel = () => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        phone: user.phone,
        address: user.address,
        gender: user.gender,
        weight: user.weight,
        height: user.height,
        shirt_size: user.shirt_size,
        pant_size: user.pant_size,
        dob: user.dob ? dayjs(user.dob) : null,
      })
    }
    setIsEditing(false)
  }

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
      render: (items) =>
        items
          .map((item) => `${item.product_name} x ${item.quantity} ${item.quantity === 1 ? "item" : "items"}`)
          .join(", "),
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
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Avatar" name="avatar" id="avatar" valuePropName="fileList">
              <Upload
                name="avatar"
                listType="picture"
                showUploadList={false}
                beforeUpload={(file) => {
                  const isImage = file.type.startsWith("image/");
                  if (!isImage) {
                    notify("You can only upload image files!", "", "topRight", "warning");
                  }
                  return isImage;
                }}
                onChange={handleUpload}
                fileList={fileList}
              >
                <Button icon={<UploadOutlined />}>Upload Avatar</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              id="name"
              name="name"
              label="Full Name"
              rules={[
                { required: true, message: "Please enter your full name!" },
                { min: 2, message: "Name must be at least 2 characters long!" },
                { pattern: /^[a-zA-Z\s]+$/, message: "Name can only contain letters and spaces!" },
                {
                  validator: (_, value) => {
                    if (value && value.trim() === "") {
                      return Promise.reject("Name cannot be only spaces!")
                    }
                    if (value && value.includes("  ")) {
                      return Promise.reject("Name cannot contain consecutive spaces!")
                    }
                    return Promise.resolve()
                  },
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Email">
              <Input value={user?.email} disabled />
              <Text type="secondary">Email cannot be changed</Text>
            </Form.Item>

            <Form.Item
              id="phone"
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please enter your phone number!" },
                { pattern: /^[0-9]{10}$/, message: "Phone number must be exactly 10 digits!" },
              ]}
            >
              <Input maxLength={10} />
            </Form.Item>

            <Form.Item
              id="address"
              name="address"
              label="Address"
              rules={[{ required: true, message: "Please enter your address!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item 
            id="gender"
            name="gender" label="Gender" rules={[{ required: true, message: "Please select your gender!" }]}>
              <Radio.Group>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
                <Radio value="other">Other</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              id="weight"
              name="weight"
              label="Weight (kg)"
              rules={[
                { required: true, message: "Please enter your weight!" },
                {
                  type: "number",
                  min: 10,
                  max: 500,
                  message: "Weight must be between 10 and 500 kg!",
                  transform: (value) => Number(value),
                },
              ]}
            >
              <Input type="number" step="0.01" />
            </Form.Item>

            <Form.Item
              id="height"
              name="height"
              label="Height (cm)"
              rules={[
                { required: true, message: "Please enter your height!" },
                {
                  type: "number",
                  min: 50,
                  max: 250,
                  message: "Height must be between 50 and 250 cm!",
                  transform: (value) => Number(value),
                },
              ]}
            >
              <Input type="number" step="0.01" />
            </Form.Item>

            <Form.Item
              id="shirt"
              name="shirt_size"
              label="Shirt Size"
              rules={[
                { required: true, message: "Please enter your shirt size!" },
                { pattern: /^(XS|S|M|L|XL|XXL)$/, message: "Shirt size must be XS, S, M, L, XL, or XXL!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              id="pant"
              name="pant_size"
              label="Pant Size"
              rules={[{ required: true, message: "Please enter your pant size!" }]}
            >
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

