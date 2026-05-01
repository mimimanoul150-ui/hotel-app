import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children, role }) => {
  const { currentUser, userRole, loading } = useAuth();

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (!currentUser) return <Navigate to="/login" />;
  if (role && userRole !== role) return <Navigate to="/" />; // Admin protection

  return children;
};