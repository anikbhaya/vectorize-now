import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles, ImageOff } from "lucide-react";
import beforeImage from "@/assets/comparison-before.jpg";
import afterImage from "@/assets/comparison-after.jpg";

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
          {/* Before Image (Blurry) */}
          <div className="absolute inset-0">
            <img 
              src={beforeImage} 
              alt="Before - blurry raster image"
              className="w-full h-full object-cover"
            />
            {/* Label overlay */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="flex items-center gap-2 text-white/90 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <ImageOff className="w-4 h-4" />
                <span className="font-semibold text-sm">{currentExample.beforeLabel}</span>
              </div>
              <p className="text-xs text-white/70 mt-1 bg-black/30 px-2 py-0.5 rounded">Pixelated • Blurry edges</p>
            </div>
          </div>

          {/* After Image (Clear Vector) - Clipped */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img 
              src={afterImage} 
              alt="After - crisp vector image"
              className="w-full h-full object-cover"
            />
            {/* Label overlay */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="flex items-center gap-2 text-white bg-primary/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Sparkles className="w-4 h-4" />
                <span className="font-bold text-sm">{currentExample.afterLabel}</span>
              </div>
              <p className="text-xs text-white/90 mt-1 bg-primary/70 px-2 py-0.5 rounded">Crystal clear • Print-ready</p>
            </div>
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 shadow-lg"
            style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
          >
            {/* Glowing line effect */}
            <div className="absolute inset-0 w-2 -translate-x-1/2 bg-white/50 blur-sm" />
            
            {/* Handle circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xl ring-4 ring-white/30">
              <div className="flex gap-0.5 text-primary">
                <ChevronLeft className="w-4 h-4" />
                <ChevronRight className="w-4 h-4" />
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