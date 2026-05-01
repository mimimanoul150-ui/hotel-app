import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotel = async () => {
      setLoading(true);
      const docRef = doc(db, "hotels", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setHotel({ id: docSnap.id, ...docSnap.data() });
      setLoading(false);
    };
    fetchHotel();
  }, [id]);

  if (loading) return <div className="text-center py-20 text-gray-500 text-xl">Chargement des informations...</div>;
  if (!hotel) return <div className="text-center py-20"><h2 className="text-2xl font-bold text-red-500">Hôtel introuvable</h2></div>;

  // Gestion des images pour la grille mosaïque
  const images = hotel.images?.length > 0 ? hotel.images : [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80'
  ];

  const taxes = Math.round(hotel.price * 0.12); // Calcul fausse taxe 12%
  const total = hotel.price + taxes;

  return (
    <div className="max-w-7xl mx-auto mt-6 pb-12">
      
      {/* Titre principal */}
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">{hotel.name}</h1>

      {/* Grille Mosaïque Style Booking */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[400px] rounded-xl overflow-hidden mb-8 shadow-sm">
        {/* Grande image */}
        <div className="col-span-2 row-span-2">
          <img src={images[0]} alt="" className="w-full h-full object-cover hover:opacity-90 transition cursor-pointer" />
        </div>
        {/* 4 petites images */}
        <div className="col-span-1 row-span-1 border-l border-white">
          <img src={images[1]} alt="" className="w-full h-full object-cover hover:opacity-90 transition cursor-pointer" />
        </div>
        <div className="col-span-1 row-span-1 border-l border-white">
          <img src={images[2]} alt="" className="w-full h-full object-cover hover:opacity-90 transition cursor-pointer" />
        </div>
        <div className="col-span-1 row-span-1 border-l border-t border-white relative">
          <img src={images[3]} alt="" className="w-full h-full object-cover hover:opacity-90 transition cursor-pointer" />
        </div>
        <div className="col-span-1 row-span-1 border-l border-t border-white relative group">
          <img src={images[4]} alt="" className="w-full h-full object-cover" />
          <button className="absolute inset-0 bg-black/50 text-white font-bold flex items-center justify-center group-hover:bg-black/60 transition">
            Voir plus
          </button>
        </div>
      </div>

      {/* Contenu Principal */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Colonne de gauche : Infos */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4 pb-4 border-b">
            <span className="text-[#003580] font-bold text-2xl">{hotel.rating || '9.2'}</span>
            <span className="text-sm text-gray-600 font-medium">Exceptionnel · 1,234 avis</span>
          </div>
          
          <h2 className="text-xl font-bold text-gray-800 mb-2">Profitez d'un séjour exceptionnel</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            {hotel.description || "Situé au cœur de la ville, cet établissement allie élégance et confort moderne. Idéal pour les voyages d'affaires et les escapades romantiques. Profitez de nos installations de premier ordre et d'un service attentionné."}
          </p>

          {/* Équipements stylisés */}
          <h3 className="text-xl font-bold text-gray-800 mb-4">Équipements et services les plus populaires</h3>
          <div className="grid grid-cols-2 gap-4 pb-8 border-b">
            {["Piscine intérieure", "Spa & Bien-être", "Restaurant Gastronomique", "Parking Privé", "Wi-Fi Haut Débit", "Réception 24h/24"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-700">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Colonne de droite : Panneau Réservation Premium */}
        <div className="w-full lg:w-[400px] flex-shrink-0">
          <div className="border border-gray-200 rounded-xl shadow-xl p-6 sticky top-24 bg-white">
            
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <div>
                <span className="text-red-600 font-bold line-through text-sm">250€</span>
                <p className="text-2xl font-extrabold text-gray-800">{hotel.price}€</p>
                <p className="text-sm text-gray-500">Prix pour 1 nuit</p>
              </div>
              <div className="bg-[#003580] text-white text-center px-3 py-1 rounded-lg">
                <span className="text-xl font-extrabold block">{hotel.rating || '8.5'}</span>
                <span className="text-[10px]">Excellent</span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="border border-gray-300 rounded p-3">
                <label className="text-xs font-bold text-gray-600 block">Date d'arrivée</label>
                <input type="date" className="w-full outline-none text-gray-800 font-medium" />
              </div>
              <div className="border border-gray-300 rounded p-3">
                <label className="text-xs font-bold text-gray-600 block">Date de départ</label>
                <input type="date" className="w-full outline-none text-gray-800 font-medium" />
              </div>
            </div>

            {/* Calcul des taxes style Booking */}
            <div className="space-y-2 text-sm text-gray-600 mb-6 border-t pt-4">
              <div className="flex justify-between">
                <span>{hotel.price}€ x 1 nuit</span>
                <span>{hotel.price}€</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes et frais de service</span>
                <span>{taxes}€</span>
              </div>
              <div className="flex justify-between font-extrabold text-lg text-gray-900 border-t pt-2">
                <span>Total</span>
                <span>{total}€</span>
              </div>
            </div>

            <Link 
              to={`/book/${hotel.id}`} 
              className="block w-full text-center bg-[#0071c2] hover:bg-[#00487a] text-white font-bold py-3.5 rounded-lg text-lg transition-colors shadow-sm"
            >
              Réserver maintenant
            </Link>
            
            <p className="text-center text-sm text-gray-500 mt-4 font-medium">
              Vous ne serez débité qu'au moment du séjour
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}