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

// Realistic logo/illustration designs for each tier
const LogoDesigns = {
  basic: {
    // Coffee cup logo
    before: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <filter id="blur-basic" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
          </filter>
        </defs>
        <g filter="url(#blur-basic)">
          {/* Cup body */}
          <path d="M30 45 L35 95 Q37 105 60 105 Q83 105 85 95 L90 45 Z" fill="#8B4513" />
          <path d="M30 45 L35 95 Q37 105 60 105 Q83 105 85 95 L90 45 Z" fill="none" stroke="#5D2E0C" strokeWidth="2" />
          {/* Cup top rim */}
          <ellipse cx="60" cy="45" rx="32" ry="8" fill="#A0522D" stroke="#5D2E0C" strokeWidth="2" />
          {/* Handle */}
          <path d="M90 55 Q110 55 110 75 Q110 90 90 85" fill="none" stroke="#5D2E0C" strokeWidth="6" strokeLinecap="round" />
          {/* Steam */}
          <path d="M45 30 Q48 20 45 10" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <path d="M60 25 Q63 15 60 5" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <path d="M75 30 Q72 20 75 10" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          {/* Coffee inside */}
          <ellipse cx="60" cy="48" rx="26" ry="5" fill="#3E2723" />
        </g>
      </svg>
    ),
    after: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Cup body */}
        <path d="M30 45 L35 95 Q37 105 60 105 Q83 105 85 95 L90 45 Z" fill="hsl(var(--primary))" opacity="0.9" />
        <path d="M30 45 L35 95 Q37 105 60 105 Q83 105 85 95 L90 45 Z" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" />
        {/* Cup top rim */}
        <ellipse cx="60" cy="45" rx="32" ry="8" fill="hsl(var(--primary))" stroke="hsl(var(--primary))" strokeWidth="2" />
        {/* Handle */}
        <path d="M90 55 Q110 55 110 75 Q110 90 90 85" fill="none" stroke="hsl(var(--primary))" strokeWidth="5" strokeLinecap="round" />
        {/* Steam */}
        <path d="M45 30 Q48 20 45 10" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
        <path d="M60 25 Q63 15 60 5" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
        <path d="M75 30 Q72 20 75 10" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
        {/* Coffee inside */}
        <ellipse cx="60" cy="48" rx="26" ry="5" fill="hsl(var(--primary))" opacity="0.3" />
      </svg>
    )
  },
  standard: {
    // Mountain/outdoor logo
    before: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <filter id="blur-standard" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.9" />
          </filter>
        </defs>
        <g filter="url(#blur-standard)">
          {/* Circle background */}
          <circle cx="60" cy="60" r="50" fill="#2E7D32" />
          <circle cx="60" cy="60" r="50" fill="none" stroke="#1B5E20" strokeWidth="3" />
          {/* Mountains */}
          <polygon points="20,85 45,45 70,85" fill="#4CAF50" />
          <polygon points="50,85 80,35 110,85" fill="#388E3C" />
          {/* Snow caps */}
          <polygon points="45,45 40,55 50,55" fill="#E8F5E9" />
          <polygon points="80,35 73,48 87,48" fill="#E8F5E9" />
          {/* Sun */}
          <circle cx="85" cy="35" r="12" fill="#FFC107" />
          {/* Trees */}
          <polygon points="25,85 30,65 35,85" fill="#1B5E20" />
          <polygon points="38,85 43,70 48,85" fill="#1B5E20" />
        </g>
      </svg>
    ),
    after: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Circle background */}
        <circle cx="60" cy="60" r="50" fill="hsl(var(--primary))" opacity="0.15" />
        <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" />
        {/* Mountains */}
        <polygon points="20,85 45,45 70,85" fill="hsl(var(--primary))" opacity="0.4" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <polygon points="50,85 80,35 110,85" fill="hsl(var(--primary))" opacity="0.6" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        {/* Snow caps */}
        <polygon points="45,45 40,55 50,55" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1" />
        <polygon points="80,35 73,48 87,48" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1" />
        {/* Sun */}
        <circle cx="85" cy="35" r="12" fill="hsl(var(--primary))" opacity="0.3" stroke="hsl(var(--primary))" strokeWidth="2" />
        {/* Trees */}
        <polygon points="25,85 30,65 35,85" fill="hsl(var(--primary))" />
        <polygon points="38,85 43,70 48,85" fill="hsl(var(--primary))" />
      </svg>
    )
  },
  premium: {
    // Lion mascot
    before: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <filter id="blur-premium" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
          </filter>
        </defs>
        <g filter="url(#blur-premium)">
          {/* Mane */}
          <circle cx="60" cy="58" r="45" fill="#F57C00" />
          <circle cx="60" cy="58" r="38" fill="#FF9800" />
          {/* Face */}
          <ellipse cx="60" cy="62" rx="28" ry="30" fill="#FFB74D" />
          {/* Ears */}
          <circle cx="32" cy="35" r="12" fill="#FF9800" />
          <circle cx="88" cy="35" r="12" fill="#FF9800" />
          <circle cx="32" cy="35" r="7" fill="#FFB74D" />
          <circle cx="88" cy="35" r="7" fill="#FFB74D" />
          {/* Eyes */}
          <ellipse cx="48" cy="55" rx="6" ry="7" fill="#3E2723" />
          <ellipse cx="72" cy="55" rx="6" ry="7" fill="#3E2723" />
          <circle cx="50" cy="53" r="2" fill="white" />
          <circle cx="74" cy="53" r="2" fill="white" />
          {/* Nose */}
          <ellipse cx="60" cy="70" rx="8" ry="6" fill="#5D4037" />
          {/* Mouth */}
          <path d="M52 78 Q60 85 68 78" fill="none" stroke="#5D4037" strokeWidth="2" strokeLinecap="round" />
          {/* Whisker dots */}
          <circle cx="45" cy="75" r="2" fill="#5D4037" />
          <circle cx="40" cy="72" r="2" fill="#5D4037" />
          <circle cx="75" cy="75" r="2" fill="#5D4037" />
          <circle cx="80" cy="72" r="2" fill="#5D4037" />
        </g>
      </svg>
    ),
    after: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Mane */}
        <circle cx="60" cy="58" r="45" fill="hsl(var(--primary))" opacity="0.2" stroke="hsl(var(--primary))" strokeWidth="2" />
        <circle cx="60" cy="58" r="38" fill="hsl(var(--primary))" opacity="0.3" />
        {/* Face */}
        <ellipse cx="60" cy="62" rx="28" ry="30" fill="hsl(var(--primary))" opacity="0.15" stroke="hsl(var(--primary))" strokeWidth="2" />
        {/* Ears */}
        <circle cx="32" cy="35" r="12" fill="hsl(var(--primary))" opacity="0.3" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <circle cx="88" cy="35" r="12" fill="hsl(var(--primary))" opacity="0.3" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <circle cx="32" cy="35" r="7" fill="hsl(var(--primary))" opacity="0.15" />
        <circle cx="88" cy="35" r="7" fill="hsl(var(--primary))" opacity="0.15" />
        {/* Eyes */}
        <ellipse cx="48" cy="55" rx="6" ry="7" fill="hsl(var(--primary))" />
        <ellipse cx="72" cy="55" rx="6" ry="7" fill="hsl(var(--primary))" />
        <circle cx="50" cy="53" r="2" fill="hsl(var(--background))" />
        <circle cx="74" cy="53" r="2" fill="hsl(var(--background))" />
        {/* Nose */}
        <ellipse cx="60" cy="70" rx="8" ry="6" fill="hsl(var(--primary))" />
        {/* Mouth */}
        <path d="M52 78 Q60 85 68 78" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" />
        {/* Whisker dots */}
        <circle cx="45" cy="75" r="2" fill="hsl(var(--primary))" />
        <circle cx="40" cy="72" r="2" fill="hsl(var(--primary))" />
        <circle cx="75" cy="75" r="2" fill="hsl(var(--primary))" />
        <circle cx="80" cy="72" r="2" fill="hsl(var(--primary))" />
      </svg>
    )
  },
  enterprise: {
    // Eagle/Phoenix emblem
    before: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <filter id="blur-enterprise" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.1" />
          </filter>
        </defs>
        <g filter="url(#blur-enterprise)">
          {/* Shield */}
          <path d="M60 8 L100 25 L100 60 Q100 95 60 112 Q20 95 20 60 L20 25 Z" fill="#1565C0" stroke="#0D47A1" strokeWidth="3" />
          {/* Inner shield */}
          <path d="M60 18 L90 32 L90 58 Q90 85 60 98 Q30 85 30 58 L30 32 Z" fill="#1976D2" />
          {/* Eagle wings */}
          <path d="M60 40 Q30 35 20 55 Q35 50 45 60 Q50 50 60 45" fill="#FFC107" />
          <path d="M60 40 Q90 35 100 55 Q85 50 75 60 Q70 50 60 45" fill="#FFC107" />
          {/* Eagle body */}
          <ellipse cx="60" cy="60" rx="12" ry="18" fill="#FFC107" />
          {/* Eagle head */}
          <circle cx="60" cy="42" r="10" fill="#FFC107" />
          {/* Beak */}
          <polygon points="60,48 55,52 60,58 65,52" fill="#FF8F00" />
          {/* Eyes */}
          <circle cx="56" cy="40" r="2" fill="#0D47A1" />
          <circle cx="64" cy="40" r="2" fill="#0D47A1" />
          {/* Tail feathers */}
          <path d="M48 75 L60 90 L72 75" fill="#FFC107" stroke="#FF8F00" strokeWidth="1" />
          {/* Stars */}
          <circle cx="35" cy="45" r="3" fill="white" />
          <circle cx="85" cy="45" r="3" fill="white" />
          <circle cx="60" cy="25" r="3" fill="white" />
        </g>
      </svg>
    ),
    after: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <defs>
          <linearGradient id="shield-fill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {/* Shield */}
        <path d="M60 8 L100 25 L100 60 Q100 95 60 112 Q20 95 20 60 L20 25 Z" fill="url(#shield-fill)" stroke="hsl(var(--primary))" strokeWidth="3" />
        {/* Inner shield */}
        <path d="M60 18 L90 32 L90 58 Q90 85 60 98 Q30 85 30 58 L30 32 Z" fill="hsl(var(--primary))" opacity="0.15" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        {/* Eagle wings */}
        <path d="M60 40 Q30 35 20 55 Q35 50 45 60 Q50 50 60 45" fill="hsl(var(--primary))" opacity="0.6" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <path d="M60 40 Q90 35 100 55 Q85 50 75 60 Q70 50 60 45" fill="hsl(var(--primary))" opacity="0.6" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        {/* Eagle body */}
        <ellipse cx="60" cy="60" rx="12" ry="18" fill="hsl(var(--primary))" opacity="0.4" stroke="hsl(var(--primary))" strokeWidth="2" />
        {/* Eagle head */}
        <circle cx="60" cy="42" r="10" fill="hsl(var(--primary))" opacity="0.5" stroke="hsl(var(--primary))" strokeWidth="2" />
        {/* Beak */}
        <polygon points="60,48 55,52 60,58 65,52" fill="hsl(var(--primary))" />
        {/* Eyes */}
        <circle cx="56" cy="40" r="2" fill="hsl(var(--primary))" />
        <circle cx="64" cy="40" r="2" fill="hsl(var(--primary))" />
        {/* Tail feathers */}
        <path d="M48 75 L60 90 L72 75" fill="hsl(var(--primary))" opacity="0.5" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        {/* Stars */}
        <circle cx="35" cy="45" r="3" fill="hsl(var(--primary))" />
        <circle cx="85" cy="45" r="3" fill="hsl(var(--primary))" />
        <circle cx="60" cy="25" r="3" fill="hsl(var(--primary))" />
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
      if (position >= 70) direction = -1;
      if (position <= 30) direction = 1;
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
          {/* Before Image (Slightly Blurry) */}
          <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted/95 to-muted-foreground/5">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              {/* Blurry Logo */}
              <div className="w-36 h-36 md:w-44 md:h-44 mb-3 relative">
                {currentDesign.before}
              </div>
              
              {/* Before Label */}
              <div className="flex items-center gap-2 text-muted-foreground">
                <ImageOff className="w-4 h-4" />
                <span className="font-semibold text-sm">{currentExample.beforeLabel}</span>
              </div>
              <p className="text-xs text-muted-foreground/60 mt-1">Slightly blurry • Limited quality</p>
            </div>
          </div>

          {/* After Image (Vector/Clear) - Clipped */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-card via-card to-primary/5"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              {/* Clean Vector Logo */}
              <div className="w-36 h-36 md:w-44 md:h-44 mb-3 relative">
                {currentDesign.after}
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-primary/5 blur-2xl rounded-full scale-90 -z-10" />
              </div>
              
              {/* After Label */}
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="w-4 h-4" />
                <span className="font-bold text-sm">{currentExample.afterLabel}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Crystal clear • Infinitely scalable</p>
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
              {currentExample.tierLabel} — From {currentExample.price}
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