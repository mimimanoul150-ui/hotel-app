import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuth } from '../context/AuthContext'; // <-- AJOUT TRÈS IMPORTANT

export default function Register() {
  const navigate = useNavigate();
  const { setUserRole } = useAuth(); // <-- AJOUT TRÈS IMPORTANT
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    // 1. SÉCURITÉ NOM : Uniquement des lettres (avec ou sans accents), espaces autorisés
    const nameRegex = /^[a-zA-ZÀ-ÿ\s-]+$/;
    if (!nameRegex.test(name)) {
      return setError("Le nom ne doit contenir que des lettres (pas de chiffres ni de symboles).");
    }

    // 2. SÉCURITÉ EMAIL
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return setError("Format d'email invalide.");
    }

    // 3. SÉCURITÉ MOT DE PASSE : 8 caractères min, 1 lettre, 1 chiffre, 1 symbole
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return setError("Le mot de passe doit contenir au moins 8 caractères, UNE lettre, UN chiffre et UN symbole (@, !, ?, &...).");
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      
      // LOGIQUE ADMIN SECURISÉE : Détection de l'email administrateur exact
      const isAdmin = (email.toLowerCase() === 'admin.secret@stayScape.com');
      const role = isAdmin ? 'admin' : 'user';

      await setDoc(doc(db, "users", cred.user.uid), {
        name, 
        email, 
        phone, 
        role: role, // "admin" si c'est le bon email, "user" sinon
        preferences: { devise: 'EUR' }
      });
      
      // <-- LA LIGNE QUI RÈGLE LE PROBLÈME :
      setUserRole(role); 
      // -------------------------------
      
      navigate("/");
    } catch (err) {
      if(err.code === 'auth/email-already-in-use') setError("Cet email est déjà utilisé par un autre compte.");
      else if(err.code === 'auth/weak-password') setError("Ce mot de passe est trop faible pour Firebase.");
      else setError("Erreur technique : " + err.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Créer un compte</h2>
          <p className="mt-2 text-sm text-gray-500">Rejoignez des millions de voyageurs</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg text-sm text-red-700 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          
          {/* CHAMP NOM (Lettres uniquement) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Nom complet</label>
            <input 
              type="text" 
              placeholder="Jean Dupont" 
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
              value={name} 
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-ZÀ-ÿ\s-]*$/.test(value)) {
                  setName(value);
                }
              }} 
              required 
            />
            <p className="text-xs text-gray-400 mt-1">Uniquement des lettres</p>
          </div>

          {/* CHAMP EMAIL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input type="email" placeholder="exemple@email.com" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>

          {/* CHAMP TELEPHONE */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Téléphone (optionnel)</label>
            <input type="tel" placeholder="+33 6 12 34 56 78" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>

          {/* CHAMP MOT DE PASSE (Lettres + Chiffres + Symboles obligatoires) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Mot de passe</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" value={password} onChange={e => setPassword(e.target.value)} required />
            <div className="mt-1 flex flex-col text-xs text-gray-400">
              <span>Min. 8 caractères. Doit contenir :</span>
              <span className="flex gap-3 mt-1">
                <span className={/(?=.*[A-Za-z])/.test(password) ? "text-green-500 font-bold" : ""}>• Une lettre</span>
                <span className={/(?=.*\d)/.test(password) ? "text-green-500 font-bold" : ""}>• Un chiffre</span>
                <span className={/(?=.*[@$!%*?&])/.test(password) ? "text-green-500 font-bold" : ""}>• Un symbole (!@&...)</span>
              </span>
            </div>
          </div>

          <button type="submit" className="w-full bg-[#0071c2] hover:bg-[#00487a] text-white py-3 rounded-xl font-bold transition-colors shadow-md text-lg mt-2">
            S'inscrire
          </button>
        </form>
        
        <p className="mt-8 text-center text-sm text-gray-500">
          Déjà un compte ? 
          <Link to="/login" className="font-bold text-[#0071c2] hover:underline ml-1">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}