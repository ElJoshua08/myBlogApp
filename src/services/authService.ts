import { account, ID } from '@/lib/appwrite';

export const login = async (email: string, password: string) => {
  const session = await account.createEmailPasswordSession(email, password);

  return await account.get();
};

export const register = async (
  email: string,
  password: string,
  name: string
) => {
  await account.create(ID.unique(), email, password, name);
  console.log('We are registering you');
  login(email, password);

  return await account.get();
};

export const logout = async () => {
  await account.deleteSession('current');
};
