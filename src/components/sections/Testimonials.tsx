'use client';

import { useState } from 'react';
import Image from 'next/image';

type TestimonialType = {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
};

const testimonials: TestimonialType[] = [
  {
    id: 1,
    name: "Amadou Diop",
    role: "Entrepreneur",
    quote: "Un service de qualité à des prix très raisonnables. Les chauffeurs sont professionnels et les véhicules impeccables.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "Fatou Ndiaye",
    role: "Professionnelle",
    quote: "Je les utilise régulièrement pour mes déplacements professionnels. Service fiable et tarifs transparents, je recommande !",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Moussa Diallo",
    role: "Voyageur d'affaires",
    quote: "Le meilleur rapport qualité-prix à Dakar. Confort et ponctualité garantis, sans les prix exorbitants habituels.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#ff8b3c15_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins">
            <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              Ce Que Disent Nos Clients
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-600 to-orange-400 mx-auto mt-4 rounded-full" />
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            onKeyDown={(e) => handleKeyDown(e, handlePrevious)}
            className="absolute -left-16 top-[calc(50%+1rem)] -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg 
                     hover:bg-orange-50 transition-colors border border-orange-100"
            aria-label="Témoignage précédent"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            onKeyDown={(e) => handleKeyDown(e, handleNext)}
            className="absolute -right-16 top-[calc(50%+1rem)] -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-lg 
                     hover:bg-orange-50 transition-colors border border-orange-100"
            aria-label="Témoignage suivant"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Testimonial Card */}
          <div className="bg-white rounded-xl shadow-xl p-8 transition-all duration-500 hover:shadow-2xl border border-orange-100">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-24 h-24 mb-6">
                <Image
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  fill
                  className="rounded-full object-cover border-4 border-orange-100"
                />
              </div>
              <blockquote className="text-lg text-gray-700 italic mb-6 max-w-2xl mx-auto">
                &ldquo;{testimonials[currentIndex].quote}&rdquo;
              </blockquote>
              <div className="text-gray-900 font-semibold text-lg max-w-xs">{testimonials[currentIndex].name}</div>
              <div className="text-orange-600 max-w-xs">{testimonials[currentIndex].role}</div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-orange-600 to-orange-400 w-8' 
                    : 'bg-orange-200 w-2 hover:bg-orange-300'
                }`}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 