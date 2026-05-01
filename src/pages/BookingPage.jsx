import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, addDoc, collection, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

export default function BookingPage() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [hotel, setHotel] = useState(null);

  useState(() => {
    getDoc(doc(db, "hotels", id)).then(snap => setHotel({ id: snap.id, ...snap.data() }));
  }, [id]);

  const handleBook = async (e) => {
    e.preventDefault();
    const nights = (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);
    if (nights <= 0) return alert("Invalid dates");

    await addDoc(collection(db, "bookings"), {
      userId: currentUser.uid,
      hotelId: id,
      hotelName: hotel.name,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      totalPrice: nights * hotel.price,
      status: "confirmed"
    });
    alert("Booking Successful!");
    navigate("/dashboard");
  };

  if (!hotel) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto bg-black p-8 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Book: {hotel.name}</h2>
      <p className="text-gray-500 mb-6">${hotel.price} per night</p>
      <form onSubmit={handleBook} className="space-y-4">
        <div>
          <label>Check-in</label>
          <input type="date" className="w-full p-2 border rounded" required onChange={e => setCheckIn(e.target.value)} />
        </div>
        <div>
          <label>Check-out</label>
          <input type="date" className="w-full p-2 border rounded" required onChange={e => setCheckOut(e.target.value)} />
        </div>
        <button type="submit" className="w-full bg-green-600 text-white p-3 rounded font-bold hover:bg-green-700">Confirm Booking</button>
      </form>
    </div>
  );
}