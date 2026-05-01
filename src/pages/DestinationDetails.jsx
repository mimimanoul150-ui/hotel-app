import { useParams, Link } from 'react-router-dom';

const destinationsData = {
  "Paris": {
    title: "Découvrez Paris",
    tagline: "La Ville Lumière vous attend",
    description: "Paris, capitale de l'amour et de la mode, est une ville qui se découvre à chaque coin de rue. Flânez sur les berges de la Seine, admirez l'architecture haussmannienne et régalez-vous dans ses bistrots typiques.",
    photos: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1000",
      "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?q=80&w=1000",
      "https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?q=80&w=1000",
      "https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?q=80&w=1000"
    ],
    highlights: ["Tour Eiffel", "Musée du Louvre", "Montmartre", "Château de Versailles"],
    bestTime: "Avril à Juin / Septembre à Octobre"
  },
  "Marrakech": {
    title: "Plongez au cœur de Marrakech",
    tagline: "Entre désert et traditions",
    description: "Marrakech est une explosion de couleurs, d'odeurs et de sons. Perdez-vous dans les ruelles de la Médina, marchandez au souk, détendez-vous dans un riad traditionnel et savourez un thé à la menthe.",
    photos: [
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?q=80&w=1000",
      "https://images.unsplash.com/photo-1545041797-0a19db8c0267?q=80&w=1000",
      "https://images.unsplash.com/photo-1560703650-ef3e0f254ae0?q=80&w=1000",
      "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?q=80&w=1000",
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?q=80&w=1000"
    ],
    highlights: ["Jemaa el-Fna", "Jardin Majorelle", "Palais de la Bahia", "Désert d'Agafay"],
    bestTime: "Mars à Mai / Septembre à Novembre"
  },
  "New York": {
    title: "Explorez New York",
    tagline: "La ville qui ne dort jamais",
    description: "De Times Square à Central Park, New York est une mégalopole bouillonnante. Assistez à un spectacle à Broadway, traversez le Brooklyn Bridge et mangez la meilleure pizza du monde.",
    photos: [
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000",
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=1000",
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?q=80&w=1000",
      "https://images.unsplash.com/photo-1522083165195-3424ed129620?q=80&w=1000",
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000"
    ],
    highlights: ["Statue de la Liberté", "Central Park", "Empire State Building", "Brooklyn Bridge"],
    bestTime: "Avril à Juin / Septembre à Novembre"
  },
  "Bali": {
    title: "Évadez-vous à Bali",
    tagline: "L'île des Dieux",
    description: "Bali est un paradis tropical offrant un mélange parfait de spiritualité, de nature luxuriante et de plages de rêve. Que vous cherchiez le surf à Uluwatu, les rizières d'Ubud ou la vie nocturne de Seminyak, Bali a tout pour plaire.",
    photos: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=1000",
      "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1000",
      "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=1000",
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000"
    ],
    highlights: ["Rizières de Tegallalang", "Temple d'Uluwatu", "Plage de Nusa Dua", "Forêt des singes"],
    bestTime: "Avril à Octobre (Saison sèche)"
  },
  "Dubai": {
    title: "Vivez le luxe à Dubai",
    tagline: "La ville des records absolus",
    description: "Dubai est une ville futuriste sortie du désert. Avec ses gratte-ciels vertigineux et ses centres commerciaux gigantesques, c'est la destination idéale pour le luxe et le shopping.",
    photos: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1000",
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=1000",
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1000",
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000"
    ],
    highlights: ["Burj Khalifa", "Palm Jumeirah", "Dubai Mall", "Désert Safari"],
    bestTime: "Novembre à Mars"
  },
  "Rome": {
    title: "Voyagez dans le temps à Rome",
    tagline: "La Ville Éternelle",
    description: "Marchez sur les pas des gladiateurs au Colisée, jetez une pièce dans la fontaine de Trevi et dégustez les meilleures pâtes de votre vie. Rome est un musée à ciel ouvert.",
    photos: [
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1000",
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?q=80&w=1000",
      "https://images.unsplash.com/photo-1555992828-ca4dbe41d294?q=80&w=1000",
      "https://images.unsplash.com/photo-1531572753322-ad063cecc140?q=80&w=1000",
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1000"
    ],
    highlights: ["Colisée", "Vatican", "Fontaine de Trevi", "Forum Romain"],
    bestTime: "Avril à Juin / Septembre à Octobre"
  }
};

export default function DestinationDetails() {
  const { name } = useParams();
  const destination = destinationsData[name];

  if (!destination) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-gray-800">Destination non trouvée</h2>
        <Link to="/" className="text-[#0071c2] font-bold mt-4 inline-block hover:underline">Retour à l'accueil</Link>
      </div>
    );
  }

  return (
    <div className="-mt-[60px]">
      <div className="relative h-[400px] bg-cover bg-center flex items-end" style={{ backgroundImage: `url(${destination.photos[0]})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="relative z-10 p-10 text-white w-full max-w-6xl mx-auto">
          <h1 className="text-5xl font-extrabold drop-shadow-lg mb-2">{destination.title}</h1>
          <p className="text-xl text-gray-200 drop-shadow">{destination.tagline}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[350px] rounded-xl overflow-hidden mb-12 shadow-sm">
          <div className="col-span-2 row-span-2">
            <img src={destination.photos[1]} alt="Destination" className="w-full h-full object-cover hover:opacity-90 transition cursor-pointer" />
          </div>
          <div className="col-span-1 row-span-1 border-l border-white">
            <img src={destination.photos[2]} alt="Destination" className="w-full h-full object-cover hover:opacity-90 transition cursor-pointer" />
          </div>
          <div className="col-span-1 row-span-1 border-l border-white">
            <img src={destination.photos[3]} alt="Destination" className="w-full h-full object-cover hover:opacity-90 transition cursor-pointer" />
          </div>
          <div className="col-span-2 row-span-1 border-l border-t border-white relative group">
            <img src={destination.photos[4]} alt="Destination" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-lg cursor-pointer group-hover:bg-black/60 transition">
              Voir plus de photos
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">À propos de {name}</h2>
            <p className="text-gray-600 leading-relaxed text-base mb-8">{destination.description}</p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Les incontournables</h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {destination.highlights.map((item, index) => (
                <div key={index} className="bg-[#f5f5f5] rounded-lg p-4 flex items-center gap-3">
                  <div className="bg-[#0071c2] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="font-medium text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 h-fit sticky top-24 shadow-sm">
            <div className="mb-6 pb-6 border-b">
              <p className="text-sm font-bold text-gray-500 uppercase mb-1">Meilleure période pour visiter</p>
              <p className="text-lg font-bold text-gray-800">{destination.bestTime}</p>
            </div>
            
            <Link 
              to={`/hotels?city=${name}`}
              className="block w-full text-center bg-[#0071c2] hover:bg-[#00487a] text-white font-bold py-4 rounded-lg text-lg transition-colors shadow-sm"
            >
              Voir les hôtels à {name}
            </Link>
            <p className="text-center text-sm text-gray-500 mt-3">Comparez les prix et réservez</p>
          </div>
        </div>
      </div>
    </div>
  );
}