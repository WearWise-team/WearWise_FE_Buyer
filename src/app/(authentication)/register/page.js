"use client"
import { useState } from "react"
import Link from "next/link"
import { InputField } from "@/components/InputField"


export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.terms) {
      newErrors.terms = "You must accept the Terms & Conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    try {
      const res = await fetch("your-laravel-api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Registration failed")
      }

      // Handle successful registration
      router.push("/login")
    } catch (error) {
      setErrors({
        email: "This email is already registered",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SHl5IbrICPs5UNMEeT67wxK4buU0CU.png"
      className="pb-16 pt-8"
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Create New Account</h1>
          <p className="text-gray-600">Please enter details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Full Name"
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            error={errors.fullName}
            placeholder="Robert"
          />

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

          <InputField
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            error={errors.confirmPassword}
          />

          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.terms}
                onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-gray-600">
                I agree to the{" "}
                <Link href="/terms" className="text-black hover:underline">
                  Terms & Conditions
                </Link>
              </span>
            </label>
            {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}
          </div>

          <button type="submit" className="w-full rounded-lg bg-black text-white  px-4 py-2 hover:bg-black/90" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Sign up"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-black  hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

