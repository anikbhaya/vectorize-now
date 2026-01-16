import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, CreditCard, Mail, Copy, ArrowRight, Check, Upload, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  selectedAddOns: string[];
  file: File | null;
}

const OrderModal = ({ isOpen, onClose, total, selectedAddOns, file }: OrderModalProps) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"screenshot" | "transaction">("transaction");
  const { toast } = useToast();

  const paymentEmail = "payment@vectortracepro.com";

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      if (uploadedFile.type.startsWith("image/")) {
        setPaymentScreenshot(uploadedFile);
        toast({
          title: "Screenshot uploaded!",
          description: "Payment proof has been attached to your order",
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPG, PNG, etc.)",
          variant: "destructive",
        });
      }
    }
  };
  
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(paymentEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Email copied!",
      description: "Payment email has been copied to clipboard",
    });
  };

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      setStep(2);
    }
  };

  const handleConfirmOrder = () => {
    if (!transactionId && !paymentScreenshot) {
      toast({
        title: "Payment verification required",
        description: "Please provide a transaction ID or upload a payment screenshot",
        variant: "destructive",
      });
      return;
    }
    setStep(3);
    toast({
      title: "Order Submitted!",
      description: "We'll verify your payment and start working on your order.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {step === 1 && "Complete Your Order"}
            {step === 2 && "Payment Instructions"}
            {step === 3 && "Order Confirmed!"}
          </DialogTitle>
          <DialogDescription>
            {step === 1 && "Enter your details to proceed with your vector tracing order"}
            {step === 2 && "Follow these steps to complete your payment"}
            {step === 3 && "Thank you for your order!"}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <form onSubmit={handleSubmitDetails} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Your vector files will be delivered to this email
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Special Instructions (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any specific requirements for your vector file..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            <div className="bg-accent/30 rounded-lg p-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground">Order Total:</span>
                <span className="text-2xl font-bold text-primary">${total}</span>
              </div>
            </div>

            <Button type="submit" variant="hero" className="w-full" size="lg">
              Continue to Payment
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        )}

        {step === 2 && (
          <div className="space-y-6 mt-4">
            <div className="bg-card rounded-xl border border-border p-4">
              <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Payment Options
              </h4>
              
              <div className="space-y-4">
                <div className="p-4 bg-accent/30 rounded-lg">
                  <p className="font-medium text-foreground mb-2">PayPal Payment</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Send ${total} USD to our PayPal account:
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-background px-3 py-2 rounded text-sm font-mono">
                      {paymentEmail}
                    </code>
                    <Button variant="outline" size="sm" onClick={handleCopyEmail}>
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-muted/20 rounded-lg">
                  <p className="font-medium text-foreground mb-2">Bank Transfer</p>
                  <p className="text-sm text-muted-foreground">
                    Contact us at support@vectortracepro.com for bank transfer details.
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Verification Section */}
            <div className="bg-card rounded-xl border border-border p-4">
              <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Verify Your Payment
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Submit payment proof to speed up order processing
              </p>
              
              <div className="flex gap-2 mb-4">
                <Button
                  variant={paymentMethod === "transaction" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPaymentMethod("transaction")}
                  className="flex-1"
                >
                  Transaction ID
                </Button>
                <Button
                  variant={paymentMethod === "screenshot" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPaymentMethod("screenshot")}
                  className="flex-1"
                >
                  Upload Screenshot
                </Button>
              </div>

              {paymentMethod === "transaction" ? (
                <div className="space-y-2">
                  <Label htmlFor="transactionId">Transaction ID / Reference Number</Label>
                  <Input
                    id="transactionId"
                    placeholder="e.g., TXN123456789 or PayPal Reference"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the transaction ID from your payment confirmation
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label>Payment Screenshot</Label>
                  <div 
                    className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                      paymentScreenshot 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => document.getElementById("screenshot-upload")?.click()}
                  >
                    <input
                      id="screenshot-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleScreenshotUpload}
                    />
                    {paymentScreenshot ? (
                      <div className="flex items-center justify-center gap-2 text-primary">
                        <Image className="w-5 h-5" />
                        <span className="font-medium">{paymentScreenshot.name}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Upload className="w-8 h-8" />
                        <span className="text-sm">Click to upload payment screenshot</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Upload a screenshot of your payment confirmation
                  </p>
                </div>
              )}
            </div>

            <div className="bg-primary/5 rounded-xl border border-primary/20 p-4">
              <h4 className="font-medium text-foreground mb-2">Important:</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  Include your order email ({email}) in the payment note
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  We'll verify your payment and start working immediately
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  Vector files will be delivered to: {email}
                </li>
              </ul>
            </div>

            <Button 
              variant="hero" 
              className="w-full" 
              size="lg" 
              onClick={handleConfirmOrder}
              disabled={!transactionId && !paymentScreenshot}
            >
              Submit Order with Payment Proof
              <CheckCircle className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center py-6">
            <div className="w-20 h-20 rounded-full bg-accent mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-accent-foreground" />
            </div>
            
            <h3 className="text-xl font-bold text-foreground mb-2">
              Thank You, {name}!
            </h3>
            
            <p className="text-muted-foreground mb-6">
              We've received your order and will begin working on your vector file 
              as soon as we confirm your payment.
            </p>

            <div className="bg-card rounded-xl border border-border p-4 text-left mb-6">
              <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                What's Next?
              </h4>
              <ol className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">1</span>
                  <span>You'll receive a confirmation email shortly</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">2</span>
                  <span>Our designer will start your vector conversion</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">3</span>
                  <span>Completed files will be emailed to {email}</span>
                </li>
              </ol>
            </div>

            <Button variant="outline" onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;
