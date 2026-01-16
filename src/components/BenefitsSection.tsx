import { Maximize2, Palette, Layers, Zap, Shield, RefreshCw } from "lucide-react";

const benefits = [
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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Vector Tracing?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your pixelated images into crisp, professional vector graphics 
            that work everywhere.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
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
