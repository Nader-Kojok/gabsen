"use client";

import { useState } from "react";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Fleet from "@/components/sections/Fleet";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import BookingModal from "@/components/modals/BookingModal";
import Testimonials from "@/components/sections/Testimonials";
import FloatingBookButton from "@/components/FloatingBookButton";

export default function Home() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleOpenBookingModal = () => setIsBookingModalOpen(true);
  const handleCloseBookingModal = () => setIsBookingModalOpen(false);

  return (
    <main className="relative">
      <Hero onBookNow={handleOpenBookingModal} />
      <Services />
      <Fleet />
      <About />
      <Testimonials />
      <Contact />
      <FloatingBookButton onClick={handleOpenBookingModal} />
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={handleCloseBookingModal} 
      />
    </main>
  );
}
