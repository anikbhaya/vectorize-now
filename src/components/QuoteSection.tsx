import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Palette, Layers, Zap, Star, FileText, Send } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface AnalysisResult {
  complexity: "simple" | "moderate" | "complex" | "highly-complex";
  estimatedColors: number;
  hasGradients: boolean;
  hasDetails: boolean;
  basePrice: number;
  turnaroundHours: number;
  imageCount?: number;
}

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
}

const addOns: AddOn[] = [
  {
    id: "rush",
    name: "Rush Delivery",
    description: "Get your files in half the time",
    price: 5,
    icon: <Zap className="w-5 h-5" />
  },
  {
    id: "multiFormat",
    name: "Multiple Formats",
    description: "AI, EPS, SVG, PDF + PNG files",
    price: 3,
    icon: <FileText className="w-5 h-5" />
  },
  {
    id: "colorVariants",
    name: "Color Variants",
    description: "Get 3 color variations of your design",
    price: 8,
    icon: <Palette className="w-5 h-5" />
  },
  {
    id: "sourceLayers",
    name: "Organized Layers",
    description: "Properly named and organized layers",
    price: 3,
    icon: <Layers className="w-5 h-5" />
  },
  {
    id: "priority",
    name: "Priority Support",
    description: "Direct communication with designer",
    price: 5,
    icon: <Star className="w-5 h-5" />
  }
];

const QuoteSection = ({ 
  analysisResult, 
  file, 
  onPlaceOrder 
}: { 
  analysisResult: AnalysisResult | null; 
  file: File | null;
  onPlaceOrder: (total: number, selectedAddOns: string[]) => void;
}) => {
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [imageCount, setImageCount] = useState(1);

  const complexityLabels = {
    "simple": "Basic",
    "moderate": "Standard",
    "complex": "Premium",
    "highly-complex": "Enterprise"
  };

  const complexityColors = {
    "simple": "bg-accent text-accent-foreground",
    "moderate": "bg-primary/20 text-primary",
    "complex": "bg-chart-4/20 text-chart-4",
    "highly-complex": "bg-destructive/20 text-destructive"
  };

  // Bulk discount calculation
  const getBulkDiscount = (count: number): { percentage: number; label: string } => {
    if (count >= 10) return { percentage: 20, label: "20% Bulk Discount (10+ images)" };
    if (count >= 5) return { percentage: 10, label: "10% Bulk Discount (5+ images)" };
    return { percentage: 0, label: "" };
  };

  const bulkDiscount = getBulkDiscount(imageCount);

  const total = useMemo(() => {
    if (!analysisResult) return 0;
    const addOnTotal = selectedAddOns.reduce((sum, addOnId) => {
      const addOn = addOns.find(a => a.id === addOnId);
      return sum + (addOn?.price || 0);
    }, 0);
    const subtotal = (analysisResult.basePrice * imageCount) + addOnTotal;
    const discountAmount = subtotal * (bulkDiscount.percentage / 100);
    return Math.round((subtotal - discountAmount) * 100) / 100;
  }, [analysisResult, selectedAddOns, imageCount, bulkDiscount.percentage]);

  const subtotal = useMemo(() => {
    if (!analysisResult) return 0;
    const addOnTotal = selectedAddOns.reduce((sum, addOnId) => {
      const addOn = addOns.find(a => a.id === addOnId);
      return sum + (addOn?.price || 0);
    }, 0);
    return (analysisResult.basePrice * imageCount) + addOnTotal;
  }, [analysisResult, selectedAddOns, imageCount]);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => 
      prev.includes(id) 
        ? prev.filter(a => a !== id)
        : [...prev, id]
    );
  };

  if (!analysisResult) return null;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your Personalized Quote
            </h2>
            <p className="text-lg text-muted-foreground">
              Based on our AI analysis, here's what you'll get
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Analysis Results */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="text-xl font-bold text-foreground mb-6">Image Analysis</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Complexity</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${complexityColors[analysisResult.complexity]}`}>
                    {complexityLabels[analysisResult.complexity]}
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Estimated Colors</span>
                  <span className="font-medium text-foreground">{analysisResult.estimatedColors} colors</span>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Contains Gradients</span>
                  <span className="font-medium text-foreground">{analysisResult.hasGradients ? "Yes" : "No"}</span>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Fine Details</span>
                  <span className="font-medium text-foreground">{analysisResult.hasDetails ? "Yes" : "No"}</span>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Turnaround Time
                  </span>
                  <span className="font-medium text-foreground">
                    {selectedAddOns.includes("rush") 
                      ? `${Math.ceil(analysisResult.turnaroundHours / 2)} hours`
                      : `${analysisResult.turnaroundHours} hours`
                    }
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-accent/30 rounded-xl">
                <h4 className="font-medium text-foreground mb-2">What You'll Receive:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    High-quality vector file (AI/EPS)
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Scalable to any size
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Unlimited revisions
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    Email delivery
                  </li>
                </ul>
              </div>
            </div>

            {/* Pricing & Add-ons */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <h3 className="text-xl font-bold text-foreground mb-6">Customize Your Order</h3>
              
              <div className="mb-6 p-4 bg-primary/5 rounded-xl border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Base Price</span>
                  <span className="text-2xl font-bold text-primary">${analysisResult.basePrice}</span>
                </div>
                <p className="text-sm text-muted-foreground">For {complexityLabels[analysisResult.complexity].toLowerCase()} vector tracing</p>
              </div>

              {/* Bulk Order Section */}
              <div className="mb-6 p-4 bg-accent/30 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-foreground">Number of Images</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setImageCount(Math.max(1, imageCount - 1))}
                      className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-bold text-foreground">{imageCount}</span>
                    <button
                      onClick={() => setImageCount(imageCount + 1)}
                      className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center hover:bg-muted transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {bulkDiscount.percentage > 0 && (
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium">{bulkDiscount.label}</span>
                  </div>
                )}
                
                {imageCount < 5 && (
                  <p className="text-xs text-muted-foreground mt-2">
                    💡 Order 5+ images for 10% off, or 10+ for 20% off!
                  </p>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-sm font-medium text-foreground">Optional Add-ons:</p>
                {addOns.map((addOn) => (
                  <div
                    key={addOn.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedAddOns.includes(addOn.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => toggleAddOn(addOn.id)}
                  >
                    <Checkbox
                      checked={selectedAddOns.includes(addOn.id)}
                      onCheckedChange={() => toggleAddOn(addOn.id)}
                    />
                    <div className="text-primary">{addOn.icon}</div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{addOn.name}</p>
                      <p className="text-sm text-muted-foreground">{addOn.description}</p>
                    </div>
                    <span className="font-medium text-foreground">+${addOn.price}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-6">
                {bulkDiscount.percentage > 0 && (
                  <div className="flex items-center justify-between mb-2 text-muted-foreground">
                    <span>Subtotal ({imageCount} images)</span>
                    <span className="line-through">${subtotal}</span>
                  </div>
                )}
                {bulkDiscount.percentage > 0 && (
                  <div className="flex items-center justify-between mb-2 text-primary">
                    <span>Discount ({bulkDiscount.percentage}% off)</span>
                    <span>-${(subtotal - total).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg font-medium text-foreground">Total</span>
                  <span className="text-3xl font-bold text-primary">${total}</span>
                </div>
                
                <Button 
                  variant="hero" 
                  size="xl" 
                  className="w-full"
                  onClick={() => onPlaceOrder(total, selectedAddOns)}
                >
                  <Send className="w-5 h-5 mr-2" />
                  Place Order - ${total}
                </Button>
                
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Secure payment • 100% satisfaction guaranteed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
