"use client"

import { useState, useEffect } from "react"

const sections = [
  { id: "hero", label: "Hero" },
  { id: "video", label: "Video" },
  { id: "product", label: "Features" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" }
]

export default function SectionNav() {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.6 } // When 60% of the section is visible
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => {
      sections.forEach(({ id }) => {
        const element = document.getElementById(id)
        if (element) observer.unobserve(element)
      })
    }
  }, [])

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-4">
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            activeSection === id 
              ? "bg-black scale-125" 
              : "bg-gray-300 hover:bg-gray-400"
          }`}
          aria-label={`Scroll to ${label} section`}
          title={label}
        />
      ))}
    </div>
  )
} 