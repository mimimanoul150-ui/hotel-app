import { Link } from 'react-router-dom';

export default function HotelCard({ hotel }) {
  return (
    <Link 
      to={`/hotel/${hotel.id}`} 
      className="flex flex-col md:flex-row bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
    >
      
      {/* Section Image avec Badge "Offre Spéciale" */}
      <div className="relative w-full md:w-80 h-64 flex-shrink-0 overflow-hidden">
        <img 
          src={hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800'} 
          alt={hotel.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badge conditionnel */}
        {hotel.price < 150 && (
          <span className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
            Offre Spéciale
          </span>
        )}
      </div>

      {/* Section Contenu Principal */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          {/* Titre et Note (Alignés à droite et à gauche) */}
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-2xl font-bold text-gray-800 group-hover:text-[#0071c2] transition-colors">
              {hotel.name}
            </h3>
            {/* Note ronde style Booking */}
                        {/* Affichage des étoiles et note */}
            <div className="flex flex-col items-end flex-shrink-0 ml-4">
              <span className="text-sm text-yellow-500 drop-shadow">
                {"⭐".repeat(hotel.stars || 4)}
              </span>
              <span className="text-xs text-gray-500 mt-1">Note : {hotel.rating || '8.5'}/10</span>
            </div>
          </div>
          
          {/* Localisation */}
          <p className="text-gray-500 mb-3 flex items-center gap-1">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            Centre-ville, {hotel.city}
          </p>

          {/* Équipements simulés */}
          <div className="flex flex-wrap gap-4 text-gray-400 text-xs mb-4 border-b pb-4">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0" /></svg> 
              Wi-Fi
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg> 
              Piscine
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> 
              Parking
            </span>
          </div>
        </div>

        {/* Bas de la carte : Prix et Bouton d'action */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-green-600 font-bold text-sm flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Annulation gratuite
            </p>
            <p className="text-gray-400 text-xs mt-1">Vous pouvez annuler plus tard</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">Prix pour 1 nuit</p>
            <p className="text-2xl font-extrabold text-gray-800">{hotel.price}€</p>
            <div className="mt-2 bg-[#0071c2] group-hover:bg-[#00487a] text-white text-center py-2.5 px-6 rounded-lg font-bold transition-colors shadow-sm">
              Voir disponibilité
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}