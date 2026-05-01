import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

export default function HotelList() {
  const [searchParams] = useSearchParams();
  const cityQuery = searchParams.get('city');
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      let q = collection(db, "hotels");
      if (cityQuery) q = query(q, where("city", "==", cityQuery));
      const snapshot = await getDocs(q);
      setHotels(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchHotels();
  }, [cityQuery]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1 text-gray-800">Hôtels : {cityQuery || "Toutes les villes"}</h2>
      <p className="text-gray-500 mb-6 border-b pb-4">Trouvez et réservez l'hôtel parfait</p>

      <div className="flex flex-col gap-6">
        {hotels.length === 0 ? (
          <p className="text-gray-500 text-center py-10">Aucun hôtel trouvé pour cette recherche.</p>
        ) : (
          hotels.map(hotel => (
            <Link 
              to={`/hotel/${hotel.id}`} 
              key={hotel.id} 
              className="flex bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
            >
              
              {/* Image */}
              <div className="w-64 h-48 flex-shrink-0 overflow-hidden">
                <img 
                  src={hotel.images?.[0] || 'https://via.placeholder.com/400'} 
                  alt={hotel.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Contenu Milieu */}
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#0071c2] group-hover:underline">{hotel.name}</h3>
                  <p className="text-gray-600 mt-1 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                    {hotel.city}
                  </p>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                    {hotel.description || "Hôtel idéalement situé, offrant un confort moderne et un service irréprochable pour votre séjour."}
                  </p>
                </div>
              </div>

              {/* Contenu Droite (Prix et Note) */}
              <div className="w-48 p-4 flex flex-col items-end justify-between border-l border-gray-100">
                
                {/* Badge Note (Style Booking) */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#003580]">Exceptionnel</span>
                  <div className="bg-[#003580] text-white text-sm font-bold px-2 py-1 rounded">
                    {hotel.rating || '9.2'}
                  </div>
                </div>

                {/* Prix */}
                <div className="text-right">
                  <p className="text-xs text-gray-500 line-through">250€</p>
                  <p className="text-2xl font-bold text-gray-800">{hotel.price}€</p>
                  <p className="text-sm text-gray-500">Prix pour 1 nuit</p>
                  <div className="mt-2 bg-[#0071c2] text-white text-center py-2 px-4 rounded font-bold group-hover:bg-[#00487a] transition-colors">
                    Voir la disponibilité
                  </div>
                </div>
              </div>

            </Link>
          ))
        )}
      </div>
    </div>
  );
}