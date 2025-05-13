'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from "./ui/Button";
import BookingModal from "./modals/BookingModal";

const navigationLinks = [
  { 
    name: 'Accueil',
    href: '#hero'
  },
  { 
    name: 'Services',
    href: '#services'
  },
  { 
    name: 'Flotte',
    href: '#fleet'
  },
  { 
    name: 'À propos',
    href: '#about'
  },
  { 
    name: 'Témoignages',
    href: '#testimonials'
  },
  { 
    name: 'Contact',
    href: '#contact'
  }
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    const getActiveSectionFromHash = () => {
      const hash = window.location.hash.replace('#', '') || 'hero';
      return hash;
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // If at the very top, activate hero section
      if (window.scrollY === 0) {
        setActiveSection('hero');
        return;
      }

      // Get all section elements
      const sectionElements = navigationLinks.map(link => ({
        id: link.href.replace('#', ''),
        element: document.getElementById(link.href.replace('#', ''))
      })).filter(item => item.element);

      // Calculate which section takes up the most space in the viewport
      let maxVisibleSection = null;
      let maxVisibleHeight = 0;

      sectionElements.forEach(({ id, element }) => {
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

        if (visibleHeight > maxVisibleHeight) {
          maxVisibleHeight = visibleHeight;
          maxVisibleSection = id;
        }

        // Debug information
        console.log(`Section ${id}:`, {
          top: rect.top,
          bottom: rect.bottom,
          visibleHeight,
          windowHeight: window.innerHeight,
          scrollY: window.scrollY
        });
      });

      if (maxVisibleSection) {
        console.log('Setting active section to:', maxVisibleSection);
        setActiveSection(maxVisibleSection);
      }
    };

    // Handle initial load
    setActiveSection(getActiveSectionFromHash());

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Add hash change listener
    const handleHashChange = () => {
      const newSection = getActiveSectionFromHash();
      setActiveSection(newSection);
    };
    window.addEventListener('hashchange', handleHashChange);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleToggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleToggleMenu();
    }
  };

  // Handle smooth scrolling
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(targetId);
    }
  };

  const handleOpenBookingModal = () => {
    setIsBookingModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed w-full z-50 top-0 start-0 transition-all duration-300 ease-in-out
        ${scrolled 
          ? 'bg-black/95 shadow-lg' 
          : 'bg-black/95'}`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-4 md:px-2 md:py-2">
        <Link 
          href="/" 
          className="flex items-center space-x-3 rtl:space-x-reverse"
          aria-label="Go to homepage"
        >
          <span className={`text-2xl font-bold transition-colors duration-300 ${
            scrolled ? 'text-white' : 'text-white'
          }`}>
            Gabsen
          </span>
        </Link>

        {/* Hamburger button */}
        <button
          type="button"
          className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden
            hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              scrolled ? 'text-white' : 'text-white'
            }`}
          aria-controls="navbar-sticky"
          aria-expanded={isMobileMenuOpen}
          onClick={handleToggleMenu}
          onKeyDown={handleKeyDown}
        >
          <span className="sr-only">Open main menu</span>
          <svg 
            className="w-5 h-5" 
            aria-hidden="true" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 17 14"
          >
            <path 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Navigation links */}
        <div
          className={`transform transition-all duration-300 ease-in-out w-full md:flex md:items-center md:w-auto
            ${isMobileMenuOpen ? 'block' : 'hidden md:block'}
            ${scrolled 
              ? 'bg-black/95 backdrop-blur-md md:bg-transparent' 
              : 'bg-black/95 backdrop-blur-md md:bg-transparent'}
            ${isMobileMenuOpen ? 'mt-4' : ''}`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col md:flex-row md:items-center md:space-x-1 rtl:space-x-reverse">
            {navigationLinks.map((link) => (
              <li key={link.href} className="relative group w-full md:w-auto">
                <Link
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`flex items-center w-full px-6 py-4 text-[15px] font-medium transition-colors
                    ${activeSection === link.href.replace('#', '')
                      ? 'text-[#F37802] font-semibold' 
                      : 'text-white hover:text-[#F37802]'}`}
                  aria-current={activeSection === link.href.replace('#', '') ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="md:ml-6 mt-2 md:mt-0 flex flex-col md:flex-row items-center px-6 pb-6 md:p-0">
            <Button 
              variant="primary" 
              size="md" 
              className="w-full md:w-auto"
              onClick={handleOpenBookingModal}
            >
              Réserver
            </Button>
          </div>
        </div>
      </div>
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </nav>
  );
};

export default Navbar; 