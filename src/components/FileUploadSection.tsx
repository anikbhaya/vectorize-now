import { useState, useCallback } from "react";
import { Upload, Image, X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnalysisResult {
  complexity: "simple" | "moderate" | "complex" | "highly-complex";
  estimatedColors: number;
  hasGradients: boolean;
  hasDetails: boolean;
  basePrice: number;
  turnaroundHours: number;
}

const FileUploadSection = ({ onQuoteGenerated }: { onQuoteGenerated: (result: AnalysisResult, file: File) => void }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeImage = useCallback(async (imageFile: File): Promise<AnalysisResult> => {
    // Simulate AI analysis with realistic delays
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Analyze based on file size, dimensions simulation, and name patterns
    const fileSize = imageFile.size;
    const fileName = imageFile.name.toLowerCase();
    
    let complexity: AnalysisResult["complexity"] = "simple";
    let estimatedColors = 2;
    let hasGradients = false;
    let hasDetails = false;
    
    // Complexity scoring based on multiple factors
    let complexityScore = 0;
    
    // File size indicates detail level
    if (fileSize > 1000000) complexityScore += 4; // >1MB
    else if (fileSize > 500000) complexityScore += 3; // 500KB-1MB
    else if (fileSize > 200000) complexityScore += 2; // 200KB-500KB
    else if (fileSize > 50000) complexityScore += 1; // 50KB-200KB
    
    // Check filename patterns for complexity hints
    if (fileName.includes("photo") || fileName.includes("realistic")) complexityScore += 3;
    if (fileName.includes("illustration") || fileName.includes("mascot")) complexityScore += 2;
    if (fileName.includes("complex") || fileName.includes("detailed")) complexityScore += 2;
    if (fileName.includes("logo") || fileName.includes("icon")) complexityScore -= 1;
    if (fileName.includes("simple") || fileName.includes("basic")) complexityScore -= 2;
    
    // Determine complexity level
    if (complexityScore >= 5) {
      complexity = "highly-complex";
      estimatedColors = Math.floor(Math.random() * 10) + 12; // 12-22 colors
      hasGradients = true;
      hasDetails = true;
    } else if (complexityScore >= 3) {
      complexity = "complex";
      estimatedColors = Math.floor(Math.random() * 5) + 6; // 6-10 colors
      hasGradients = Math.random() > 0.4;
      hasDetails = true;
    } else if (complexityScore >= 1) {
      complexity = "moderate";
      estimatedColors = Math.floor(Math.random() * 3) + 3; // 3-5 colors
      hasGradients = Math.random() > 0.7;
      hasDetails = Math.random() > 0.5;
    } else {
      complexity = "simple";
      estimatedColors = Math.floor(Math.random() * 2) + 1; // 1-2 colors
      hasGradients = false;
      hasDetails = false;
    }
    
    // Pricing based on complexity (starting from $5)
    const basePrices = {
      "simple": 5,
      "moderate": 12,
      "complex": 25,
      "highly-complex": 50
    };
    
    const turnaroundHours = {
      "simple": 24,
      "moderate": 18,
      "complex": 24,
      "highly-complex": 48
    };
    
    return {
      complexity,
      estimatedColors,
      hasGradients,
      hasDetails,
      basePrice: basePrices[complexity],
      turnaroundHours: turnaroundHours[complexity]
    };
  }, []);

  const handleFile = useCallback(async (selectedFile: File) => {
    setError(null);
    
    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/bmp", "image/webp"];
    if (!validTypes.includes(selectedFile.type)) {
      setError("Please upload a valid image file (JPG, PNG, GIF, BMP, or WebP)");
      return;
    }
    
    // Validate file size (max 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }
    
    setFile(selectedFile);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
    
    // Analyze image
    setIsAnalyzing(true);
    try {
      const result = await analyzeImage(selectedFile);
      onQuoteGenerated(result, selectedFile);
    } catch (err) {
      setError("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  }, [analyzeImage, onQuoteGenerated]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  }, [handleFile]);

  const clearFile = useCallback(() => {
    setFile(null);
    setPreview(null);
    setError(null);
  }, []);

  return (
    <section id="upload" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Upload Your Image for Instant Quote
          </h2>
          <p className="text-lg text-muted-foreground">
            Drop your JPG, PNG, or other image file below. Our AI will analyze it and give you 
            an accurate price in seconds.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {!file ? (
            <div
              className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-200 ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-accent/30"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="w-10 h-10 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-medium text-foreground mb-1">
                    Drag & drop your image here
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {["JPG", "PNG", "GIF", "BMP", "WebP"].map((format) => (
                    <span
                      key={format}
                      className="px-3 py-1 bg-muted/30 rounded-full text-xs font-medium text-muted-foreground"
                    >
                      {format}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-background rounded-2xl border border-border p-6">
              <div className="flex items-start gap-4">
                {preview && (
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Image className="w-4 h-4 text-primary" />
                    <p className="font-medium text-foreground truncate">{file.name}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                  
                  {isAnalyzing ? (
                    <div className="flex items-center gap-2 text-primary">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm font-medium">Analyzing image...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-primary">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Analysis complete</span>
                    </div>
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearFile}
                  className="flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 flex items-center gap-2 text-destructive bg-destructive/10 rounded-lg p-4">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FileUploadSection;
