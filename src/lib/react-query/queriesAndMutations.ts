import { createUserAccount, signInAccount } from 'lib/appwrite/api';
import { NewUser } from 'types';

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: NewUser) => {
      return createUserAccount(user);
    },
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: Pick<NewUser, 'email' | 'password'>) => {
      return signInAccount(user);
    },
  });
};
