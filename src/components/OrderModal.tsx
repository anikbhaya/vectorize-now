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
import { CheckCircle, CreditCard, Mail, Copy, ArrowRight, Check } from "lucide-react";
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
  const { toast } = useToast();

  const paymentEmail = "payment@vectortracepro.com";
  
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
    setStep(3);
    toast({
      title: "Order Submitted!",
      description: "Check your email for confirmation and payment instructions.",
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

            <div className="bg-primary/5 rounded-xl border border-primary/20 p-4">
              <h4 className="font-medium text-foreground mb-2">Important:</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  Include your order email ({email}) in the payment note
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  We'll start working on your order once payment is confirmed
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  Vector files will be delivered to: {email}
                </li>
              </ul>
            </div>

            <Button variant="hero" className="w-full" size="lg" onClick={handleConfirmOrder}>
              I've Completed Payment
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
