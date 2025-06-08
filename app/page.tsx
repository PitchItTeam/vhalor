"use client"
import { useState, useEffect, useRef } from "react"
import { useMobile } from "@/hooks/use-mobile"
import Navbar from "@/components/navbar"
// import SectionNav from "@/components/section-nav" // Removed as requested
import HeroSection from "@/components/hero-section"
import VideoSection from "@/components/video-section"
import ProductFeatures from "@/components/product-features"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import ProductFeaturesSection from "@/components/ProductFeaturesSection"

export default function Home() {
  const isMobile = useMobile()
  const [isClient, setIsClient] = useState(false)
  const mainRef = useRef<HTMLElement>(null)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [productFeaturesCompleted, setProductFeaturesCompleted] = useState(false)
  const [isAtProductFirstFeature, setIsAtProductFirstFeature] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  
  const sections = ["hero", "video", "product", "about", "contact"]

  // Track scroll progress for time-of-day styling
  useEffect(() => {
    const mainElement = mainRef.current;
    if (!mainElement) return;
    
    const handleScroll = (e: Event) => {
      const container = e.target as HTMLElement;
      const totalHeight = container.scrollHeight - container.clientHeight;
      const progress = Math.min(Math.max(container.scrollTop / totalHeight, 0), 1);
      setScrollProgress(progress);
    };
    
    mainElement.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (mainElement) {
        mainElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [mainRef]);
  
  // Determine if we're in dark or light mode based on scroll position
  const isDarkMode = (scrollProgress < 0.15 || scrollProgress > 0.7)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Listen for custom events from ProductFeatures
  useEffect(() => {
    const handleProductFeaturesCompleted = () => {
      setProductFeaturesCompleted(true);
    };
    
    const handleProductFeaturesAtStart = () => {
      setIsAtProductFirstFeature(true);
    };

    window.addEventListener('productFeaturesTourCompleted', handleProductFeaturesCompleted);
    window.addEventListener('productFeaturesAtStart', handleProductFeaturesAtStart);
    
    return () => {
      window.removeEventListener('productFeaturesTourCompleted', handleProductFeaturesCompleted);
      window.removeEventListener('productFeaturesAtStart', handleProductFeaturesAtStart);
    };
  }, []);

  // Reset productFeaturesCompleted when leaving product section
  useEffect(() => {
    if (currentSectionIndex !== sections.indexOf("product")) {
      setProductFeaturesCompleted(false);
    }
  }, [currentSectionIndex, sections]);

  // Update current section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.findIndex(id => id === entry.target.id)
            if (index !== -1) {
              setCurrentSectionIndex(index)
            }
          }
        })
      },
      { threshold: 0.6 }
    )

    sections.forEach(id => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => {
      sections.forEach(id => {
        const element = document.getElementById(id)
        if (element) observer.unobserve(element)
      })
    }
  }, [isClient, sections])

  return (
    <div className="relative min-h-screen">
      <Navbar />
      {/* SectionNav removed as requested */}
      
      <main ref={mainRef} className="snap-container pt-16">
        <section 
          id="hero" 
          className={`snap-section ${scrollProgress < 0.15 ? 'night-section' : ''}`}
        >
          <HeroSection />
        </section>

        <section 
          id="video" 
          className={`snap-section ${scrollProgress > 0.15 && scrollProgress < 0.4 ? 'day-section' : 
                                     scrollProgress >= 0.4 && scrollProgress < 0.7 ? 'sunset-section' : 
                                     'night-section'}`}
        >
          <VideoSection />
        </section>

        <section 
          id="product" 
          className={`snap-section ${scrollProgress >= 0.4 && scrollProgress < 0.7 ? 'sunset-section' : 
                                     scrollProgress >= 0.7 ? 'night-section' : 'day-section'} rounded-[2rem] mx-4 my-4 overflow-hidden`}
        >
          <ProductFeaturesSection />
        </section>

        <section 
          id="about" 
          className={`snap-section ${scrollProgress >= 0.4 && scrollProgress < 0.7 ? 'sunset-section' : 
                                     scrollProgress >= 0.7 ? 'night-section' : 'day-section'}`}
        >
          <AboutSection />
        </section>

        <section 
          id="contact" 
          className="snap-section night-section"
        >
          <ContactSection />
        </section>
      </main>
    </div>
  )
}
