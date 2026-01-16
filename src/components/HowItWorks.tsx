import { Upload, Cpu, CreditCard, Mail } from "lucide-react";

const steps = [
  {
    icon: <Upload className="w-8 h-8" />,
    title: "Upload Your Image",
    description: "Drag and drop your JPG, PNG, or other raster image file. We accept logos, artwork, photos, and more."
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "AI Analyzes & Quotes",
    description: "Our intelligent system analyzes your image complexity and provides an instant, accurate price quote."
  },
  {
    icon: <CreditCard className="w-8 h-8" />,
    title: "Customize & Pay",
    description: "Add optional extras like rush delivery or multiple formats. Complete payment via PayPal or bank transfer."
  },
  {
    icon: <Mail className="w-8 h-8" />,
    title: "Receive Your Vectors",
    description: "Get your high-quality vector files delivered directly to your email within the promised timeframe."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting your images converted to vectors is simple. Follow these 4 easy steps 
            and have your files ready in hours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-card rounded-2xl border border-border p-6 h-full hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                  {step.icon}
                </div>
                
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-border" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
