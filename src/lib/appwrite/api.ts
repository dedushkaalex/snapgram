import { ID } from 'appwrite';
import { NewUser } from 'types';

import { account, appwriteConfig, avatars, databases } from './config';

export async function createUserAccount(user: NewUser) {
  try {
    const newAccount = await account.create(ID.unique(), user.email, user.password, user.name);

    if (!newAccount) throw new Error();

    const avatarUrl = avatars.getInitials(user.name);

    const { $id, name, email } = newAccount;

    const newUser = await saveUserToDB({
      accountId: $id,
      name,
      email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username: string;
}) {
  try {
    const { databaseId, userCollectionId } = appwriteConfig;
    const newUser = await databases.createDocument(databaseId, userCollectionId, ID.unique(), user);

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}
