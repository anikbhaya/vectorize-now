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
    beforeDescription: "Simple JPG logo with 1-2 colors",
    afterDescription: "Clean vector with sharp edges, infinitely scalable"
  },
  {
    tier: "standard",
    tierLabel: "Standard",
    price: "$12",
    beforeDescription: "Detailed logo with 3-5 colors and text",
    afterDescription: "Full vector with organized layers, editable text paths"
  },
  {
    tier: "premium",
    tierLabel: "Premium",
    price: "$25",
    beforeDescription: "Complex illustration with fine details",
    afterDescription: "High-fidelity vector with gradient support, all details preserved"
  },
  {
    tier: "enterprise",
    tierLabel: "Enterprise",
    price: "$50",
    beforeDescription: "Photo-realistic artwork with complex gradients",
    afterDescription: "Professional vector with mesh gradients, print-ready quality"
  }
];

const ComparisonSlider = () => {
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
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            See the Difference
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Drag the slider to compare before and after results for each pricing tier
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Tier Navigation */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {examples.map((example, index) => (
              <button
                key={example.tier}
                onClick={() => {
                  setCurrentIndex(index);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
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
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-card border border-border hover:bg-accent transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              
              <div className="text-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${tierColors[currentExample.tier]}`}>
                  {currentExample.tierLabel} - {currentExample.price}
                </span>
              </div>
              
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-card border border-border hover:bg-accent transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Image Comparison Container */}
            <div
              ref={containerRef}
              className="relative aspect-[16/10] rounded-2xl overflow-hidden cursor-ew-resize select-none bg-card border border-border"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
            >
              {/* Before Image (Raster) */}
              <div className="absolute inset-0 bg-muted">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-xl bg-background/50 border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-20 h-20">
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
                              opacity={Math.random() * 0.3 + 0.1}
                            />
                          ))
                        ))}
                      </svg>
                    </div>
                    <p className="text-muted-foreground font-medium">Before (Raster)</p>
                    <p className="text-sm text-muted-foreground/70 mt-1">{currentExample.beforeDescription}</p>
                  </div>
                </div>
              </div>

              {/* After Image (Vector) - Clipped */}
              <div
                className="absolute inset-0 bg-card"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-xl bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-20 h-20">
                        {/* Clean vector representation */}
                        <circle cx="50" cy="50" r="35" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
                        <polygon points="50,25 65,45 58,45 58,70 42,70 42,45 35,45" fill="hsl(var(--primary))" />
                        <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.5" />
                      </svg>
                    </div>
                    <p className="text-primary font-medium">After (Vector)</p>
                    <p className="text-sm text-muted-foreground mt-1">{currentExample.afterDescription}</p>
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
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded-full text-sm font-medium text-muted-foreground">
                Before
              </div>
              <div className="absolute top-4 right-4 px-3 py-1.5 bg-primary/90 backdrop-blur-sm rounded-full text-sm font-medium text-primary-foreground">
                After
              </div>
            </div>

            {/* Instructions */}
            <p className="text-center text-sm text-muted-foreground mt-4">
              ← Drag the slider to compare →
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSlider;