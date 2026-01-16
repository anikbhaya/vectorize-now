import { Maximize2, Palette, Layers, Zap, Shield, RefreshCw, Hand, Ban } from "lucide-react";

const benefits = [
  {
    icon: <Hand className="w-6 h-6" />,
    title: "100% Manual Tracing",
    description: "Every curve, line, and anchor point is carefully placed by our skilled designers. No auto-trace shortcuts.",
    highlight: true
  },
  {
    icon: <Ban className="w-6 h-6" />,
    title: "No AI or Auto-Trace",
    description: "We never use automated tools. Manual tracing ensures cleaner paths, fewer anchor points, and perfect results.",
    highlight: true
  },
  {
    icon: <Maximize2 className="w-6 h-6" />,
    title: "Infinite Scalability",
    description: "Vector files can be scaled to any size without losing quality - perfect for billboards or business cards."
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Easy Color Editing",
    description: "Change colors instantly in any design software. Perfect for brand variations and merchandise."
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Professional Quality",
    description: "Hand-crafted by experienced designers using industry-standard tools like Adobe Illustrator."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Fast Turnaround",
    description: "Get your vector files in as little as 12 hours. Rush delivery available for urgent projects."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "100% Satisfaction",
    description: "Not happy with the result? We'll revise until you're completely satisfied, guaranteed."
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: "Multiple Formats",
    description: "Receive your files in AI, EPS, SVG, PDF, and PNG formats for maximum compatibility."
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-accent/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-bold mb-4">
            <Hand className="w-4 h-4" />
            <span>Handcrafted Quality</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Manual Tracing Matters
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Auto-trace tools create messy, bloated files. Our manual approach delivers 
            clean, professional vectors that designers actually want to work with.
          </p>
        </div>

        {/* Manual vs Auto-trace Comparison Banner */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
              <h4 className="font-bold text-destructive mb-3 flex items-center gap-2">
                <Ban className="w-5 h-5" />
                Auto-Trace Problems
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✗</span>
                  Hundreds of unnecessary anchor points
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✗</span>
                  Jagged edges and imperfect curves
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✗</span>
                  Bloated file sizes that slow down software
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive">✗</span>
                  Difficult to edit or modify later
                </li>
              </ul>
            </div>
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl">
              <h4 className="font-bold text-primary mb-3 flex items-center gap-2">
                <Hand className="w-5 h-5" />
                Our Manual Approach
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  Minimal, optimized anchor points
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  Smooth, perfect bezier curves
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  Clean, lightweight files
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span>
                  Easy to edit and scale infinitely
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`bg-card rounded-2xl border p-6 hover:shadow-lg transition-all hover:-translate-y-1 ${
                benefit.highlight 
                  ? "border-primary/50 bg-primary/5" 
                  : "border-border"
              }`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                benefit.highlight 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-primary/10 text-primary"
              }`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
