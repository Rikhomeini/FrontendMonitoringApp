import { useEffect, useState } from 'react';
import { authService } from '../services/authService';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      if (!authenticated) {
        window.location.href = '/login';
      }
    };

    checkAuth();

    // Listen for auth changes
    const handleStorageChange = () => checkAuth();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('unauthorized', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('unauthorized', handleStorageChange);
    };
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;