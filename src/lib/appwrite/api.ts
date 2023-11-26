import { ID, Query } from 'appwrite';

import { NewUser } from '@app/providers/AuthProvider/model/types';

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

export async function signInAccount(user: Pick<NewUser, 'email' | 'password'>) {
  const { email, password } = user;
  try {
    const session = account.createEmailSession(email, password);

    return await session;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error();

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );
    if (!currentUser) throw new Error();

    return currentUser.documents[0];
  } catch (error) {
    console.error(error);
  }
}
