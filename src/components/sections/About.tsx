import Image from "next/image";
import { FaStar, FaShieldAlt, FaClock, FaHandshake } from "react-icons/fa";

const features = [
  {
    icon: FaStar,
    title: "Qualité Accessible",
    description: "Un service de qualité à des tarifs transparents et abordables"
  },
  {
    icon: FaShieldAlt,
    title: "Sécurité Assurée",
    description: "Chauffeurs expérimentés et véhicules parfaitement entretenus"
  },
  {
    icon: FaClock,
    title: "Fiabilité",
    description: "Ponctualité garantie et disponibilité selon vos besoins"
  },
  {
    icon: FaHandshake,
    title: "À Votre Écoute",
    description: "Une équipe attentive et réactive pour vous accompagner"
  }
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#ff8b3c15_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1600320254374-ce2d293c324e?auto=format&fit=crop&q=80"
              alt="Notre service de transport à Dakar"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div>
            <div className="text-left mb-8">
              <h2 className="text-3xl md:text-4xl font-bold font-poppins">
                <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                  Notre Mission
                </span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-600 to-orange-400 mt-4 rounded-full" />
            </div>

            <p className="text-gray-600 mb-6">
              GabSen est né d&apos;un constat simple : le transport de qualité devrait être accessible à tous. 
              Notre vision repose sur la conviction que confort et tarifs abordables ne sont pas incompatibles.
            </p>
            <p className="text-gray-600 mb-8">
              Nous avons créé un service qui allie le meilleur des deux mondes : des véhicules confortables, 
              des chauffeurs professionnels et un service client attentif, le tout à des prix transparents et accessibles. 
              C&apos;est notre engagement quotidien pour une mobilité de qualité pour tous à Dakar.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-start p-4 rounded-lg hover:bg-orange-50 transition-colors duration-300"
                >
                  <div className="bg-gradient-to-br from-orange-600 to-orange-400 rounded-full p-3 mr-4 shadow-lg">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-gray-800">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 