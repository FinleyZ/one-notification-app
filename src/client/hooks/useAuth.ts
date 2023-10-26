import { useContext } from 'react';
import { AuthContext } from 'src/client/contexts/JWTAuthContext';

export const useAuth = () => useContext(AuthContext);
