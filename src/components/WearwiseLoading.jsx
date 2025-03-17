"use client"

import { useEffect, useState } from "react"

const WearwiseLoading = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-[9999]">
      <div className="flex items-end gap-1 sm:gap-2">
        {mounted && (
          <>
            <span
              className="text-red-600 text-5xl sm:text-6xl font-bold animate-wave"
              style={{ animationDelay: "0ms" }}
            >
              W
            </span>
            <span
              className="text-black text-4xl sm:text-5xl font-bold animate-wave"
              style={{ animationDelay: "100ms" }}
            >
              E
            </span>
            <span
              className="text-black text-4xl sm:text-5xl font-bold animate-wave"
              style={{ animationDelay: "200ms" }}
            >
              A
            </span>
            <span
              className="text-black text-4xl sm:text-5xl font-bold animate-wave"
              style={{ animationDelay: "300ms" }}
            >
              R
            </span>
            <span
              className="text-black text-5xl sm:text-6xl font-bold animate-wave"
              style={{ animationDelay: "400ms" }}
            >
              W
            </span>
            <span
              className="text-black text-4xl sm:text-5xl font-bold animate-wave"
              style={{ animationDelay: "500ms" }}
            >
              I
            </span>
            <span
              className="text-black text-4xl sm:text-5xl font-bold animate-wave"
              style={{ animationDelay: "600ms" }}
            >
              S
            </span>
            <span
              className="text-black text-4xl sm:text-5xl font-bold animate-wave"
              style={{ animationDelay: "700ms" }}
            >
              E
            </span>
          </>
        )}
      </div>
    </div>
  )
}

export default WearwiseLoading

