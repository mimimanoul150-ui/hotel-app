import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [showGuests, setShowGuests] = useState(false);
  
  // Référence pour le menu voyageurs
  const guestRef = useRef();

  // Fermer le menu si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (guestRef.current && !guestRef.current.contains(e.target)) {
        setShowGuests(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!destination.trim()) return alert("Veuillez entrer une destination");
    navigate(`/hotels?city=${destination}`);
  };

  const guestText = `${adults} adultes · ${rooms} chambre${rooms > 1 ? 's' : ''}`;

  return (
    <div className="relative w-full z-50">
      {/* Nouveau Design Booking 2024 : Fond Blanc + Ombre Portée */}
      <form onSubmit={handleSearch} className="bg-white p-2 rounded-xl shadow-2xl border border-gray-200 flex flex-col md:flex-row gap-2">
        
        {/* Destination */}
        <div className="flex-1 flex items-center bg-[#f5f5f5] hover:bg-gray-100 rounded-lg px-4 py-3 transition-colors">
          <input 
            type="text" 
            placeholder="Où allez-vous ?" 
            className="w-full outline-none text-gray-800 font-medium bg-transparent"
            value={destination} 
            onChange={(e) => setDestination(e.target.value)} 
          />
        </div>

        {/* Dates */}
        <div className="flex-1 flex items-center bg-[#f5f5f5] hover:bg-gray-100 rounded-lg px-4 py-3 gap-2 transition-colors">
          <input type="date" className="w-1/2 outline-none text-gray-800 text-sm bg-transparent [color-scheme:light]" />
          <input type="date" className="w-1/2 outline-none text-gray-800 text-sm bg-transparent [color-scheme:light]" />
        </div>

        {/* Voyageurs */}
        <div className="w-full md:w-64 bg-[#f5f5f5] hover:bg-gray-100 rounded-lg px-4 py-3 relative transition-colors" ref={guestRef}>
          <button 
            type="button" 
            onClick={() => setShowGuests(!showGuests)}
            className="w-full text-left outline-none text-gray-800 text-sm font-medium bg-transparent"
          >
            {guestText}
          </button>

          {/* Popup Voyageurs */}
          {showGuests && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 p-6 z-[100]">
              <div className="flex justify-between items-center mb-4 pb-4 border-b">
                <span className="font-bold text-gray-800">Adultes</span>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} className="w-8 h-8 border-2 border-[#0071c2] text-[#0071c2] rounded-full font-bold flex items-center justify-center hover:bg-blue-50">-</button>
                  <span className="w-4 text-center font-bold">{adults}</span>
                  <button type="button" onClick={() => setAdults(adults + 1)} className="w-8 h-8 border-2 border-[#0071c2] text-[#0071c2] rounded-full font-bold flex items-center justify-center hover:bg-blue-50">+</button>
                </div>
              </div>
              <div className="flex justify-between items-center mb-4 pb-4 border-b">
                <div>
                  <span className="font-bold text-gray-800 block">Enfants</span>
                  <span className="text-xs text-gray-500">De 2 à 17 ans</span>
                </div>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setChildren(Math.max(0, children - 1))} className="w-8 h-8 border-2 border-[#0071c2] text-[#0071c2] rounded-full font-bold flex items-center justify-center hover:bg-blue-50">-</button>
                  <span className="w-4 text-center font-bold">{children}</span>
                  <button type="button" onClick={() => setChildren(children + 1)} className="w-8 h-8 border-2 border-[#0071c2] text-[#0071c2] rounded-full font-bold flex items-center justify-center hover:bg-blue-50">+</button>
                </div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-gray-800">Chambres</span>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setRooms(Math.max(1, rooms - 1))} className="w-8 h-8 border-2 border-[#0071c2] text-[#0071c2] rounded-full font-bold flex items-center justify-center hover:bg-blue-50">-</button>
                  <span className="w-4 text-center font-bold">{rooms}</span>
                  <button type="button" onClick={() => setRooms(rooms + 1)} className="w-8 h-8 border-2 border-[#0071c2] text-[#0071c2] rounded-full font-bold flex items-center justify-center hover:bg-blue-50">+</button>
                </div>
              </div>
              <button type="button" onClick={() => setShowGuests(false)} className="w-full bg-[#0071c2] hover:bg-[#00487a] text-white py-2.5 rounded-lg mt-2 font-bold transition-colors">
                Terminé
              </button>
            </div>
          )}
        </div>

        {/* Bouton Rechercher Bleu */}
        <button type="submit" className="bg-[#0071c2] hover:bg-[#00487a] text-white font-bold px-8 rounded-lg transition-colors shadow-sm">
          Rechercher
        </button>
      </form>
    </div>
  );
}