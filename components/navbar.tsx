"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { useSection } from "@/contexts/section-context"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isMobile = useMobile()
  const { currentSection, isLoading } = useSection()
  
  // Always use white text regardless of section
  const useWhiteText = true

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    // Only add the event listener client-side
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen])

  const menuItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
    { name: "Features", href: "#product" },
  ]

  // Don't render navbar when loading
  if (isLoading) {
    return null
  }

  return (
    <header className="header-bar">
      <div className="header-logo">VHALÓR</div>
      {/* Desktop Nav */}
      {!isMobile && (
        <nav className="header-nav">
          <a className="header-link" href="#hero">Home</a>
          <a className="header-link" href="#about">About</a>
          <a className="header-link" href="#product">Features</a>
          <a className="header-link" href="#contact">Contact</a>
          
        </nav>
      )}
      {/* Mobile Dropdown Menu */}
      {isMobile && (
        <div className="relative">
          <button
            className="p-2 focus:outline-none"
            onClick={() => setIsOpen((open) => !open)}
            aria-label="Open menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50 flex flex-col">
              <a
                className="header-link px-4 py-2 border-b border-gray-200 hover:bg-gray-100"
                href="#hero"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
              <a
                className="header-link px-4 py-2 border-b border-gray-200 hover:bg-gray-100"
                href="#about"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
              <a
                className="header-link px-4 py-2 hover:bg-gray-100"
                href="#product"
                onClick={() => setIsOpen(false)}
              >
                Features
              </a>
              <a
                className="header-link px-4 py-2 border-b border-gray-200 hover:bg-gray-100"
                href="#contact"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
            </div>
          )}
        </div>
      )}
      <style>{`
        @font-face {
          font-family: 'A Pompadour Bold Sample';
          src: url('/font/a-pompadour-sample/03_APompadourBoldSample.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
        }
        .header-bar {
          width: 100%;
          background: var(--background);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2.5rem 0 2.5rem;
          height: 64px;
          box-sizing: border-box;
          box-shadow: none;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
          backdrop-filter: blur(8px);
          background: rgba(255, 255, 255, 0.8);
        }
        .header-logo {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 2rem;
          letter-spacing: 0.04em;
          color: #222;
          text-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .header-nav {
          display: flex;
          gap: 2.5rem;
        }
        .header-link {
          font-family: 'Outfit', sans-serif;
          font-size: 1.5rem;
          color: #222;
          text-decoration: none;
          font-weight: normal;
          letter-spacing: 0.08em;
          text-shadow: 0 2px 8px rgba(0,0,0,0.12);
          transition: all 0.2s ease;
          display: inline-block;
        }
        .header-link:hover {
          color: #444;
          transform: scale(1.05);
        }
        @media (max-width: 900px) {
          .header-bar { padding: 0 1rem; }
          .header-logo { font-size: 1.3rem; }
          .header-link { font-size: 1rem; }
        }
      `}</style>
    </header>
  )
}
