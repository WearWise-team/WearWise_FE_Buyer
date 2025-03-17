"use client"

import { useState } from "react"
import { motion, useAnimationControls } from "framer-motion"

export default function InteractiveLogoMarquee() {
  // Example logos - replace with your actual logos
  const logos = ["Nike", "Adidas", "Puma", "Reebok", "Under Armour", "New Balance", "Asics", "Fila", "Converse", "Vans"]

  // Duplicate logos to create a seamless loop
  const extendedLogos = [...logos, ...logos, ...logos]

  const controls = useAnimationControls()
  const [isPaused, setIsPaused] = useState(false)

  const handleMouseEnter = () => {
    controls.stop()
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    controls.start("move")
    setIsPaused(false)
  }

  return (
    <div
      className="overflow-hidden bg-[#CC2B52] py-6 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="flex whitespace-nowrap"
        variants={{
          move: {
            x: [0, "-100%"],
          },
        }}
        initial="move"
        animate={controls}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {extendedLogos.map((logo, index) => (
          <motion.span
            key={index}
            className={`text-white text-2xl font-bold inline-block mx-8 cursor-pointer ${isPaused ? "hover:text-yellow-300" : ""}`}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {logo}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

