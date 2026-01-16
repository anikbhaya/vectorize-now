import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What file formats do you accept?",
    answer: "We accept most common image formats including JPG, JPEG, PNG, GIF, BMP, TIFF, and WebP. For best results, upload the highest quality image you have available."
  },
  {
    question: "What file formats will I receive?",
    answer: "By default, you'll receive AI and EPS files. With our Multiple Formats add-on, you also get SVG, PDF, and high-resolution PNG files. All files are optimized for both print and web use."
  },
  {
    question: "How long does the vector conversion take?",
    answer: "Turnaround time depends on complexity: Simple images take 12 hours, moderate 18 hours, complex 24 hours, and highly complex 48 hours. Rush delivery (50% faster) is available as an add-on."
  },
  {
    question: "What if I'm not satisfied with the result?",
    answer: "We offer unlimited revisions until you're completely satisfied. Simply reply to your delivery email with specific feedback, and we'll make the changes promptly at no extra cost."
  },
  {
    question: "Can you vectorize photos or complex images?",
    answer: "Yes! We specialize in all types of image conversion, from simple logos to complex photographs. Our AI accurately assesses complexity and provides an appropriate quote."
  },
  {
    question: "How does the AI pricing work?",
    answer: "Our AI analyzes your image for factors like number of colors, gradients, fine details, and overall complexity. This ensures you get an accurate, fair price based on the actual work required."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept PayPal and bank transfers. Payment details are provided after you submit your order. Work begins once payment is confirmed."
  },
  {
    question: "Do you offer bulk discounts?",
    answer: "Yes! For orders of 5+ images, contact us at support@vectortracepro.com for custom pricing. We also offer monthly packages for businesses with ongoing needs."
  }
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers. If you can't find what you're looking for, 
            feel free to contact us.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
