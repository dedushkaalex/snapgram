// import React, {
//   FC,
//   PropsWithChildren,
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from 'react';

// type InitialUserState = {
//   id: string;
//   name: string;
//   username: string;
//   email: string;
//   imageUrl: string;
//   bio: string;
// };

// type InitialAuthState = {
//   user: InitialUserState;
//   isLoading: boolean;
//   isAuthenticated: boolean;
//   setUser: () => React.Dispatch<React.SetStateAction<InitialUserState>>;
//   setIsAuthenticated: () => React.Dispatch<React.SetStateAction<boolean>>;
//   checkAuthUser: () => Promise<boolean>;
// };

// const UserState: InitialUserState = {
//   id: '',
//   name: '',
//   username: '',
//   email: '',
//   imageUrl: '',
//   bio: '',
// };

// const AuthState: InitialAuthState = {
//   user: UserState,
//   isLoading: false,
//   isAuthenticated: false,
//   setUser: () => void,
//   setIsAuthenticated: () => {},
//   checkAuthUser: () => false as boolean,
// };

// const AuthContext = createContext<InitialState>(AuthState);

// export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
//   const user = useContext(AuthContext);
//   return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
// };
