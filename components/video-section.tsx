"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import BackgroundOverlay from "./background-overlay"
import { useOverlay } from "@/contexts/overlay-context"
import { shopifyFetch } from "@/lib/shopify"

const SHOPIFY_DOMAIN = "xmf716-mp.myshopify.com"

export default function VideoSection() {
  const ref = useRef(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(ref, { once: false, amount: 0.3 })
  const isMobile = useMobile()
  const { overlayIntensity } = useOverlay()
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [activeSlide, setActiveSlide] = useState(0)

  const [variants, setVariants] = useState<any[]>([])
  const [selectedVariant, setSelectedVariant] = useState("")
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const preloadVideo = () => {
      if (videoRef.current) videoRef.current.load()
    }
    preloadVideo()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const handleTimeUpdate = () => setCurrentTime(video.currentTime)
    const handleLoadedMetadata = () => setDuration(video.duration)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [])

  useEffect(() => {
    async function loadProduct() {
      const query = `
        query {
          product(id: \"gid://shopify/Product/14690812363117\") {
            title
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                  }
                }
              }
            }
          }
        }
      `
      try {
        const data = await shopifyFetch(query)
        const loadedVariants = data.product.variants.edges.map((edge: any) => ({
          id: edge.node.id,
          title: edge.node.title,
          price: edge.node.price.amount,
        }))
        setVariants(loadedVariants)
        setSelectedVariant(loadedVariants[0].id)
      } catch (err) {
        console.error("❌ Shopify fetch failed:", err)
      }
    }
    loadProduct()
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (!video) return
    const time = parseFloat(e.target.value)
    video.currentTime = time
    setCurrentTime(time)
  }

  const goToCheckout = () => {
    const variantIdParts = selectedVariant.split("/")
    const variantNumericId = variantIdParts[variantIdParts.length - 1]
    const checkoutUrl = `https://${SHOPIFY_DOMAIN}/cart/${variantNumericId}:${quantity}`
    window.location.href = checkoutUrl
  }

  return (
    <BackgroundOverlay 
      intensity={overlayIntensity} 
      className="py-0 sm:py-0 md:py-0 flex items-center"
      minHeight="100vh"
    >
      <div className="w-full px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16 mx-auto">
        <div ref={ref} className={`flex flex-col ${isMobile ? "" : "md:flex-row"} items-center gap-6 sm:gap-8 md:gap-16 min-h-[calc(100vh-2rem)]`}>
          <motion.div className="w-full md:w-1/2" initial={{ opacity: 0, x: -100, scale: 0.8 }} animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -100, scale: 0.8 }} transition={{ duration: 1, type: "spring", stiffness: 100, damping: 20 }}>
            <div className="flex flex-col items-center justify-center w-full">
              <video 
                ref={videoRef}
                className="w-screen h-[80vh] max-h-none max-w-none rounded-2xl object-cover border-8 border-white md:w-auto md:max-h-[80vh] md:max-w-full md:h-auto md:border-none overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300" 
                autoPlay 
                muted 
                loop 
                playsInline
                src="/video/video.mp4"
                preload="auto"
              />
              <div className="flex items-center gap-4 mt-2 px-2 w-full md:w-auto">
                <button onClick={togglePlay} className="w-12 h-12 flex items-center justify-center rounded-md bg-[#232b32] text-white hover:bg-[#232b32]/90 transition-colors focus:outline-none" aria-label={isPlaying ? "Pause" : "Play"}>
                  {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="28" height="28">
                      <rect x="5" y="4" width="5" height="16" rx="1.5" />
                      <rect x="14" y="4" width="5" height="16" rx="1.5" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="28" height="28">
                      <polygon points="6,4 20,12 6,20" />
                    </svg>
                  )}
                </button>
                <span className="text-base text-black font-mono min-w-[48px] text-right select-none">
                  {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}
                </span>
                <input type="range" min={0} max={duration || 0} step={0.1} value={currentTime} onChange={handleSeek} className="flex-1 h-2 mx-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none" aria-label="Seek" style={{ accentColor: '#111', height: '8px' }} />
                <span className="text-base text-black font-mono min-w-[48px] text-left select-none">
                  {duration ? `${Math.floor(duration / 60)}:${String(Math.floor(duration % 60)).padStart(2, '0')}` : '0:00'}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div className="w-full md:w-1/2 flex flex-col items-start text-left px-4 md:px-0 font-outfit" initial={{ opacity: 0, x: 50, y: 20 }} animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 50, y: 20 }} transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100, damping: 20 }}>
            <h2 className="text-3xl font-bold mb-2">The Travhalór</h2>
            <p className="text-lg mb-4">Flight tickets are more affordable than ever but we noticed a troubling trend: Airlines have been reducing the personal item size and charging for carry-on bags often quadrupling the $20-$30 dollar ticket. To make matters worse, gate agents are financially incentivized to deem your bag "too large" for the bin and slap on a $100 oversize fee. This practice is not only unfair but also creates anxiety for travelers who can't predict whether they will be hit with unexpected fees.</p>
            <p className="text-lg mb-4">Each purchase includes 1  jacket and 3 vacuum bags with a hand pump for removing the air so no vacuum needed!</p>
            <p className="text-lg mb-4">Deliveries start from July 30, 2025.</p>

            <label className="text-sm font-medium mb-1">Size</label>
            <div className="flex gap-2 mb-4">
              {variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant.id)}
                  className={`px-4 py-2 border rounded text-sm font-medium transition-all ${selectedVariant === variant.id ? 'bg-black text-white' : 'bg-white text-black'}`}
                >
                  {variant.title}
                </button>
              ))}
            </div>

            <div className="flex items-center mb-4 gap-2">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="border px-3 py-1 rounded">−</button>
              <span className="min-w-[32px] text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="border px-3 py-1 rounded">+</button>
            </div>

            <button onClick={goToCheckout} className="bg-black text-white py-3 px-6 rounded text-lg font-semibold hover:bg-gray-800 w-full max-w-xs mb-2">
              Pre-order Now | $189
            </button>

            <button onClick={goToCheckout} className="bg-[#5a31f4] text-white py-3 px-6 rounded text-lg font-semibold w-full max-w-xs">
              Pre-order with <strong className="ml-1">Shop</strong>
              <span className="ml-1 inline-block text-sm bg-white text-[#5a31f4] px-1 rounded">Pay</span>
            </button>

            <p className="text-xs underline text-gray-500 mt-2 cursor-pointer">More payment options</p>

            <div className="mt-6 space-y-2 text-sm text-gray-700">
              <p>🚚 Free shipping inside the US</p>
              <p>↩️ Flexible refund policy</p>
            </div>
          </motion.div>
        </div>
      </div>
    </BackgroundOverlay>
  )
}
