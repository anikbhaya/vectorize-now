import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles, ImageOff } from "lucide-react";

interface ComparisonExample {
  tier: string;
  tierLabel: string;
  price: string;
  beforeLabel: string;
  afterLabel: string;
}

const examples: ComparisonExample[] = [
  {
    tier: "basic",
    tierLabel: "Basic",
    price: "$5",
    beforeLabel: "Low-res JPG",
    afterLabel: "Crisp Vector"
  },
  {
    tier: "standard",
    tierLabel: "Standard",
    price: "$12",
    beforeLabel: "Pixelated Logo",
    afterLabel: "Sharp & Scalable"
  },
  {
    tier: "premium",
    tierLabel: "Premium",
    price: "$25",
    beforeLabel: "Blurry Artwork",
    afterLabel: "HD Vector Art"
  },
  {
    tier: "enterprise",
    tierLabel: "Enterprise",
    price: "$50",
    beforeLabel: "Complex Image",
    afterLabel: "Print-Ready"
  }
];

// SVG Logo designs for each tier - matching before/after
const LogoDesigns = {
  basic: {
    // Simple geometric logo
    before: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <filter id="blur-basic" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>
        <g filter="url(#blur-basic)" opacity="0.7">
          <circle cx="60" cy="60" r="45" fill="hsl(var(--muted-foreground))" opacity="0.4" />
          <rect x="35" y="35" width="50" height="50" rx="8" fill="hsl(var(--muted-foreground))" opacity="0.6" />
          <circle cx="60" cy="60" r="15" fill="hsl(var(--muted-foreground))" opacity="0.8" />
        </g>
        {/* Pixelation overlay */}
        {[...Array(6)].map((_, i) =>
          [...Array(6)].map((_, j) => (
            <rect
              key={`${i}-${j}`}
              x={25 + i * 12}
              y={25 + j * 12}
              width="10"
              height="10"
              fill="hsl(var(--muted-foreground))"
              opacity={Math.random() * 0.2}
            />
          ))
        )}
      </svg>
    ),
    after: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <circle cx="60" cy="60" r="45" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" />
        <rect x="35" y="35" width="50" height="50" rx="8" fill="hsl(var(--primary))" opacity="0.2" stroke="hsl(var(--primary))" strokeWidth="2" />
        <circle cx="60" cy="60" r="15" fill="hsl(var(--primary))" />
      </svg>
    )
  },
  standard: {
    // Logo with text-like elements
    before: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <filter id="blur-standard" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
          </filter>
        </defs>
        <g filter="url(#blur-standard)" opacity="0.65">
          <polygon points="60,15 100,45 100,90 60,105 20,90 20,45" fill="hsl(var(--muted-foreground))" opacity="0.5" />
          <polygon points="60,25 90,48 90,82 60,95 30,82 30,48" fill="hsl(var(--muted-foreground))" opacity="0.7" />
          <text x="60" y="65" textAnchor="middle" fontSize="18" fill="hsl(var(--muted-foreground))" fontWeight="bold">AB</text>
        </g>
        {[...Array(5)].map((_, i) =>
          [...Array(5)].map((_, j) => (
            <rect
              key={`${i}-${j}`}
              x={28 + i * 13}
              y={28 + j * 13}
              width="11"
              height="11"
              fill="hsl(var(--muted-foreground))"
              opacity={Math.random() * 0.15}
            />
          ))
        )}
      </svg>
    ),
    after: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <polygon points="60,15 100,45 100,90 60,105 20,90 20,45" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" />
        <polygon points="60,25 90,48 90,82 60,95 30,82 30,48" fill="hsl(var(--primary))" opacity="0.15" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="60" y="65" textAnchor="middle" fontSize="18" fill="hsl(var(--primary))" fontWeight="bold" fontFamily="sans-serif">AB</text>
      </svg>
    )
  },
  premium: {
    // Complex mascot-like design
    before: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <filter id="blur-premium" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
          </filter>
        </defs>
        <g filter="url(#blur-premium)" opacity="0.6">
          {/* Head */}
          <circle cx="60" cy="45" r="28" fill="hsl(var(--muted-foreground))" opacity="0.6" />
          {/* Body */}
          <ellipse cx="60" cy="90" rx="25" ry="20" fill="hsl(var(--muted-foreground))" opacity="0.5" />
          {/* Eyes */}
          <circle cx="50" cy="42" r="6" fill="hsl(var(--muted-foreground))" opacity="0.8" />
          <circle cx="70" cy="42" r="6" fill="hsl(var(--muted-foreground))" opacity="0.8" />
          {/* Ears */}
          <circle cx="38" cy="25" r="10" fill="hsl(var(--muted-foreground))" opacity="0.5" />
          <circle cx="82" cy="25" r="10" fill="hsl(var(--muted-foreground))" opacity="0.5" />
        </g>
        {[...Array(6)].map((_, i) =>
          [...Array(6)].map((_, j) => (
            <rect
              key={`${i}-${j}`}
              x={22 + i * 13}
              y={15 + j * 15}
              width="11"
              height="13"
              fill="hsl(var(--muted-foreground))"
              opacity={Math.random() * 0.18}
            />
          ))
        )}
      </svg>
    ),
    after: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Head */}
        <circle cx="60" cy="45" r="28" fill="hsl(var(--primary))" opacity="0.15" stroke="hsl(var(--primary))" strokeWidth="2.5" />
        {/* Body */}
        <ellipse cx="60" cy="90" rx="25" ry="20" fill="hsl(var(--primary))" opacity="0.1" stroke="hsl(var(--primary))" strokeWidth="2" />
        {/* Eyes */}
        <circle cx="50" cy="42" r="6" fill="hsl(var(--primary))" />
        <circle cx="70" cy="42" r="6" fill="hsl(var(--primary))" />
        <circle cx="52" cy="40" r="2" fill="hsl(var(--primary-foreground))" />
        <circle cx="72" cy="40" r="2" fill="hsl(var(--primary-foreground))" />
        {/* Ears */}
        <circle cx="38" cy="25" r="10" fill="hsl(var(--primary))" opacity="0.3" stroke="hsl(var(--primary))" strokeWidth="2" />
        <circle cx="82" cy="25" r="10" fill="hsl(var(--primary))" opacity="0.3" stroke="hsl(var(--primary))" strokeWidth="2" />
        {/* Smile */}
        <path d="M50 55 Q60 65 70 55" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  },
  enterprise: {
    // Complex detailed design with gradients
    before: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <filter id="blur-enterprise" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" />
          </filter>
        </defs>
        <g filter="url(#blur-enterprise)" opacity="0.55">
          {/* Shield shape */}
          <path d="M60 10 L100 30 L100 70 Q100 100 60 115 Q20 100 20 70 L20 30 Z" fill="hsl(var(--muted-foreground))" opacity="0.5" />
          {/* Inner details */}
          <path d="M60 25 L85 40 L85 65 Q85 85 60 95 Q35 85 35 65 L35 40 Z" fill="hsl(var(--muted-foreground))" opacity="0.6" />
          {/* Star */}
          <polygon points="60,35 65,50 80,50 68,60 73,75 60,65 47,75 52,60 40,50 55,50" fill="hsl(var(--muted-foreground))" opacity="0.7" />
        </g>
        {[...Array(7)].map((_, i) =>
          [...Array(7)].map((_, j) => (
            <rect
              key={`${i}-${j}`}
              x={18 + i * 12}
              y={12 + j * 14}
              width="10"
              height="12"
              fill="hsl(var(--muted-foreground))"
              opacity={Math.random() * 0.15}
            />
          ))
        )}
      </svg>
    ),
    after: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <linearGradient id="shield-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {/* Shield shape */}
        <path d="M60 10 L100 30 L100 70 Q100 100 60 115 Q20 100 20 70 L20 30 Z" fill="url(#shield-gradient)" stroke="hsl(var(--primary))" strokeWidth="2.5" />
        {/* Inner details */}
        <path d="M60 25 L85 40 L85 65 Q85 85 60 95 Q35 85 35 65 L35 40 Z" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.7" />
        {/* Star */}
        <polygon points="60,35 65,50 80,50 68,60 73,75 60,65 47,75 52,60 40,50 55,50" fill="hsl(var(--primary))" stroke="hsl(var(--primary))" strokeWidth="1" />
      </svg>
    )
  }
};

const HeroComparisonSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isAnimating, setIsAnimating] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const animationRef = useRef<number>();

  // Auto-animate slider on load
  useEffect(() => {
    if (!isAnimating) return;

    let direction = 1;
    let position = 50;
    
    const animate = () => {
      position += direction * 0.3;
      if (position >= 75) direction = -1;
      if (position <= 25) direction = 1;
      setSliderPosition(position);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating, currentIndex]);

  const handleMouseDown = () => {
    isDragging.current = true;
    setIsAnimating(false);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleTouchStart = () => {
    setIsAnimating(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % examples.length);
    setSliderPosition(50);
    setIsAnimating(true);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + examples.length) % examples.length);
    setSliderPosition(50);
    setIsAnimating(true);
  };

  const currentExample = examples[currentIndex];
  const currentDesign = LogoDesigns[currentExample.tier as keyof typeof LogoDesigns];

  const tierColors: Record<string, string> = {
    basic: "bg-accent text-accent-foreground",
    standard: "bg-primary/20 text-primary",
    premium: "bg-chart-4/20 text-chart-4",
    enterprise: "bg-destructive/20 text-destructive"
  };

  return (
    <div className="w-full">
      {/* Tier Navigation */}
      <div className="flex items-center justify-center gap-1.5 mb-4 flex-wrap">
        {examples.map((example, index) => (
          <button
            key={example.tier}
            onClick={() => {
              setCurrentIndex(index);
              setSliderPosition(50);
              setIsAnimating(true);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              index === currentIndex
                ? `${tierColors[example.tier]} ring-2 ring-offset-2 ring-offset-background ring-primary/30`
                : "bg-muted/80 text-muted-foreground hover:bg-muted"
            }`}
          >
            {example.tierLabel}
          </button>
        ))}
      </div>

      {/* Comparison Slider */}
      <div className="relative">
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-card/95 border border-border shadow-lg hover:bg-accent transition-all hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-card/95 border border-border shadow-lg hover:bg-accent transition-all hover:scale-110"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>

        {/* Image Comparison Container */}
        <div
          ref={containerRef}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-2xl ring-1 ring-border"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          {/* Before Image (Raster/Blurry) */}
          <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted to-muted-foreground/10">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              {/* Blurry Logo */}
              <div className="w-32 h-32 md:w-40 md:h-40 mb-4 relative">
                <div className="absolute inset-0 bg-muted-foreground/5 rounded-xl" />
                {currentDesign.before}
              </div>
              
              {/* Before Label */}
              <div className="flex items-center gap-2 text-muted-foreground">
                <ImageOff className="w-4 h-4" />
                <span className="font-semibold text-sm">{currentExample.beforeLabel}</span>
              </div>
              <p className="text-xs text-muted-foreground/60 mt-1">Pixelated • Blurry • Limited Size</p>
            </div>
            
            {/* Scan lines effect for old/degraded look */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
              {[...Array(40)].map((_, i) => (
                <div key={i} className="h-px bg-muted-foreground/50" style={{ marginTop: i * 8 }} />
              ))}
            </div>
          </div>

          {/* After Image (Vector/Clear) - Clipped */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-card via-card to-primary/5"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              {/* Clean Vector Logo */}
              <div className="w-32 h-32 md:w-40 md:h-40 mb-4 relative">
                <div className="absolute inset-0 bg-primary/5 rounded-xl" />
                {currentDesign.after}
                {/* Glow effect */}
                <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full scale-75" />
              </div>
              
              {/* After Label */}
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="w-4 h-4" />
                <span className="font-bold text-sm">{currentExample.afterLabel}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Sharp • Scalable • Print-Ready</p>
            </div>
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary to-primary cursor-ew-resize z-10 shadow-lg"
            style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
          >
            {/* Glowing line effect */}
            <div className="absolute inset-0 w-2 -translate-x-1/2 bg-primary/30 blur-sm" />
            
            {/* Handle circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-xl ring-4 ring-primary/20">
              <div className="flex gap-0.5">
                <ChevronLeft className="w-4 h-4 text-primary-foreground" />
                <ChevronRight className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
          </div>

          {/* Corner Labels */}
          <div className="absolute top-3 left-3 px-3 py-1.5 bg-destructive/90 backdrop-blur-sm rounded-full text-xs font-bold text-destructive-foreground shadow-lg">
            ✗ Before
          </div>
          <div className="absolute top-3 right-3 px-3 py-1.5 bg-primary backdrop-blur-sm rounded-full text-xs font-bold text-primary-foreground shadow-lg flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            After
          </div>

          {/* Price Badge */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20">
            <div className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${tierColors[currentExample.tier]} ring-2 ring-offset-2 ring-offset-card ring-primary/20`}>
              {currentExample.tierLabel} Package — From {currentExample.price}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
            <ChevronLeft className="w-3 h-3" />
            <span>Drag to compare</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroComparisonSlider;