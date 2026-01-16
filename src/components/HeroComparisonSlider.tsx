import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ComparisonExample {
  tier: string;
  tierLabel: string;
  price: string;
  beforeDescription: string;
  afterDescription: string;
}

const examples: ComparisonExample[] = [
  {
    tier: "basic",
    tierLabel: "Basic",
    price: "$5",
    beforeDescription: "Simple JPG logo",
    afterDescription: "Clean vector, infinitely scalable"
  },
  {
    tier: "standard",
    tierLabel: "Standard",
    price: "$12",
    beforeDescription: "Detailed logo with text",
    afterDescription: "Organized layers, editable paths"
  },
  {
    tier: "premium",
    tierLabel: "Premium",
    price: "$25",
    beforeDescription: "Complex illustration",
    afterDescription: "High-fidelity with gradients"
  },
  {
    tier: "enterprise",
    tierLabel: "Enterprise",
    price: "$50",
    beforeDescription: "Photo-realistic artwork",
    afterDescription: "Print-ready quality"
  }
];

const HeroComparisonSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = true;
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
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + examples.length) % examples.length);
    setSliderPosition(50);
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
      <div className="flex items-center justify-center gap-1 mb-4">
        {examples.map((example, index) => (
          <button
            key={example.tier}
            onClick={() => {
              setCurrentIndex(index);
              setSliderPosition(50);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              index === currentIndex
                ? tierColors[example.tier]
                : "bg-muted text-muted-foreground hover:bg-muted/80"
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
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-card/90 border border-border hover:bg-accent transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-foreground" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-card/90 border border-border hover:bg-accent transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-foreground" />
        </button>

        {/* Image Comparison Container */}
        <div
          ref={containerRef}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none bg-card border border-border shadow-2xl"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          {/* Before Image (Raster) */}
          <div className="absolute inset-0 bg-muted">
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="text-center">
                <div className="w-28 h-28 md:w-36 md:h-36 mx-auto mb-3 rounded-xl bg-background/50 border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-24 md:h-24">
                    {/* Simulated pixelated/raster image */}
                    <rect x="10" y="10" width="80" height="80" fill="hsl(var(--muted-foreground))" opacity="0.3" />
                    <rect x="20" y="20" width="60" height="60" fill="hsl(var(--muted-foreground))" opacity="0.4" />
                    <rect x="30" y="30" width="40" height="40" fill="hsl(var(--muted-foreground))" opacity="0.5" />
                    {/* Pixelation effect */}
                    {[...Array(8)].map((_, i) => (
                      [...Array(8)].map((_, j) => (
                        <rect
                          key={`${i}-${j}`}
                          x={15 + i * 9}
                          y={15 + j * 9}
                          width="8"
                          height="8"
                          fill="hsl(var(--muted-foreground))"
                          opacity={0.15 + ((i + j) % 3) * 0.1}
                        />
                      ))
                    ))}
                  </svg>
                </div>
                <p className="text-muted-foreground font-medium text-sm">Before (Raster)</p>
                <p className="text-xs text-muted-foreground/70 mt-1">{currentExample.beforeDescription}</p>
              </div>
            </div>
          </div>

          {/* After Image (Vector) - Clipped */}
          <div
            className="absolute inset-0 bg-card"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="text-center">
                <div className="w-28 h-28 md:w-36 md:h-36 mx-auto mb-3 rounded-xl bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-24 md:h-24">
                    {/* Clean vector representation */}
                    <circle cx="50" cy="50" r="35" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
                    <polygon points="50,25 65,45 58,45 58,70 42,70 42,45 35,45" fill="hsl(var(--primary))" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.5" />
                  </svg>
                </div>
                <p className="text-primary font-medium text-sm">After (Vector)</p>
                <p className="text-xs text-muted-foreground mt-1">{currentExample.afterDescription}</p>
              </div>
            </div>
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize z-10"
            style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <div className="flex gap-0.5">
                <ChevronLeft className="w-4 h-4 text-primary-foreground" />
                <ChevronRight className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-3 left-3 px-2 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium text-muted-foreground">
            Before
          </div>
          <div className="absolute top-3 right-3 px-2 py-1 bg-primary/90 backdrop-blur-sm rounded-full text-xs font-medium text-primary-foreground">
            After
          </div>

          {/* Price Badge */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${tierColors[currentExample.tier]}`}>
              {currentExample.tierLabel} - {currentExample.price}
            </span>
          </div>
        </div>

        {/* Instructions */}
        <p className="text-center text-xs text-muted-foreground mt-3">
          ← Drag slider to compare →
        </p>
      </div>
    </div>
  );
};

export default HeroComparisonSlider;