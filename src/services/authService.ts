import { account, ID } from '@/lib/appwrite';

export const login = async (email: string, password: string) => {
  const session = await account.createEmailPasswordSession(email, password);

  return await account.get();
};


export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const user = await account.create(ID.unique(), email, password, name);

    return user;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const logout = async () => {
  await account.deleteSession('current');
};
