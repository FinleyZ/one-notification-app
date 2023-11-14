import { useContext } from 'react';
import { AuthContext } from 'src/client/contexts/Auth0Context';

export const useAuth = () => useContext(AuthContext);
