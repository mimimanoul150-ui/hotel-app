import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import HotelList from './pages/HotelList';
import HotelDetails from './pages/HotelDetails';
import BookingPage from './pages/BookingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hotels" element={<HotelList />} />
            <Route path="/hotel/:id" element={<HotelDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/book/:id" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          </Routes>
              </div> {/* Fin du container mx-auto px-4 py-8 */}

      {/* --- DÉBUT DU FOOTER --- */}
      <footer className="bg-[#003580] text-gray-300 mt-12 border-t border-white/10">
        <div className="container mx-auto px-6 py-12">
          
          {/* Grille des liens */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
            
            {/* Colonne 1 */}
            <div>
              <h4 className="text-white font-bold mb-4 text-base">Assistance</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white hover:underline transition">Gérez vos réservations</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition">Contacter le Service Clients</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition">Centre de sécurité</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition">FAQ</a></li>
              </ul>
            </div>

            {/* Colonne 2 */}
            <div>
              <h4 className="text-white font-bold mb-4 text-base">À découvrir</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white hover:underline transition">Programme de fidélité Genius</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition">Offres saisonnières</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition">Articles de voyages</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition">Destinations populaires</a></li>
              </ul>
            </div>

            {/* Colonne 3 */}
            <div>
              <h4 className="text-white font-bold mb-4 text-base">Conditions</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white hover:underline transition">Charte de confidentialité</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition">Conditions de Service</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition">Déclaration d’accessibilité</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition">Règles relatives aux contenus</a></li>
              </ul>
            </div>

            {/* Colonne 4 */}
            <div>
              <h4 className="text-white font-bold mb-4 text-base">Partenaires</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white hover:underline transition">Accéder à l'extranet</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition">Ajouter mon établissement</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition">Devenir affilié</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition">Aide aux partenaires</a></li>
              </ul>
            </div>

            {/* Colonne 5 */}
            <div>
              <h4 className="text-white font-bold mb-4 text-base">À propos</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white hover:underline transition">À propos de StayScape</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition">Comment fonctionne notre site</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition">Durabilité</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition">Recrutement</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition">Contacts de l'entreprise</a></li>
              </ul>
            </div>

          </div>

          {/* Barre de copyright tout en bas */}
          <div className="border-t border-white/20 mt-10 pt-6 text-xs text-center md:text-left">
            <p>Copyright © {new Date().getFullYear()} StayScape. Tous droits réservés. Il s'agit d'un projet de démonstration.</p>
          </div>

        </div>
      </footer>
      {/* --- FIN DU FOOTER --- */}

    </BrowserRouter>
  </AuthProvider>
);
}

export default App;
