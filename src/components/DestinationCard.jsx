import { useNavigate } from 'react-router-dom';

export default function DestinationCard({ name, image, characteristics, startingPrice, stars }) {
  const navigate = useNavigate();

  // Fonction pour afficher les étoiles visuellement (ex: ⭐⭐⭐⭐)
  const renderStars = (numStars) => {
    const fullStars = Math.floor(numStars);
    return "⭐".repeat(fullStars);
  };

  return (
    <div 
      onClick={() => navigate(`/hotels?city=${name}`)}
      className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-md h-72 transform hover:scale-[1.02] transition-all duration-300"
    >
      {/* Image de fond */}
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      
    
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      
      {/* Contenu texte */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <h3 className="text-2xl font-extrabold mb-1 drop-shadow-lg">{name}</h3>
        <p className="text-sm text-gray-200 mb-3 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {characteristics}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium drop-shadow">
            {renderStars(stars)}
          </span>
          <div className="text-right">
            <p className="text-xs text-gray-300">À partir de</p>
            <p className="text-xl font-extrabold text-[#febb02]">{startingPrice}€</p>
          </div>
        </div>
      </div>
    </div>
  );
}