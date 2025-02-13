// app/(authentication)/login/page.js
"use client"
import React from 'react'
import { useState } from "react"
import Link from "next/link"
import { InputField } from '@/components/InputField'


export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    try {
      const res = await fetch("your-laravel-api/login", { // Thay thế bằng URL API thật
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Lưu token vào localStorage hoặc cookies
      localStorage.setItem('accessToken', data.access_token);

      // Chuyển hướng đến trang chủ
      router.push("/");

    } catch (error) {
      setErrors({
        email: "Invalid credentials",
      });
      console.error("Login error:", error); // Ghi log lỗi để debug
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Welcome 👋</h1>
        <p className="text-gray-600">Please login here</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          placeholder="robertfox@example.com"
        />

        <InputField
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          error={errors.password}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded border-gray-300" />
            <span className="text-sm text-gray-600">Remember Me</span>
          </label>
          <Link href="/forgot-password" className="text-sm text-gray-600 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button type="submit" className="w-full rounded-lg bg-black text-white px-4 py-2 hover:bg-black/90" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-black hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}