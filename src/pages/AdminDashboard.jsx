import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({ revenue: 0, bookings: 0, confirmed: 0, users: 0 });
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  
  // Formulaire d'ajout d'hôtel
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // 1. Récupérer les réservations pour les stats
      const bookSnap = await getDocs(collection(db, "bookings"));
      const allBookings = bookSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      setBookings(allBookings);
      
      // Calculs des statistiques
      const revenue = allBookings
        .filter(b => b.status === 'confirmed')
        .reduce((sum, b) => sum + (b.totalPrice || 0), 0);
      
      setStats({
        revenue: revenue,
        bookings: allBookings.length,
        confirmed: allBookings.filter(b => b.status === 'confirmed').length,
        users: (await getDocs(collection(db, "users"))).size
      });
    };
    fetchDashboardData();
  }, []);

  const handleAddHotel = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    let imageUrl = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800';
    
    try {
      if (image) {
        const imageRef = ref(storage, `hotels/${Date.now()}_${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }
      await addDoc(collection(db, "hotels"), {
        name, city, price: Number(price), description: desc, images: [imageUrl], rating: 4.5
      });
      alert("Hôtel ajouté avec succès !");
      setName(''); setCity(''); setPrice(''); setDesc(''); setImage(null);
    } catch (error) {
      alert("Erreur lors de l'ajout de l'hôtel");
    }
    setIsUploading(false);
  };

  // Composant Badge de statut stylisé
  const StatusBadge = ({ status }) => {
    const styles = {
      confirmed: 'bg-green-100 text-green-800 border-green-200',
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    const labels = { confirmed: 'Confirmé', pending: 'En attente', cancelled: 'Annulé' };
    return (
      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${styles[status] || styles.pending}`}>
        {labels[status] || status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <h1 className="text-3xl font-extrabold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-500 mt-1">Bienvenue dans l'espace administration de StayScape.</p>
      </div>

      <div className="p-8">
        {/* Cartes de Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          <div className="bg-white rounded-xl shadow-sm border p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Revenus totaux</p>
              <p className="text-2xl font-extrabold text-gray-900">{stats.revenue.toLocaleString()}€</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Réservations</p>
              <p className="text-2xl font-extrabold text-gray-900">{stats.bookings}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 bg-green-100 rounded-xl text-green-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Confirmées</p>
              <p className="text-2xl font-extrabold text-gray-900">{stats.confirmed}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="p-3 bg-orange-100 rounded-xl text-orange-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Clients inscrits</p>
              <p className="text-2xl font-extrabold text-gray-900">{stats.users}</p>
            </div>
          </div>

        </div>

        {/* Onglets de navigation */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="flex border-b border-gray-200">
            {['overview', 'hotels', 'bookings'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium transition-colors ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                {tab === 'overview' ? 'Vue d\'ensemble' : tab === 'hotels' ? 'Gestion des hôtels' : 'Toutes les réservations'}
              </button>
            ))}
          </div>

          <div className="p-6">
            
            {/* VUE D'ENSEMBLE (Dernières réservations) */}
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Dernières réservations</h3>
                {bookings.length === 0 ? (
                  <p className="text-gray-500 text-center py-10">Aucune réservation pour le moment.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider">
                          <th className="pb-3 pr-4">Client</th>
                          <th className="pb-3 pr-4">Hôtel</th>
                          <th className="pb-3 pr-4">Montant</th>
                          <th className="pb-3">Statut</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {/* On affiche seulement les 5 dernières pour l'overview */}
                        {bookings.slice(0, 5).map(b => (
                          <tr key={b.id} className="hover:bg-gray-50">
                            <td className="py-3 pr-4 text-sm text-gray-900 font-medium">{b.userId?.slice(0,10)}...</td>
                            <td className="py-3 pr-4 text-sm text-gray-700">{b.hotelName}</td>
                            <td className="py-3 pr-4 text-sm font-semibold text-gray-900">{b.totalPrice}€</td>
                            <td className="py-3"><StatusBadge status={b.status} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* GESTION DES HÔTELS */}
            {activeTab === 'hotels' && (
              <form onSubmit={handleAddHotel} className="max-w-2xl space-y-4 bg-gray-50 p-6 rounded-lg border">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Ajouter un nouvel hôtel</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Nom de l'hôtel" className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={name} onChange={e=>setName(e.target.value)} required />
                  <input type="text" placeholder="Ville" className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={city} onChange={e=>setCity(e.target.value)} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="number" placeholder="Prix / nuit" className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={price} onChange={e=>setPrice(e.target.value)} required />
                  <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                </div>
                <textarea placeholder="Description" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24" value={desc} onChange={e=>setDesc(e.target.value)} required />
                
                <button type="submit" disabled={isUploading} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold transition-colors disabled:bg-gray-400 flex items-center gap-2">
                  {isUploading ? (
                    <> <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Envoi en cours... </>
                  ) : 'Ajouter cet hôtel'}
                </button>
              </form>
            )}

            {/* TOUTES LES RÉSERVATIONS */}
            {activeTab === 'bookings' && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Historique complet ({bookings.length})</h3>
                {bookings.length === 0 ? (
                  <p className="text-gray-500 text-center py-10">Aucune réservation trouvée.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider">
                          <th className="pb-3 pr-4">ID Client</th>
                          <th className="pb-3 pr-4">Hôtel</th>
                          <th className="pb-3 pr-4">Dates</th>
                          <th className="pb-3 pr-4">Montant</th>
                          <th className="pb-3">Statut</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {bookings.map(b => (
                          <tr key={b.id} className="hover:bg-gray-50">
                            <td className="py-3 pr-4 text-sm text-gray-500 font-mono">{b.userId?.slice(0,12)}...</td>
                            <td className="py-3 pr-4 text-sm text-gray-900 font-medium">{b.hotelName}</td>
                            <td className="py-3 pr-4 text-sm text-gray-500">{b.checkInDate} {'->'} {b.checkOutDate}</td>
                            <td className="py-3 pr-4 text-sm font-semibold text-gray-900">{b.totalPrice}€</td>
                            <td className="py-3"><StatusBadge status={b.status} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}