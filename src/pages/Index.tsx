import { useState, useCallback } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FileUploadSection from "@/components/FileUploadSection";
import QuoteSection from "@/components/QuoteSection";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";
import ComparisonSlider from "@/components/ComparisonSlider";

interface AnalysisResult {
  complexity: "simple" | "moderate" | "complex" | "highly-complex";
  estimatedColors: number;
  hasGradients: boolean;
  hasDetails: boolean;
  basePrice: number;
  turnaroundHours: number;
}

const Index = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const handleQuoteGenerated = useCallback((result: AnalysisResult, file: File) => {
    setAnalysisResult(result);
    setUploadedFile(file);
    
    // Scroll to quote section after a brief delay
    setTimeout(() => {
      const quoteSection = document.getElementById("quote-section");
      if (quoteSection) {
        quoteSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  }, []);

  const handlePlaceOrder = useCallback((total: number, addOns: string[]) => {
    setOrderTotal(total);
    setSelectedAddOns(addOns);
    setIsOrderModalOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FileUploadSection onQuoteGenerated={handleQuoteGenerated} />
        
        {analysisResult && (
          <div id="quote-section">
            <QuoteSection 
              analysisResult={analysisResult} 
              file={uploadedFile}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>
        )}
        
        <HowItWorks />
        <ComparisonSlider />
        <BenefitsSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        total={orderTotal}
        selectedAddOns={selectedAddOns}
        file={uploadedFile}
      />
    </div>
  );
};

export default Index;
