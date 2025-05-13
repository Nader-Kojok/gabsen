import { FaPlane, FaCar, FaClock, FaUserTie } from "react-icons/fa";

const services = [
  {
    icon: FaPlane,
    title: "Transfert Aéroport",
    description: "Service de transport confortable et fiable entre l'aéroport et votre destination à tarifs transparents",
  },
  {
    icon: FaCar,
    title: "Location avec Chauffeur",
    description: "Chauffeur professionnel à votre disposition pour tous vos déplacements en ville à prix accessible",
  },
  {
    icon: FaClock,
    title: "Service 24/7",
    description: "Disponible jour et nuit, 7 jours sur 7 pour tous vos besoins de transport sans supplément nocturne",
  },
  {
    icon: FaUserTie,
    title: "Service Business",
    description: "Transport professionnel à tarif abordable pour vos rendez-vous d'affaires et déplacements professionnels",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#ff8b3c15_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins">
            <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              Nos Services Essentiels
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-600 to-orange-400 mx-auto mt-4 rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 
                       flex flex-col items-center text-center group
                       hover:border-orange-400/50 border-2 border-transparent"
            >
              <div className="bg-gradient-to-br from-orange-600 to-orange-400 text-white p-4 rounded-full mb-6
                            group-hover:scale-110 transform transition-transform duration-300 shadow-lg">
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4 group-hover:text-orange-600 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 