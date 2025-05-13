import Image from "next/image";

const vehicles = [
  {
    name: "Mercedes Classe S",
    description: "Confort et élégance à prix maîtrisé",
    image: "https://images.unsplash.com/photo-1549925862-990ac5b34e35?auto=format&fit=crop&q=80",
    features: ["Prix transparent", "Climatisation", "Sièges confortables", "Eau offerte"]
  },
  {
    name: "BMW Série 7",
    description: "Qualité et confort accessibles à tous",
    image: "https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?auto=format&fit=crop&q=80",
    features: ["Tarifs abordables", "Climatisation", "Grand confort", "Eau offerte"]
  },
  {
    name: "Tesla Model S",
    description: "Transport écologique au meilleur rapport qualité-prix",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80",
    features: ["Écologique", "Confort moderne", "Prix accessible", "Wifi gratuit"]
  }
];

const Fleet = () => {
  return (
    <section id="fleet" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#ff8b3c15_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins">
            <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              Notre Flotte Pour Tous
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-600 to-orange-400 mx-auto mt-4 rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl 
                       transition-all duration-300 group hover:border-orange-400/50 border-2 border-transparent"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-600 transition-colors duration-300">
                  {vehicle.name}
                </h3>
                <p className="text-gray-600 mb-4">{vehicle.description}</p>
                
                <ul className="space-y-2">
                  {vehicle.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <svg
                        className="w-4 h-4 mr-2 text-orange-500"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Fleet; 