import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function Navbar() {
  const { currentUser, userRole } = useAuth();
  // --- RADART DE DÉBOGAGE À SUPPRIMER PLUS TARD ---
  console.log("EMAIL CONNECTÉ :", currentUser?.email);
  console.log("RÔLE TROUVÉ :", userRole);
  return (
    <header className="sticky top-0 z-50 bg-[#003580]/95 backdrop-blur-md text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        
        {/* Logo Premium */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-[#febb02] text-[#003580] font-extrabold text-2xl px-2 py-1 rounded group-hover:bg-white transition-colors">
            B.
          </div>
          <span className="text-xl font-bold hidden sm:inline">BookingScape</span>
        </Link>

        {/* Menu de navigation */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-[#febb02] transition-colors">Accueil</Link>
          <Link to="/hotels" className="hover:text-[#febb02] transition-colors">Hôtels</Link>

          {currentUser ? (
            <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/30">
              {userRole === 'admin' ? (
                <Link to="/admin" className="hover:text-[#febb02] transition-colors flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Admin
                </Link>
              ) : (
                <Link to="/dashboard" className="hover:text-[#febb02] transition-colors">Mes Réservations</Link>
              )}
              <button 
                onClick={() => signOut(auth)} 
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md border border-white/30 transition-all"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/30">
              <Link to="/login" className="hover:text-[#febb02] transition-colors">Connexion</Link>
              <Link 
                to="/register" 
                className="bg-[#febb02] text-[#003580] hover:bg-white px-4 py-2 rounded-md font-bold transition-colors shadow-sm"
              >
                Inscription
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}