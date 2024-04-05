import axios from 'axios';
import { authClient } from '@/lib/firebaseClient';

export const search = async (query: string) => {
  let headers = {};

  if (authClient.currentUser) {
    try {
      const idToken = await authClient.currentUser.getIdToken();
      headers = {
        Authorization: idToken,
      };
    } catch (err) {}
  }

  return await axios.get(`/api/search?q=${encodeURI(query)}`, {
    headers,
  });
};
