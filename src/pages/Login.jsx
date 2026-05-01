import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      if(err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError("Email ou mot de passe incorrect.");
      } else {
        setError("Erreur de connexion : " + err.message);
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Connexion</h2>
          <p className="mt-2 text-sm text-gray-500">Accédez à votre espace personnel</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Adresse email</label>
            <input type="email" placeholder="exemple@email.com" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Mot de passe</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              Se souvenir de moi
            </label>
            <a href="#" className="font-medium text-[#0071c2] hover:underline">Mot de passe oublié ?</a>
          </div>

          <button type="submit" className="w-full bg-[#0071c2] hover:bg-[#00487a] text-white py-3 rounded-xl font-bold transition-colors shadow-md text-lg">
            Se connecter
          </button>
        </form>
        
        <p className="mt-8 text-center text-sm text-gray-500">
          Pas encore de compte ? 
          <Link to="/register" className="font-bold text-[#0071c2] hover:underline ml-1">Créer un compte</Link>
        </p>
      </div>
    </div>
  );
}