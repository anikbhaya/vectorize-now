import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const pricingTiers = [
  {
    name: "Basic",
    description: "Simple logos, icons, text-based designs",
    price: 5,
    features: [
      "1-2 colors",
      "Clean outlines only",
      "24-hour delivery",
      "AI & EPS format",
      "1 revision"
    ],
    popular: false
  },
  {
    name: "Standard",
    description: "Detailed logos, badges, emblems",
    price: 12,
    features: [
      "3-5 colors",
      "Moderate detail",
      "18-hour delivery",
      "AI, EPS & SVG format",
      "2 revisions"
    ],
    popular: true
  },
  {
    name: "Premium",
    description: "Complex illustrations, mascots",
    price: 25,
    features: [
      "6-10 colors",
      "High detail & curves",
      "24-hour delivery",
      "All formats included",
      "3 revisions"
    ],
    popular: false
  },
  {
    name: "Enterprise",
    description: "Photo-realistic, intricate artwork",
    price: 50,
    features: [
      "Unlimited colors",
      "Gradients & effects",
      "48-hour delivery",
      "All formats + source",
      "Unlimited revisions"
    ],
    popular: false
  }
];

const PricingSection = () => {
  const scrollToUpload = () => {
    document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI automatically determines the complexity of your image to give you 
            an accurate quote. Here's our pricing guide:
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border p-6 transition-all hover:shadow-lg ${
                tier.popular
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border bg-background"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-primary">${tier.price}</span>
                  <span className="text-muted-foreground">/image</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                variant={tier.popular ? "hero" : "outline"}
                className="w-full"
                onClick={scrollToUpload}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Not sure which tier you need?{" "}
            <button
              onClick={scrollToUpload}
              className="text-primary hover:underline font-medium"
            >
              Upload your image for a free quote
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
