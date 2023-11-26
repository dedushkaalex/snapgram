import { createContext } from 'react';

import { AuthContextType, UserState } from '../model/types';

export const InitialUserState: UserState = {
  id: '',
  name: '',
  username: '',
  email: '',
  imageUrl: '',
  bio: '',
};

const AuthState: AuthContextType = {
  user: InitialUserState,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

export const AuthContext = createContext<AuthContextType>(AuthState);
