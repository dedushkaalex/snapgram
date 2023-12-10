import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
    imageUrl: string;
    bio: string;
  };
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: {
    id: '',
    name: '',
    username: '',
    email: '',
    imageUrl: '',
    bio: '',
  },
  isAuthenticated: false,
  isLoading: false,
};

export const AuthSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    setLoggedIn: (state) => {
      state.isAuthenticated = true;
    },
    setLoggedOut: (state) => {
      state.isAuthenticated = false;
    },
  },
});
