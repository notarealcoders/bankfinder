import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const FAQAccordion = () => {
  const faqs = [
    {
      question: "Can we find bank using IFSC code?",
      answer:
        'Yes, you can find the bank and its branch using the IFSC code. The IFSC code is an 11-character code where the first four characters represent the bank, the fifth character is a default "0" left for future use, and the last six characters represent the branch.',
    },
    {
      question: "How to check branch name by IFSC code?",
      answer:
        "You can check the branch name using the IFSC code by entering it into a branch locator tool available on banking websites or financial service websites. The last six characters of the IFSC code represent the branch.",
    },
    {
      question: "How do I know if my IFSC code is correct?",
      answer:
        "You can verify the correctness of an IFSC code by using online tools provided by banking or financial service websites. You can also check your bank's official website, cheque book, or account statement.",
    },
    {
      question: "How many digits is an IFSC code?",
      answer:
        'An IFSC code is 11 characters long. The first four characters are alphabetic and represent the bank, the fifth character is a default "0", and the last six characters, which could be alphanumeric, represent the branch.',
    },
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto mt-6">
      <CardContent className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <HelpCircle className="w-5 h-5 mt-1 text-muted-foreground" />
          <h3 className="font-semibold text-lg">Frequently Asked Questions</h3>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default FAQAccordion;
