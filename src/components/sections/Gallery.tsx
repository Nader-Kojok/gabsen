'use client';

import { useState } from 'react';
import Image from 'next/image';

type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  category: string;
};

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/gallery/luxury-sedan-1.jpg",
    alt: "Luxury Sedan Interior",
    category: "Sedans"
  },
  {
    id: 2,
    src: "/gallery/suv-1.jpg",
    alt: "Premium SUV Exterior",
    category: "SUVs"
  },
  {
    id: 3,
    src: "/gallery/wedding-1.jpg",
    alt: "Wedding Transportation",
    category: "Events"
  },
  {
    id: 4,
    src: "/gallery/corporate-1.jpg",
    alt: "Corporate Travel",
    category: "Corporate"
  },
  {
    id: 5,
    src: "/gallery/luxury-sedan-2.jpg",
    alt: "Executive Sedan",
    category: "Sedans"
  },
  {
    id: 6,
    src: "/gallery/suv-2.jpg",
    alt: "Luxury SUV Interior",
    category: "SUVs"
  },
  {
    id: 7,
    src: "/gallery/wedding-2.jpg",
    alt: "Wedding Limousine",
    category: "Events"
  },
  {
    id: 8,
    src: "/gallery/airport-1.jpg",
    alt: "Airport Transfer",
    category: "Corporate"
  }
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(galleryImages.map(img => img.category)))];

  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Gallery</h2>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
              aria-label={`Filter by ${category}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map(image => (
            <div
              key={image.id}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => handleImageClick(image)}
              onKeyDown={(e) => e.key === 'Enter' && handleImageClick(image)}
              tabIndex={0}
              role="button"
              aria-label={`View ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
            onClick={handleClose}
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <div className="relative max-w-7xl mx-auto p-4">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                aria-label="Close lightbox"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="relative aspect-video w-full max-h-[80vh]">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
              <p className="text-white text-center mt-4">{selectedImage.alt}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery; 