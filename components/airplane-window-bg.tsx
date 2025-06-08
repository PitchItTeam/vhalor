"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { useTransform, motion, useSpring, MotionValue } from "framer-motion"
import { useSection } from "@/contexts/section-context"

// Define the section names to match the IDs in the app 
const SECTIONS = ["hero", "video", "product", "about", "contact"]

export default function AirplaneWindowBg() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const { setCurrentSection } = useSection()
  
  // Create a progress motion value that we control directly
  const progressValue = useRef(new MotionValue(0))
  
  // Smoother animation with spring
  const smoothProgress = useSpring(progressValue.current, { 
    stiffness: 60, 
    damping: 30,
    restDelta: 0.001
  })
  
  const [randomOffsets, setRandomOffsets] = useState<number[]>([])
  const [starPositions, setStarPositions] = useState<any[]>([])
  const [contrailPositions, setContrailPositions] = useState<any[]>([])
  const [digitalParticles, setDigitalParticles] = useState<any[]>([])
  
  // Set isClient after mount to handle SSR
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // Generate random values only on the client side to avoid hydration mismatches
  useEffect(() => {
    if (!isClient) return;
    
    setRandomOffsets(Array.from({ length: 10 }, () => Math.random() * 30))
    // Create futuristic stars with larger variations
    setStarPositions(Array.from({ length: 150 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.7 + 0.3,
      color: Math.random() > 0.7 ? 
        `hsl(${170 + Math.random() * 60}, 100%, 80%)` : // Cyan variations
        (Math.random() > 0.5 ? 
          `hsl(${280 + Math.random() * 40}, 100%, 80%)` : // Purple variations
          `hsl(${Math.random() * 360}, 100%, 85%)`) // Random bright colors
    })))
    
    // Generate random positions for airplane contrails - now more like digital streaks
    setContrailPositions(Array.from({ length: 8 }, () => ({
      startX: Math.random() * 20,  // Start position percentage
      y: 15 + Math.random() * 30,  // Height in sky (percentage)
      length: 100 + Math.random() * 300, // Length in pixels
      angle: -5 + Math.random() * 10, // Slight angle variation
      duration: 60 + Math.random() * 80, // Animation duration
      delay: Math.random() * 60, // Random delay for each trail
      opacity: 0.6 + Math.random() * 0.4, // Opacity variation
      width: 1 + Math.random() * 2, // Width variation
      color: Math.random() > 0.5 ? 
        `hsl(${170 + Math.random() * 60}, 100%, 70%)` : // Cyan variations
        `hsl(${280 + Math.random() * 40}, 100%, 70%)` // Purple variations
    })))

    // Generate digital particles for cyberpunk effect
    setDigitalParticles(Array.from({ length: 60 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 3,
      speed: 10 + Math.random() * 40,
      opacity: 0.3 + Math.random() * 0.5,
      color: Math.random() > 0.6 ? 
        `hsl(${170 + Math.random() * 60}, 100%, 70%)` : // Cyan variations
        `hsl(${280 + Math.random() * 40}, 100%, 70%)` // Purple variations
    })))
  }, [isClient])

  // Set up the intersection observer to track which section is currently visible
  useEffect(() => {
    if (!isClient) return;
    
    const handleSectionChange = (index: number) => {
      setCurrentSectionIndex(index);
      
      // Update the context with current section
      setCurrentSection(SECTIONS[index]);
      
      // Map section index to progress value (0 to 1)
      // Convert index to a value between 0 and 1 based on total sections
      const progress = index / (SECTIONS.length - 1);
      progressValue.current.set(progress);
    };
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = SECTIONS.findIndex(id => id === entry.target.id);
            if (index !== -1) {
              handleSectionChange(index);
            }
          }
        });
      },
      { threshold: 0.6 } // When 60% of the section is visible
    );
    
    SECTIONS.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    
    return () => {
      SECTIONS.forEach(id => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [isClient]);
  
  // Create a fixed set of transforms that don't depend on randomOffsets
  const cloudTransform0 = useTransform(smoothProgress, [0, 1], [0, -100]);
  const cloudTransform1 = useTransform(smoothProgress, [0, 1], [0, -100]);
  const cloudTransform2 = useTransform(smoothProgress, [0, 1], [0, -100]);
  const cloudTransform3 = useTransform(smoothProgress, [0, 1], [0, -100]);
  const cloudTransform4 = useTransform(smoothProgress, [0, 1], [0, -100]);
  const cloudTransform5 = useTransform(smoothProgress, [0, 1], [0, -100]);
  const cloudTransform6 = useTransform(smoothProgress, [0, 1], [0, -100]);
  const cloudTransform7 = useTransform(smoothProgress, [0, 1], [0, -100]);
  const cloudTransform8 = useTransform(smoothProgress, [0, 1], [0, -100]);
  const cloudTransform9 = useTransform(smoothProgress, [0, 1], [0, -100]);
  
  // Put all transforms into an array for easy access
  const cloudTransforms = [
    cloudTransform0, cloudTransform1, cloudTransform2, cloudTransform3, cloudTransform4,
    cloudTransform5, cloudTransform6, cloudTransform7, cloudTransform8, cloudTransform9
  ];
  
  // More distinct color steps for each phase - updated with cyberpunk colors
  const skyColorBase = useTransform(
    smoothProgress, 
    [0, 0.25, 0.5, 0.75, 1], 
    [
      "hsl(259, 80%, 12%)",  // Night/Pre-dawn deep blue/purple with higher saturation
      "hsl(300, 90%, 15%)",  // Dawn magenta/purple
      "hsl(210, 100%, 20%)",  // Daytime deep blue with neon undertones
      "hsl(320, 100%, 15%)",  // Sunset magenta/purple
      "hsl(260, 80%, 15%)"   // Night deep blue/purple with higher saturation
    ]
  )
  
  // Dawn/Dusk gradient overlay - stronger contrast with cyberpunk gradients
  const skyColorOverlay = useTransform(
    smoothProgress, 
    [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1], 
    [
      "linear-gradient(to top, rgba(80, 20, 180, 0.5), rgba(20, 20, 100, 0.3))",  // Pre-dawn gradient 
      "linear-gradient(to top, rgba(180, 20, 255, 0.4), rgba(50, 10, 120, 0.3))", // Dawn gradient - cyberpunk
      "linear-gradient(to top, rgba(0, 200, 255, 0.3), rgba(0, 50, 120, 0.2))", // Early day - neon blue
      "linear-gradient(to bottom, rgba(0, 180, 255, 0.3), rgba(0, 20, 100, 0.2))", // Full day - neon blue
      "linear-gradient(to bottom, rgba(255, 0, 150, 0.4), rgba(100, 0, 120, 0.3))", // Sunset gradient - neon pink
      "linear-gradient(to top, rgba(40, 0, 120, 0.6), rgba(80, 20, 180, 0.4))", // Dusk gradient 
      "linear-gradient(to top, rgba(80, 20, 180, 0.5), rgba(20, 20, 100, 0.3))"  // Night gradient
    ]
  )
  
  // Add debug display to show current section
  const [debugProgress, setDebugProgress] = useState(0)
  
  // useEffect(() => {
  //   const unsubscribe = smoothProgress.on("change", v => {
  //     setDebugProgress(v)
  //   })
  //   return unsubscribe
  // }, [smoothProgress])
  
  // Cloud color changes based on time of day - more distinct cyberpunk colors
  const cloudColor = useTransform(
    smoothProgress, 
    [0, 0.25, 0.5, 0.75, 1], 
    [
      "rgba(100, 100, 220, 0.7)",  // Pre-dawn bluish clouds
      "rgba(200, 100, 255, 0.7)",  // Dawn purple clouds
      "rgba(0, 200, 255, 0.7)",    // Day cyan clouds
      "rgba(255, 50, 150, 0.7)",   // Sunset pink clouds
      "rgba(100, 100, 220, 0.7)"   // Night dark bluish clouds
    ]
  )
  
  // Star visibility based on time of day
  const starOpacity = useTransform(
    smoothProgress, 
    [0, 0.15, 0.35, 0.65, 0.85, 1], 
    [0.9, 0.2, 0.1, 0.2, 0.8, 0.9]  // More visible overall for the cyberpunk look
  )
  
  // Moon visibility based on time of day
  const moonOpacity = useTransform(
    smoothProgress, 
    [0, 0.15, 0.35, 0.65, 0.85, 1], 
    [0.95, 0.3, 0.1, 0.3, 0.8, 0.95]  // More visible overall
  )
  
  // Contrail visibility based on time of day
  const contrailOpacity = useTransform(
    smoothProgress,
    [0, 0.15, 0.35, 0.65, 0.85, 1],
    [0.5, 0.7, 0.9, 0.7, 0.5, 0.5] // More visible for the cyberpunk look
  )

  // Digital particles visibility
  const particleOpacity = useTransform(
    smoothProgress,
    [0, 0.15, 0.35, 0.65, 0.85, 1],
    [0.6, 0.7, 0.8, 0.7, 0.6, 0.6] // Always somewhat visible
  )

  // Pre-calculate cloud positions to avoid hooks in render
  const cloudPositions = useMemo(() => {
    if (!isClient || randomOffsets.length === 0) {
      return Array(10).fill(0).map(() => ({
        width: '120px',
        height: '80px',
        left: '10%',
        top: '10%',
        duration: '60s',
        animationDelay: '0s',
        extraOffset: 0,
        pixels: [] // Default empty pixels array
      }));
    }
    
    // Generate pixelated clouds
    return Array(10).fill(0).map((_, i) => {
      // Create pixel blocks for this cloud
      const pixelSize = 3 + Math.floor(Math.random() * 3); // Pixel size between 3-5px
      const cloudWidth = 80 + Math.floor(Math.random() * 120);
      const cloudHeight = 40 + Math.floor(Math.random() * 30);
      
      // Generate a pixel cloud shape (inspired by classic 8-bit games)
      const pixels = [];
      
      // Cloud shape patterns - classic 8-bit style
      const patterns = [
        // Basic cloud
        [
          [0,0,0,1,1,1,1,0,0,0,0],
          [0,0,1,1,1,1,1,1,0,0,0],
          [0,1,1,1,1,1,1,1,1,0,0],
          [1,1,1,1,1,1,1,1,1,1,0],
          [0,0,1,1,1,1,1,1,0,0,0],
        ],
        // Wider cloud
        [
          [0,0,0,0,1,1,1,1,1,0,0,0,0,0],
          [0,0,1,1,1,1,1,1,1,1,1,0,0,0],
          [0,1,1,1,1,1,1,1,1,1,1,1,0,0],
          [1,1,1,1,1,1,1,1,1,1,1,1,1,0],
          [0,0,1,1,1,1,1,1,1,1,0,0,0,0],
        ],
        // Asymmetric cloud
        [
          [0,0,1,1,1,0,0,0],
          [0,1,1,1,1,1,0,0],
          [1,1,1,1,1,1,1,0],
          [1,1,1,1,1,1,1,1],
          [0,0,1,1,1,1,0,0],
        ]
      ];
      
      // Choose a random pattern and randomize it slightly
      const basePattern = patterns[Math.floor(Math.random() * patterns.length)];
      
      // Scale up the pattern by duplicating pixels
      const scaleFactor = 1 + Math.floor(Math.random() * 2); // Scale 1-2x
      const patternWidth = basePattern[0].length;
      const patternHeight = basePattern.length;
      
      // Generate pixels based on the pattern
      for (let y = 0; y < patternHeight; y++) {
        for (let x = 0; x < patternWidth; x++) {
          if (basePattern[y][x] === 1) {
            // For each 1 in the pattern, create a scaled pixel block
            for (let sy = 0; sy < scaleFactor; sy++) {
              for (let sx = 0; sx < scaleFactor; sx++) {
                // Add some random empty spaces for texture
                if (Math.random() > 0.1) { // 10% chance to skip a pixel for texture
                  pixels.push({
                    x: (x * scaleFactor + sx) * pixelSize,
                    y: (y * scaleFactor + sy) * pixelSize,
                    size: pixelSize,
                    // Vary the color slightly for some pixels
                    color: Math.random() > 0.7 ? 
                      (Math.random() > 0.5 ? 
                        "rgba(180, 200, 255, 0.85)" : // Light blue
                        "rgba(200, 160, 255, 0.8)") // Light purple
                      : "rgba(230, 230, 255, 0.9)" // White-ish
                  });
                }
              }
            }
          }
        }
      }

      return {
        // Base cloud position and size
        width: `${cloudWidth}px`,
        height: `${cloudHeight}px`,
        left: `${(i * 10) + randomOffsets[i]}%`,
        top: `${10 + Math.random() * 70}%`,
        duration: `${60 + Math.random() * 60}s`, 
        animationDelay: `-${Math.random() * 60}s`,
        extraOffset: randomOffsets[i] ? randomOffsets[i] * 10 : 0,
        pixels // The pixel blocks that form the cloud
      };
    });
  }, [isClient, randomOffsets]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" ref={containerRef}>
      {/* Base Sky Background */}
      <motion.div 
        className="absolute inset-0 w-full h-full" 
        style={{ 
          backgroundColor: skyColorBase
        }}
      />
      
      {/* Dawn/Dusk Gradient Overlay */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ 
          backgroundImage: skyColorOverlay
        }}
      />

      {/* Grid overlay for cyberpunk effect */}
      <div className="absolute inset-0 w-full h-full" 
        style={{ 
          backgroundImage: "linear-gradient(rgba(0, 100, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 100, 255, 0.03) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          pointerEvents: "none"
        }}>
      </div>

      {/* Horizontal grid lines */}
      <div className="absolute inset-0 w-full h-full" 
        style={{ 
          backgroundImage: "linear-gradient(to bottom, transparent 10%, rgba(0, 100, 255, 0.05) 10.5%, transparent 11%, transparent 20%, rgba(0, 100, 255, 0.05) 20.5%, transparent 21%, transparent 30%, rgba(0, 100, 255, 0.05) 30.5%, transparent 31%, transparent 40%, rgba(0, 100, 255, 0.05) 40.5%, transparent 41%, transparent 50%, rgba(0, 100, 255, 0.05) 50.5%, transparent 51%, transparent 60%, rgba(0, 100, 255, 0.05) 60.5%, transparent 61%, transparent 70%, rgba(0, 100, 255, 0.05) 70.5%, transparent 71%, transparent 80%, rgba(0, 100, 255, 0.05) 80.5%, transparent 81%, transparent 90%, rgba(0, 100, 255, 0.05) 90.5%, transparent 91%)",
          pointerEvents: "none"
        }}>
      </div>

      {/* Debug display - comment out in production */}
      {/* <div className="fixed bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs z-50">
        Section: {SECTIONS[currentSectionIndex]} ({currentSectionIndex + 1}/{SECTIONS.length})
        <br/>
        Progress: {debugProgress.toFixed(2)}
      </div> */}
      
      {/* Digital Particles - cyberpunk floating elements */}
      {isClient && digitalParticles.length > 0 && (
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ opacity: particleOpacity }}
        >
          {digitalParticles.map((particle, i) => (
            <div
              key={`particle-${i}`}
              className="absolute"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                opacity: particle.opacity,
                boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                animation: `floatParticle ${particle.speed}s infinite linear`,
                animationDelay: `-${Math.random() * 30}s`
              }}
            />
          ))}
        </motion.div>
      )}
      
      {/* Airplane Contrails - Now digitized data streams */}
      {isClient && contrailPositions.length > 0 && (
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ opacity: contrailOpacity }}
        >
          {contrailPositions.map((trail, i) => (
            <div
              key={`trail-${i}`}
              className="absolute"
              style={{
                top: `${trail.y}%`,
                left: 0,
                width: '100%',
                height: '2px',
                overflow: 'visible',
              }}
            >
              {/* Digital stream head */}
              <div 
                className="absolute z-10"
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '2px',
                  backgroundColor: trail.color,
                  boxShadow: `0 0 5px 3px ${trail.color}`,
                  animation: `moveContrail ${trail.duration}s linear infinite, pulsateDigital 2s infinite`,
                  animationDelay: `-${trail.delay}s, -${Math.random() * 2}s`,
                  left: 0,
                  top: '-2px',
                  transform: `translateX(100vw) rotate(${trail.angle}deg)`,
                }}
              />
              
              {/* Digital contrail/data stream */}
              <div
                className="absolute"
                style={{
                  height: `${trail.width}px`,
                  width: `${trail.length}px`,
                  background: `linear-gradient(to right, ${trail.color}, ${trail.color} 10%, ${trail.color}55 60%, transparent)`,
                  opacity: trail.opacity,
                  filter: 'blur(1px)',
                  transform: `rotate(${trail.angle}deg)`,
                  transformOrigin: 'left center',
                  animation: `moveContrail ${trail.duration}s linear infinite, pulseGlow 4s infinite alternate`,
                  animationDelay: `-${trail.delay}s, -${Math.random() * 4}s`
                }}
              />
              
              {/* Digital bits within the stream */}
              {Array(Math.floor(Math.random() * 5) + 3).fill(0).map((_, idx) => (
                <div
                  key={`trail-${i}-bit-${idx}`}
                  className="absolute"
                  style={{
                    width: `${2 + Math.random() * 6}px`,
                    height: `${1 + Math.random() * 2}px`,
                    backgroundColor: trail.color,
                    boxShadow: `0 0 3px 1px ${trail.color}`,
                    opacity: 0.9,
                    left: `${20 + Math.random() * 60}%`,
                    top: `-${1 + Math.random() * 3}px`,
                    animation: `moveContrail ${trail.duration * 0.8}s linear infinite, flickerBit 1s infinite`,
                    animationDelay: `-${trail.delay + Math.random() * 10}s, -${Math.random()}s`
                  }}
                />
              ))}
            </div>
          ))}
        </motion.div>
      )}
      
      {/* Stars (visible at night) - Now high-tech glowing stars */}
      {isClient && (
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ opacity: starOpacity }}
        >
          {starPositions.map((star, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                backgroundColor: star.color || "white",
                opacity: star.opacity,
                boxShadow: `0 0 ${star.size + 2}px ${star.size/1.5}px ${star.color || "white"}`,
                animation: `pulseStar ${2 + Math.random() * 4}s infinite alternate`,
                animationDelay: `-${Math.random() * 5}s`,
                borderRadius: Math.random() > 0.7 ? '2px' : '50%', // Some square stars for tech look
                transform: Math.random() > 0.7 ? 'rotate(45deg)' : 'none'
              }}
            />
          ))}
        </motion.div>
      )}
      
      {/* Futuristic Moon/Sun */}
      {isClient && (
        <motion.div
          className="absolute"
          style={{
            top: "15%",
            right: "15%",
            opacity: moonOpacity,
            width: "80px",
            height: "80px",
            background: "radial-gradient(circle, rgba(255,255,255,0.9) 30%, rgba(180,180,255,0.6) 70%, transparent 100%)",
            boxShadow: "0 0 30px 15px rgba(150, 180, 255, 0.6)",
            borderRadius: "50%",
            animation: "pulseOrb 8s infinite alternate"
          }}
        >
          {/* High-tech moon details */}
          <div className="absolute inset-0">
            {/* Hexagonal grid overlay */}
            <div 
              className="absolute inset-0 rounded-full overflow-hidden"
              style={{
                background: "repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(200, 220, 255, 0.1) 5px, rgba(200, 220, 255, 0.1) 6px), repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(200, 220, 255, 0.1) 5px, rgba(200, 220, 255, 0.1) 6px)"
              }}
            ></div>
            
            {/* Digital circuit-like patterns */}
            <div className="absolute inset-0 rounded-full overflow-hidden opacity-50">
              <div className="absolute h-px w-12 bg-blue-300" style={{top: '40%', left: '10%', boxShadow: '0 0 3px #88f'}}></div>
              <div className="absolute h-px w-8 bg-blue-300" style={{top: '60%', left: '35%', boxShadow: '0 0 3px #88f'}}></div>
              <div className="absolute h-px w-10 bg-blue-300" style={{top: '30%', left: '40%', boxShadow: '0 0 3px #88f'}}></div>
              <div className="absolute h-8 w-px bg-blue-300" style={{top: '20%', left: '65%', boxShadow: '0 0 3px #88f'}}></div>
              <div className="absolute h-6 w-px bg-blue-300" style={{top: '40%', left: '30%', boxShadow: '0 0 3px #88f'}}></div>
            </div>
            
            {/* Tech-style "craters" */}
            <div className="absolute w-6 h-6 rounded-full" style={{top: '20%', left: '20%', background: 'radial-gradient(circle, rgba(150,150,255,0.3) 0%, rgba(50,50,150,0.1) 100%)'}}></div>
            <div className="absolute w-8 h-8 rounded-full" style={{top: '50%', left: '60%', background: 'radial-gradient(circle, rgba(150,150,255,0.3) 0%, rgba(50,50,150,0.1) 100%)'}}></div>
            <div className="absolute w-5 h-5 rounded-full" style={{top: '70%', left: '30%', background: 'radial-gradient(circle, rgba(150,150,255,0.3) 0%, rgba(50,50,150,0.1) 100%)'}}></div>
          </div>
          
          {/* Orbital ring */}
          <div 
            className="absolute"
            style={{
              width: "100px",
              height: "100px",
              left: "-10px",
              top: "-10px",
              border: "1px solid rgba(100, 200, 255, 0.5)",
              borderRadius: "50%",
              boxShadow: "0 0 5px rgba(100, 200, 255, 0.5)",
              animation: "rotate 20s linear infinite"
            }}
          ></div>
          
          {/* Second orbital ring at different angle */}
          <div 
            className="absolute"
            style={{
              width: "110px",
              height: "90px",
              left: "-15px",
              top: "-5px",
              border: "1px solid rgba(150, 100, 255, 0.5)",
              borderRadius: "50%",
              boxShadow: "0 0 5px rgba(150, 100, 255, 0.5)",
              transform: "rotate(45deg)",
              animation: "rotate 30s linear infinite reverse"
            }}
          ></div>
        </motion.div>
      )}
      
      {/* Clouds - Now pixelated 8-bit style clouds */}
      <div className="absolute inset-0 w-full h-full">
        {cloudPositions && cloudPositions.length > 0 ? 
          cloudPositions.map((cloud, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: cloud.width,
                height: cloud.height,
                top: cloud.top,
                left: "-20%", 
                x: isClient ? cloudTransforms[i] : 0,
                animation: isClient ? `moveCloud ${cloud.duration} linear infinite` : 'none',
                animationDelay: cloud.animationDelay,
                position: "relative",
                zIndex: 1
              }}
            >
              {/* Pixel blocks forming the cloud */}
              {cloud.pixels && cloud.pixels.map((pixel, j) => (
                <div
                  key={`cloud-${i}-pixel-${j}`}
                  className="absolute"
                  style={{
                    width: `${pixel.size}px`,
                    height: `${pixel.size}px`,
                    top: `${pixel.y}px`,
                    left: `${pixel.x}px`,
                    backgroundColor: pixel.color,
                    // No border-radius for sharp pixel edges
                    // No blur for crisp pixel art
                    animation: `pulsePixel ${3 + Math.random() * 5}s infinite alternate`,
                    animationDelay: `-${Math.random() * 5}s`
                  }}
                />
              ))}
            </motion.div>
          ))
        : 
          // Fallback basic pixelated clouds
          Array(5).fill(0).map((_, i) => {
            const pixels = [];
            const pixelSize = 4;
            const width = 80 + (i * 20);
            const height = 40;
            
            // Simple cloud pattern
            const pattern = [
              [0,0,1,1,1,1,0,0],
              [0,1,1,1,1,1,1,0],
              [1,1,1,1,1,1,1,1],
              [0,1,1,1,1,1,1,0]
            ];
            
            // Generate pixels
            for (let y = 0; y < pattern.length; y++) {
              for (let x = 0; x < pattern[0].length; x++) {
                if (pattern[y][x] === 1) {
                  pixels.push({
                    x: x * pixelSize,
                    y: y * pixelSize,
                    size: pixelSize
                  });
                }
              }
            }
            
            return (
              <div
                key={`fallback-cloud-${i}`}
                className="absolute"
                style={{
                  width: `${width}px`,
                  height: `${height}px`,
                  top: `${10 + (i * 15)}%`,
                  left: `${(i * 20)}%`,
                  position: "relative"
                }}
              >
                {pixels.map((pixel, j) => (
                  <div
                    key={`fallback-cloud-${i}-pixel-${j}`}
                    className="absolute"
                    style={{
                      width: `${pixel.size}px`,
                      height: `${pixel.size}px`,
                      top: `${pixel.y}px`,
                      left: `${pixel.x}px`,
                      backgroundColor: "rgba(180, 200, 255, 0.9)"
                    }}
                  />
                ))}
              </div>
            );
          })
        }
      </div>
      
      {/* Add keyframe animations */}
      <style jsx global>{`
        @keyframes moveCloud {
          0% {
            transform: translateX(120vw); /* Start from right side off-screen */
          }
          100% {
            transform: translateX(-20vw); /* Move to left side off-screen */
          }
        }
        
        @keyframes moveContrail {
          0% {
            transform: translateX(100vw) rotate(${Math.random() * 5 - 2.5}deg);
            opacity: 0;
          }
          5% {
            opacity: var(--opacity, 0.8);
          }
          95% {
            opacity: var(--opacity, 0.8);
          }
          100% {
            transform: translateX(-120vw) rotate(${Math.random() * 5 - 2.5}deg);
            opacity: 0;
          }
        }
        
        @keyframes pulseStar {
          0% { opacity: var(--opacity, 0.7); transform: scale(1); }
          100% { opacity: var(--opacity, 1); transform: scale(1.2); }
        }
        
        @keyframes pulsateCloud {
          0% { opacity: var(--opacity, 0.4); }
          100% { opacity: var(--opacity, 0.7); }
        }
        
        @keyframes pulsePixel {
          0% { opacity: 0.9; }
          100% { opacity: 1; }
        }
        
        @keyframes pulseGlow {
          0% { filter: blur(1px); }
          100% { filter: blur(2px); }
        }
        
        @keyframes flickerBit {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 0.3; }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulseOrb {
          0% { box-shadow: 0 0 30px 15px rgba(150, 180, 255, 0.6); }
          50% { box-shadow: 0 0 40px 20px rgba(150, 180, 255, 0.7); }
          100% { box-shadow: 0 0 35px 18px rgba(170, 150, 255, 0.6); }
        }
        
        @keyframes floatParticle {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(10px) translateX(5px); }
          50% { transform: translateY(0) translateX(10px); }
          75% { transform: translateY(-10px) translateX(5px); }
          100% { transform: translateY(0) translateX(0); }
        }
        
        @keyframes aircraftLights {
          0%, 100% { 
            background-color: #00FFFF;
            box-shadow: 0 0 5px 3px rgba(0, 255, 255, 0.8);
            opacity: 1;
          }
          25% {
            background-color: #FF00FF;
            box-shadow: 0 0 5px 3px rgba(255, 0, 255, 0.8);
            opacity: 0.9;
          }
          33% {
            opacity: 0.6;
          }
          50% {
            background-color: #00FF99;
            box-shadow: 0 0 5px 3px rgba(0, 255, 153, 0.8);
            opacity: 0.9;
          }
          58% {
            opacity: 0.6;
          }
          75% {
            background-color: #9900FF;
            box-shadow: 0 0 5px 3px rgba(153, 0, 255, 0.8);
            opacity: 0.9;
          }
          83% {
            opacity: 0.6;
          }
        }
      `}</style>
      
      {/* Airplane Window Frame */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-full border-[40px] md:border-[80px] rounded-[50%] border-neutral-800 opacity-5" />
      </div> */}
    </div>
  )
} 