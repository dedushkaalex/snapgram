import React, {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { getCurrentUser } from 'lib/appwrite/api';
import { localStorageWrapper } from 'lib/localStorage';
import { type UserState } from 'types';

type AuthContextType = {
  user: UserState;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserState>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

const InitialUserState: UserState = {
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

const AuthContext = createContext<AuthContextType>(AuthState);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserState>(InitialUserState);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const checkAuthUser = async () => {
    console.log(2);
    try {
      setIsLoading(true);
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          bio: currentAccount.bio,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          username: currentAccount.username,
        });
        setIsAuthenticated(true);

        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cookie = localStorageWrapper.get<string[] | null>('cookieFallback');
    console.log(cookie);
    if (cookie === null) {
      navigate('/sign-in');
    }

    checkAuthUser();
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      isLoading,
      isAuthenticated,
      setIsAuthenticated,
      checkAuthUser,
    }),
    [isAuthenticated, isLoading, user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useUserContext = () => useContext(AuthContext);
