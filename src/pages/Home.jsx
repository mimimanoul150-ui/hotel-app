import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

// --- COMPOSANT BARRE DE RECHERCHE ---
function SearchBar({ availableCities }) {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [showGuests, setShowGuests] = useState(false);
  const guestRef = useRef();

  const today = new Date().toISOString().split('T')[0];
  const [checkOut, setCheckOut] = useState(''); 
  const [checkIn, setCheckIn] = useState('');   

  const minCheckIn = checkOut 
    ? new Date(new Date(checkOut).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] 
    : today;

  const handleCheckOutChange = (e) => {
    const newDate = e.target.value;
    setCheckOut(newDate);
    if (checkIn && newDate >= checkIn) setCheckIn('');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (guestRef.current && !guestRef.current.contains(e.target)) setShowGuests(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!destination.trim()) return alert("Veuillez sélectionner une destination");
    navigate(`/hotels?city=${destination}`);
  };

  return (
    <div className="relative w-full z-50">
      <form onSubmit={handleSearch} className="bg-white p-2 rounded-xl shadow-2xl border border-gray-200 flex flex-col lg:flex-row gap-2">
        
        {/* NOUVEAU CHAMP DESTINATION (Menu déroulant) */}
        <div className="flex-1 flex items-center bg-[#f5f5f5] hover:bg-gray-100 rounded-lg px-4 py-3 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          
          <select 
            value={destination} 
            onChange={(e) => setDestination(e.target.value)}
            className="w-full outline-none text-gray-800 font-medium bg-transparent cursor-pointer appearance-none"
          >
            <option value="" disabled selected>Destination...</option>
            {availableCities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
          
          {/* Petite flèche pour indiquer que c'est un menu déroulant */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 ml-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>

        <div className="flex-1 flex items-center bg-[#f5f5f5] hover:bg-gray-100 rounded-lg px-2 py-1 transition-colors">
          <div className="flex-1 flex flex-col items-center border-r border-gray-300 px-2">
            <label className="block text-[10px] font-bold text-gray-500 uppercase mt-1">Départ</label>
            <input type="date" className="w-full outline-none text-xs text-gray-800 font-medium bg-transparent text-center cursor-pointer pt-1 pb-2 [color-scheme:light]" min={today} value={checkOut} onChange={handleCheckOutChange} />
          </div>
          <div className="flex-1 flex flex-col items-center px-2">
            <label className="block text-[10px] font-bold text-gray-500 uppercase mt-1">Arrivée</label>
            <input type="date" className="w-full outline-none text-xs text-gray-800 font-medium bg-transparent text-center cursor-pointer pt-1 pb-2 [color-scheme:light]" min={minCheckIn} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
          </div>
        </div>

        <div className="w-full lg:w-[350px] bg-[#f5f5f5] hover:bg-gray-100 rounded-lg px-4 py-3 relative transition-colors" ref={guestRef}>
          <button type="button" onClick={() => setShowGuests(!showGuests)} className="w-full text-left outline-none text-gray-800 text-sm font-medium bg-transparent flex justify-between items-center">
            <span>{adults} adultes · {children} enfant{children > 1 ? 's' : ''} · {rooms} chambre{rooms > 1 ? 's' : ''}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          
          {showGuests && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border p-5 z-[100]">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center gap-2 border-r border-gray-100 pr-2">
                  <span className="font-bold text-gray-800 text-sm">Adultes</span>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} className="w-7 h-7 border-2 border-[#0071c2] text-[#0071c2] rounded-full font-bold text-sm flex items-center justify-center hover:bg-[#0071c2] hover:text-white transition-colors">-</button>
                    <span className="w-6 text-center font-bold text-black text-lg">{adults}</span>
                    <button type="button" onClick={() => setAdults(adults + 1)} className="w-7 h-7 border-2 border-[#0071c2] text-[#0071c2] rounded-full font-bold text-sm flex items-center justify-center hover:bg-[#0071c2] hover:text-white transition-colors">+</button>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2 border-r border-gray-100 px-2">
                  <span className="font-bold text-gray-800 text-sm">Enfants</span>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => setChildren(Math.max(0, children - 1))} className="w-7 h-7 border-2 border-[#0071c2] text-[#0071c2] rounded-full font-bold text-sm flex items-center justify-center hover:bg-[#0071c2] hover:text-white transition-colors">-</button>
                    <span className="w-6 text-center font-bold text-black text-lg">{children}</span>
                    <button type="button" onClick={() => setChildren(children + 1)} className="w-7 h-7 border-2 border-[#0071c2] text-[#0071c2] rounded-full font-bold text-sm flex items-center justify-center hover:bg-[#0071c2] hover:text-white transition-colors">+</button>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2 pl-2">
                  <span className="font-bold text-gray-800 text-sm">Chambres</span>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => setRooms(Math.max(1, rooms - 1))} className="w-7 h-7 border-2 border-[#0071c2] text-[#0071c2] rounded-full font-bold text-sm flex items-center justify-center hover:bg-[#0071c2] hover:text-white transition-colors">-</button>
                    <span className="w-6 text-center font-bold text-black text-lg">{rooms}</span>
                    <button type="button" onClick={() => setRooms(rooms + 1)} className="w-7 h-7 border-2 border-[#0071c2] text-[#0071c2] rounded-full font-bold text-sm flex items-center justify-center hover:bg-[#0071c2] hover:text-white transition-colors">+</button>
                  </div>
                </div>
              </div>
              <button type="button" onClick={() => setShowGuests(false)} className="w-full bg-[#0071c2] hover:bg-[#00487a] text-white py-2.5 rounded-lg mt-5 font-bold transition-colors">Terminé</button>
            </div>
          )}
        </div>

        <button type="submit" className="bg-[#0071c2] hover:bg-[#00487a] text-white font-bold px-8 rounded-lg transition-colors shadow-sm">Rechercher</button>
      </form>
    </div>
  );
}

