import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "./FaqAccordion";

const faqItems = [
  {
    id: "discount",
    question: "What is the annual billing discount?",
    answer: "Our annual billing plans offer a 20% savings discount compared to standard monthly pricing. The annual price displayed is computed dynamically on the server based on the active currency and tier.",
  },
  {
    id: "currency",
    question: "How do I switch currencies?",
    answer: "You can toggle between USD, EUR, and INR using the currency switcher at the top of the pricing matrix. Formatting is localized using standard browser internationalization metrics.",
  },
  {
    id: "isolation",
    question: "How is rendering performance optimized?",
    answer: "Each interactive feature is structured as a leaf node in the DOM. Contexts and client-side states (e.g. active showcase cards, currency choices) are isolated to their specific features, keeping static elements like Hero and Footer completely free of client re-renders.",
  },
  {
    id: "bento",
    question: "How does the Bento Showcase adapt?",
    answer: "On desktop devices (>= 1024px), features are rendered in a Bento grid. On smaller devices (< 1024px), the layout transitions into an interactive vertical accordion. Active states are preserved across resizes.",
  },
];

export const FaqSection: React.FC = () => {
  return (
    <section 
      id="faq" 
      className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-t border-card-border/30"
      aria-labelledby="faq-title"
    >
      <SectionHeading
        badge="FAQS"
        title="Frequently Asked Questions"
        subtitle="Common inquiries about our pricing plans, technical stack, and responsive grid layouts."
        id="faq-title"
      />
      <FaqAccordion items={faqItems} />
    </section>
  );
};
export default FaqSection;
