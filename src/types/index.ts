export interface NewUser {
  name: string;
  email: string;
  username: string;
  password: string;
}

export type UserState = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
  bio: string;
};