// --- COMPOSANT CARTE DESTINATION ---
function DestinationCard({ name, image, characteristics, startingPrice, stars }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/hotels?city=${name}`)} className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-md h-72 transform hover:scale-[1.02] transition-all duration-300">
      <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <h3 className="text-2xl font-extrabold mb-1 drop-shadow-lg">{name}</h3>
        <p className="text-sm text-gray-200 mb-3">{characteristics}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium drop-shadow">{"⭐".repeat(stars)}</span>
          <div className="text-right">
            <p className="text-xs text-gray-300">À partir de</p>
            <p className="text-xl font-extrabold text-[#febb02]">{startingPrice}€</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- PAGE PRINCIPALE ---
export default function Home() {
  // État pour stocker les villes trouvées dans Firebase
  const [availableCities, setAvailableCities] = useState([]);

  const popularDestinations = [
    { name: "Paris", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000", characteristics: "Tour Eiffel, Shopping", startingPrice: 120, stars: 5 },
    { name: "Marrakech", image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?q=80&w=1000", characteristics: "Médina, Palais", startingPrice: 85, stars: 4 },
    { name: "New York", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000", characteristics: "Times Square, Skyscrapers", startingPrice: 180, stars: 5 },
    { name: "Bali", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000", characteristics: "Plages, Temples", startingPrice: 60, stars: 4 },
    { name: "Dubai", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000", characteristics: "Luxe, Burj Khalifa", startingPrice: 250, stars: 5 },
    { name: "Rome", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1000", characteristics: "Colisée, Histoire", startingPrice: 95, stars: 4 }
  ];

  // Récupérer les villes uniques au chargement de la page
  useEffect(() => {
    const fetchCities = async () => {
      const snapshot = await getDocs(collection(db, "hotels"));
      // On crée un tableau sans doublons des villes (ex: ["Paris", "Paris", "Marrakech"] devient ["Paris", "Marrakech"])
      const uniqueCities = [...new Set(snapshot.docs.map(doc => doc.data().city))].sort();
      setAvailableCities(uniqueCities);
    };
    fetchCities();
  }, []);

  return (
    <div className="-mt-[60px] w-screen -ml-[calc((100vw-100%)/2)]">
      
      {/* HEADER AVEC IMAGE, FONDU ET WAVE */}
      <div className="relative w-full h-[650px] flex flex-col items-center justify-end pb-28">
        
        {/* 1. L'IMAGE DE FOND (Fondu naturel vers le bas) */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 40%, white 100%), url('https://img.freepik.com/photos-premium/design-interieur-hall-accueil-hotel-luxe-generation-ai_976564-353.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>

        {/* 2. LE WAVE (Forme courbe) qui fait la transition */}
        <svg className="absolute bottom-0 left-0 w-full h-[120px] overflow-hidden" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,213.2,143.02,268.53,144.2,318.69,138.32,321.39,56.44Z" fill="white"></path>
        </svg>

        {/* 3. CONTENU (Titre + Barre de recherche) flottant au-dessus */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-10 drop-shadow-lg">
            Trouvez votre prochain <span className="text-[#febb02]">séjour</span>
          </h1>
          {/* On passe les villes récupérées à la barre de recherche */}
          <SearchBar availableCities={availableCities} />
        </div>
      </div>

      {/* SECTION DESTINATIONS POPULAIRES */}
      <div className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8">Destinations populaires</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularDestinations.map((dest, index) => (
            <DestinationCard key={index} {...dest} />
          ))}
        </div>
      </div>

      {/* FOOTER AVANTAGES */}
      <div className="border-t border-gray-200 py-10">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="bg-[#003580] text-white rounded-full p-3"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg></div>
            <h3 className="font-bold text-gray-800 text-lg">Paiement Sécurisé</h3>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="bg-[#003580] text-white rounded-full p-3"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
            <h3 className="font-bold text-gray-800 text-lg">Annulation Gratuite</h3>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="bg-[#003580] text-white rounded-full p-3"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg></div>
            <h3 className="font-bold text-gray-800 text-lg">Support 24/7</h3>
          </div>
        </div>
      </div>
    </div>
  );
}