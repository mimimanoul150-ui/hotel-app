import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

export default function HotelList() {
  const [searchParams] = useSearchParams();
  const cityQuery = searchParams.get('city') || '';
  const [hotels, setHotels] = useState([]);
  const [allHotels, setAllHotels] = useState([]); // On stocke tous les hôtels ici

  useEffect(() => {
    const fetchHotels = async () => {
      // 1. On télécharge TOUS les hôtels de la base de données
      const snapshot = await getDocs(collection(db, "hotels"));
      const hotelsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      setAllHotels(hotelsData);

      // 2. Si on a cliqué sur une destination (ex: Paris), on filtre
      if (cityQuery.trim() !== '') {
        // On compare en ignorant les majuscules/minuscules
        const filtered = hotelsData.filter(hotel => 
          hotel.city?.toLowerCase() === cityQuery.toLowerCase()
        );
        setHotels(filtered);
      } else {
        // Sinon on affiche tout
        setHotels(hotelsData);
      }
    };
    fetchHotels();
  }, [cityQuery]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1 text-gray-800">
        Hôtels : {cityQuery ? cityQuery : "Toutes les destinations"}
      </h2>
      
      {/* Message d'erreur si la recherche est infructueuse */}
      {hotels.length === 0 && cityQuery && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
          <p className="text-yellow-700 font-medium">Aucun hôtel trouvé pour "{cityQuery}".</p>
          <p className="text-yellow-600 text-sm mt-1">Voici tous les hôtels disponibles :</p>
        </div>
      )}

      <div className="flex flex-col gap-6 mt-4">
        {/* On affiche la liste filtrée, OU allHotels si la recherche a échoué */}
        {(hotels.length === 0 && cityQuery ? allHotels : hotels).map(hotel => (
          <Link 
            to={`/hotel/${hotel.id}`} 
            key={hotel.id} 
            className="flex bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
          >
            
            {/* Image */}
            <div className="w-64 h-48 flex-shrink-0 overflow-hidden">
              <img 
                src={hotel.images?.[0] || 'https://via.placeholder.com/400'} 
                alt={hotel.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Contenu Milieu */}
            <div className="flex-1 p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#0071c2] group-hover:underline">{hotel.name}</h3>
                <p className="text-gray-600 mt-1 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                  {hotel.city}
                </p>
                <p className="text-gray-500 text-sm mt-3 line-clamp-2">
                  {hotel.description || "Hôtel idéalement situé, offrant un confort moderne et un service irréprochable pour votre séjour."}
                </p>
              </div>
            </div>

            {/* Contenu Droite (Prix et Note) */}
            <div className="w-52 p-5 flex flex-col items-end justify-between border-l border-gray-100">
              
              {/* Badge Note */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#003580]">Exceptionnel</span>
                <div className="bg-[#003580] text-white text-sm font-bold px-2 py-1 rounded">
                  {hotel.rating || '9.2'}
                </div>
              </div>

              {/* Prix */}
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">{hotel.price}€</p>
                <p className="text-sm text-gray-500 mb-3">Prix pour 1 nuit</p>
                <div className="bg-[#0071c2] text-white text-center py-2 px-4 rounded font-bold group-hover:bg-[#00487a] transition-colors">
                  Voir la disponibilité
                </div>
              </div>
            </div>

          </Link>
        ))}
      </div>
    </div>
  );
}