// app/(authentication)/register/page.js
"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from 'next/navigation';
import { InputField } from "@/components/InputField"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
    role: "user", // Giá trị mặc định là user
    gender: "", // Thêm trường gender
    isSupplier: false
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  const validateForm = () => {
      const newErrors = {}

      if (!formData.name) {
          newErrors.name = "Full name is required"
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
      if (!formData.gender) {
          newErrors.gender = "Gender is required"
      }


      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
      e.preventDefault()

      if (!validateForm()) return

      setIsLoading(true)
      try {
              const payload = {
              ...formData,
              role: formData.isSupplier ? 'supplier' : 'user', // Set 'role' based on checkbox
          };
          const res = await fetch("http://127.0.0.1:8000/api/auth/signup", { // Thay đổi URL
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
          })

          const data = await res.json()

          if (!res.ok) {
              // Throw an error *with* the data for the frontend to show
              // Throw an error *with* the data for the frontend to show
              try {
                  const errorData = await res.json();
                  throw new Error(JSON.stringify(errorData));
              } catch (parseError) {
                  // If parsing fails, set a generic error
                  throw new Error("Registration failed due to an unexpected error.");
              }
          }

          // Xử lý đăng ký thành công
          console.log("Registration successful:", data);
          router.push("/login"); // Chuyển hướng đến trang đăng nhập

      } catch (error) {
      try {
              // Attempt to parse the response body as JSON
              const errorData = JSON.parse(error.message);

              // Check if the error data contains the expected 'errors' object.
              if (errorData && errorData.errors) {
                  setErrors(errorData.errors);
              } else {
                  // If the expected structure is not found, set a generic error message.
                  setErrors({ message: "Registration failed due to an unexpected error." });
              }

              // Use toast for individual errors instead of single error message.
              // for (const key in errorData.errors) {
              //     errorData.errors[key].forEach(message => {
              //       //  toast.error(message); Use this
              //     });
              // }
          } catch (parseError) {
              // If parsing fails, log the parse error and set a generic error
              console.error("Failed to parse error data:", parseError);
              setErrors({ message: "Registration failed due to an unexpected error." });
            //  toast.error("Registration failed due to an unexpected error.");
          }
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
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        error={errors.name}
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

                    <div className="relative">
                        <InputField
                            label="Password"
                            type= "password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            error={errors.password}
                        />
                        {/* <button
                            type="button"
                            onClick={toggleShowPassword}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white rounded-md py-1 px-2 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button> */}
                    </div>

                    <InputField
                        label="Confirm Password"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        error={errors.confirmPassword}
                    />
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <div className="mt-1">
                            <select
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            {errors.gender && <p className="mt-2 text-sm text-red-600">{errors.gender}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end items-end">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={formData.isSupplier}
                                onChange={(e) => setFormData({ ...formData, isSupplier: e.target.checked })}
                                className="rounded border-gray-300"
                            />
                            <span>Supplier</span>
                        </label>
                    </div>
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