// app/(authentication)/register/page.js
"use client"
import { useState, useEffect } from "react"
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
    role: "user",
    gender: "",
    isSupplier: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const { password, confirmPassword } = formData;
    setPasswordsMatch(password === confirmPassword);

    setPasswordCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[\W_]/.test(password),
    });
  }, [formData.password, formData.confirmPassword]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Full name is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      if (!passwordCriteria.length) newErrors.password = "Password must be at least 8 characters";
      if (!passwordCriteria.uppercase) newErrors.password = "Password must contain at least one uppercase letter";
      if (!passwordCriteria.lowercase) newErrors.password = "Password must contain at least one lowercase letter";
      if (!passwordCriteria.number) newErrors.password = "Password must contain at least one number";
      if (!passwordCriteria.specialChar) newErrors.password = "Password must contain at least one special character";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (!passwordsMatch) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.terms) newErrors.terms = "You must accept the Terms & Conditions";
    if (!formData.gender) newErrors.gender = "Gender is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const payload = {
        ...formData,
        role: formData.isSupplier ? 'supplier' : 'user',
      };

      const res = await fetch("http://127.0.0.1:8000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        if (errorData && errorData.errors) setErrors(errorData.errors);
        else setErrors({ message: "Registration failed due to an unexpected error." });
        return;
      }

      router.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pb-16 pt-8">
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Create New Account</h1>
        <p className="text-gray-600">Please enter details</p>

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
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
            />
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mt-2">
              <span className={passwordCriteria.lowercase ? "text-green-600" : "text-gray-400"}>✓ One lowercase character</span>
              <span className={passwordCriteria.uppercase ? "text-green-600" : "text-gray-400"}>✓ One uppercase character</span>
              <span className={passwordCriteria.specialChar ? "text-green-600" : "text-gray-400"}>✓ One special character</span>
              <span className={passwordCriteria.number ? "text-green-600" : "text-gray-400"}>✓ One number</span>
              <span className={passwordCriteria.length ? "text-green-600" : "text-gray-400"}>✓ 8 characters minimum</span>
            </div>
          </div>

          <InputField
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            error={!passwordsMatch ? "Passwords do not match" : errors.confirmPassword}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
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
                I agree to the {" "}
                <Link href="/terms" className="text-black hover:underline">
                  Terms & Conditions
                </Link>
              </span>
            </label>
            {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-black text-white px-4 py-2 hover:bg-black/90"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Sign up"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account? {" "}
            <Link href="/login" className="text-black hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
