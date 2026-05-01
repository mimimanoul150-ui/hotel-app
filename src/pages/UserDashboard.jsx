import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

export default function UserDashboard() {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const q = query(collection(db, "bookings"), where("userId", "==", currentUser.uid));
      const snap = await getDocs(q);
      setBookings(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    fetch();
  }, [currentUser]);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Mes Réservations</h2>
      <div className="space-y-4">
        {bookings.length === 0 ? <p>Aucune réservation pour le moment.</p> : bookings.map(b => (
          <div key={b.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">{b.hotelName}</h3>
              <p className="text-gray-500">{b.checkInDate} {' -> '} {b.checkOutDate}</p>
            </div>
            <div className="text-right">
              <p className="text-green-600 font-bold">{b.totalPrice}€</p>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{b.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}