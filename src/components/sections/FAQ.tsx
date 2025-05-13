'use client';

import { useState } from 'react';

type FAQItem = {
  id: number;
  question: string;
  answer: string;
  category: string;
};

const faqData: FAQItem[] = [
  {
    id: 1,
    category: "Booking",
    question: "How far in advance should I book my transportation?",
    answer: "We recommend booking at least 24-48 hours in advance to ensure availability. For special events or peak seasons, earlier booking is advised. However, we also accommodate last-minute requests based on availability."
  },
  {
    id: 2,
    category: "Booking",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, and digital payments including PayPal. Corporate clients can also arrange for invoicing with prior approval."
  },
  {
    id: 3,
    category: "Services",
    question: "What types of events do you cater to?",
    answer: "We cater to a wide range of events including corporate transfers, airport pickups, weddings, proms, special occasions, and luxury tours. Our fleet can accommodate both individual and group transportation needs."
  },
  {
    id: 4,
    category: "Services",
    question: "Do you provide chauffeur services for multiple days?",
    answer: "Yes, we offer multi-day chauffeur services for events, tours, or business trips. Custom packages can be arranged to suit your specific requirements and schedule."
  },
  {
    id: 5,
    category: "Policies",
    question: "What is your cancellation policy?",
    answer: "Cancellations made 24 hours or more before the scheduled service are fully refundable. Cancellations within 24 hours may be subject to a cancellation fee. Please contact us for specific details."
  }
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const handleToggle = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle(id);
    }
  };

  const categories = Array.from(new Set(faqData.map(item => item.category)));

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        
        <div className="max-w-3xl mx-auto">
          {categories.map(category => (
            <div key={category} className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">{category}</h3>
              
              <div className="space-y-4">
                {faqData
                  .filter(item => item.category === category)
                  .map(item => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => handleToggle(item.id)}
                        onKeyDown={(e) => handleKeyDown(e, item.id)}
                        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                        aria-expanded={openItems.includes(item.id)}
                        aria-controls={`faq-answer-${item.id}`}
                      >
                        <span className="font-medium text-gray-900">{item.question}</span>
                        <svg
                          className={`w-5 h-5 transition-transform duration-200 ${
                            openItems.includes(item.id) ? 'transform rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                      
                      <div
                        id={`faq-answer-${item.id}`}
                        className={`transition-all duration-200 ${
                          openItems.includes(item.id)
                            ? 'max-h-48 opacity-100'
                            : 'max-h-0 opacity-0'
                        } overflow-hidden`}
                      >
                        <p className="p-4 text-gray-600 border-t border-gray-200">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ; 