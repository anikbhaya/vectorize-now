import { Button } from "@/components/ui/button";
import { ArrowDown, CheckCircle, Hand } from "lucide-react";
import heroImage from "@/assets/hero-vector-comparison.jpg";

const HeroSection = () => {
  const scrollToUpload = () => {
    const element = document.getElementById("upload");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Manual Tracing Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-bold mb-6">
              <Hand className="w-4 h-4" />
              <span>100% Hand-Traced by Expert Designers</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              <span className="text-primary">Manual</span> Vector Tracing{" "}
              <span className="block">By Real Artists</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-xl mx-auto lg:mx-0">
              No auto-trace. No AI shortcuts. Just skilled designers manually recreating 
              your logo or artwork with pixel-perfect precision.
            </p>
            
            <div className="bg-accent/50 border border-accent rounded-lg p-3 mb-8 max-w-xl mx-auto lg:mx-0">
              <p className="text-sm text-foreground font-medium flex items-center gap-2">
                <span className="text-lg">✋</span>
                Every vector is hand-crafted — we never use automated tracing tools
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button variant="hero" size="xl" onClick={scrollToUpload}>
                Get Instant Quote
                <ArrowDown className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="heroOutline" size="xl" onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}>
                How It Works
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Manual Hand-Tracing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">No AI or Auto-Trace</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">100% Satisfaction</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Vector tracing transformation - before and after comparison"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-card rounded-xl shadow-xl p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <div>
                  <p className="font-bold text-foreground">1000+</p>
                  <p className="text-sm text-muted-foreground">Happy Clients</p>
                </div>
              </div>
            </div>

            {/* Manual Work Badge */}
            <div className="absolute -top-4 -right-4 bg-card rounded-xl shadow-xl p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Hand className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Hand-Made</p>
                  <p className="text-sm text-muted-foreground">No Auto-Trace</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
