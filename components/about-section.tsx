"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import BackgroundOverlay from "./background-overlay"
import { useOverlay } from "@/contexts/overlay-context"

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const { overlayIntensity } = useOverlay()

  return (
    <BackgroundOverlay 
      intensity={overlayIntensity} 
      className="py-0"
      minHeight="fit-content"
    >
      <div ref={ref} className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 flex flex-col items-center">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-10"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 20
            }
          } : { opacity: 0, y: 30, scale: 0.9 }}
        >
          Our Story
        </motion.h2>

        <motion.div
          className="prose prose-sm sm:prose-base md:prose-lg max-w-none" style={{ color: '#111' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-sm sm:text-base md:text-lg mb-4 text-overflow-fix">
            The Travhalór was born out of frustration with the current state of budget air travel. While flights across
            America and Europe have become more affordable, airlines have found new ways to increase revenue through
            excessive baggage fees.
          </p>

          <p className="text-sm sm:text-base md:text-lg mb-4 text-overflow-fix">
            We noticed a troubling trend: gate agents were incentivized to find reasons to charge passengers for
            "oversized" personal items, even when those items met the airline's stated requirements. This practice was not
            only unfair but also created anxiety for travelers who couldn't predict whether they'd be hit with unexpected
            fees.
          </p>

          <p className="text-sm sm:text-base md:text-lg mb-4 text-overflow-fix">
            Our team of designers and frequent travelers came together to create a solution. The result is the
            Travhalór - a garment that looks like ordinary clothing but provides extraordinary storage capacity,
            allowing you to carry essential items on your person rather than in a bag subject to fees.
          </p>

          <p className="text-sm sm:text-base md:text-lg text-overflow-fix">
            We believe in fair travel practices and empowering consumers to avoid predatory fees. Our mission is to help
            you travel more comfortably, economically, and with peace of mind.
          </p>
        </motion.div>
      </div>
    </BackgroundOverlay>
  )
}
