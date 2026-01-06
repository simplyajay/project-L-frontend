import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "accessToken";

export const saveToken = async (token: string): Promise<void> => {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
};

export const getToken = async (): Promise<string | null> => {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);
  return token;
};

export const removeToken = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
};
