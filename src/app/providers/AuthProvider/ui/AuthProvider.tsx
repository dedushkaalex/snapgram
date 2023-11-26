import { FC, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getCurrentUser } from 'lib/appwrite/api';

import { localStorageWrapper } from '@shared/lib/localStorage';

import { AuthContext, InitialUserState } from '../lib/AuthContext';
import { UserState } from '../model/types';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserState>(InitialUserState);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const checkAuthUser = async () => {
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
