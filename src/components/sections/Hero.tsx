import Image from "next/image";
import Button from "../ui/Button";

interface HeroProps {
  onBookNow: () => void;
}

const Hero = ({ onBookNow }: HeroProps) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1606611013016-969c19ba27bb?auto=format&fit=crop&q=80"
          alt="Voiture VTC professionnelle Mercedes"
          fill
          className="object-cover brightness-40"
          priority
          sizes="100vw"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-white text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-poppins">
          Votre Chauffeur Privé Accessible à Dakar
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200">
          Service de chauffeur privé 24h/24 - Qualité professionnelle à prix accessible pour tous vos déplacements
        </p>
        <Button
          onClick={onBookNow}
          variant="primary"
          size="lg"
          className="transform hover:scale-105"
          aria-label="Réserver maintenant"
        >
          Réserver maintenant
        </Button>
      </div>
    </section>
  );
};

export default Hero; 